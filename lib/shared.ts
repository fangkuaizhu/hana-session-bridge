// lib/shared.ts
// 模块级共享状态：RoomManager / Transport / MessageBus 的惰性单例。
// 工具（tools/*.ts）是静态文件，每次调用都是独立 execute；房间、桥接订阅、
// 广播监听必须跨调用存活，因此用模块级单例持有（按 dataDir 区分实例，避免
// 多用户/多插件副本互相污染）。
//
// Phase 2：Transport 按配置二选一。
//   - 配置了 relayServerUrl → WebSocketTransport（跨机，经 Relay）
//   - 未配置 → EventBusTransport（Phase 1 同机行为，向后兼容）
// WebSocketTransport 的跨机广播通过 setGlobalMessageHandler 路由到
// messageBus.handleMessage（Phase 1 的 handleMessage 只被 index.ts 点对点通道调用）。
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import { EventBusTransport } from './eventbus-transport.ts';
import { WebSocketTransport } from './websocket-transport.ts';
import { RoomManager } from './room-manager.ts';
import { MessageBus } from './message-bus.ts';
import { AuditLog } from './audit-log.ts';
import { ToolProxy } from './tool-proxy.ts';
import { ContextSync } from './context-sync.ts';
import { createToolExecutor } from './tool-executor.ts';
import type { Transport } from './transport.ts';

export interface SharedState {
  roomManager: RoomManager;
  transport: Transport;
  messageBus: MessageBus;
  /** 工具代理审计日志（Phase 3 P3） */
  auditLog: AuditLog;
  /** 工具代理裁决引擎（Phase 3 P1/P4） */
  toolProxy: ToolProxy;
  /** 多 Agent 上下文同步（Phase 3 P5） */
  contextSync: ContextSync;
}

/** dataDir -> SharedState（同一 dataDir 视为同一插件实例） */
const instances = new Map<string, SharedState>();

export function getSharedState(ctx: HanaPluginContext): SharedState {
  const key = ctx.dataDir ?? `${ctx.pluginId ?? 'session-bridge'}:default`;
  const existing = instances.get(key);
  if (existing) return existing;

  const roomManager = new RoomManager(ctx);

  const relayUrl = typeof ctx.config?.get === 'function'
    ? String(ctx.config.get('relayServerUrl') ?? '').trim()
    : '';
  const userId = typeof ctx.userId === 'string' ? ctx.userId : 'unknown';

  let transport: Transport;
  if (relayUrl) {
    transport = new WebSocketTransport(relayUrl, userId, ctx, roomManager);
  } else {
    transport = new EventBusTransport(ctx);
  }

  const messageBus = new MessageBus(transport, roomManager, ctx);
  // 跨机广播路由：Relay 消息 → messageBus.handleMessage（去重/store/UI 刷新）
  if (transport instanceof WebSocketTransport) {
    transport.setGlobalMessageHandler((roomId, msg) => messageBus.handleMessage(roomId, msg));
  }

  // Phase 3：工具代理（P1 引擎 + P3 审计）+ 上下文同步（P5）。
  // 装配时把已持久化的房间权限表灌入 ToolProxy 内存裁决缓存（P4 持久化闭环）。
  const auditLog = new AuditLog(ctx.dataDir);
  const toolProxy = new ToolProxy(roomManager, messageBus, auditLog, {
    executor: createToolExecutor(ctx),
  });
  for (const room of roomManager.listActiveRooms()) {
    const perms = roomManager.getToolPermissions(room.roomId);
    if (perms.length > 0) toolProxy.configurePermissions(room.roomId, perms);
  }
  const contextSync = new ContextSync(ctx, roomManager, messageBus);

  const state: SharedState = { roomManager, transport, messageBus, auditLog, toolProxy, contextSync };
  instances.set(key, state);
  return state;
}

/** 插件卸载时清理（index.ts onunload 调用） */
export function disposeAll(): void {
  for (const state of instances.values()) {
    state.toolProxy.dispose();
    state.messageBus.dispose();
    state.roomManager.dispose();
  }
  instances.clear();
}
