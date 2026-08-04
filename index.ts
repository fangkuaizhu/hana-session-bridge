// index.ts
// 插件生命周期入口：onload 注册 EventBus handler + 清理幽灵房间；onunload 通知清理。
// 任务书 M6 规格：
//   - register(ctx.bus.handle("session-bridge:room:*", ...)) 路由到 messageBus.handleMessage
//   - roomManager.cleanupGhostRooms() 清理幽灵房间
//   - onunload 通知所有房间参与者 + 关闭连接
import { definePlugin, HANA_BUS_SKIP } from './vendor/plugin-runtime.js';
import { getSharedState, disposeAll } from './lib/shared.ts';

export default definePlugin({
  async onload(ctx, { register }) {
    const { roomManager, transport, messageBus } = getSharedState(ctx);

    // 1. 注册 EventBus handler：接收点对点请求（如其他实例的补历史/确认请求）。
    //    通配匹配 "session-bridge:room:*"；仅处理属于本插件的 payload，其余返回 HANA_BUS_SKIP。
    if (typeof ctx.bus.handle === 'function') {
      const offHandle = ctx.bus.handle('session-bridge:room:*', (payload: unknown) => {
        const msg = payload as { roomId?: string } | null;
        if (!msg || typeof msg.roomId !== 'string') return HANA_BUS_SKIP;
        messageBus.handleMessage(msg.roomId, payload as never);
        return { ok: true };
      });
      register(() => {
        try { offHandle(); } catch { /* ignore */ }
      });
    }

    // 2. 清理幽灵房间：status=active 但创建者 session 已不存在的房间。
    //    通过 listSessions 校验 host 的 session 是否仍在（需要 session.read 能力）。
    const removed = roomManager.cleanupGhostRooms(async (room) => {
      try {
        const sessions = await ctx.bus.request('session:list', {}) as Array<{ path?: string; sessionPath?: string }>;
        const paths = Array.isArray(sessions) ? sessions.map((s) => s.path ?? s.sessionPath).filter(Boolean) : [];
        const host = room.participants.find((p) => p.userId === room.hostId);
        return Boolean(host && host.sessionPath && paths.includes(host.sessionPath));
      } catch {
        // 无法校验时保守保留房间
        return true;
      }
    });
    if (removed > 0) {
      ctx.log.info?.('session-bridge: 清理幽灵房间', { removed });
    }

    ctx.log.info?.('session-bridge: 插件已加载');
  },

  async onunload(ctx) {
    const { roomManager, transport, messageBus } = getSharedState(ctx);

    // 通知所有活跃房间参与者，并关闭连接
    for (const room of roomManager.listActiveRooms()) {
      for (const participant of room.participants) {
        if (participant.userId === room.hostId) continue; // 自己就是房主
        try {
          await transport.send(room.roomId, {
            roomId: room.roomId,
            from: room.hostId,
            seq: roomManager.nextSeq(room.roomId),
            type: 'participant_leave',
            payload: { userId: room.hostId, reason: 'plugin_unload' },
            timestamp: Date.now(),
          });
        } catch { /* ignore */ }
      }
      messageBus.unbridge(room.roomId);
      await transport.disconnect(room.roomId).catch(() => {});
    }

    disposeAll();
    ctx.log.info?.('session-bridge: 插件已卸载');
  },
});
