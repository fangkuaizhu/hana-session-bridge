// scripts/local-sim-room.mjs
// 本地模拟验证 RoomManager（M2）逻辑，不依赖 Hana 运行时。
// 用法：node scripts/local-sim-room.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { RoomManager } from '../lib/room-manager.ts';

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-room-'));
const ctx = {
  pluginId: 'session-bridge',
  dataDir: tmpDir,
  log: { info() {}, warn() {}, error() {}, debug() {} },
  config: { get() {}, set() {} },
};

async function main() {
  const results = { ok: false, steps: [] };
  const step = (name, pass, detail) => results.steps.push({ name, pass, ...(detail ?? {}) });

  const rm = new RoomManager(ctx);

  // 1. 创建房间（有密码）
  const roomId = await rm.createRoom({
    hostId: 'host-user',
    hostSessionPath: '/sessions/host',
    permissionLevel: 'suggest',
    password: 'secret123',
    readableName: '测试房',
  });
  step('create_room', typeof roomId === 'string' && roomId.length === 8, { roomId });

  // 2. 持久化检查：rooms/{roomId}.json 存在且内容正确
  const filePath = path.join(tmpDir, 'rooms', `${roomId}.json`);
  const onDisk = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  step('persist_file', onDisk.roomId === roomId && onDisk.status === 'active', { fileExists: fs.existsSync(filePath) });
  step('password_hashed', onDisk.passwordHash && onDisk.passwordHash.startsWith('$2'), { hashPrefix: onDisk.passwordHash?.slice(0, 4) });
  step('password_not_plain', onDisk.passwordHash !== 'secret123', {});

  // 3. 重新读取（getRoom + 重新 new RoomManager 模拟重启加载）
  const rm2 = new RoomManager(ctx);
  const reloaded = rm2.getRoom(roomId);
  step('get_room', reloaded !== null && reloaded.hostId === 'host-user', { hostId: reloaded?.hostId });

  // 4. 加入：错误密码 → 抛错
  let wrongPwdThrew = false;
  try {
    await rm2.joinRoom(roomId, { userId: 'guest', sessionPath: '/sessions/guest', password: 'wrong' });
  } catch {
    wrongPwdThrew = true;
  }
  step('join_wrong_password', wrongPwdThrew, {});

  // 5. 加入：正确密码 → joined
  const joinResult = await rm2.joinRoom(roomId, { userId: 'guest', sessionPath: '/sessions/guest', password: 'secret123' });
  step('join_correct_password', joinResult === 'joined', { joinResult });

  // 6. 无密码房间：加入 → pending
  const noPwdRoom = await rm2.createRoom({
    hostId: 'host2', hostSessionPath: '/sessions/host2', permissionLevel: 'readonly',
  });
  const pendingResult = await rm2.joinRoom(noPwdRoom, { userId: 'guest2', sessionPath: '/sessions/guest2' });
  step('join_no_password_pending', pendingResult === 'pending', { pendingResult });
  const roomWithPending = rm2.getRoom(noPwdRoom);
  step('pending_request_created', roomWithPending?.pendingJoinRequests.length === 1, { pendingCount: roomWithPending?.pendingJoinRequests.length });

  // 7. 批准加入
  const approved = await rm2.approveJoin(noPwdRoom, 'guest2');
  const roomAfterApprove = rm2.getRoom(noPwdRoom);
  step('approve_join', approved === true && roomAfterApprove?.participants.some((p) => p.userId === 'guest2'), { approved });

  // 8. 拒绝
  const rejectRoom = await rm2.createRoom({
    hostId: 'host3', hostSessionPath: '/sessions/host3', permissionLevel: 'collaborate',
  });
  await rm2.joinRoom(rejectRoom, { userId: 'guest3', sessionPath: '/sessions/guest3' });
  await rm2.rejectJoin(rejectRoom, 'guest3');
  const roomAfterReject = rm2.getRoom(rejectRoom);
  step('reject_join', roomAfterReject?.pendingJoinRequests.length === 0, { pendingCount: roomAfterReject?.pendingJoinRequests.length });

  // 9. nextSeq 递增
  const s1 = rm2.nextSeq(roomId);
  const s2 = rm2.nextSeq(roomId);
  step('seq_increments', s1 === 1 && s2 === 2, { s1, s2 });

  // 10. 房主离开 → 移交 + 最后一人离开 → 关闭
  await rm2.leaveRoom(roomId, 'guest');
  const roomAfterGuestLeave = rm2.getRoom(roomId);
  step('leave_participant', roomAfterGuestLeave?.participants.length === 1, { participantCount: roomAfterGuestLeave?.participants.length });

  await rm2.leaveRoom(roomId, 'host-user');
  const roomAfterHostLeave = rm2.getRoom(roomId);
  step('room_closed_when_empty', roomAfterHostLeave?.status === 'closed', { status: roomAfterHostLeave?.status });

  // 11. 超时定时器 + transferHost
  const timerRoom = await rm2.createRoom({
    hostId: 'host4', hostSessionPath: '/sessions/host4', permissionLevel: 'full_control',
  });
  await rm2.joinRoom(timerRoom, { userId: 'guest4', sessionPath: '/sessions/guest4', password: undefined });
  // 无密码 → pending；先批准
  await rm2.approveJoin(timerRoom, 'guest4');
  let timeoutFired = false;
  rm2.startTimeoutTimer(timerRoom, () => { timeoutFired = true; });
  step('timer_registered', timeoutFired === false, {});
  rm2.clearTimeoutTimer(timerRoom);
  rm2.transferHost(timerRoom, 'guest4');
  const roomAfterTransfer = rm2.getRoom(timerRoom);
  step('transfer_host', roomAfterTransfer?.hostId === 'guest4', { hostId: roomAfterTransfer?.hostId });

  // 12. 关闭房间文件清理（cleanupGhostRooms）
  const cleaned = rm2.cleanupGhostRooms();
  step('cleanup_closed_rooms', cleaned >= 1, { cleaned });

  results.ok = results.steps.every((s) => s.pass);
  console.log(JSON.stringify(results, null, 2));

  // 清理临时目录
  fs.rmSync(tmpDir, { recursive: true, force: true });
  process.exit(results.ok ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
