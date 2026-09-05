// scripts/phase3-tool-proxy.mjs
// Phase 3 P1(Tool Proxy) + P3(Audit Log) 本地 smoke test。
// 验证点（任务书 P1/P3 验证要求）：
//   1. paramFilters 正则匹配 通过/拒绝/边界
//   2. 默认拒绝策略（params 含未声明字段）
//   3. 防轰炸：同一工具 60 秒内最多弹窗 3 次，窗口滑动恢复
//   4. AuditLog 写入 + 查询（房间隔离/过滤/limit/坏行跳过/路径穿越）
//   5. 全链路：whitelist 自动 / param 不匹配降级人工批准 / approval 批准/拒绝/
//      session / always / 超时 / blocked / unconfigured / 离线入队 + flush
// 用法：node scripts/phase3-tool-proxy.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mod = (p) => import(pathToFileURL(path.join(root, p)).href);

const { RoomManager } = await mod('lib/room-manager.ts');
const { AuditLog } = await mod('lib/audit-log.ts');
const { ToolProxy } = await mod('lib/tool-proxy.ts');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = { ok: false, steps: [] };
const step = (name, pass, detail) => results.steps.push({ name, pass, ...(detail ?? {}) });

const makeCtx = (dataDir) => ({
  pluginId: 'session-bridge',
  userId: 'test-host',
  dataDir,
  log: { info() {}, warn() {}, error() {}, debug() {} },
});

/** 建房间并加入若干参与者（无密码 → join 后 approve） */
async function makeRoom(rm, hostId, level, users = []) {
  const roomId = await rm.createRoom({
    hostId,
    hostSessionPath: `/sessions/${hostId}`,
    permissionLevel: level,
  });
  for (const u of users) {
    await rm.joinRoom(roomId, { userId: u, sessionPath: `/sessions/${u}` });
    await rm.approveJoin(roomId, u);
  }
  return roomId;
}

const req = (requestId, toolName, params, fromUserId = 'alice', toUserId = 'bob') => ({
  requestId,
  fromUserId,
  toUserId,
  toolName,
  params: params ?? {},
  timestamp: Date.now(),
});

// ---------------------------------------------------------------------------
// A. AuditLog 模块
// ---------------------------------------------------------------------------
async function testAuditLog() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-audit-'));
  const audit = new AuditLog(tmp);
  const entry = (roomId, i, over = {}) => ({
    timestamp: 1000 + i,
    roomId,
    fromUserId: 'alice',
    toUserId: 'bob',
    toolName: 'read',
    params: { path: '/a.txt' },
    paramFilterResult: 'passed',
    approvalMode: 'whitelist',
    approved: true,
    result: { status: 'executed', summary: 'ok' },
    ...over,
  });

  audit.log(entry('ROOMAAA1', 1));
  audit.log(entry('ROOMAAA1', 2));
  audit.log(entry('ROOMAAA1', 3, { toolName: 'exec_command', params: { cmd: 'ipconfig' } }));
  audit.log(entry('ROOMBBB2', 4));
  audit.log(entry('ROOMBBB2', 5));

  const fileA = path.join(tmp, 'audit', 'ROOMAAA1.jsonl');
  step('audit_file_written', fs.existsSync(fileA) && fs.readFileSync(fileA, 'utf-8').trim().split('\n').length === 3, { file: fileA });
  step('audit_room_isolation', audit.query('ROOMAAA1').length === 3 && audit.query('ROOMBBB2').length === 2 && audit.query('ROOMZZZ9').length === 0, {});
  step('audit_query_from', audit.query('ROOMAAA1', { from: 'alice' }).length === 3 && audit.query('ROOMAAA1', { from: 'nobody' }).length === 0, {});
  step('audit_query_tool', audit.query('ROOMAAA1', { tool: 'exec_command' }).length === 1 && audit.query('ROOMAAA1', { tool: 'read' }).length === 2, {});
  const limited = audit.query('ROOMAAA1', { limit: 2 });
  step('audit_query_limit_newest_keep_order', limited.length === 2 && limited[0].timestamp < limited[1].timestamp, { timestamps: limited.map((e) => e.timestamp) });

  fs.appendFileSync(fileA, '{corrupt json line\n'); // 手动塞坏行
  step('audit_skip_corrupt_line', audit.query('ROOMAAA1').length === 3, {});

  audit.log(entry('../EVIL', 9)); // roomId 含路径分隔符
  step('audit_reject_path_traversal', !fs.existsSync(path.join(tmp, 'audit', '..', 'EVIL.jsonl')) && !fs.existsSync(path.join(tmp, 'EVIL.jsonl')), {});

  audit.log({ ...entry('ROOMAAA1', 10), params: { fn: () => 1, big: 10n, cyc: null } });
  const cyc = {}; cyc.self = cyc;
  audit.log({ ...entry('ROOMAAA1', 11), params: { cyc } });
  const afterUnsafe = audit.query('ROOMAAA1');
  step('audit_sanitize_unserializable', afterUnsafe.length === 5, { count: afterUnsafe.length });

  fs.rmSync(tmp, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// B. checkParamFilters 纯函数
// ---------------------------------------------------------------------------
function testCheckParamFilters() {
  const tp = new ToolProxy(null, {}, null); // 本场景只调纯方法
  const perms = [
    { toolName: 'read', mode: 'whitelist', scope: 'always', paramFilters: { path: { pattern: '^[a-z]+\\.txt$', description: '小写 txt 路径' } } },
    { toolName: 'ls', mode: 'whitelist', scope: 'always', paramFilters: {} },
    { toolName: 'open', mode: 'whitelist', scope: 'always' }, // 无 paramFilters
    { toolName: 'net_port', mode: 'whitelist', scope: 'always', paramFilters: { port: { pattern: '^\\d+$', description: '数字端口' } } },
    { toolName: 'multi', mode: 'whitelist', scope: 'always', paramFilters: { a: { pattern: '^x$', description: '' }, b: { pattern: '^y$', description: '' } } },
    { toolName: 'approval_tool', mode: 'approval', scope: 'once' },
    { toolName: 'blocked_tool', mode: 'blocked', scope: 'always' },
  ];

  step('filter_regex_match', tp.checkParamFilters('read', { path: 'a.txt' }, perms) === true, {});
  step('filter_regex_mismatch_value', tp.checkParamFilters('read', { path: 'A.txt' }, perms) === false, {}); // 大写
  step('filter_regex_boundary_trailing', tp.checkParamFilters('read', { path: 'a.txtx' }, perms) === false, {}); // 尾部多余
  step('filter_regex_escaped_dot', tp.checkParamFilters('read', { path: 'abxtxt' }, perms) === false, {}); // 点未字面（无 .txt）
  step('filter_regex_space_boundary', tp.checkParamFilters('read', { path: ' a.txt' }, perms) === false, {}); // 前导空格
  step('filter_empty_params_allowed', tp.checkParamFilters('ls', { anything: 1, other: 'x' }, perms) === true, {}); // {} = 全放行
  step('filter_missing_filters_allowed', tp.checkParamFilters('open', { anything: true }, perms) === true, {}); // 缺省 = 全放行
  step('filter_default_reject_extra_field', tp.checkParamFilters('read', { path: 'a.txt', flags: '-r' }, perms) === false, {}); // 默认拒绝
  step('filter_numeric_coerced', tp.checkParamFilters('net_port', { port: 8080 }, perms) === true && tp.checkParamFilters('net_port', { port: 'abc' }, perms) === false, {});
  step('filter_multi_field_all_must_match', tp.checkParamFilters('multi', { a: 'x', b: 'y' }, perms) === true && tp.checkParamFilters('multi', { a: 'x', b: 'z' }, perms) === false, {});
  step('filter_non_whitelist_mode', tp.checkParamFilters('approval_tool', { x: 1 }, perms) === false && tp.checkParamFilters('blocked_tool', { x: 1 }, perms) === false, {});
  step('filter_invalid_regex_no_throw', tp.checkParamFilters('read', { path: 'x' }, [{ toolName: 'read', mode: 'whitelist', scope: 'always', paramFilters: { path: { pattern: '(', description: '' } } }]) === false, {});
}

// ---------------------------------------------------------------------------
// C. proxyToolCall 全链路
// ---------------------------------------------------------------------------
async function testProxyFlow() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-proxy-'));
  const ctx = makeCtx(tmp);
  const rm = new RoomManager(ctx);
  const audit = new AuditLog(tmp);

  const roomC = await makeRoom(rm, 'host', 'collaborate', ['alice', 'bob']); // collaborate
  const roomF = await makeRoom(rm, 'host', 'full_control', ['alice', 'bob', 'carol']); // full_control
  const roomRO = await makeRoom(rm, 'host', 'readonly', ['alice', 'bob']); // readonly（工具代理禁用）

  const execCalls = [];

  // --- P1: 白名单自动 / blocked / 未配置 / 基础校验（无弹窗路径） ---
  const p1 = new ToolProxy(rm, {}, audit, {
    executor: async (_r, rq) => { execCalls.push(rq.toolName); return { ok: true, output: `out:${rq.toolName}` }; },
    onApprovalRequested: () => { throw new Error('P1 不应触发弹窗'); },
  });
  p1.configurePermissions(roomC, [
    { toolName: 'exec_command', mode: 'whitelist', scope: 'always', paramFilters: { cmd: { pattern: '^ipconfig$', description: '仅 ipconfig' } } },
    { toolName: 'ls', mode: 'whitelist', scope: 'always' },
    { toolName: 'rm', mode: 'blocked', scope: 'always' },
  ]);

  const rAuto = await p1.proxyToolCall(roomC, req('p1-1', 'exec_command', { cmd: 'ipconfig' }));
  step('flow_whitelist_auto', rAuto.status === 'approved_auto' && rAuto.result === 'out:exec_command' && execCalls.length === 1, { status: rAuto.status });

  const rExtra = await p1.proxyToolCall(roomC, req('p1-2', 'exec_command', { cmd: 'ipconfig', sudo: true }));
  step('flow_default_reject_extra', rExtra.status === 'rejected' && execCalls.length === 1 && /未声明字段/.test(rExtra.error ?? ''), { status: rExtra.status, error: rExtra.error });

  const rLs = await p1.proxyToolCall(roomC, req('p1-3', 'ls', { path: '/' }));
  step('flow_whitelist_no_filters', rLs.status === 'approved_auto', { status: rLs.status });

  const rRm = await p1.proxyToolCall(roomC, req('p1-4', 'rm', { target: '/' }));
  step('flow_blocked_tool', rRm.status === 'blocked' && execCalls.length === 2, { status: rRm.status });

  const rGit = await p1.proxyToolCall(roomC, req('p1-5', 'git', { cmd: 'status' }));
  step('flow_unconfigured_collaborate_blocked', rGit.status === 'blocked' && /未配置/.test(rGit.error ?? ''), { status: rGit.status });

  const rRO = await p1.proxyToolCall(roomRO, req('p1-6', 'read', { path: '/x' }));
  step('flow_readonly_room_blocked', rRO.status === 'blocked', { status: rRO.status });

  const rMallory = await p1.proxyToolCall(roomC, req('p1-7', 'ls', { path: '/' }, 'mallory', 'bob'));
  step('flow_non_participant_blocked', rMallory.status === 'blocked', { status: rMallory.status });

  const rNoRoom = await p1.proxyToolCall('NOPE1234', req('p1-8', 'ls', { path: '/' }));
  step('flow_room_missing_rejected', rNoRoom.status === 'rejected', { status: rNoRoom.status });

  const rBad = await p1.proxyToolCall(roomC, { requestId: 'p1-9', fromUserId: 'alice', toUserId: 'bob', toolName: '', params: {}, timestamp: Date.now() });
  step('flow_incomplete_request', rBad.status === 'rejected', { status: rBad.status });

  // --- P2: 人工批准路径（param_mismatch / manual 拒绝 / session / always / timeout / unconfigured） ---
  const p2Approvals = [];
  const p2 = new ToolProxy(rm, {}, audit, {
    executor: async (_r, rq) => { execCalls.push(rq.toolName); return { ok: rq.toolName !== 'fail_tool', output: `out:${rq.toolName}`, error: rq.toolName === 'fail_tool' ? 'boom' : undefined }; },
    onApprovalRequested: (_r, info) => p2Approvals.push({ requestId: info.requestId, toolName: info.toolName, reason: info.reason }),
  });
  p2.configurePermissions(roomF, [
    { toolName: 'exec_command', mode: 'whitelist', scope: 'always', paramFilters: { cmd: { pattern: '^ipconfig$', description: '仅 ipconfig' } } },
    { toolName: 'diagnose', mode: 'approval', scope: 'once' },
    { toolName: 'slow_tool', mode: 'approval', scope: 'once', approvalTimeoutMs: 80 },
    { toolName: 'gen_report', mode: 'approval', scope: 'once' },
  ]);

  // param 值不匹配白名单 → 降级人工批准
  const pMismatch = p2.proxyToolCall(roomF, req('p2-1', 'exec_command', { cmd: 'format C:' }));
  step('flow_param_mismatch_goes_approval', p2Approvals.length === 1 && p2Approvals[0].reason === 'param_mismatch', { approvals: [...p2Approvals] });
  await p2.respondApproval('p2-1', true); // 批准本次
  const rMismatch = await pMismatch;
  step('flow_param_mismatch_approved_manual', rMismatch.status === 'approved_manual' && rMismatch.result === 'out:exec_command', { status: rMismatch.status });

  // approval 模式 + 用户点拒绝
  const pRej = p2.proxyToolCall(roomF, req('p2-2', 'diagnose', {}));
  await p2.respondApproval('p2-2', false);
  const rRej = await pRej;
  step('flow_approval_rejected_by_user', rRej.status === 'rejected' && /拒绝/.test(rRej.error ?? ''), { status: rRej.status });

  // approval + scope=session：本次批准后，同 from/to/tool 免弹窗
  const pS1 = p2.proxyToolCall(roomF, req('p2-3', 'diagnose', {}));
  await p2.respondApproval('p2-3', true, 'session');
  const rS1 = await pS1;
  const beforeS2 = p2Approvals.length;
  const rS2 = await p2.proxyToolCall(roomF, req('p2-4', 'diagnose', {}));
  step('flow_session_scope_skips_approval', rS1.status === 'approved_manual' && rS2.status === 'approved_manual' && p2Approvals.length === beforeS2, { statusS1: rS1.status, statusS2: rS2.status, approvalsAfter: p2Approvals.length });

  // session 放行按 fromUserId 隔离：carol 发起的 diagnose 仍需弹窗
  const pS3 = p2.proxyToolCall(roomF, req('p2-5', 'diagnose', {}, 'carol', 'bob'));
  step('flow_session_scoped_per_user', p2Approvals.some((a) => a.requestId === 'p2-5'), {});
  await p2.respondApproval('p2-5', false);
  await pS3;

  // approval + scope=always → 写入白名单，后续自动
  const pA1 = p2.proxyToolCall(roomF, req('p2-6', 'gen_report', { fmt: 'pdf' }));
  await p2.respondApproval('p2-6', true, 'always');
  const rA1 = await pA1;
  const alwaysPerm = p2.getPermissions(roomF).find((pp) => pp.toolName === 'gen_report');
  const rA2 = await p2.proxyToolCall(roomF, req('p2-7', 'gen_report', { fmt: 'pdf' }));
  step('flow_always_writes_whitelist', rA1.status === 'approved_manual' && alwaysPerm?.mode === 'whitelist' && rA2.status === 'approved_auto', { rA2: rA2.status, alwaysMode: alwaysPerm?.mode });

  // full_control + 未配置工具 → 人工批准兜底
  const pU = p2.proxyToolCall(roomF, req('p2-8', 'random_tool', { x: 1 }));
  step('flow_unconfigured_fullcontrol_approval', p2Approvals.some((a) => a.requestId === 'p2-8' && a.reason === 'unconfigured'), {});
  await p2.respondApproval('p2-8', true);
  const rU = await pU;
  step('flow_unconfigured_fullcontrol_approved', rU.status === 'approved_manual', { status: rU.status });

  // executor 执行失败：状态仍 approved_manual，error 带回
  const pFail = p2.proxyToolCall(roomF, req('p2-9', 'fail_tool', {}));
  await p2.respondApproval('p2-9', true);
  const rFail = await pFail;
  step('flow_executor_error_reported', rFail.status === 'approved_manual' && /boom/.test(rFail.error ?? ''), { status: rFail.status, error: rFail.error });

  // respondApproval 未知 requestId → no-op 不抛
  let noopOk = true;
  try { await p2.respondApproval('p2-nonexistent', true); } catch { noopOk = false; }
  step('flow_respond_unknown_noop', noopOk, {});

  // 超时自动拒绝
  const pTimeout = p2.proxyToolCall(roomF, req('p2-10', 'slow_tool', {}));
  const rTimeout = await pTimeout; // 80ms 超时
  step('flow_approval_timeout', rTimeout.status === 'timeout', { status: rTimeout.status });

  // --- P3: 防轰炸（独立房间 + 注入时间源） ---
  let fakeNow = 1_000_000;
  const roomSpam = await makeRoom(rm, 'host', 'full_control', ['spammer', 'victim']);
  const spamApprovals = [];
  const p3 = new ToolProxy(rm, {}, audit, {
    now: () => fakeNow,
    onApprovalRequested: (_r, info) => spamApprovals.push(info.requestId),
  });
  // roomSpam 未配置任何工具 → full_control 全部走 approval

  const calls = ['b1', 'b2', 'b3', 'b4'].map((id) => p3.proxyToolCall(roomSpam, req(id, 'ping', {}, 'spammer', 'victim')));
  const rB4 = await calls[3];
  step('flow_antispam_4th_rejected', rB4.status === 'rejected' && /频率限制/.test(rB4.error ?? '') && spamApprovals.length === 3, { status: rB4.status, approvals: spamApprovals.length });
  for (const id of ['b1', 'b2', 'b3']) await p3.respondApproval(id, true);
  const rB1 = await calls[0];
  step('flow_antispam_first3_approved', rB1.status === 'approved_manual', { status: rB1.status });

  fakeNow += 61_000; // 窗口滑动
  const afterWindow = p3.proxyToolCall(roomSpam, req('b5', 'ping', {}, 'spammer', 'victim'));
  step('flow_antispam_window_slides', spamApprovals.length === 4, { approvals: spamApprovals.length });
  await p3.respondApproval('b5', true);
  const rB5 = await afterWindow;
  step('flow_antispam_recovers_after_window', rB5.status === 'approved_manual', { status: rB5.status });

  // --- P4: 离线入队 + flush + 过期 ---
  const roomAway = await makeRoom(rm, 'host', 'full_control', ['caller', 'away']);
  const queued = [];
  let awayOnline = false; // 动态在线状态：flush 前设为 true 模拟上线事件
  const p4 = new ToolProxy(rm, {}, audit, {
    isOnline: (_r, u) => u === 'caller' || (u === 'away' && awayOnline),
    executor: async (_r, rq) => { execCalls.push(rq.toolName); return { ok: true, output: 'offline-exec' }; },
    onQueuedOffline: (_r, rq) => queued.push(rq.requestId),
  });
  const pOff = p4.proxyToolCall(roomAway, req('q1', 'read', { path: '/x' }, 'caller', 'away'));
  step('flow_offline_queued_not_approved', p4.offlineQueueSize === 1 && queued.length === 1, { queueSize: p4.offlineQueueSize });
  awayOnline = true; // 对方上线
  p4.flushOfflineQueue(roomAway, 'away'); // → 转入批准流程
  step('flow_offline_flush_goes_approval', p4.offlineQueueSize === 0, { queueSize: p4.offlineQueueSize });
  await p4.respondApproval('q1', true);
  const rQ1 = await pOff;
  step('flow_offline_flush_executed', rQ1.status === 'approved_manual' && rQ1.result === 'offline-exec', { status: rQ1.status });

  // 离线超时（60ms）
  const p4b = new ToolProxy(rm, {}, audit, {
    isOnline: () => false,
    offlineQueueTimeoutMs: 60,
  });
  const pExp = p4b.proxyToolCall(roomAway, req('q2', 'read', { path: '/x' }, 'caller', 'away'));
  const rQ2 = await pExp;
  step('flow_offline_expire_rejected', rQ2.status === 'rejected' && /过期/.test(rQ2.error ?? '') && p4b.offlineQueueSize === 0, { status: rQ2.status });

  // --- 审计抽查 ---
  const roomCExec = audit.query(roomC, { tool: 'exec_command' });
  step('audit_whitelist_auto_entry', roomCExec.some((e) => e.approvalMode === 'whitelist' && e.paramFilterResult === 'passed' && e.approved === true && e.result?.status === 'executed'), { entries: roomCExec.map((e) => `${e.paramFilterResult}/${e.approvalMode}/${e.approved}`) });
  step('audit_whitelist_reject_entry', roomCExec.some((e) => e.approvalMode === 'whitelist' && e.paramFilterResult === 'rejected' && e.approved === false && /未声明字段/.test(e.result?.summary ?? '')), {});
  const roomFManual = audit.query(roomF, { from: 'alice', tool: 'exec_command' });
  step('audit_param_mismatch_manual_entry', roomFManual.some((e) => e.approvalMode === 'manual' && e.paramFilterResult === 'rejected' && e.approved === true), { entries: roomFManual.map((e) => `${e.paramFilterResult}/${e.approvalMode}/${e.approved}`) });
  step('audit_blocked_entry', audit.query(roomC, { tool: 'rm' }).some((e) => e.approvalMode === 'blocked' && e.approved === false), {});
  step('audit_frequency_limit_entry', audit.query(roomSpam, { tool: 'ping' }).some((e) => /频率限制/.test(e.result?.summary ?? '')), {});
  step('audit_timeout_entry', audit.query(roomF, { tool: 'slow_tool' }).some((e) => e.result?.status === 'timeout' && e.approved === false), {});
  step('audit_offline_expire_entry', audit.query(roomAway, { from: 'caller', tool: 'read' }).some((e) => /离线/.test(e.result?.summary ?? '')), {});

  rm.dispose();
  fs.rmSync(tmp, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
await testAuditLog();
testCheckParamFilters();
await testProxyFlow();

results.ok = results.steps.every((s) => s.pass);
console.log(JSON.stringify(results, null, 2));
process.exit(results.ok ? 0 : 1);
