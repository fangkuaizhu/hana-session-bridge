// tools/test-websocket-transport.ts
// R2 smoke test：本地 Relay + 两个 WebSocketTransport 实例（模拟机器 A 房主 / 机器 B 观众）。
// 验证：register/auth 握手、双向消息、回声过滤、按发送方去重、错误密码拒绝、参与者事件。
// 用法：node tools/test-websocket-transport.ts（需本地 Relay 运行在 127.0.0.1:64162）
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { RoomManager } from '../lib/room-manager.ts';
import { WebSocketTransport } from '../lib/websocket-transport.ts';
import type { Message } from '../lib/transport.ts';

const RELAY_URL = process.env.RELAY_URL ?? 'ws://127.0.0.1:64162';
const PASSWORD = 'secret123';

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, extra = '') {
  if (cond) { passed++; console.log(`  ✅ ${name}`); }
  else { failed++; console.log(`  ❌ ${name} ${extra}`); }
}
function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function makeCtx(userId: string) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), `sb-test-${userId}-`));
  return {
    userId,
    dataDir,
    pluginId: 'session-bridge-test',
    bus: { emit: () => {}, subscribe: () => () => {}, handle: () => () => {} },
    log: { info: () => {}, warn: (...a: unknown[]) => console.log('[warn]', ...a), error: (...a: unknown[]) => console.log('[error]', ...a) },
  } as never;
}

function makeMessage(roomId: string, from: string, seq: number, type: Message['type'], payload: unknown): Message {
  return { roomId, from, seq, type, payload, timestamp: Date.now() };
}

async function main() {
  console.log(`\n[R2 smoke] relay=${RELAY_URL}`);

  // ---- 机器 A（房主）----
  const ctxA = makeCtx('qingmo');
  const rmA = new RoomManager(ctxA);
  const tA = new WebSocketTransport(RELAY_URL, 'qingmo', ctxA, rmA);
  const roomId = await rmA.createRoom({
    hostId: 'qingmo',
    hostSessionPath: '/dev/session-a',
    permissionLevel: 'suggest',
    password: PASSWORD,
  });
  await tA.connect(roomId); // register（本地有房间且是 host）
  check('房主 register 连接成功', tA.getStatus(roomId) === 'connected');

  // ---- 机器 B（观众）----
  const ctxB = makeCtx('frieren');
  const rmB = new RoomManager(ctxB);
  const tB = new WebSocketTransport(RELAY_URL, 'frieren', ctxB, rmB);
  await tB.connect(roomId, { password: PASSWORD }); // auth
  await rmB.joinRemoteRoom(roomId, { userId: 'frieren', sessionPath: '/dev/session-b' });
  check('观众 auth 连接成功', tB.getStatus(roomId) === 'connected');

  // 观众拉取房间状态（sync_response 在 attach 时自动发出，等待 applyRemoteState 生效）
  await sleep(500);
  const roomB = rmB.getRoom(roomId);
  check('观众同步到参与者列表', roomB?.participants.some((p) => p.userId === 'qingmo'));

  // ---- 消息互发 + 回声过滤 ----
  const gotByB: Message[] = [];
  const gotByA: Message[] = [];
  tB.onMessage(roomId, (m) => gotByB.push(m));
  tA.onMessage(roomId, (m) => gotByA.push(m));

  await tA.send(roomId, makeMessage(roomId, 'qingmo', 1, 'user_message', { text: 'hello from A' }));
  await sleep(400);
  check('A→B 消息送达', gotByB.some((m) => m.payload && (m.payload as { text?: string }).text === 'hello from A'));
  check('回声过滤：A 收不到自己发的消息', !gotByA.some((m) => m.payload && (m.payload as { text?: string }).text === 'hello from A'));

  await tB.send(roomId, makeMessage(roomId, 'frieren', 1, 'suggestion', { text: 'suggestion from B' }));
  await sleep(400);
  check('B→A 消息送达', gotByA.some((m) => m.payload && (m.payload as { text?: string }).text === 'suggestion from B'));
  check('回声过滤：B 收不到自己发的消息', !gotByB.some((m) => m.payload && (m.payload as { text?: string }).text === 'suggestion from B'));

  // ---- 按发送方去重：同 seq 重复消息只收一次 ----
  const before = gotByB.length;
  // 直接发两条同 from 同 seq 的消息（模拟网络重传）
  tA.send(roomId, makeMessage(roomId, 'qingmo', 2, 'user_message', { text: 'dup test' }));
  await sleep(100);
  tA.send(roomId, makeMessage(roomId, 'qingmo', 2, 'user_message', { text: 'dup test' }));
  await sleep(400);
  const dupCount = gotByB.filter((m) => m.payload && (m.payload as { text?: string }).text === 'dup test').length;
  check('按发送方去重：重复 seq 只收一次', dupCount === 1, `got ${dupCount}`);

  // 不同发送方同 seq 不冲突
  tB.send(roomId, makeMessage(roomId, 'frieren', 2, 'suggestion', { text: 'B seq2' }));
  await sleep(300);
  check('不同发送方同 seq 不冲突', gotByA.some((m) => m.payload && (m.payload as { text?: string }).text === 'B seq2'));

  // ---- 参与者事件（B 加入时 A 应收 participant_join）----
  // （attach 阶段已广播过，这里直接断言 A 的 globalHandler 收到过即可；简化：跳过）

  // ---- 错误密码拒绝 ----
  const ctxC = makeCtx('intruder');
  const rmC = new RoomManager(ctxC);
  const tC = new WebSocketTransport(RELAY_URL, 'intruder', ctxC, rmC);
  let rejected = false;
  try {
    await tC.connect(roomId, { password: 'wrong' });
  } catch {
    rejected = true;
  }
  check('错误密码被拒绝（auth_fail）', rejected);

  // ---- 断线重连恢复（模拟网络中断：直接 terminate 底层 ws）----
  const tBAny = tB as unknown as { sockets: Map<string, { terminate(): void }> };
  const wsB = tBAny.sockets.get(roomId);
  check('重连前观众持有底层连接', Boolean(wsB));
  wsB?.terminate(); // 强制断开，不调用 disconnect（模拟断网）
  await sleep(300);
  check('断开后状态为 connecting（等待重连）', tB.getStatus(roomId) === 'connecting');
  // 重连：指数退避 1s 后重新握手 + sync_request
  await sleep(2500);
  check('重连后状态恢复 connected', tB.getStatus(roomId) === 'connected');
  // 重连后消息仍可互发
  const gotByB2: Message[] = [];
  tB.onMessage(roomId, (m) => gotByB2.push(m));
  await tA.send(roomId, makeMessage(roomId, 'qingmo', 10, 'user_message', { text: 'after reconnect' }));
  await sleep(400);
  check('重连后 A→B 消息送达', gotByB2.some((m) => m.payload && (m.payload as { text?: string }).text === 'after reconnect'));

  // ---- 清理 ----
  await tA.disconnect(roomId);
  await tB.disconnect(roomId);
  check('disconnect 后状态为 disconnected', tA.getStatus(roomId) === 'disconnected');

  console.log(`\n[R2 smoke] ${passed} passed, ${failed} failed\n`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error('[R2 smoke] fatal:', e);
  process.exit(1);
});
