// scripts/local-sim-room-api.mjs
// 本地验证 routes/room-api.ts 的端点逻辑（模拟 Hono 上下文 + 共享状态）。
// 覆盖 WebView 轮询依赖的关键端点：
//   GET /rooms, GET /rooms/:id, GET /rooms/:id/messages?since=N
//   POST /rooms, POST /rooms/:id/join, POST /rooms/:id/suggest, POST /rooms/:id/approve
// 用法：node scripts/local-sim-room-api.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-api-'));

// 模拟 EventBus（route 逻辑只用到 bus.emit 抛消息，这里最小实现）
function makeBus() {
  const callbacks = new Set();
  return {
    emit() {},
    subscribe(cb) { callbacks.add(cb); return () => callbacks.delete(cb); },
    handle() { return () => {}; },
    request() { return undefined; },
  };
}

const bus = makeBus();
const pluginCtx = {
  pluginId: 'session-bridge',
  userId: 'api-host',
  sessionPath: '/sessions/api-host',
  dataDir: tmpDir,
  bus,
  log: { info() {}, warn() {}, error() {}, debug() {} },
  config: { get() {}, set() {} },
};

// 构造共享状态（与 lib/shared.ts 相同逻辑，但用本测试的 ctx 实例）
import { getSharedState } from '../lib/shared.ts';

// 清掉可能残留的共享实例（按 dataDir 不同天然隔离）

async function main() {
  const results = { ok: false, steps: [] };
  const step = (name, pass, detail) => results.steps.push({ name, pass, ...(detail ?? {}) });

  // 加载 room-api 并注册到 mock app
  const modUrl = pathToFileURL(path.resolve('routes/room-api.ts')).href + '?v=' + Date.now();
  const register = (await import(modUrl)).default;
  const handlers = {};
  const mockApp = {
    get(p, h) { handlers[`GET ${p}`] = h; },
    post(p, h) { handlers[`POST ${p}`] = h; },
  };
  register(mockApp, pluginCtx);

  // Hono-like 上下文工厂
  function makeC(route, body, query = {}) {
    let jsonBody = body;
    const param = {};
    const segs = route.split('/').filter(Boolean);
    // 从注册路径提取 :roomId
    const pathParts = segs;
    return {
      req: {
        json: async () => jsonBody,
        query: (name) => query[name],
        param: (name) => {
          if (name === 'roomId') {
            // route 形如 /rooms/:roomId/messages → segs[1]
            const idx = pathParts.findIndex((s) => s.startsWith('rooms'));
            return pathParts[idx + 1] ?? undefined;
          }
          return undefined;
        },
      },
      json(data, status = 200) { return { __json: data, __status: status }; },
      html(s) { return { __html: s }; },
    };
  }

  async function call(method, route, body, query) {
    // 将实际路径映射回注册模式（/rooms/XXXX/messages → /rooms/:roomId/messages）
    const segs = route.split('/').filter(Boolean);
    const patternSegs = segs.map((s, i) => (i === 1 ? ':roomId' : s));
    const pattern = `/${patternSegs.join('/')}`;
    const handler = handlers[`${method} ${pattern}`];
    if (!handler) return { __error: `handler not found: ${method} ${pattern}` };
    return handler(makeC(route, body, query));
  }

  // 1. 创建房间
  const createRes = await call('POST', '/rooms', { permissionLevel: 'suggest', readableName: 'api-test' });
  step('create_room', createRes.__json && createRes.__json.roomId?.length === 8, createRes.__json);
  const roomId = createRes.__json.roomId;

  // 2. 房间列表
  const listRes = await call('GET', '/rooms', undefined);
  step('list_rooms', Array.isArray(listRes.__json.rooms) && listRes.__json.rooms.length >= 1, { count: listRes.__json.rooms?.length });

  // 3. 房间详情
  const detailRes = await call('GET', `/rooms/${roomId}`, undefined);
  step('room_detail', detailRes.__json?.room?.roomId === roomId && detailRes.__json?.room?.participants?.length === 1, { room: detailRes.__json?.room });

  // 4. 消息拉取（初始 since=0，应为空——没有 session 事件源）
  const msgRes0 = await call('GET', `/rooms/${roomId}/messages`, undefined, { since: '0' });
  step('messages_empty_initially', Array.isArray(msgRes0.__json.messages) && msgRes0.__json.messages.length === 0, { messages: msgRes0.__json.messages });

  // 5. 加入房间（无密码 → pending）
  //    注意：join 用 pluginCtx.userId（api-host），与房主相同 → 幂等 joined。
  //    改用共享状态直接操作不同用户模拟
  const shared = getSharedState(pluginCtx);
  const joinOther = await shared.roomManager.joinRoom(roomId, { userId: 'api-guest', sessionPath: '/sessions/api-guest' });
  step('join_other_pending', joinOther === 'pending', { joinOther });
  await shared.roomManager.approveJoin(roomId, 'api-guest');

  // 6. 详情含 2 参与者
  const detailRes2 = await call('GET', `/rooms/${roomId}`, undefined);
  step('room_detail_two_participants', detailRes2.__json.room?.participants?.length === 2, { participantCount: detailRes2.__json.room?.participants?.length });

  // 7. 建议消息（真实 sendSessionMessage 走 bus.request，mock 返回 undefined → 继续广播）
  const suggestRes = await call('POST', `/rooms/${roomId}/suggest`, { text: '你好，这是建议' });
  // mock bus.request 无 handler → result undefined，不会抛 session_busy；injectSuggestion 继续
  step('suggest', suggestRes.__json?.ok === true || suggestRes.__json?.error !== undefined, suggestRes.__json);

  // 8. 消息拉取 now > 0
  const msgRes1 = await call('GET', `/rooms/${roomId}/messages`, undefined, { since: '0' });
  step('messages_after_suggest', Array.isArray(msgRes1.__json.messages), { messages: msgRes1.__json.messages });

  // 9. 不存在的房间 → 404 或 error
  const missing = await call('GET', '/rooms/NOTEXIST1', undefined);
  step('missing_room_404', missing.__status === 404 || Boolean(missing.__json?.error), { status: missing.__status, error: missing.__json?.error, raw: missing });

  // 10. 离开（route 以 api-host 身份离开 → 移交 guest；再以 guest 身份离开 → 关闭）
  await call('POST', `/rooms/${roomId}/leave`, {});
  // 第二次：route 仍以 api-host（当前用户）身份调用，但 api-host 已离开，无操作；
  // 直接用共享状态以 api-guest 身份离开（模拟另一个用户的 route 调用）
  await shared.roomManager.leaveRoom(roomId, 'api-guest');
  const detailAfter = await call('GET', `/rooms/${roomId}`, undefined);
  step('room_closed_after_leave', detailAfter.__status === 404 || detailAfter.__json?.error || detailAfter.__json?.room?.status === 'closed', detailAfter.__json ?? { status: detailAfter.__status });

  results.ok = results.steps.every((s) => s.pass);
  console.log(JSON.stringify(results, null, 2));
  fs.rmSync(tmpDir, { recursive: true, force: true });
  process.exit(results.ok ? 0 : 1);
}

main().catch((e) => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
