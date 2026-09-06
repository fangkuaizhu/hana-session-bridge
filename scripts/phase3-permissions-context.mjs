// scripts/phase3-permissions-context.mjs
// Phase 3 P4(权限工具+模板+持久化) + P5(多 Agent 上下文同步) 本地 smoke test。
// 验证点：
//   P4: PRESETS 模板结构 / validatePermission / RoomManager 持久化读写（磁盘闭环）/
//       set-permission + list-permissions 工具（房主限制/非法正则/覆盖）/ 装配灌权限
//   P5: ensureAgents（创建/幂等/权限级别门槛）/ injectSharedContext（消息摘要注入）
// 用法：node scripts/phase3-permissions-context.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mod = (p) => import(pathToFileURL(path.join(root, p)).href);

const { RoomManager } = await mod('lib/room-manager.ts');
const { MessageBus } = await mod('lib/message-bus.ts');
const { EventBusTransport } = await mod('lib/eventbus-transport.ts');
const { ContextSync } = await mod('lib/context-sync.ts');
const { ToolProxy } = await mod('lib/tool-proxy.ts');
const { AuditLog } = await mod('lib/audit-log.ts');
const { PRESETS, PRESET_NAMES, validatePermission, presetCopy } = await mod('lib/permission-templates.ts');
const { getSharedState, disposeAll } = await mod('lib/shared.ts');
const setPermTool = await mod('tools/set-permission.ts');
const listPermTool = await mod('tools/list-permissions.ts');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = { ok: false, steps: [] };
const step = (name, pass, detail) => results.steps.push({ name, pass, ...(detail ?? {}) });

function makeBus() {
  const callbacks = new Set();
  const handles = new Map();
  return {
    emit(type, payload) { for (const cb of callbacks) cb(type, payload); return undefined; },
    subscribe(cb) { callbacks.add(cb); return () => callbacks.delete(cb); },
    handle(type, handler) { handles.set(type, handler); return () => handles.delete(type); },
    request(type, payload) { const h = handles.get(type); return h ? h(payload) : undefined; },
  };
}

function makeCtx(dataDir, userId) {
  const bus = makeBus();
  return {
    pluginId: 'session-bridge',
    userId,
    dataDir,
    bus,
    sessionPath: `/sessions/${userId}`,
    config: { get() { return undefined; } },
    log: { info() {}, warn() {}, error() {}, debug() {} },
  };
}

const mkMsg = (roomId, seq, from, type, payload) => ({ roomId, from, seq, type, payload, timestamp: 1000 + seq });

// ---------------------------------------------------------------------------
// A. P4：模板 + 校验
// ---------------------------------------------------------------------------
function testTemplates() {
  const allValid = [];
  for (const name of PRESET_NAMES) {
    for (const perm of PRESETS[name]) {
      const err = validatePermission(perm);
      if (err) allValid.push(`${name}:${perm.toolName}:${err}`);
    }
  }
  step('p4_presets_all_valid', allValid.length === 0, { errors: allValid });

  const diagCmd = PRESETS.diagnostics[0];
  const cmdRe = new RegExp(diagCmd.paramFilters.cmd.pattern);
  step('p4_presets_diagnostics_cmd_regex', cmdRe.test('ipconfig') && cmdRe.test('netstat -ano') && !cmdRe.test('rm -rf /'), {});
  step('p4_presets_scope_defaulted', PRESETS.diagnostics.every((p) => ['once', 'session', 'always'].includes(p.scope)), {});

  const copy = presetCopy('strict');
  copy[0].toolName = 'mutated';
  step('p4_preset_copy_isolated', PRESETS.strict[0].toolName === 'read', {});

  step('p4_validate_invalid_mode', validatePermission({ toolName: 'x', mode: 'evil' }) !== null, {});
  step('p4_validate_invalid_regex', validatePermission({ toolName: 'x', mode: 'whitelist', paramFilters: { cmd: { pattern: '(', description: '' } } }) !== null, {});
  step('p4_validate_invalid_filters_shape', validatePermission({ toolName: 'x', mode: 'whitelist', paramFilters: 'nope' }) !== null, {});
  step('p4_validate_missing_toolname', validatePermission({ mode: 'blocked' }) !== null, {});
}

// ---------------------------------------------------------------------------
// B. P4：RoomManager 持久化 + 工具 execute（真实 getSharedState 装配）
// ---------------------------------------------------------------------------
async function testPersistenceAndTools() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-p4-'));
  const hostCtx = makeCtx(tmp, 'host-user');
  const guestCtx = makeCtx(tmp, 'guest-user');

  // 1. 独立实例：RoomManager 持久化读写 + 重载
  const rm1 = new RoomManager(hostCtx);
  const roomId = await rm1.createRoom({ hostId: 'host-user', hostSessionPath: '/sessions/host-user', permissionLevel: 'collaborate' });
  const permA = { toolName: 'exec_command', mode: 'whitelist', scope: 'always', paramFilters: { cmd: { pattern: '^ipconfig$', description: 'ipconfig' } } };
  const permB = { toolName: 'ls', mode: 'whitelist', scope: 'always' };
  await rm1.setToolPermission(roomId, permA);
  await rm1.setToolPermission(roomId, permB);
  const onDisk = JSON.parse(fs.readFileSync(path.join(tmp, 'rooms', `${roomId}.json`), 'utf-8'));
  step('p4_room_json_has_toolPermissions', Array.isArray(onDisk.toolPermissions) && onDisk.toolPermissions.length === 2, { onDisk: onDisk.toolPermissions?.length });
  step('p4_get_tool_permissions', rm1.getToolPermissions(roomId).length === 2, {});

  await rm1.setToolPermission(roomId, { toolName: 'exec_command', mode: 'blocked', scope: 'always' }); // 同名覆盖
  const afterOverride = rm1.getToolPermissions(roomId);
  step('p4_set_permission_upsert', afterOverride.length === 2 && afterOverride.find((p) => p.toolName === 'exec_command')?.mode === 'blocked', {});

  const removed = await rm1.removeToolPermission(roomId, 'ls');
  step('p4_remove_permission', removed === true && rm1.getToolPermissions(roomId).length === 1, {});

  // 新实例重载（磁盘闭环）
  const rm2 = new RoomManager(hostCtx);
  step('p4_reload_from_disk', rm2.getToolPermissions(roomId).length === 1 && rm2.getToolPermissions(roomId)[0].toolName === 'exec_command', {});
  rm1.dispose(); rm2.dispose();

  // 2. getSharedState 装配 + 工具 execute
  const { roomManager, toolProxy, auditLog } = getSharedState(hostCtx);
  const toolRoom = await roomManager.createRoom({ hostId: 'host-user', hostSessionPath: '/sessions/host-user', permissionLevel: 'full_control' });
  await roomManager.joinRoom(toolRoom, { userId: 'guest-user', sessionPath: '/sessions/guest-user' });
  await roomManager.approveJoin(toolRoom, 'guest-user');
  auditLog && undefined; // auditLog 已装配（仅确认可解构）

  const rSet = await setPermTool.execute({
    roomId: toolRoom,
    toolName: 'read',
    mode: 'whitelist',
    paramFilters: { path: { pattern: '^C:\\\\Users\\\\', description: '用户目录' } },
  }, hostCtx);
  step('p4_tool_set_permission_host', rSet.ok === true && rSet.permissions.length === 1 && toolProxy.getPermissions(toolRoom).length === 1, { ok: rSet.ok });

  // 持久化闭环：room json 已含该条
  const diskRoom = JSON.parse(fs.readFileSync(path.join(tmp, 'rooms', `${toolRoom}.json`), 'utf-8'));
  step('p4_tool_write_through_to_disk', diskRoom.toolPermissions?.length === 1 && diskRoom.toolPermissions[0].toolName === 'read', {});

  // 非房主 → 拒绝
  const rGuestSet = await setPermTool.execute({ roomId: toolRoom, toolName: 'ls', mode: 'whitelist' }, guestCtx);
  step('p4_tool_set_permission_requires_host', rGuestSet.error !== undefined && /房主/.test(rGuestSet.error ?? ''), { error: rGuestSet.error });

  // 非法正则 → 拒绝
  const rBadRe = await setPermTool.execute({ roomId: toolRoom, toolName: 'grep', mode: 'whitelist', paramFilters: { pattern: { pattern: '(', description: '' } } }, hostCtx);
  step('p4_tool_reject_invalid_regex', rBadRe.error !== undefined && /正则/.test(rBadRe.error ?? ''), { error: rBadRe.error });

  // list-permissions：参与者可查看；陌生人拒绝
  const rList = await listPermTool.execute({ roomId: toolRoom }, guestCtx);
  step('p4_tool_list_permissions', rList.permissions?.length === 1 && rList.permissionLevel === 'full_control', { count: rList.permissions?.length });
  const strangerCtx = makeCtx(tmp, 'stranger');
  const rStranger = await listPermTool.execute({ roomId: toolRoom }, strangerCtx);
  step('p4_tool_list_requires_participant', rStranger.error !== undefined, { error: rStranger.error });

  // 3. 装配灌权限：dispose 后重载同 dataDir，toolProxy 应自动拿到磁盘权限
  disposeAll();
  const state2 = getSharedState(hostCtx);
  step('p4_reload_seeds_toolproxy', state2.toolProxy.getPermissions(toolRoom).length === 1 && state2.toolProxy.getPermissions(toolRoom)[0].toolName === 'read', {});
  disposeAll();

  fs.rmSync(tmp, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// C. P5：ContextSync（fake vendor 注入）
// ---------------------------------------------------------------------------
async function testContextSync() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-p5-'));
  const ctx = makeCtx(tmp, 'host-user');
  const rm = new RoomManager(ctx);
  const transport = new EventBusTransport(ctx, { selfId: 'host-user' });
  const mb = new MessageBus(transport, rm, ctx);

  const created = []; // { input }
  const fakeCreateAgent = async (_c, input) => {
    created.push(input);
    return { agentId: `agent-${input.name}` };
  };
  const sent = []; // { target, input }
  const fakeSend = async (_c, target, input) => { sent.push({ target, input }); return { ok: true, accepted: true }; };

  const cs = new ContextSync(ctx, rm, mb, { createAgent: fakeCreateAgent, sendSessionMessage: fakeSend });

  // collaborate 房间（host + alice）
  const collabRoom = await rm.createRoom({ hostId: 'host-user', hostSessionPath: '/sessions/host-user', permissionLevel: 'collaborate' });
  await rm.joinRoom(collabRoom, { userId: 'alice', sessionPath: '/sessions/alice' });
  await rm.approveJoin(collabRoom, 'alice');

  const rAgents = await cs.ensureAgents(collabRoom);
  step('p5_ensure_agents_created_all', rAgents.agents.length === 2 && rAgents.agents.every((a) => a.created === true && a.agentId.startsWith('agent-')), { agents: rAgents.agents });

  // 幂等：第二次不重复创建
  const beforeCount = created.length;
  const rAgents2 = await cs.ensureAgents(collabRoom);
  step('p5_ensure_agents_idempotent', created.length === beforeCount && rAgents2.agents.every((a) => a.created === false), { createdCalls: created.length });
  step('p5_agents_recorded_on_participants', rm.getRoom(collabRoom).participants.every((p) => p.agentId?.startsWith('agent-')), {});

  // readonly 房间：不创建
  const roRoom = await rm.createRoom({ hostId: 'host-user', hostSessionPath: '/sessions/host-user', permissionLevel: 'readonly' });
  const rRo = await cs.ensureAgents(roRoom);
  step('p5_ensure_agents_skips_low_permission', rRo.agents.length === 0 && rRo.notice !== undefined, { notice: rRo.notice });

  // 不存在的房间 → 抛错
  let threw = false;
  try { await cs.ensureAgents('NOPE1234'); } catch { threw = true; }
  step('p5_ensure_agents_missing_room_throws', threw, {});

  // injectSharedContext：塞几条消息后注入
  mb.messageStore.push(collabRoom, mkMsg(collabRoom, 1, 'alice', 'user_message', { text: '帮我看看这个报错' }));
  mb.messageStore.push(collabRoom, mkMsg(collabRoom, 2, 'host-user', 'tool_call', { toolName: 'read', args: { path: '/tmp/x' } }));
  mb.messageStore.push(collabRoom, mkMsg(collabRoom, 3, 'host-user', 'agent_reply', { text: '读到了，是编码问题' }));

  const inj = await cs.injectSharedContext(collabRoom, '/sessions/host-user');
  const lastSent = sent[sent.length - 1];
  const beforeUser = String(lastSent?.input?.context?.beforeUser ?? '');
  step('p5_inject_sends_with_context', inj.ok === true && inj.messageCount === 3 && beforeUser.includes(`房间 ${collabRoom}`) && beforeUser.includes('#1') && beforeUser.includes('工具调用 read'), {
    messageCount: inj.messageCount,
    hasRoom: beforeUser.includes(`房间 ${collabRoom}`),
  });
  step('p5_inject_context_contains_summaries', beforeUser.includes('帮我看看这个报错') && beforeUser.includes('编码问题'), { snippet: beforeUser.slice(0, 200) });

  // 空消息房间：仍注入（仅头部上下文）
  const emptyRoom = await rm.createRoom({ hostId: 'host-user', hostSessionPath: '/sessions/host-user', permissionLevel: 'full_control' });
  const injEmpty = await cs.injectSharedContext(emptyRoom, '/sessions/alice');
  step('p5_inject_empty_room_ok', injEmpty.ok === true && injEmpty.messageCount === 0, {});

  // 房间不存在 → error 不抛
  const injMissing = await cs.injectSharedContext('NOPE1234', '/sessions/x');
  step('p5_inject_missing_room_error', injMissing.ok === false && injMissing.error !== undefined, { error: injMissing.error });

  // formatSharedContext 截断保护：超长消息不炸
  const { formatSharedContext } = await mod('lib/context-sync.ts');
  const bigRoom = await rm.createRoom({ hostId: 'host-user', hostSessionPath: '/sessions/host-user', permissionLevel: 'suggest' });
  mb.messageStore.push(bigRoom, mkMsg(bigRoom, 1, 'alice', 'user_message', { text: 'x'.repeat(50000) }));
  const fmt = formatSharedContext(bigRoom, mb.messageStore.getAll(bigRoom));
  step('p5_format_truncates_long', fmt.length < 20000, { len: fmt.length });

  rm.dispose();
  fs.rmSync(tmp, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
await testTemplates();
await testPersistenceAndTools();
await testContextSync();

results.ok = results.steps.every((s) => s.pass);
console.log(JSON.stringify(results, null, 2));
process.exit(results.ok ? 0 : 1);
