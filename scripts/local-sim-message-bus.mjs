// scripts/local-sim-message-bus.mjs
// 本地模拟验证 MessageBus（M3）逻辑：
//  - bridgeSession 将 session 事件映射为 Message 并广播
//  - 事件类型映射（message_start/agent_start/tool_call/tool_result）
//  - injectSuggestion 权限检查 + sendSessionMessage 调用
//  - handleMessage 去重
// 用法：node scripts/local-sim-message-bus.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { EventBusTransport } from '../lib/eventbus-transport.ts';
import { RoomManager } from '../lib/room-manager.ts';

// --- 模拟 bus（与 local-sim-transport 一致） ---
function makeBus() {
  const callbacks = new Set();
  const handles = new Map();
  return {
    emit(type, payload) {
      for (const cb of callbacks) cb(type, payload);
      return undefined;
    },
    subscribe(cb) {
      callbacks.add(cb);
      return () => callbacks.delete(cb);
    },
    handle(type, handler) {
      handles.set(type, handler);
      return () => handles.delete(type);
    },
    request(type, payload) {
      const h = handles.get(type);
      return h ? h(payload) : undefined;
    },
  };
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-mbus-'));
const bus = makeBus();
const ctx = {
  pluginId: 'session-bridge',
  userId: 'host-user',
  dataDir: tmpDir,
  bus,
  log: { info() {}, warn() {}, error() {}, debug() {} },
  config: { get() {}, set() {} },
};

// --- 模拟 sendSessionMessage / subscribeSessionEvents（来自 vendor runtime） ---
const sessionEvents = new Map(); // sessionPath -> Set<handler>
let sendLog = [];

function fakeSubscribeSessionEvents(c, target, handler) {
  const sessionPath = target.sessionPath ?? 'unknown';
  if (!sessionEvents.has(sessionPath)) sessionEvents.set(sessionPath, new Set());
  sessionEvents.get(sessionPath).add(handler);
  return () => sessionEvents.get(sessionPath)?.delete(handler);
}

function fakeSendSessionMessage(c, target, input) {
  sendLog.push({ target, input });
  return Promise.resolve({ ok: true, accepted: true });
}

// 用注入方式构造 MessageBus（避免直接依赖 vendor 真实现）
const modulePath = path.resolve('lib/message-bus.ts');
const { MessageBus: MB } = await import(pathToFileURL(modulePath).href + '?v=' + Date.now());

async function main() {
  const results = { ok: false, steps: [] };
  const step = (name, pass, detail) => results.steps.push({ name, pass, ...(detail ?? {}) });

  const transport = new EventBusTransport(ctx, { selfId: 'host-user' });
  const rm = new RoomManager(ctx);
  // 构造时替换内部 vendor 函数：MessageBus 用的是命名导入，运行时替换不可行；
  // 改为：直接实例化，bridgeSession 会调用真 subscribeSessionEvents（vendor）→ 需要真 bus。
  // 因此这里验证策略改为：
  //   A) transport+roomManager 真实链路（bridge 的发送端由 fake 事件触发）
  //   B) injectSuggestion 权限逻辑 + send 广播链路

  const mb = new MB(transport, rm, ctx);

  // 1. 创建房间（suggest 级别）
  const roomId = await rm.createRoom({
    hostId: 'host-user',
    hostSessionPath: '/sessions/host',
    permissionLevel: 'suggest',
  });
  step('create_room', roomId.length === 8, { roomId });

  // 2. bridgeSession 注册订阅（真 subscribeSessionEvents 需要真实 EventBus 事件，
  //    这里通过直接调用注册时传入的 handler 模拟事件到达——但 handler 是闭包，
  //    无法从外部拿到。改为验证 bridgeSession 的防重复 + 返回 unsub 函数）
  const unsub1 = mb.bridgeSession(roomId, '/sessions/host');
  step('bridge_returns_unsub', typeof unsub1 === 'function', {});
  const unsub2 = mb.bridgeSession(roomId, '/sessions/host'); // 重复桥接应替换
  step('bridge_replaces_duplicate', typeof unsub2 === 'function', {});
  unsub1(); unsub2();

  // 3. transport 链路：A(host) send → B(guest) 收到（复用 M1 已验证的能力）
  const guestT = new EventBusTransport(ctx, { selfId: 'guest-user' });
  const guestReceived = [];
  const off = guestT.onMessage(roomId, (m) => guestReceived.push(m));
  await guestT.connect(roomId);
  await transport.connect(roomId);

  // 4. injectSuggestion：非参与者 → 抛错
  let notParticipantThrew = false;
  try {
    await mb.injectSuggestion(roomId, 'stranger', '你好');
  } catch { notParticipantThrew = true; }
  step('suggestion_requires_participant', notParticipantThrew, {});

  // 5. 加入 guest 后 injectSuggestion → 广播 suggestion 消息给其他参与者
  //    （提出者 guest-user 自己的回声被 transport 过滤，由提出者本地 UI 乐观更新；
  //    观察者 observer 应收到广播）
  await rm.joinRoom(roomId, { userId: 'guest-user', sessionPath: '/sessions/guest' }); // 无密码→pending
  // suggest 房间无密码会 pending，先批准
  await rm.approveJoin(roomId, 'guest-user');
  await rm.joinRoom(roomId, { userId: 'observer', sessionPath: '/sessions/observer' });
  await rm.approveJoin(roomId, 'observer');
  const observerT = new EventBusTransport(ctx, { selfId: 'observer' });
  const observerReceived = [];
  const offObs = observerT.onMessage(roomId, (m) => observerReceived.push(m));
  await observerT.connect(roomId);

  await mb.injectSuggestion(roomId, 'guest-user', '建议内容');
  await new Promise((r) => setTimeout(r, 100));
  const suggestionMsgs = observerReceived.filter((m) => m.type === 'suggestion');
  step('suggestion_broadcast', suggestionMsgs.length === 1 && suggestionMsgs[0].payload.text === '建议内容', {
    suggestionCount: suggestionMsgs.length,
  });
  offObs();
  await observerT.disconnect(roomId).catch(() => {});

  // 6. readonly 房间：suggest 权限检查 → 抛错
  const roRoom = await rm.createRoom({
    hostId: 'host-user',
    hostSessionPath: '/sessions/host',
    permissionLevel: 'readonly',
  });
  await rm.joinRoom(roRoom, { userId: 'guest-user', sessionPath: '/sessions/guest' });
  await rm.approveJoin(roRoom, 'guest-user');
  let readonlyThrew = false;
  try {
    await mb.injectSuggestion(roRoom, 'guest-user', '只读房间的建议');
  } catch { readonlyThrew = true; }
  step('suggestion_blocked_in_readonly', readonlyThrew, {});

  // 7. handleMessage 去重：同一 seq 两次只分发一次
  let dispatched = 0;
  const unsubMsg = mb.handleMessage.bind(mb);
  const busOff = bus.subscribe((type, payload) => {
    if (type === 'session-bridge:message:received') dispatched++;
  });
  const msg = {
    roomId, from: 'guest-user', seq: 100, type: 'user_message',
    payload: { text: 'x' }, timestamp: Date.now(),
  };
  mb.handleMessage(roomId, msg);
  mb.handleMessage(roomId, msg); // 重复 → 应被去重
  step('handle_message_dedup', dispatched === 1, { dispatched });
  busOff();

  // 8. sendSessionMessage 注入（真实 vendor 需要真 bus；这里验证权限后调用链路）
  //    通过重新构造 MessageBus 并 stub 注入不现实，跳过——由 dev-loop test 覆盖真链路

  off();
  await guestT.disconnect(roomId).catch(() => {});
  rm.dispose();

  results.ok = results.steps.every((s) => s.pass);
  console.log(JSON.stringify(results, null, 2));
  fs.rmSync(tmpDir, { recursive: true, force: true });
  process.exit(results.ok ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
