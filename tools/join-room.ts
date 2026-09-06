// tools/join-room.ts
// session-bridge_join-room：加入共享房间。
// 有密码 → 验证通过直接加入；无密码 → 创建待批准请求。
import { defineTool } from '../vendor/plugin-runtime.js';
import type { HanaToolContext } from '../vendor/plugin-runtime.js';
import { getSharedState } from '../lib/shared.ts';
import { WebSocketTransport } from '../lib/websocket-transport.ts';

/**
 * 协作级别及以上房间：join 成功后为参与者创建隐藏 Agent（Phase 3 P5）。
 * fire-and-forget：不阻塞加入响应；失败仅记日志。低级别房间 ensureAgents 内部返回 notice。
 */
function maybeEnsureAgents(roomId: string, ctx: HanaToolContext): void {
  Promise.resolve().then(async () => {
    try {
      await getSharedState(ctx).contextSync.ensureAgents(roomId);
    } catch (e) {
      ctx.log?.warn?.('session-bridge: ensureAgents 失败', e instanceof Error ? e.message : String(e));
    }
  }).catch(() => { /* ignore */ });
}

export const { name, description, parameters, execute } = defineTool({
  name: 'join_room',
  description: '加入一个会话共享房间。输入房主提供的 8 位房间码（有密码则同时输入密码）。加入后可实时看到房主会话的消息与 Agent 回复，权限级别允许时还可发送建议。',
  parameters: {
    type: 'object',
    properties: {
      roomId: {
        type: 'string',
        description: '8 位房间码（字母数字）',
      },
      password: {
        type: 'string',
        description: '可选密码。房主设置了密码时必填',
      },
    },
    required: ['roomId'],
  },
  sessionPermission: { readOnly: true },
  async execute(input: { roomId: string; password?: string }, ctx) {
    const { roomManager, messageBus, transport } = getSharedState(ctx);

    const roomId = String(input.roomId ?? '').trim().toUpperCase();
    if (!/^[A-Z0-9]{8}$/.test(roomId)) {
      return { error: '房间码格式不正确，应为 8 位字母数字（如 A3K9X2M7）' };
    }

    const userId = ctx.userId ?? 'unknown';
    const sessionPath = ctx.sessionPath ?? ctx.sessionRef?.sessionPath ?? null;

    // Phase 2 跨机模式：本地无该房间记录，直接经 Relay 验证并加入
    if (transport instanceof WebSocketTransport) {
      try {
        await transport.connect(roomId, { password: input.password });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        // 统一提示，不透露房间是否存在（设计文档 §9.2 防枚举）
        if (msg.includes('密码错误')) return { error: '密码错误' };
        return { error: '无法加入房间，请检查房间码是否正确' };
      }
      await roomManager.joinRemoteRoom(roomId, { userId, sessionPath: sessionPath ?? '/unknown' });
      if (sessionPath) {
        messageBus.bridgeSession(roomId, sessionPath);
      }
      const room = roomManager.getRoom(roomId);
      maybeEnsureAgents(roomId, ctx);
      return {
        status: 'joined',
        roomId,
        permissionLevel: room?.permissionLevel,
        hint: '已通过 Relay 加入房间，实时共享已开启。',
      };
    }

    let status: 'joined' | 'pending';
    try {
      status = await roomManager.joinRoom(roomId, {
        userId,
        sessionPath: sessionPath ?? '/unknown',
        password: input.password,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // 密码错误统一提示，不透露房间是否存在（设计文档 §9.2 防枚举）
      return { error: msg === '密码错误' ? '密码错误' : '无法加入房间，请检查房间码是否正确' };
    }

    if (status === 'joined') {
      await transport.connect(roomId);
      // 开始接收房间广播：桥接本参与者视角（Phase 1：参与者订阅自己的 session 事件，向房间广播）
      if (sessionPath) {
        messageBus.bridgeSession(roomId, sessionPath);
      }
      const room = roomManager.getRoom(roomId);
      maybeEnsureAgents(roomId, ctx);
      return {
        status: 'joined',
        roomId,
        permissionLevel: room?.permissionLevel,
        hint: '已加入房间，实时共享已开启。',
      };
    }

    // pending：等待房主批准
    return {
      status: 'pending',
      roomId,
      hint: '加入请求已发送，等待房主批准（60 秒内有效）。',
    };
  },
});
