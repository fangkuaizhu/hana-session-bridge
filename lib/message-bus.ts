// lib/message-bus.ts
// 消息总线：会话实时事件 → 房间广播，以及观众建议消息注入。
// 核心流程（Phase 1 任务书 M3）：
//   1. bridgeSession: subscribeSessionEvents(hostSession) → 事件映射为 Message → transport.send
//   2. injectSuggestion: sendSessionMessage + context.beforeUser 注入房主 session
//   3. handleMessage: 收到广播消息 → 按类型分发（去重 + 权限过滤）
//
// 事件类型映射（任务书 §三.3）：
//   message_start → user_message（用户发送消息）
//   agent_start   → agent_reply（Agent 开始回复）
//   tool_call     → tool_call（payload 为工具名+参数）
//   tool_result   → tool_result
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import { subscribeSessionEvents, sendSessionMessage } from '../vendor/plugin-runtime.js';
import type { Message, Transport } from './transport.ts';
import type { RoomManager } from './room-manager.ts';

/** 事件类型 → Message.type 映射表 */
const EVENT_TYPE_MAP: Record<string, Message['type']> = {
  message_start: 'user_message',
  agent_start: 'agent_reply',
  tool_call: 'tool_call',
  tool_result: 'tool_result',
};

/** 参与者在房间内的最低权限（数字越大权限越高） */
const PERMISSION_RANK: Record<string, number> = {
  readonly: 0,
  suggest: 1,
  collaborate: 2,
  full_control: 3,
};

export class MessageBus {
  private transport: Transport;
  private roomManager: RoomManager;
  private ctx: HanaPluginContext;

  /** roomId -> hostSession 订阅注销函数（bridgeSession 注册） */
  private bridgeUnsubs = new Map<string, () => void>();
  /** roomId -> 已接收的最高 seq（去重） */
  private lastReceivedSeq = new Map<string, number>();

  constructor(transport: Transport, roomManager: RoomManager, ctx: HanaPluginContext) {
    this.transport = transport;
    this.roomManager = roomManager;
    this.ctx = ctx;
  }

  /**
   * 开始桥接：订阅 hostSession 的实时事件，广播到房间所有参与者。
   * 返回 unsubscribe 函数。
   */
  bridgeSession(roomId: string, hostSessionPath: string): () => void {
    // 防重复桥接：同房间已有订阅则先取消旧订阅
    const existing = this.bridgeUnsubs.get(roomId);
    if (existing) {
      try { existing(); } catch { /* ignore */ }
      this.bridgeUnsubs.delete(roomId);
    }

    const off = subscribeSessionEvents(this.ctx, { sessionPath: hostSessionPath }, (event, meta) => {
      this.handleSessionEvent(roomId, event, meta);
    });
    this.bridgeUnsubs.set(roomId, off);
    return () => {
      try { off(); } catch { /* ignore */ }
      this.bridgeUnsubs.delete(roomId);
    };
  }

  /**
   * 注入建议消息：将观众的建议以 context.beforeUser 注入房主 session。
   * 仅允许权限 >= suggest 的参与者（任务书约束）。
   */
  async injectSuggestion(roomId: string, fromUserId: string, text: string): Promise<void> {
    const room = this.roomManager.getRoom(roomId);
    if (!room) throw new Error('房间不存在');
    if (room.status !== 'active') throw new Error('房间已关闭');

    const participant = room.participants.find((p) => p.userId === fromUserId);
    if (!participant) throw new Error('你不是该房间的参与者');
    if (PERMISSION_RANK[room.permissionLevel] < PERMISSION_RANK.suggest) {
      throw new Error('当前房间权限级别不允许发送建议（需 suggest 及以上）');
    }

    const host = room.participants.find((p) => p.userId === room.hostId);
    if (!host || !host.sessionPath) throw new Error('房主会话不可用');

    // 发送建议消息 + beforeUser 上下文注入（Phase 0 已验证 accepted: true）
    const result = await sendSessionMessage(
      this.ctx,
      { sessionPath: host.sessionPath },
      {
        text: `[来自 ${fromUserId} 的建议] ${text}`,
        context: {
          beforeUser: `（房间内观众 ${fromUserId} 的建议：${text}）`,
        },
      }
    ) as { ok?: boolean; accepted?: boolean; error?: string; reason?: string };

    // session_busy 是运行中保护：不视为失败，但提示稍后重试（设计文档 §2.3）
    if (result && (result as Record<string, unknown>).reason === 'session_busy') {
      throw new Error('房主会话正忙，建议未注入，请稍后重试');
    }

    // 记录建议广播（供 UI 展示）
    await this.transport.send(roomId, {
      roomId,
      from: fromUserId,
      seq: this.roomManager.nextSeq(roomId),
      type: 'suggestion',
      payload: { text },
      timestamp: Date.now(),
    });
  }

  /**
   * 处理接收到的广播消息：按类型分发到对应处理器。
   * - 去重：seq <= lastReceivedSeq 的丢弃
   * - 权限：suggestion 仅权限 >= suggest 可见（由上层判断）
   */
  handleMessage(roomId: string, msg: Message): void {
    if (!msg || msg.roomId !== roomId) return;
    if (typeof msg.seq !== 'number') return;

    const last = this.lastReceivedSeq.get(roomId) ?? 0;
    if (msg.seq <= last) return; // 去重
    this.lastReceivedSeq.set(roomId, msg.seq);

    this.roomManager.touch(roomId);

    // Phase 1：handleMessage 的消费方是 WebView/工具层；
    // 这里将消息通过 ctx.bus 抛给上层（route 层用 EventBus 订阅消费）
    // 避免 MessageBus 直接依赖 UI。payload 结构稳定，便于后续扩展。
    this.ctx.bus.emit('session-bridge:message:received', {
      roomId,
      message: msg,
    });
  }

  /** 取消某房间的所有桥接（onunload 用） */
  dispose(): void {
    for (const off of [...this.bridgeUnsubs.values()]) {
      try { off(); } catch { /* ignore */ }
    }
    this.bridgeUnsubs.clear();
  }

  // ------------------------------------------------------------------
  // 内部
  // ------------------------------------------------------------------

  private async handleSessionEvent(roomId: string, event: unknown, meta: { sessionId: string | null; sessionPath: string | null }): Promise<void> {
    const room = this.roomManager.getRoom(roomId);
    if (!room || room.status !== 'active') return;

    const evt = (event ?? {}) as Record<string, unknown>;
    const type = typeof evt.type === 'string' ? evt.type : null;
    if (!type) return;

    const mappedType = EVENT_TYPE_MAP[type];
    if (!mappedType) return; // 未知事件类型忽略（如 turn_start、message_delta 等）

    // 构造 Message 并广播（seq 由 RoomManager 全局分配）
    const message: Message = {
      roomId,
      from: this.currentUserId(roomId),
      seq: this.roomManager.nextSeq(roomId),
      type: mappedType,
      payload: this.extractPayload(type, evt),
      timestamp: Date.now(),
    };

    this.roomManager.touch(roomId);
    await this.transport.send(roomId, message);
  }

  private currentUserId(roomId: string): string {
    const room = this.roomManager.getRoom(roomId);
    return room?.hostId ?? this.ctx.userId ?? 'unknown';
  }

  /** 提取事件 payload：tool_call/tool_result 保留工具名+参数，其余保留文本 */
  private extractPayload(type: string, evt: Record<string, unknown>): unknown {
    if (type === 'tool_call') {
      return {
        toolName: evt.toolName ?? evt.name ?? null,
        args: evt.args ?? evt.arguments ?? evt.input ?? null,
      };
    }
    if (type === 'tool_result') {
      return {
        toolName: evt.toolName ?? evt.name ?? null,
        output: evt.output ?? evt.result ?? evt.text ?? null,
      };
    }
    // message_start / agent_start：优先 text，其次 content/message
    return {
      text: evt.text ?? evt.content ?? evt.message ?? evt.data ?? null,
    };
  }
}
