// lib/eventbus-transport.ts
// EventBusTransport：Phase 1 同机传输实现。
// 消息经 Hana 进程内 EventBus 广播（bus.emit / bus.subscribe），无网络层。
//
// 通道设计（Phase 1 任务书 M1）：
// - send:        bus.emit("session-bridge:broadcast:{roomId}", message)
// - 广播接收:     bus.subscribe(callback) 全量订阅 + 手动匹配 type
// - 点对点预留:   bus.handle("session-bridge:room:{roomId}", handler)
//                （供 request/response 同步使用，如补历史、确认）
//
// 实测（probe-bus 结论）：Hana 的 bus.emit(type, payload) 广播后，subscribe(type, handler)
// 与 { types } 过滤器对自定义 emit 事件均不生效；全量 subscribe(callback) 收到
// (event=type字符串, payload)。故必须全量订阅 + 手动匹配 type。
//
// 回声过滤：同机 EventBus 是进程内全局广播，自己 emit 的消息自己也会收到。
// Transport 以 selfId（默认 ctx.userId）识别自身，分发时丢弃 msg.from === selfId 的消息，
// 避免把"自己发的广播"当成远端消息回灌给上层。
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import type { ConnectionStatus, Message, Transport } from './transport.ts';

const BROADCAST_PREFIX = 'session-bridge:broadcast:';
const ROOM_HANDLE_PREFIX = 'session-bridge:room:';

interface TransportOptions {
  /** 本实例身份标识，用于回声过滤；默认取 ctx.userId */
  selfId?: string;
  /** 调试用：允许收到自己发出的消息（默认 false） */
  allowSelfEcho?: boolean;
}

export class EventBusTransport implements Transport {
  private ctx: HanaPluginContext;
  private selfId: string;
  private allowSelfEcho: boolean;

  /** roomId -> 该房间的消息监听器集合 */
  private messageListeners = new Map<string, Set<(msg: Message) => void>>();
  /** roomId -> 该房间的连接状态监听器集合 */
  private statusListeners = new Map<string, Set<(status: ConnectionStatus) => void>>();
  /** roomId -> 广播订阅注销函数 */
  private broadcastOffs = new Map<string, () => void>();
  /** roomId -> 点对点 handle 注销函数 */
  private handleOffs = new Map<string, () => void>();
  /** 已 connect 的房间集合 */
  private connectedRooms = new Set<string>();

  constructor(ctx: HanaPluginContext, options?: TransportOptions) {
    this.ctx = ctx;
    this.selfId = options?.selfId ?? (typeof ctx.userId === 'string' ? ctx.userId : 'unknown');
    this.allowSelfEcho = options?.allowSelfEcho ?? false;
  }

  async connect(roomId: string): Promise<void> {
    if (this.connectedRooms.has(roomId)) return;

    // 1. 广播接收通道（全量订阅 + 手动匹配 type）
    const broadcastType = `${BROADCAST_PREFIX}${roomId}`;
    const broadcastOff = this.ctx.bus.subscribe((event: unknown, payload: unknown) => {
      if (event !== broadcastType) return;
      this.routeMessage(roomId, payload);
    });
    this.broadcastOffs.set(roomId, broadcastOff);

    // 2. 点对点通道（request/response 预留）：收到请求时按消息分发并回执
    if (typeof this.ctx.bus.handle === 'function') {
      const handleType = `${ROOM_HANDLE_PREFIX}${roomId}`;
      const handleOff = this.ctx.bus.handle(handleType, (payload: unknown) => {
        this.routeMessage(roomId, payload);
        return { ok: true };
      });
      this.handleOffs.set(roomId, handleOff);
    }

    this.connectedRooms.add(roomId);
    this.notifyStatus(roomId, 'connected');
  }

  async disconnect(roomId: string): Promise<void> {
    if (!this.connectedRooms.has(roomId)) return;

    const broadcastOff = this.broadcastOffs.get(roomId);
    if (broadcastOff) {
      try { broadcastOff(); } catch { /* ignore */ }
    }
    this.broadcastOffs.delete(roomId);

    const handleOff = this.handleOffs.get(roomId);
    if (handleOff) {
      try { handleOff(); } catch { /* ignore */ }
    }
    this.handleOffs.delete(roomId);

    this.connectedRooms.delete(roomId);
    this.messageListeners.delete(roomId);
    this.statusListeners.delete(roomId);
    this.notifyStatus(roomId, 'disconnected');
  }

  async send(roomId: string, message: Message): Promise<void> {
    const type = `${BROADCAST_PREFIX}${roomId}`;
    this.ctx.bus.emit(type, message);
  }

  onMessage(roomId: string, handler: (msg: Message) => void): () => void {
    let set = this.messageListeners.get(roomId);
    if (!set) {
      set = new Set();
      this.messageListeners.set(roomId, set);
    }
    set.add(handler);
    return () => {
      set.delete(handler);
      if (set.size === 0) this.messageListeners.delete(roomId);
    };
  }

  onConnectionChange(roomId: string, handler: (status: ConnectionStatus) => void): () => void {
    let set = this.statusListeners.get(roomId);
    if (!set) {
      set = new Set();
      this.statusListeners.set(roomId, set);
    }
    set.add(handler);
    return () => {
      set.delete(handler);
      if (set.size === 0) this.statusListeners.delete(roomId);
    };
  }

  /** 当前已连接房间（供生命周期清理/诊断） */
  get connectedRoomIds(): string[] {
    return [...this.connectedRooms];
  }

  private routeMessage(roomId: string, payload: unknown): void {
    if (!payload || typeof payload !== 'object') return;
    const msg = payload as Message;
    if (typeof msg.roomId !== 'string' || msg.roomId !== roomId) return;
    if (msg.from === this.selfId && !this.allowSelfEcho) return;

    const listeners = this.messageListeners.get(roomId);
    if (!listeners || listeners.size === 0) return;
    for (const handler of listeners) {
      try { handler(msg); } catch (e) { this.ctx.log?.error?.('message handler error', e); }
    }
  }

  private notifyStatus(roomId: string, status: ConnectionStatus): void {
    const listeners = this.statusListeners.get(roomId);
    if (!listeners || listeners.size === 0) return;
    for (const handler of listeners) {
      try { handler(status); } catch (e) { this.ctx.log?.error?.('status handler error', e); }
    }
  }
}
