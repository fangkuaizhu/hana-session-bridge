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
import type { Transport } from './transport.ts';

export interface SharedState {
  roomManager: RoomManager;
  transport: Transport;
  messageBus: MessageBus;
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
  const state: SharedState = { roomManager, transport, messageBus };
  instances.set(key, state);
  return state;
}

/** 插件卸载时清理（index.ts onunload 调用） */
export function disposeAll(): void {
  for (const state of instances.values()) {
    state.messageBus.dispose();
    state.roomManager.dispose();
  }
  instances.clear();
}
