// tools/test-room.ts
// M2 smoke test：RoomManager 全流程验证。
// 创建→持久化→读取→加入（密码验证）→离开→关闭。
// 通过 dev loop 调用：plugin.dev.invokeTool("session-bridge", "session-bridge_test_room")
import { defineTool } from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'test_room',
  description: 'M2 smoke test: RoomManager create/persist/read/join/leave lifecycle.',
  parameters: {
    type: 'object',
    properties: {},
  },
  sessionPermission: { readOnly: true },
  async execute(input: Record<string, never>, ctx) {
    // 动态 import + cache-busting：绕过 dev loop 的 lib 模块缓存
    const { RoomManager } = await import(`../lib/room-manager.ts?v=${Date.now()}`);
    const results: Record<string, unknown> = { ok: false, steps: [] };
    const step = (name: string, pass: boolean, detail?: unknown) => results.steps.push({ name, pass, ...(typeof detail === 'object' ? detail : { detail }) });

    const rm = new RoomManager(ctx);
    const roomId = await rm.createRoom({
      hostId: 'dev-host',
      hostSessionPath: ctx.sessionPath ?? '/dev/session',
      permissionLevel: 'suggest',
      password: 'secret123',
      readableName: 'dev-test-room',
    });
    step('create_room', typeof roomId === 'string' && roomId.length === 8, { roomId });

    // 持久化文件检查（ctx.dataDir/rooms/{roomId}.json）
    const roomOnDisk = rm.getRoom(roomId);
    step('get_room', roomOnDisk !== null && roomOnDisk.hostId === 'dev-host', { hostId: roomOnDisk?.hostId });
    step('password_hashed', Boolean(roomOnDisk?.passwordHash && roomOnDisk.passwordHash.startsWith('$2')), { hashPrefix: roomOnDisk?.passwordHash?.slice(0, 4) });

    // 密码验证
    let wrongThrew = false;
    try {
      await rm.joinRoom(roomId, { userId: 'dev-guest', sessionPath: '/dev/guest', password: 'wrong' });
    } catch { wrongThrew = true; }
    step('join_wrong_password', wrongThrew, {});

    const joined = await rm.joinRoom(roomId, { userId: 'dev-guest', sessionPath: '/dev/guest', password: 'secret123' });
    step('join_correct_password', joined === 'joined', { joined });

    // 无密码房间 pending + approve
    const noPwdRoom = await rm.createRoom({ hostId: 'dev-host', hostSessionPath: '/dev/session', permissionLevel: 'readonly' });
    const pending = await rm.joinRoom(noPwdRoom, { userId: 'dev-guest2', sessionPath: '/dev/guest2' });
    step('join_no_password_pending', pending === 'pending', { pending });
    const approved = await rm.approveJoin(noPwdRoom, 'dev-guest2');
    step('approve_join', approved === true, { approved });

    // seq 递增
    const s1 = rm.nextSeq(roomId);
    const s2 = rm.nextSeq(roomId);
    step('seq_increments', s1 === 1 && s2 === 2, { s1, s2 });

    // 离开 + 关闭
    await rm.leaveRoom(roomId, 'dev-guest');
    await rm.leaveRoom(roomId, 'dev-host');
    const closed = rm.getRoom(roomId);
    step('room_closed_when_empty', closed?.status === 'closed', { status: closed?.status });

    // 清理（避免污染正式数据目录）
    await rm.leaveRoom(noPwdRoom, 'dev-guest2');
    await rm.leaveRoom(noPwdRoom, 'dev-host');
    rm.cleanupGhostRooms();
    rm.dispose();

    results.ok = results.steps.every((s) => (s as any).pass === true);
    return JSON.stringify(results, null, 2);
  },
});
