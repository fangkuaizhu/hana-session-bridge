// lib/websocket-transport.ts
// WebSocketTransport：Phase 2 跨机传输实现。
// 通过 wss 连接 Relay Server（relay-server/server.js），实现 Transport 接口。
//
// 与 EventBusTransport 的差异：
//   - 有真实网络状态（connecting/connected/disconnected），驱动 UI 连接指示器
//   - 带心跳（30s ping / 10s 无 pong 判死）+ 指数退避重连（1s→30s 封顶，无限重试）
//   - 跨机去重按"发送方 + seq"（两端各自分配 seq，房间级 seq 会冲突，不能按房间去重）
//   - 回声过滤：from === selfId 丢弃（Relay 已排除发送者，但网络抖动重连时可能重收）
//
// 握手：房主（本地有房间且是 host）发 register（带 bcrypt passwordHash）；
//       观众（本地无房间）发 auth（带明文密码，由 join 侧传入）。由 RoomManager 状态判定。
//
// 重连后：重新握手 → 发 sync_request 拉取房间状态（参与者列表）→ 通知 UI 恢复。
//
// ws 库 vendored 到 vendor/ws/（和 bcryptjs 同样方式），用 createRequire 加载。
import { createRequire } from 'node:module';
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import type { ConnectionStatus, Message, Transport } from './transport.ts';
import type { RoomManager } from './room-manager.ts';

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require('../vendor/ws/index.js') as typeof import('ws');

const HEARTBEAT_INTERVAL_MS = 30_000;
const HEARTBEAT_TIMEOUT_MS = 10_000;
const RECONNECT_BASE_MS = 1_000;
const RECONNECT_MAX_MS = 30_000;
const AUTH_TIMEOUT_MS = 10_000;

export interface WebSocketTransportOptions {
  /** 本实例身份标识，用于回声过滤；默认取 ctx.userId */
  selfId?: string;
}

/** Relay 协议消息（与 relay-server/server.js 对应） */
interface RelayClientMessage {
  type: 'register' | 'auth' | 'room_message' | 'sync_request';
  roomId: string;
  userId?: string;
  passwordHash?: string;
  password?: string;
  message?: Message;
  lastSeq?: number;
}

interface RelayServerMessage {
  type: 'auth_ok' | 'auth_fail' | 'room_message' | 'sync_response' | 'participant_join' | 'participant_leave' | 'error';
  roomId?: string;
  reason?: string;
  message?: Message;
  currentState?: { roomId: string; participants: Array<{ userId: string }>; createdAt: number };
  userId?: string;
}

export class WebSocketTransport implements Transport {
  private relayUrl: string;
  private selfId: string;
  private ctx: HanaPluginContext;
  private roomManager: RoomManager;

  /** roomId -> WebSocket 连接 */
  private sockets = new Map<string, WebSocket>();
  /** roomId -> 该房间消息监听器集合 */
  private messageListeners = new Map<string, Set<(msg: Message) => void>>();
  /** roomId -> 该房间连接状态监听器集合 */
  private statusListeners = new Map<string, Set<(status: ConnectionStatus) => void>>();
  /** roomId -> 指数退避重连定时器 */
  private reconnectTimers = new Map<string, ReturnType<typeof setTimeout>>();
  /** roomId -> 心跳定时器 */
  private heartbeatTimers = new Map<string, ReturnType<typeof setInterval>>();
  /** roomId -> 已连接状态标记（区别于 UI 的 disconnected：主动 disconnect 不再重连） */
  private activeRooms = new Set<string>();
  /** roomId -> 当前重连尝试次数（决定退避时长） */
  private reconnectAttempts = new Map<string, number>();
  /** roomId -> 发送方 -> 已收到的最高 seq（跨机按发送方去重） */
  private lastSeqBySender = new Map<string, Map<string, number>>();
  /** roomId -> 待 auth 响应（connect 期间） */
  private pendingAuth = new Map<string, { resolve: () => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> }>();
  /** roomId -> auth 凭据（重连时复用） */
  private authCredentials = new Map<string, { password?: string }>();
  /** 跨机广播全局路由：shared.ts 注册到 messageBus.handleMessage */
  private globalHandler: ((roomId: string, msg: Message) => void) | null = null;

  constructor(relayUrl: string, userId: string, ctx: HanaPluginContext, roomManager: RoomManager) {
    this.relayUrl = relayUrl;
    this.selfId = userId;
    this.ctx = ctx;
    this.roomManager = roomManager;
  }

  /** 注册全局消息路由（跨机广播 → messageBus.handleMessage）。返回取消函数。 */
  setGlobalMessageHandler(handler: (roomId: string, msg: Message) => void): () => void {
    this.globalHandler = handler;
    return () => { if (this.globalHandler === handler) this.globalHandler = null; };
  }

  async connect(roomId: string, opts?: { password?: string }): Promise<void> {
    if (this.activeRooms.has(roomId) && this.sockets.has(roomId)) return;

    this.activeRooms.add(roomId);
    this.reconnectAttempts.delete(roomId);
    this.authCredentials.set(roomId, { password: opts?.password });
    await this.establish(roomId);
  }

  async disconnect(roomId: string): Promise<void> {
    this.activeRooms.delete(roomId);

    const rt = this.reconnectTimers.get(roomId);
    if (rt) { clearTimeout(rt); this.reconnectTimers.delete(roomId); }
    const hb = this.heartbeatTimers.get(roomId);
    if (hb) { clearInterval(hb); this.heartbeatTimers.delete(roomId); }

    const ws = this.sockets.get(roomId);
    if (ws) {
      this.sockets.delete(roomId);
      try { ws.removeAllListeners(); ws.close(); } catch { /* ignore */ }
    }

    const pending = this.pendingAuth.get(roomId);
    if (pending) {
      clearTimeout(pending.timer);
      this.pendingAuth.delete(roomId);
      pending.reject(new Error('连接已取消'));
    }

    this.messageListeners.delete(roomId);
    this.statusListeners.delete(roomId);
    this.lastSeqBySender.delete(roomId);
    this.authCredentials.delete(roomId);
    this.notifyStatus(roomId, 'disconnected');
  }

  async send(roomId: string, message: Message): Promise<void> {
    const ws = this.sockets.get(roomId);
    if (!ws || ws.readyState !== 1 /* OPEN */) {
      // 连接未就绪：消息仍写入本地 store（发送方轮询可见），传输层丢弃并提示
      this.ctx.log?.warn?.('session-bridge: 房间连接未就绪，消息未发送到远端', { roomId, seq: message.seq, type: message.type });
      return;
    }
    const out: RelayClientMessage = { type: 'room_message', roomId, message };
    ws.send(JSON.stringify(out));
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

  /** 当前活跃房间（供生命周期清理/诊断） */
  get connectedRoomIds(): string[] {
    return [...this.activeRooms];
  }

  /** 当前连接状态（供 UI/工具诊断） */
  getStatus(roomId: string): ConnectionStatus {
    const ws = this.sockets.get(roomId);
    if (ws && ws.readyState === 1) return 'connected';
    if (this.activeRooms.has(roomId)) return 'connecting';
    return 'disconnected';
  }

  // ------------------------------------------------------------------
  // 内部
  // ------------------------------------------------------------------

  /** 判定握手类型：房主（本地有房间且自己是 host）→ register；否则 → auth */
  private isHostOf(roomId: string): boolean {
    const room = this.roomManager.getRoom(roomId);
    return Boolean(room && room.hostId === this.selfId);
  }

  /** 建立连接：创建 ws → 握手 → 注册监听 → 心跳。任何一步失败走重连。 */
  private async establish(roomId: string): Promise<void> {
    if (!this.activeRooms.has(roomId)) return; // 期间被 disconnect

    const existing = this.sockets.get(roomId);
    if (existing) {
      try { existing.removeAllListeners(); existing.close(); } catch { /* ignore */ }
      this.sockets.delete(roomId);
    }

    this.notifyStatus(roomId, 'connecting');

    let ws: WebSocket;
    try {
      ws = new WebSocket(this.relayUrl);
    } catch (e) {
      this.ctx.log?.error?.('session-bridge: WebSocket 创建失败', e);
      return this.scheduleReconnect(roomId);
    }

    // 握手超时保护
    const authTimer = setTimeout(() => {
      const pending = this.pendingAuth.get(roomId);
      if (pending) {
        this.pendingAuth.delete(roomId);
        pending.reject(new Error('握手超时'));
      }
      try { ws.close(); } catch { /* ignore */ }
    }, AUTH_TIMEOUT_MS);

    const handshake = new Promise<void>((resolve, reject) => {
      this.pendingAuth.set(roomId, { resolve, reject, timer: authTimer });
    });

    ws.on('open', () => {
      const isHost = this.isHostOf(roomId);
      const room = this.roomManager.getRoom(roomId);
      const cred = this.authCredentials.get(roomId);
      const msg: RelayClientMessage = isHost
        ? { type: 'register', roomId, userId: this.selfId, passwordHash: room?.passwordHash ?? undefined }
        : { type: 'auth', roomId, userId: this.selfId, password: cred?.password };
      try { ws.send(JSON.stringify(msg)); } catch { /* ignore */ }
    });

    ws.on('message', (data: unknown) => {
      let msg: RelayServerMessage;
      try {
        msg = JSON.parse(String(data)) as RelayServerMessage;
      } catch {
        return this.ctx.log?.warn?.('session-bridge: 收到非法 Relay 消息');
      }

      switch (msg.type) {
        case 'auth_ok': {
          const pending = this.pendingAuth.get(roomId);
          if (pending) {
            clearTimeout(pending.timer);
            this.pendingAuth.delete(roomId);
            pending.resolve();
          }
          this.attach(roomId, ws);
          return;
        }
        case 'auth_fail': {
          const pending = this.pendingAuth.get(roomId);
          if (pending) {
            clearTimeout(pending.timer);
            this.pendingAuth.delete(roomId);
            pending.reject(new Error(`加入失败：${msg.reason ?? '未知原因'}`));
          }
          try { ws.close(); } catch { /* ignore */ }
          return;
        }
        case 'room_message': {
          if (msg.message) this.routeMessage(roomId, msg.message);
          return;
        }
        case 'participant_join':
        case 'participant_leave': {
          if (typeof msg.userId === 'string' && msg.userId !== this.selfId) {
            // 更新本地房间参与者（供 UI 轮询），抛轻量事件（不走 messageBus 的 seq 去重路径）
            this.roomManager.applyRemoteParticipant(roomId, msg.userId, msg.type === 'participant_join').catch(() => {});
            this.ctx.bus?.emit('session-bridge:participant:changed', {
              roomId,
              userId: msg.userId,
              change: msg.type === 'participant_join' ? 'join' : 'leave',
            });
          }
          return;
        }
        case 'sync_response': {
          // 更新本地远程房间的参与者信息（见 roomManager.applyRemoteState）
          if (msg.currentState) {
            this.roomManager.applyRemoteState(roomId, msg.currentState).catch(() => {});
          }
          return;
        }
        case 'error': {
          this.ctx.log?.warn?.('session-bridge: Relay 错误', { roomId, message: msg.message });
          return;
        }
      }
    });

    ws.on('close', () => {
      this.sockets.delete(roomId);
      this.stopHeartbeat(roomId);
      const pending = this.pendingAuth.get(roomId);
      if (pending) {
        clearTimeout(pending.timer);
        this.pendingAuth.delete(roomId);
        pending.reject(new Error('连接关闭'));
      }
      // 已 join 过（非首次握手失败）→ 走重连；主动 disconnect 除外
      if (this.activeRooms.has(roomId)) this.scheduleReconnect(roomId);    });

    ws.on('error', (err: Error) => {
      this.ctx.log?.warn?.('session-bridge: WebSocket 错误', { roomId, message: err?.message });
    });

    try {
      await handshake;
    } catch (e) {
      // 握手失败（房间不存在/密码错误/超时）：
      // 密码错误/房间不存在是硬错误，不重连；网络类错误走重连。
      const reason = e instanceof Error ? e.message : String(e);
      if (reason.includes('密码错误') || reason.includes('房间不存在') || reason.includes('房间人数已满')) {
        this.activeRooms.delete(roomId);
        this.notifyStatus(roomId, 'disconnected');
        throw e;
      }
      // 其余（连接关闭/超时等）→ 重连
      try { ws.close(); } catch { /* ignore */ }
      this.scheduleReconnect(roomId);
      throw e;
    }
  }

  /** 握手成功：注册 socket、启动心跳、通知 connected、拉取房间状态 */
  private attach(roomId: string, ws: WebSocket): void {
    this.sockets.set(roomId, ws);
    this.reconnectAttempts.delete(roomId);
    this.notifyStatus(roomId, 'connected');
    this.startHeartbeat(roomId);
    // 重连恢复：拉取房间当前状态（参与者列表）
    try {
      const out: RelayClientMessage = { type: 'sync_request', roomId, lastSeq: 0 };
      ws.send(JSON.stringify(out));
    } catch { /* ignore */ }
  }

  /** 路由收到的远端消息：回声过滤 + 按发送方去重 → 分发 */
  private routeMessage(roomId: string, msg: Message): void {
    if (!msg || typeof msg.roomId !== 'string' || msg.roomId !== roomId) return;
    if (msg.from === this.selfId) return; // 回声过滤
    if (typeof msg.seq !== 'number') return;

    // 按发送方去重（跨机两端各自分配 seq，房间级去重会误杀）
    let seqs = this.lastSeqBySender.get(roomId);
    if (!seqs) {
      seqs = new Map();
      this.lastSeqBySender.set(roomId, seqs);
    }
    const last = seqs.get(msg.from) ?? 0;
    if (msg.seq <= last) return;
    seqs.set(msg.from, msg.seq);

    this.globalHandler?.(roomId, msg);
    const listeners = this.messageListeners.get(roomId);
    if (!listeners || listeners.size === 0) return;
    for (const handler of listeners) {
      try { handler(msg); } catch (e) { this.ctx.log?.error?.('message handler error', e); }
    }
  }

  /** 心跳：30s ping，10s 无 pong 主动断开触发重连 */
  private startHeartbeat(roomId: string): void {
    this.stopHeartbeat(roomId);
    const ws = this.sockets.get(roomId);
    if (!ws) return;
    let lastPong = Date.now();
    ws.on('pong', () => { lastPong = Date.now(); });

    const timer = setInterval(() => {
      const current = this.sockets.get(roomId);
      if (!current || current !== ws || current.readyState !== 1) {
        this.stopHeartbeat(roomId);
        return;
      }
      if (Date.now() - lastPong > HEARTBEAT_TIMEOUT_MS) {
        this.ctx.log?.warn?.('session-bridge: 心跳超时，断开触发重连', { roomId });
        this.stopHeartbeat(roomId);
        try { current.terminate(); } catch { /* ignore */ }
        return;
      }
      try { ws.ping(); } catch { /* ignore */ }
    }, HEARTBEAT_INTERVAL_MS);
    this.heartbeatTimers.set(roomId, timer);
  }

  private stopHeartbeat(roomId: string): void {
    const timer = this.heartbeatTimers.get(roomId);
    if (timer) { clearInterval(timer); this.heartbeatTimers.delete(roomId); }
  }

  /** 指数退避重连：1s, 2s, 4s, 8s, 16s, 30s（封顶），无限重试 */
  private scheduleReconnect(roomId: string): void {
    if (!this.activeRooms.has(roomId)) return;
    const existing = this.reconnectTimers.get(roomId);
    if (existing) return; // 已有重连排队

    const attempt = this.reconnectAttempts.get(roomId) ?? 0;
    const delay = Math.min(RECONNECT_BASE_MS * 2 ** attempt, RECONNECT_MAX_MS);
    this.reconnectAttempts.set(roomId, attempt + 1);
    this.notifyStatus(roomId, 'connecting');

    const timer = setTimeout(() => {
      this.reconnectTimers.delete(roomId);
      this.establish(roomId).catch(() => { /* 重连失败由下一次 scheduleReconnect 处理 */ });
    }, delay);
    this.reconnectTimers.set(roomId, timer);
  }

  private notifyStatus(roomId: string, status: ConnectionStatus): void {
    const listeners = this.statusListeners.get(roomId);
    if (!listeners || listeners.size === 0) return;
    for (const handler of listeners) {
      try { handler(status); } catch (e) { this.ctx.log?.error?.('status handler error', e); }
    }
  }
}
