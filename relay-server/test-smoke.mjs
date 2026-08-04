/**
 * R1 smoke test：本地启动 Relay，模拟完整协议流程。
 * 场景：房主 register → 观众 auth → 房主广播消息 → 观众收到 →
 *       观众 sync_request → 收到参与者列表 → 密码错误拒绝 → 离开广播。
 * 用法：node relay-server/test-smoke.mjs
 */
import WebSocket from 'ws';

const URL = process.env.RELAY_URL ?? 'ws://127.0.0.1:64162';
const ROOM = 'TESTROOM';
const PASSWORD = 'secret123';
const bcrypt = (await import('bcryptjs')).default;

let passed = 0;
let failed = 0;
function check(name, cond, extra = '') {
  if (cond) {
    passed++;
    console.log(`  ✅ ${name}`);
  } else {
    failed++;
    console.log(`  ❌ ${name} ${extra}`);
  }
}

function connect(name) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(URL);
    ws.on('open', () => resolve(ws));
    ws.on('error', reject);
    ws._name = name;
  });
}

function waitMessage(ws, predicate, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout waiting ${ws._name}`)), timeoutMs);
    const handler = (raw) => {
      const msg = JSON.parse(raw.toString());
      if (predicate(msg)) {
        clearTimeout(timer);
        ws.off('message', handler);
        resolve(msg);
      }
    };
    ws.on('message', handler);
  });
}

console.log(`\n[R1 smoke] connecting to ${URL}`);

// ---- 1. 房主注册房间（带 bcrypt passwordHash）----
const host = await connect('host');
const hostMsgs = [];
host.on('message', (raw) => hostMsgs.push(JSON.parse(raw.toString())));

host.send(JSON.stringify({
  type: 'register',
  roomId: ROOM,
  userId: 'qingmo',
  passwordHash: bcrypt.hashSync(PASSWORD, 10),
}));
const hostAuthOk = await waitMessage(host, (m) => m.type === 'auth_ok');
check('房主 register → auth_ok', hostAuthOk.roomId === ROOM);
check('auth_ok 参与者含房主', hostAuthOk.participants.some((p) => p.userId === 'qingmo'));

// ---- 2. 错误密码拒绝 ----
const bad = await connect('bad');
const badAuthPromise = waitMessage(bad, (m) => m.type === 'auth_fail');
bad.send(JSON.stringify({ type: 'auth', roomId: ROOM, userId: 'intruder', password: 'wrong' }));
const badAuth = await badAuthPromise;
check('错误密码 → auth_fail', badAuth.reason === '密码错误');
bad.close();

// ---- 3. 观众正确密码加入 ----
const viewer = await connect('viewer');
const viewerMsgs = [];
viewer.on('message', (raw) => viewerMsgs.push(JSON.parse(raw.toString())));
// 房主应收到 participant_join 广播（Relay 先广播 join 再回 auth_ok，故先注册监听）
const hostJoinPromise = waitMessage(host, (m) => m.type === 'participant_join');
const joinPromise = waitMessage(viewer, (m) => m.type === 'auth_ok');
viewer.send(JSON.stringify({ type: 'auth', roomId: ROOM, userId: 'frieren', password: PASSWORD }));
const viewerAuthOk = await joinPromise;
check('观众 auth → auth_ok', viewerAuthOk.roomId === ROOM);
check('auth_ok 参与者含观众', viewerAuthOk.participants.some((p) => p.userId === 'frieren'));

const hostJoinNotif = await hostJoinPromise;
check('房主收到 participant_join', hostJoinNotif.userId === 'frieren');

// ---- 4. 房主广播消息，观众收到 ----
const viewerMsgPromise = waitMessage(viewer, (m) => m.type === 'room_message');
const testMessage = {
  roomId: ROOM, from: 'qingmo', seq: 1, type: 'user_message',
  payload: { text: 'hello cross-machine' }, timestamp: Date.now(),
};
host.send(JSON.stringify({ type: 'room_message', roomId: ROOM, message: testMessage }));
const viewerGot = await viewerMsgPromise;
check('房主广播 → 观众收到', viewerGot.message.seq === 1 && viewerGot.message.payload.text === 'hello cross-machine');
check('房主不收到自己的广播（回声过滤在客户端，Relay 侧排除发送者）',
  !hostMsgs.some((m) => m.type === 'room_message' && m.message?.seq === 1));

// ---- 5. 观众 sync_request → sync_response ----
const syncPromise = waitMessage(viewer, (m) => m.type === 'sync_response');
viewer.send(JSON.stringify({ type: 'sync_request', roomId: ROOM, lastSeq: 0 }));
const syncResp = await syncPromise;
check('sync_response 返回参与者列表', syncResp.currentState?.participants?.length === 2);

// ---- 6. 观众离开 → 房主收到 participant_leave ----
const leavePromise = waitMessage(host, (m) => m.type === 'participant_leave');
viewer.close();
const leaveNotif = await leavePromise;
check('房主收到 participant_leave', leaveNotif.userId === 'frieren');

// ---- 7. 未加入房间的人发消息被拒 ----
const rogue = await connect('rogue');
const rogueErr = waitMessage(rogue, (m) => m.type === 'error');
rogue.send(JSON.stringify({ type: 'room_message', roomId: ROOM, message: { roomId: ROOM, from: 'x', seq: 99, type: 'user_message', payload: {}, timestamp: Date.now() } }));
const rogueResp = await rogueErr;
check('未加入者发消息 → error', rogueResp.message === '未加入该房间');
rogue.close();

// ---- 8. 速率限制：20 条后拒绝 ----
const spammer = await connect('spammer');
await new Promise((r) => {
  spammer.send(JSON.stringify({ type: 'register', roomId: 'RATELIM1', userId: 'spammer' }));
  spammer.on('message', (raw) => { if (JSON.parse(raw.toString()).type === 'auth_ok') r(); });
});
let rateRejected = false;
for (let i = 0; i < 25; i++) {
  spammer.send(JSON.stringify({ type: 'room_message', roomId: 'RATELIM1', message: { roomId: 'RATELIM1', from: 'spammer', seq: i, type: 'user_message', payload: {}, timestamp: Date.now() } }));
}
// 收集 25 条里的错误
const rateCheck = await new Promise((resolve) => {
  const errors = [];
  let messages = 0;
  const timer = setTimeout(() => resolve({ errors, messages }), 1500);
  spammer.on('message', (raw) => {
    const m = JSON.parse(raw.toString());
    if (m.type === 'error') errors.push(m);
    if (m.type === 'room_message') messages++;
  });
});
check('速率限制：25 条中至少拒绝 1 条', rateCheck.errors.length >= 1, `errors=${rateCheck.errors.length}`);
spammer.close();

host.close();
console.log(`\n[R1 smoke] ${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
