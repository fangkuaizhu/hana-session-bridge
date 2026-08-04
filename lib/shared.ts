// lib/shared.ts
// 模块级共享状态：RoomManager / EventBusTransport / MessageBus 的惰性单例。
// 工具（tools/*.ts）是静态文件，每次调用都是独立 execute；房间、桥接订阅、
// 广播监听必须跨调用存活，因此用模块级单例持有（按 dataDir 区分实例，避免
// 多用户/多插件副本互相污染）。
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import { EventBusTransport } from './eventbus-transport.ts';
import { RoomManager } from './room-manager.ts';
import { MessageBus } from './message-bus.ts';

export interface SharedState {
  roomManager: RoomManager;
  transport: EventBusTransport;
  messageBus: MessageBus;
}

/** dataDir -> SharedState（同一 dataDir 视为同一插件实例） */
const instances = new Map<string, SharedState>();

export function getSharedState(ctx: HanaPluginContext): SharedState {
  const key = ctx.dataDir ?? `${ctx.pluginId ?? 'session-bridge'}:default`;
  const existing = instances.get(key);
  if (existing) return existing;

  const roomManager = new RoomManager(ctx);
  const transport = new EventBusTransport(ctx);
  const messageBus = new MessageBus(transport, roomManager, ctx);
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
