// routes/room-api.ts
// WebView 后端 API：房间列表/详情/创建/加入/批准/拒绝/建议/消息拉取。
// 挂载于 /api/plugins/session-bridge/...（Hana 自动前缀）。
// 消费方：ui/RoomPanel.tsx 通过 hana.api.fetch() 调用。
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import { getSharedState } from '../lib/shared.ts';
import type { PermissionLevel } from '../lib/room-manager.ts';

interface HonoLikeContext {
  req: {
    json(): Promise<unknown>;
    query(name: string): string | undefined;
    param(name: string): string | undefined;
  };
  json(data: unknown, status?: number): unknown;
}

export default function registerRoomApiRoutes(app: { get: (p: string, h: (c: HonoLikeContext) => unknown) => void; post: (p: string, h: (c: HonoLikeContext) => unknown) => void }, pluginCtx: HanaPluginContext) {
  const getState = () => getSharedState(pluginCtx);

  // GET /api/rooms — 所有活跃房间
  app.get('/rooms', async (c: HonoLikeContext) => {
    const { roomManager } = getState();
    const rooms = roomManager.listActiveRooms().map((r) => ({
      roomId: r.roomId,
      readableName: r.readableName,
      permissionLevel: r.permissionLevel,
      participantCount: r.participants.length,
      hostId: r.hostId,
      createdAt: r.createdAt,
      lastActivityAt: r.lastActivityAt,
    }));
    return c.json({ rooms });
  });

  // GET /api/rooms/:roomId — 房间详情（含参与者 + 待批准请求）
  app.get('/rooms/:roomId', async (c: HonoLikeContext) => {
    const { roomManager } = getState();
    const roomId = (c.req.param('roomId') ?? '').toUpperCase();
    const room = roomManager.getRoom(roomId);
    if (!room) return c.json({ error: '房间不存在或已关闭' }, 404);
    return c.json({
      room: {
        roomId: room.roomId,
        readableName: room.readableName,
        permissionLevel: room.permissionLevel,
        hostId: room.hostId,
        status: room.status,
        createdAt: room.createdAt,
        lastActivityAt: room.lastActivityAt,
        seqCounter: room.seqCounter,
        participants: room.participants.map((p) => ({
          userId: p.userId,
          joinedAt: p.joinedAt,
          isHost: p.userId === room.hostId,
        })),
        pendingJoinRequests: room.pendingJoinRequests.map((r) => ({
          userId: r.userId,
          requestedAt: r.requestedAt,
          timeoutSeconds: r.timeoutSeconds,
        })),
      },
    });
  });

  // GET /api/rooms/:roomId/messages?since=N — 增量拉取消息（任务书 M5 FAQ 轮询方案）
  app.get('/rooms/:roomId/messages', async (c: HonoLikeContext) => {
    const { messageBus } = getState();
    const roomId = (c.req.param('roomId') ?? '').toUpperCase();
    const since = Number(c.req.query('since') ?? '0') || 0;
    const { messages, hasMore } = messageBus.messageStore.getSince(roomId, since);
    return c.json({ roomId, messages, hasMore });
  });

  // POST /api/rooms — 创建房间
  app.post('/rooms', async (c: HonoLikeContext) => {
    const { roomManager, messageBus, transport } = getState();
    const body = (await c.req.json()) as {
      permissionLevel?: PermissionLevel;
      password?: string;
      readableName?: string;
    };
    const userId = pluginCtx.userId ?? 'unknown';
    const sessionPath = pluginCtx.sessionPath ?? pluginCtx.sessionRef?.sessionPath ?? null;
    if (!sessionPath) return c.json({ error: '无法确定当前会话路径' }, 400);

    const roomId = await roomManager.createRoom({
      hostId: userId,
      hostSessionPath: sessionPath,
      permissionLevel: body.permissionLevel ?? 'suggest',
      password: body.password,
      readableName: body.readableName,
    });
    messageBus.bridgeSession(roomId, sessionPath);
    await transport.connect(roomId);
    return c.json({
      roomId,
      permissionLevel: body.permissionLevel ?? 'suggest',
      hasPassword: Boolean(body.password),
      joinCode: `session-bridge join ${roomId}`,
    });
  });

  // POST /api/rooms/:roomId/join — 加入房间
  app.post('/rooms/:roomId/join', async (c: HonoLikeContext) => {
    const { roomManager, messageBus, transport } = getState();
    const roomId = (c.req.param('roomId') ?? '').toUpperCase();
    const body = (await c.req.json()) as { password?: string };
    const userId = pluginCtx.userId ?? 'unknown';
    const sessionPath = pluginCtx.sessionPath ?? pluginCtx.sessionRef?.sessionPath ?? null;

    let status: 'joined' | 'pending';
    try {
      status = await roomManager.joinRoom(roomId, {
        userId,
        sessionPath: sessionPath ?? '/unknown',
        password: body.password,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return c.json({ error: msg === '密码错误' ? '密码错误' : '无法加入房间，请检查房间码' }, 400);
    }

    if (status === 'joined') {
      await transport.connect(roomId);
      if (sessionPath) messageBus.bridgeSession(roomId, sessionPath);
      const room = roomManager.getRoom(roomId);
      return c.json({ status: 'joined', roomId, permissionLevel: room?.permissionLevel });
    }
    return c.json({ status: 'pending', roomId });
  });

  // POST /api/rooms/:roomId/leave — 离开房间
  app.post('/rooms/:roomId/leave', async (c: HonoLikeContext) => {
    const { roomManager, messageBus, transport } = getState();
    const roomId = (c.req.param('roomId') ?? '').toUpperCase();
    const userId = pluginCtx.userId ?? 'unknown';
    const room = roomManager.getRoom(roomId);
    if (!room) return c.json({ status: 'room_closed' });

    const wasHost = room.hostId === userId;
    const others = room.participants.filter((p) => p.userId !== userId);
    if (wasHost && others.length > 0) {
      const newHost = [...others].sort((a, b) => a.joinedAt - b.joinedAt)[0];
      roomManager.transferHost(roomId, newHost.userId);
    }
    await roomManager.leaveRoom(roomId, userId);
    await transport.disconnect(roomId).catch(() => {});
    messageBus.unbridge(roomId);

    const after = roomManager.getRoom(roomId);
    const closed = !after || after.status === 'closed' || after.participants.length === 0;
    return c.json({ status: closed ? 'room_closed' : 'left' });
  });

  // POST /api/rooms/:roomId/approve — 批准加入请求
  app.post('/rooms/:roomId/approve', async (c: HonoLikeContext) => {
    const { roomManager } = getState();
    const roomId = (c.req.param('roomId') ?? '').toUpperCase();
    const body = (await c.req.json()) as { userId: string };
    const ok = await roomManager.approveJoin(roomId, body.userId);
    return c.json({ ok });
  });

  // POST /api/rooms/:roomId/reject — 拒绝加入请求
  app.post('/rooms/:roomId/reject', async (c: HonoLikeContext) => {
    const { roomManager } = getState();
    const roomId = (c.req.param('roomId') ?? '').toUpperCase();
    const body = (await c.req.json()) as { userId: string };
    await roomManager.rejectJoin(roomId, body.userId);
    return c.json({ ok: true });
  });

  // POST /api/rooms/:roomId/suggest — 发送建议消息
  app.post('/rooms/:roomId/suggest', async (c: HonoLikeContext) => {
    const { messageBus } = getState();
    const roomId = (c.req.param('roomId') ?? '').toUpperCase();
    const body = (await c.req.json()) as { text: string };
    const userId = pluginCtx.userId ?? 'unknown';
    if (!body.text || !body.text.trim()) return c.json({ error: '建议内容不能为空' }, 400);
    try {
      await messageBus.injectSuggestion(roomId, userId, body.text.trim());
      return c.json({ ok: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return c.json({ error: msg }, 400);
    }
  });
}
