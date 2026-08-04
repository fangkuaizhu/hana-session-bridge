// tools/test-tools.ts
// M4 smoke test：四个 Agent 工具（create/join/leave/room-status）全流程验证。
//   1. 校验四个工具的注册元数据（name/description/parameters/execute）
//   2. create-room 流程：createRoom + bridgeSession + transport.connect
//   3. join-room 流程：无密码 → pending → approveJoin → joined
//   4. room-status 流程：列表视图 + 详情视图
//   5. leave-room 流程：房主移交 + 最后一人离开关闭房间
// 通过 dev loop 调用：plugin.dev.invokeTool("session-bridge", "session-bridge_test_tools")
import { defineTool } from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'test_tools',
  description: 'M4 smoke test: Agent tools (create/join/leave/room-status) end-to-end flow.',
  parameters: {
    type: 'object',
    properties: {},
  },
  sessionPermission: { readOnly: true },
  async execute(_input: unknown, ctx) {
    const results: Record<string, unknown> = { ok: false, steps: [] };
    const step = (name: string, pass: boolean, detail?: unknown) =>
      results.steps.push({ name, pass, ...(typeof detail === 'object' && detail !== null ? detail : { detail }) });

    const { EventBusTransport } = await import(`../lib/eventbus-transport.ts?v=${Date.now()}`);
    const { RoomManager } = await import(`../lib/room-manager.ts?v=${Date.now()}`);
    const { MessageBus } = await import(`../lib/message-bus.ts?v=${Date.now()}`);

    // 1. 工具注册元数据
    const createTool = await import(`../tools/create-room.ts?v=${Date.now()}`);
    const joinTool = await import(`../tools/join-room.ts?v=${Date.now()}`);
    const leaveTool = await import(`../tools/leave-room.ts?v=${Date.now()}`);
    const statusTool = await import(`../tools/room-status.ts?v=${Date.now()}`);
    const tools = [
      ['create-room', createTool],
      ['join-room', joinTool],
      ['leave-room', leaveTool],
      ['room-status', statusTool],
    ] as const;
    const allRegistered = tools.every(([, t]) =>
      typeof t.name === 'string' && typeof t.description === 'string' &&
      typeof t.parameters === 'object' && typeof t.execute === 'function');
    step('tools_registered', allRegistered, {
      names: tools.map(([, t]) => t.name),
      count: tools.length,
    });

    // 2. 房间生命周期（复刻四个工具的 execute 逻辑，用独立实例避免污染共享单例）
    const rm = new RoomManager(ctx);
    const transport = new EventBusTransport(ctx, { selfId: 'tool-test-host' });
    const mb = new MessageBus(transport, rm, ctx);
    const guest = new EventBusTransport(ctx, { selfId: 'tool-test-guest' });

    // create-room：创建 suggest 房间 + 桥接 + 连接
    const roomId = await rm.createRoom({
      hostId: 'tool-test-host',
      hostSessionPath: '/dev/host-session',
      permissionLevel: 'suggest',
      readableName: 'tool-test-room',
    });
    step('create_room', /^[A-Z0-9]{8}$/.test(roomId), { roomId });
    mb.bridgeSession(roomId, '/dev/host-session');
    await transport.connect(roomId);

    // join-room：无密码 → pending
    const joinStatus = await rm.joinRoom(roomId, { userId: 'tool-test-guest', sessionPath: '/dev/guest-session' });
    step('join_pending', joinStatus === 'pending', { joinStatus });

    // 批准加入 → joined
    const approved = await rm.approveJoin(roomId, 'tool-test-guest');
    const roomAfterApprove = rm.getRoom(roomId);
    const guestJoined = roomAfterApprove?.participants.some((p) => p.userId === 'tool-test-guest') === true;
    step('approve_join', approved === true && guestJoined, { approved, guestJoined });
    await guest.connect(roomId);

    // room-status：列表视图
    const listView = rm.listActiveRooms().map((r) => ({
      roomId: r.roomId,
      permissionLevel: r.permissionLevel,
      participantCount: r.participants.length,
      createdAt: r.createdAt,
      lastActivityAt: r.lastActivityAt,
    }));
    step('room_status_list', listView.some((r) => r.roomId === roomId && r.participantCount === 2), { listView });

    // room-status：详情视图
    const detail = rm.getRoom(roomId);
    step('room_status_detail', Boolean(detail && detail.participants.length === 2 && detail.pendingJoinRequests.length === 0), {
      participantCount: detail?.participants.length,
      permissionLevel: detail?.permissionLevel,
      hostId: detail?.hostId,
    });

    // 房主移交：host 离开，guest 成为新 host
    await rm.leaveRoom(roomId, 'tool-test-host');
    rm.transferHost(roomId, 'tool-test-guest');
    const afterHostLeave = rm.getRoom(roomId);
    step('host_transfer', afterHostLeave?.hostId === 'tool-test-guest' && afterHostLeave?.status === 'active', {
      newHost: afterHostLeave?.hostId,
      status: afterHostLeave?.status,
    });

    // 最后一人离开 → 房间关闭
    await rm.leaveRoom(roomId, 'tool-test-guest');
    const afterClose = rm.getRoom(roomId);
    step('room_close_when_empty', Boolean(afterClose && afterClose.status === 'closed'), {
      status: afterClose?.status,
      participantCount: afterClose?.participants.length,
    });

    // 密码房间：错误密码拒绝
    const pwRoom = await rm.createRoom({ hostId: 'tool-test-host', hostSessionPath: '/dev/pw', permissionLevel: 'collaborate', password: 'secret123' });
    let wrongPwRejected = false;
    try {
      await rm.joinRoom(pwRoom, { userId: 'tool-test-guest', sessionPath: '/dev/guest', password: 'wrong' });
    } catch { wrongPwRejected = true; }
    const rightPw = await rm.joinRoom(pwRoom, { userId: 'tool-test-guest', sessionPath: '/dev/guest', password: 'secret123' });
    step('password_room', wrongPwRejected && rightPw === 'joined', { wrongPwRejected, rightPw });

    // 清理
    await guest.disconnect(roomId).catch(() => {});
    await transport.disconnect(roomId).catch(() => {});
    mb.unbridge(roomId);
    await rm.leaveRoom(pwRoom, 'tool-test-host').catch(() => {});
    await rm.leaveRoom(pwRoom, 'tool-test-guest').catch(() => {});
    rm.cleanupGhostRooms();
    rm.dispose();

    results.ok = results.steps.every((s) => (s as any).pass === true);
    return JSON.stringify(results, null, 2);
  },
});
