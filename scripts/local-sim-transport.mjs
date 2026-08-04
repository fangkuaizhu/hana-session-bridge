// scripts/local-sim-transport.mjs
// 本地模拟 Hana bus（emit/subscribe/handle），验证 EventBusTransport 类逻辑。
// 用法：node scripts/local-sim-transport.mjs
import { EventBusTransport } from '../lib/eventbus-transport.ts';

// --- 模拟 Hana EventBus ---
function makeBus() {
  const callbacks = new Set();
  const handles = new Map();
  return {
    emit(type, payload) {
      // 模拟 Hana：全量回调收到 (type字符串, payload)
      for (const cb of callbacks) cb(type, payload);
      // handle 不响应 emit
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

// --- 模拟 HanaPluginContext ---
function makeCtx(bus, userId) {
  return {
    userId,
    pluginId: 'session-bridge',
    bus,
    log: { info() {}, warn() {}, error() {}, debug() {} },
    config: { get() {}, set() {} },
  };
}

async function main() {
  const bus = makeBus();
  const ctxA = makeCtx(bus, 'test-user-A');
  const ctxB = makeCtx(bus, 'test-user-B');

  const transportA = new EventBusTransport(ctxA, { selfId: 'test-user-A' });
  const transportB = new EventBusTransport(ctxB, { selfId: 'test-user-B' });
  const roomId = 'LOCALROOM1';

  const receivedByB = [];
  const offB = transportB.onMessage(roomId, (msg) => receivedByB.push({ seq: msg.seq, type: msg.type, from: msg.from }));
  const receivedByA = [];
  const offA = transportA.onMessage(roomId, (msg) => receivedByA.push({ seq: msg.seq, type: msg.type, from: msg.from }));

  await transportA.connect(roomId);
  await transportB.connect(roomId);

  const base = Date.now();
  for (let i = 1; i <= 3; i++) {
    await transportA.send(roomId, {
      roomId,
      from: 'test-user-A',
      seq: i,
      type: i % 2 === 0 ? 'tool_call' : 'user_message',
      payload: { text: `msg-${i}` },
      timestamp: base + i,
    });
  }

  const seqsB = receivedByB.map((m) => m.seq);
  const seqIncremental = seqsB.length === 3 && seqsB.every((s, i) => s === i + 1);
  const typesB = receivedByB.map((m) => m.type);
  const typesOk = JSON.stringify(typesB) === JSON.stringify(['user_message', 'tool_call', 'user_message']);
  const aNoEcho = receivedByA.length === 0;

  // disconnect 测试
  await transportB.disconnect(roomId);
  const before = receivedByB.length;
  await transportA.send(roomId, {
    roomId, from: 'test-user-A', seq: 4, type: 'user_message', payload: { text: 'msg-4' }, timestamp: base + 4,
  });
  const stoppedAfterDisconnect = receivedByB.length === before;

  // handle 通道测试
  const requestResult = await bus.request(`session-bridge:room:${roomId}`, { ping: true });
  const handleOk = requestResult && requestResult.ok === true;

  offA(); offB();

  console.log(JSON.stringify({
    ok: seqIncremental && typesOk && aNoEcho && stoppedAfterDisconnect && handleOk,
    receivedByB: receivedByB.map((m) => m.seq),
    typesB,
    aNoEcho,
    stoppedAfterDisconnect,
    handleOk,
    requestResult,
  }, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
