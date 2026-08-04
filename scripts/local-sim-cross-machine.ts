// scripts/local-sim-cross-machine.ts
// R3 集成 smoke test：模拟两台机器（不同 dataDir → 独立单例），
// 配置 relayServerUrl 后走 WebSocketTransport，验证：
//   1. shared.ts 的 Transport 选择（relayUrl → WebSocketTransport）
//   2. 房主 register / 观众 auth + joinRemoteRoom
//   3. 跨机广播 → global handler → messageBus.handleMessage → store（WebView 轮询链路）
// 用法：node scripts/local-sim-cross-machine.ts（需本地 Relay 运行在 127.0.0.1:64162）
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getSharedState } from '../lib/shared.ts';
import { WebSocketTransport } from '../lib/websocket-transport.ts';
import type { Message } from '../lib/transport.ts';

const RELAY_URL = process.env.RELAY_URL ?? 'ws://127.0.0.1:64162';

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, extra = '') {
  if (cond) { passed++; console.log(`  ✅ ${name}`); }
  else { failed++; console.log(`  ❌ ${name} ${extra}`); }
}
function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function makeCtx(userId: string) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), `sb-xmachine-${userId}-`));
  return {
    userId,
    dataDir,
    pluginId: 'session-bridge-test',
    config: { get: (k: string) => (k === 'relayServerUrl' ? RELAY_URL : '') },
    bus: { emit: () => {}, subscribe: () => () => {}, handle: () => () => {} },
    log: { info: () => {}, warn: (...a: unknown[]) => console.log('[warn]', ...a), error: (...a: unknown[]) => console.log('[error]', ...a) },
  } as never;
}

async function main() {
  console.log(`\n[R3 smoke] relay=${RELAY_URL}`);

  // ---- 机器 A（房主）----
  const ctxA = makeCtx('qingmo');
  const stateA = getSharedState(ctxA);
  check('A: relayUrl 配置后选择 WebSocketTransport', stateA.transport instanceof WebSocketTransport);

  const roomId = await stateA.roomManager.createRoom({
    hostId: 'qingmo',
    hostSessionPath: '/dev/session-a',
    permissionLevel: 'suggest',
    password: 'secret123',
  });
  await stateA.transport.connect(roomId); // register
  check('A: 房主连接成功', stateA.transport.getStatus(roomId) === 'connected');

  // ---- 机器 B（观众，独立 dataDir → 独立单例）----
  const ctxB = makeCtx('frieren');
  const stateB = getSharedState(ctxB);
  check('B: 选择 WebSocketTransport', stateB.transport instanceof WebSocketTransport);

  await stateB.transport.connect(roomId, { password: 'secret123' }); // auth
  await stateB.roomManager.joinRemoteRoom(roomId, { userId: 'frieren', sessionPath: '/dev/session-b' });
  check('B: 观众连接成功', stateB.transport.getStatus(roomId) === 'connected');

  // B 端同步参与者
  await sleep(500);
  const roomB = stateB.roomManager.getRoom(roomId);
  check('B: 同步到房主参与者', roomB?.participants.some((p) => p.userId === 'qingmo'));

  // ---- A 广播消息 → Relay → B 的 messageBus.handleMessage → store ----
  const msgA: Message = {
    roomId, from: 'qingmo', seq: 1, type: 'agent_reply',
    payload: { text: '跨机广播测试' }, timestamp: Date.now(),
  };
  await stateA.transport.send(roomId, msgA);
  await sleep(500);
  const { messages } = stateB.messageBus.messageStore.getSince(roomId, 0);
  check('B: 跨机广播进入 store（WebView 轮询可见）', messages.some((m) => (m.payload as { text?: string })?.text === '跨机广播测试'));
  check('B: store 记录含发送方', messages.some((m) => m.from === 'qingmo' && m.roomId === roomId));

  // ---- B 端去重：同消息不重复入库 ----
  await stateA.transport.send(roomId, msgA); // 重复发送同 seq
  await sleep(400);
  const { messages: after } = stateB.messageBus.messageStore.getSince(roomId, 0);
  const dupCount = after.filter((m) => (m.payload as { text?: string })?.text === '跨机广播测试').length;
  check('B: 重复 seq 去重（store 只有一条）', dupCount === 1, `got ${dupCount}`);

  // ---- 观众发建议 → 房主 store 可见 ----
  const msgB: Message = {
    roomId, from: 'frieren', seq: 1, type: 'suggestion',
    payload: { text: '来自观众的实时建议' }, timestamp: Date.now(),
  };
  await stateB.transport.send(roomId, msgB);
  await sleep(500);
  const { messages: hostMsgs } = stateA.messageBus.messageStore.getSince(roomId, 0);
  check('A: 收到观众建议（store 可见）', hostMsgs.some((m) => (m.payload as { text?: string })?.text === '来自观众的实时建议'));

  // ---- 清理 ----
  await stateA.transport.disconnect(roomId);
  await stateB.transport.disconnect(roomId);

  console.log(`\n[R3 smoke] ${passed} passed, ${failed} failed\n`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error('[R3 smoke] fatal:', e);
  process.exit(1);
});
