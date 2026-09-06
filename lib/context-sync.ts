// lib/context-sync.ts
// 多 Agent 上下文同步（Phase 3 P5）：协作级别（collaborate / full_control）房间，
// 为每个参与者创建插件私有的隐藏 Agent，并把房间最近消息合并为共享上下文，
// 通过 sendSessionMessage 的 context.beforeUser 注入目标 Agent 的 session。
//
// 设计依据：DESIGN.md §1.1（协作=各自独立 Agent）、§2.2（createAgent 已确认）、
// Phase 3 任务书 P5。
//
// 触发点：
//   ensureAgents — join-room 工具在房间权限级别 >= collaborate 时调用（本批接入）
//   injectSharedContext — P6 集成（消息聚合/接力提示等时机）调用
//
// 可测性：createAgent / sendSessionMessage 走依赖注入（默认 vendor 真实现），
// smoke test 注入 fake 验证流程，无需真实 Hana 运行时。
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import {
  createAgent as hanaCreateAgent,
  sendSessionMessage as hanaSendSessionMessage,
} from '../vendor/plugin-runtime.js';
import type { RoomManager } from './room-manager.ts';
import type { MessageBus } from './message-bus.ts';
import type { Message } from './transport.ts';

const PERMISSION_RANK: Record<string, number> = {
  readonly: 0,
  suggest: 1,
  collaborate: 2,
  full_control: 3,
};

/** 注入共享上下文时携带的最近消息条数（与 DESIGN.md §5.3 观众补历史同量级） */
const RECENT_MESSAGE_COUNT = 20;
/** 共享上下文最大字符数（超出按消息截断，防 context 膨胀） */
const MAX_CONTEXT_CHARS = 8000;

/** 独立消息摘要最大长度 */
const SUMMARY_MAX = 300;

export interface ContextSyncOptions {
  /** 依赖注入：创建 Agent（默认 vendor createAgent） */
  createAgent?: typeof hanaCreateAgent;
  /** 依赖注入：发送会话消息（默认 vendor sendSessionMessage） */
  sendSessionMessage?: typeof hanaSendSessionMessage;
}

export interface AgentSyncRecord {
  userId: string;
  agentId: string;
  created: boolean; // true=本次新建；false=复用已有
}

export interface EnsureAgentsResult {
  roomId: string;
  agents: AgentSyncRecord[];
  /** 房间权限低于 collaborate 等未执行原因 */
  notice?: string;
}

export interface InjectResult {
  ok: boolean;
  messageCount: number;
  contextChars: number;
  targetSessionPath: string;
  error?: string;
  raw?: unknown;
}

export class ContextSync {
  private ctx: HanaPluginContext;
  private roomManager: RoomManager;
  private messageBus: MessageBus;
  private createAgentFn: typeof hanaCreateAgent;
  private sendMessageFn: typeof hanaSendSessionMessage;

  constructor(ctx: HanaPluginContext, roomManager: RoomManager, messageBus: MessageBus, opts: ContextSyncOptions = {}) {
    this.ctx = ctx;
    this.roomManager = roomManager;
    this.messageBus = messageBus;
    this.createAgentFn = opts.createAgent ?? hanaCreateAgent;
    this.sendMessageFn = opts.sendSessionMessage ?? hanaSendSessionMessage;
  }

  /**
   * 为房间内所有参与者创建隐藏 Agent（幂等：已有 agentId 的参与者跳过）。
   * 仅在房间权限级别 >= collaborate 时执行；低级别房间返回 notice，不抛错。
   * 单个参与者创建失败只跳过该参与者（记录日志），不影响其他参与者。
   */
  async ensureAgents(roomId: string): Promise<EnsureAgentsResult> {
    const room = this.roomManager.getRoom(roomId);
    if (!room) throw new Error('房间不存在');
    if ((PERMISSION_RANK[room.permissionLevel] ?? 0) < PERMISSION_RANK.collaborate) {
      return { roomId, agents: [], notice: '房间权限级别低于 collaborate，无需创建 Agent' };
    }
    if (room.status !== 'active') {
      return { roomId, agents: [], notice: '房间未处于活跃状态，跳过 Agent 创建' };
    }

    const agents: AgentSyncRecord[] = [];
    for (const participant of room.participants) {
      if (participant.agentId) {
        agents.push({ userId: participant.userId, agentId: participant.agentId, created: false });
        continue;
      }
      const agentId = await this.createRoomAgent(roomId, participant.userId);
      if (!agentId) continue; // 失败已记日志，跳过
      await this.roomManager.setParticipantAgent(roomId, participant.userId, agentId);
      agents.push({ userId: participant.userId, agentId, created: true });
    }
    return { roomId, agents };
  }

  /**
   * 把房间最近消息合并为共享上下文，注入目标 session（context.beforeUser）。
   * 返回注入的消息数与上下文长度；vendor 层失败时 error 带原因。
   */
  async injectSharedContext(roomId: string, targetSessionPath: string): Promise<InjectResult> {
    const room = this.roomManager.getRoom(roomId);
    if (!room) return { ok: false, messageCount: 0, contextChars: 0, targetSessionPath, error: '房间不存在' };
    if (!targetSessionPath) return { ok: false, messageCount: 0, contextChars: 0, targetSessionPath, error: '目标 sessionPath 不能为空' };

    const all = this.messageBus.messageStore.getAll(roomId);
    const recent = all.slice(-RECENT_MESSAGE_COUNT);
    const contextText = formatSharedContext(roomId, recent);

    try {
      const raw = await this.sendMessageFn(
        this.ctx,
        { sessionPath: targetSessionPath },
        {
          text: '（系统：房间共享上下文已同步，仅供后续对话参考，无需额外回复）',
          context: { beforeUser: contextText },
        }
      );
      return { ok: true, messageCount: recent.length, contextChars: contextText.length, targetSessionPath, raw };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      this.ctx.log?.error?.('session-bridge: 共享上下文注入失败', { roomId, targetSessionPath, error: msg });
      return { ok: false, messageCount: recent.length, contextChars: 0, targetSessionPath, error: msg };
    }
  }

  // ------------------------------------------------------------------
  // 内部
  // ------------------------------------------------------------------

  private async createRoomAgent(roomId: string, userId: string): Promise<string | null> {
    // name 含房间维度：同一用户在不同房间有各自独立的隐藏 Agent（房间上下文隔离）
    const name = `SessionBridge-${roomId}-${userId}`;
    try {
      const result = await this.createAgentFn(this.ctx, {
        name,
        visibility: 'plugin_private',
        ownerPluginId: this.ctx.pluginId,
      });
      const agentId = extractAgentId(result);
      if (!agentId) {
        this.ctx.log?.warn?.('session-bridge: createAgent 未返回可识别 agentId', { roomId, userId, result });
        return null;
      }
      return agentId;
    } catch (e) {
      this.ctx.log?.error?.('session-bridge: 创建隐藏 Agent 失败', { roomId, userId, error: e instanceof Error ? e.message : String(e) });
      return null;
    }
  }
}

/** 把消息列表格式化为一段共享上下文（seq 升序，时间轴叙事） */
export function formatSharedContext(roomId: string, messages: Message[]): string {
  const lines: string[] = [`【房间 ${roomId} 最近共享上下文】`];
  let total = lines[0].length;
  for (const m of messages) {
    const summary = summarizeMessage(m);
    const line = `[#${m.seq} ${new Date(m.timestamp).toISOString()} ${m.from} / ${m.type}] ${summary}`;
    if (total + line.length > MAX_CONTEXT_CHARS) break; // 超出上限截断
    lines.push(line);
    total += line.length;
  }
  return lines.join('\n');
}

function summarizeMessage(msg: Message): string {
  const p = (msg.payload ?? {}) as Record<string, unknown> | null;
  if (!p) return '';
  switch (msg.type) {
    case 'tool_call': {
      const args = p.args !== undefined && p.args !== null ? safeStringify(p.args) : '';
      return `工具调用 ${String(p.toolName ?? '')}${args ? ` 参数=${truncate(args, SUMMARY_MAX)}` : ''}`;
    }
    case 'tool_result':
      return `工具结果 ${truncate(String(p.output ?? p.text ?? ''), SUMMARY_MAX)}`;
    case 'suggestion':
      return `建议：${truncate(String(p.text ?? ''), SUMMARY_MAX)}`;
    case 'participant_join':
      return `${String(p.userId ?? '')} 加入房间`;
    case 'participant_leave':
      return `${String(p.userId ?? '')} 离开房间`;
    case 'user_message':
      return truncate(String(p.text ?? ''), SUMMARY_MAX);
    case 'agent_reply':
      return truncate(String(p.text ?? ''), SUMMARY_MAX);
    default:
      return truncate(String(p.text ?? p.content ?? ''), SUMMARY_MAX);
  }
}

function extractAgentId(result: unknown): string | null {
  if (!result) return null;
  if (typeof result === 'string') return result || null;
  if (typeof result !== 'object') return null;
  const o = result as Record<string, unknown>;
  for (const k of ['agentId', 'id']) {
    const v = o[k];
    if (typeof v === 'string' && v) return v;
  }
  const nested = o.agent ?? o.agentInfo ?? o.data;
  if (nested && typeof nested === 'object') {
    const n = nested as Record<string, unknown>;
    for (const k of ['agentId', 'id']) {
      const v = n[k];
      if (typeof v === 'string' && v) return v;
    }
  }
  return null;
}

function safeStringify(v: unknown): string {
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max)}…` : s;
}
