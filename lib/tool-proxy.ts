// lib/tool-proxy.ts
// 工具代理 + 参数级权限引擎（Phase 3 P1）。
// 设计依据：DESIGN.md §6、Phase 3 任务书 P1。
//
// 职责：裁决一次跨用户工具调用 request（fromUserId 想在被调用方 toUserId
// 的环境执行 toolName），按房间权限表给出 approved_auto / approved_manual /
// rejected / blocked / timeout，并全量写审计日志。
//
// 裁决树（与任务书 P1 一致）：
//   1. 房间/参与者/权限级别校验（工具代理需 collaborate 及以上房间）
//   2. 工具在权限表中：
//        blocked            → 拒绝
//        whitelist          → checkParamFilters 通过 → 自动执行
//                            → 含未声明字段 → 拒绝（默认拒绝策略）
//                            → 仅值不匹配 pattern → 走人工批准（任务书步骤 2）
//        approval           → 走人工批准
//   3. 工具不在权限表：
//        full_control 房间  → 走人工批准（兜底弹窗）
//        collaborate 房间   → 拒绝（"协作 = 共享指定工具"，未指定不共享）
//
// 批准流程：60 秒窗口内同一用户同一工具最多弹窗 3 次（防轰炸）；
// 默认 30 秒超时自动拒绝；scope=session 记会话放行、scope=always 写白名单。
// 被调用方不在线（isOnline 回调返回 false）→ 请求入队，最长 5 分钟，
// 对方上线后由 flushOfflineQueue 转入批准流程。
//
// 本模块是纯后端裁决引擎，不直接发 UI/网络通知：
// - 弹窗诉求经 onApprovalRequested 回调暴露（P2 Approval UI / P6 集成接入）
// - 工具真实执行经 executor 注入（P6 接到被调用方工具运行时）
// - 权限表目前保存在内存（configurePermissions/setPermission），
//   P4 set-permission 工具持久化到 rooms/{roomId}.json 时调用同一入口
import type { RoomManager } from './room-manager.ts';
import type { MessageBus } from './message-bus.ts';
import type { AuditLog } from './audit-log.ts';

// ---------------------------------------------------------------------------
// 类型（任务书 P1）
// ---------------------------------------------------------------------------

export interface ToolPermission {
  toolName: string;
  mode: 'whitelist' | 'approval' | 'blocked';
  scope: 'once' | 'session' | 'always';
  /** 参数级正则过滤：key=参数名，pattern 需自锚定（建议 ^...$），test() 全串匹配 */
  paramFilters?: Record<string, { pattern: string; description: string }>;
  /** 仅批准模式：弹窗超时，默认 30000ms */
  approvalTimeoutMs?: number;
}

export interface ToolCallRequest {
  requestId: string;
  fromUserId: string;
  toUserId: string;
  toolName: string;
  params: Record<string, unknown>;
  timestamp: number;
}

export type ToolCallStatus =
  | 'approved_auto'   // 白名单自动放行并已执行
  | 'approved_manual' // 人工批准并已执行（含 session 免审执行）
  | 'rejected'        // 拒绝（参数未通过 / 用户点拒绝 / 频率限制 / 离线过期）
  | 'blocked'         // 显式禁用 / 房间级别不支持
  | 'timeout';        // 批准超时

export interface ToolCallResult {
  requestId: string;
  status: ToolCallStatus;
  /** 执行成功时的工具输出 */
  result?: unknown;
  error?: string;
}

/** 工具执行器：返回 { ok, output } 或 { ok:false, error }。由 P6 集成注入。 */
export type ToolExecutor = (
  roomId: string,
  request: ToolCallRequest
) => Promise<{ ok: boolean; output?: unknown; error?: string }>;

/** 批准弹窗信息（onApprovalRequested 载荷） */
export interface ApprovalRequestInfo {
  requestId: string;
  fromUserId: string;
  toUserId: string;
  toolName: string;
  params: Record<string, unknown>;
  timeoutMs: number;
  reason: 'approval_mode' | 'param_mismatch' | 'unconfigured';
}

export interface ToolProxyOptions {
  /** 工具执行器；未注入时裁决通过但返回 error=未注册执行器 */
  executor?: ToolExecutor;
  /** 被调用方在线判定；缺省视为永远在线（同机场景） */
  isOnline?: (roomId: string, userId: string) => boolean;
  /** 需要弹窗人工批准时触发（P2 UI / P6 广播接入点） */
  onApprovalRequested?: (roomId: string, info: ApprovalRequestInfo) => void;
  /** 请求因对方离线入队时触发（P6 可用于 UI 提示"已排队"） */
  onQueuedOffline?: (roomId: string, request: ToolCallRequest) => void;
  /** 时间源（测试注入用） */
  now?: () => number;
  /** 批准弹窗超时，默认 30000ms */
  defaultApprovalTimeoutMs?: number;
  /** 离线队列最长等待，默认 5 分钟 */
  offlineQueueTimeoutMs?: number;
}

// ---------------------------------------------------------------------------
// 常量
// ---------------------------------------------------------------------------

const DEFAULT_APPROVAL_TIMEOUT_MS = 30_000;
const DEFAULT_OFFLINE_QUEUE_TIMEOUT_MS = 5 * 60 * 1000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 3; // 同一工具 60 秒内最多弹窗 3 次

const PERMISSION_RANK: Record<string, number> = {
  readonly: 0,
  suggest: 1,
  collaborate: 2,
  full_control: 3,
};

type ApprovalReason = ApprovalRequestInfo['reason'];

/** 审批中的请求（等待 respondApproval 或超时） */
interface PendingApproval {
  roomId: string;
  request: ToolCallRequest;
  reason: ApprovalReason;
  createdAt: number;
  resolve: (r: ToolCallResult) => void;
  timer: ReturnType<typeof setTimeout>;
}

/** 离线队列中的请求（等待 flushOfflineQueue 或超时） */
interface QueuedCall {
  roomId: string;
  request: ToolCallRequest;
  reason: ApprovalReason;
  createdAt: number;
  resolve: (r: ToolCallResult) => void;
  timer: ReturnType<typeof setTimeout>;
}

// ---------------------------------------------------------------------------

export class ToolProxy {
  private roomManager: RoomManager;
  private messageBus: MessageBus; // 预留：P6 经 messageBus 广播 permission_request
  private auditLog: AuditLog;
  private opts: Required<Pick<ToolProxyOptions, 'now' | 'defaultApprovalTimeoutMs' | 'offlineQueueTimeoutMs'>> & ToolProxyOptions;

  /** roomId -> 权限表（内存态；P4 持久化接入同一入口） */
  private permissions = new Map<string, ToolPermission[]>();
  /** 会话级放行：roomId|from|to|tool（scope=session） */
  private sessionApprovals = new Set<string>();
  /** requestId -> 审批中的请求 */
  private pendingApprovals = new Map<string, PendingApproval>();
  /** requestId -> 离线队列中的请求 */
  private offlineQueue = new Map<string, QueuedCall>();
  /** `${userId}:${toolName}` -> 弹窗时间戳滑动窗口 */
  private rateHits = new Map<string, number[]>();
  /** pattern -> RegExp 缓存 */
  private regexCache = new Map<string, RegExp | null>();

  constructor(roomManager: RoomManager, messageBus: MessageBus, auditLog: AuditLog, opts: ToolProxyOptions = {}) {
    this.roomManager = roomManager;
    this.messageBus = messageBus;
    this.auditLog = auditLog;
    this.opts = {
      now: opts.now ?? Date.now,
      defaultApprovalTimeoutMs: opts.defaultApprovalTimeoutMs ?? DEFAULT_APPROVAL_TIMEOUT_MS,
      offlineQueueTimeoutMs: opts.offlineQueueTimeoutMs ?? DEFAULT_OFFLINE_QUEUE_TIMEOUT_MS,
      ...opts,
    };
  }

  // --------------------------------------------------------------------------
  // 权限配置（P4 set-permission / list-permissions 调用入口）
  // --------------------------------------------------------------------------

  /** 覆盖设置整个房间的权限表 */
  configurePermissions(roomId: string, permissions: ToolPermission[]): void {
    this.permissions.set(roomId, [...permissions]);
  }

  /** 设置单个工具权限（同名工具替换） */
  setPermission(roomId: string, permission: ToolPermission): void {
    const list = this.permissions.get(roomId) ?? [];
    const idx = list.findIndex((p) => p.toolName === permission.toolName);
    if (idx >= 0) list[idx] = permission;
    else list.push(permission);
    this.permissions.set(roomId, list);
  }

  getPermissions(roomId: string): ToolPermission[] {
    return this.permissions.get(roomId) ?? [];
  }

  // --------------------------------------------------------------------------
  // 核心：代理一次工具调用
  // --------------------------------------------------------------------------

  async proxyToolCall(roomId: string, request: ToolCallRequest): Promise<ToolCallResult> {
    if (!request || !request.requestId || !request.toolName) {
      return { requestId: request?.requestId ?? 'unknown', status: 'rejected', error: '请求不完整' };
    }

    // --- 房间/参与者校验 ---
    const room = this.roomManager.getRoom(roomId);
    if (!room || room.status !== 'active') {
      // 房间不存在/已关闭：无法确认房间身份，不写审计（防伪造 roomId 刷盘）
      return { requestId: request.requestId, status: 'rejected', error: room ? '房间已关闭' : '房间不存在' };
    }
    if ((PERMISSION_RANK[room.permissionLevel] ?? 0) < PERMISSION_RANK.collaborate) {
      return this.fail(roomId, request, 'blocked', '房间权限级别不支持工具代理（需 collaborate 及以上）', 'blocked', '房间权限级别不足');
    }
    const isParticipant = (userId: string) => room.participants.some((p) => p.userId === userId);
    if (!isParticipant(request.fromUserId) || !isParticipant(request.toUserId)) {
      const who = !isParticipant(request.fromUserId) ? '调用方' : '被调用方';
      return this.fail(roomId, request, 'blocked', `${who}不是房间参与者`, 'blocked', `${who}非参与者`);
    }

    const permission = this.findPermission(roomId, request.toolName);

    // --- 未配置工具 ---
    if (!permission) {
      if ((PERMISSION_RANK[room.permissionLevel] ?? 0) < PERMISSION_RANK.full_control) {
        return this.fail(roomId, request, 'blocked', `工具 ${request.toolName} 未配置权限（collaborate 房间需先 set-permission）`, 'blocked', '工具未配置');
      }
      // full_control：未配置 → 人工批准兜底
      return this.runApproval(roomId, request, 'unconfigured');
    }

    switch (permission.mode) {
      case 'blocked':
        return this.fail(roomId, request, 'blocked', `工具 ${request.toolName} 已被禁用`, 'blocked', '工具显式禁用');
      case 'whitelist': {
        const passed = this.checkParamFilters(request.toolName, request.params, [permission]);
        if (passed) {
          // 白名单全匹配 → 自动执行
          return this.execute(roomId, request, {
            approvalMode: 'whitelist',
            paramFilterResult: 'passed',
            approved: true,
          });
        }
        // 未通过：区分"默认拒绝(extra)"与"值不匹配(降级人工批准)"
        const extra = this.extraParamKeys(request.toolName, request.params, [permission]);
        if (extra.length > 0) {
          return this.fail(roomId, request, 'rejected', `参数含白名单未声明字段：${extra.join(', ')}（默认拒绝）`, 'whitelist', `默认拒绝：未声明字段 ${extra.join(', ')}`);
        }
        // pattern 值不匹配 → 任务书步骤 2：走批准流程
        return this.runApproval(roomId, request, 'param_mismatch', permission);
      }
      case 'approval':
        return this.runApproval(roomId, request, 'approval_mode', permission);
      default:
        return this.fail(roomId, request, 'blocked', `未知权限模式：${String((permission as ToolPermission).mode)}`, 'blocked', '未知权限模式');
    }
  }

  /**
   * 响应批准弹窗。
   * @param approved true=批准 / false=拒绝
   * @param scope once=仅本次 / session=本会话内该用户该工具不再询问 / always=写入白名单
   */
  async respondApproval(requestId: string, approved: boolean, scope?: 'once' | 'session' | 'always'): Promise<void> {
    const pending = this.pendingApprovals.get(requestId);
    if (!pending) return; // 已超时或不存在
    this.pendingApprovals.delete(requestId);
    clearTimeout(pending.timer);

    const { roomId, request, reason } = pending;
    if (!approved) {
      this.audit(roomId, request, {
        paramFilterResult: this.reasonParamResult(reason),
        approvalMode: 'manual',
        approved: false,
        result: { status: 'rejected', summary: '被调用方拒绝' },
      });
      pending.resolve({ requestId, status: 'rejected', error: '被调用方拒绝' });
      return;
    }

    let note: string | undefined;
    if (scope === 'always') {
      // 始终批准 → 写入白名单（无过滤 = 信任放行），后续自动执行
      this.setPermission(roomId, { toolName: request.toolName, mode: 'whitelist', scope: 'always' });
      note = '已写入白名单(always)';
    } else if (scope === 'session') {
      this.sessionApprovals.add(this.sessionKey(roomId, request.fromUserId, request.toUserId, request.toolName));
      note = '已批准本会话(session)';
    }

    const result = await this.execute(roomId, request, {
      approvalMode: 'manual',
      paramFilterResult: this.reasonParamResult(reason),
      approved: true,
      note,
    });
    pending.resolve(result);
  }

  /**
   * 检查参数是否匹配白名单过滤规则（纯函数，无副作用）。
   * 返回 true 仅当：工具存在 whitelist 条目 且
   *   - paramFilters 为空/缺省（信任放行），或
   *   - params 无未声明字段 且 每个声明字段的值匹配 pattern
   */
  checkParamFilters(toolName: string, params: Record<string, unknown>, permissions: ToolPermission[]): boolean {
    const perm = permissions.find((p) => p.toolName === toolName);
    if (!perm || perm.mode !== 'whitelist') return false;

    const filters = perm.paramFilters;
    if (!filters || Object.keys(filters).length === 0) return true; // 无过滤 = 允许所有

    // 默认拒绝：params 含 paramFilters 未声明的字段
    for (const key of Object.keys(params ?? {})) {
      if (!(key in filters)) return false;
    }

    // 每个声明字段的值必须完全匹配 pattern（test 全串；pattern 需自锚定）
    for (const [key, rule] of Object.entries(filters)) {
      if (!(key in (params ?? {}))) continue; // 未传该参数不判
      const re = this.regexFor(rule.pattern);
      if (!re || !re.test(paramToMatchString((params ?? {})[key]))) return false;
    }
    return true;
  }

  /**
   * 防轰炸：同一用户同一工具 60 秒窗口内是否还可发起批准弹窗（< 3 次）。
   * 窗口滑动：超过 60 秒的历史记录会被清理。
   */
  checkRateLimit(userId: string, toolName: string): boolean {
    const key = this.rateKey(userId, toolName);
    const now = this.opts.now();
    const cutoff = now - RATE_WINDOW_MS;
    const recent = (this.rateHits.get(key) ?? []).filter((t) => t >= cutoff);
    this.rateHits.set(key, recent);
    return recent.length < RATE_LIMIT;
  }

  // --------------------------------------------------------------------------
  // 批准流程
  // --------------------------------------------------------------------------

  private runApproval(roomId: string, request: ToolCallRequest, reason: ApprovalReason, permission?: ToolPermission): Promise<ToolCallResult> {
    // 会话级放行：此前 scope=session 批准过 → 免弹窗直接执行
    const sKey = this.sessionKey(roomId, request.fromUserId, request.toUserId, request.toolName);
    if (this.sessionApprovals.has(sKey)) {
      return this.execute(roomId, request, {
        approvalMode: 'manual',
        paramFilterResult: this.reasonParamResult(reason),
        approved: true,
        note: 'session 放行免弹窗',
      });
    }

    // 被调用方不在线 → 入队（最长 offlineQueueTimeoutMs）
    if (this.opts.isOnline && !this.opts.isOnline(roomId, request.toUserId)) {
      return this.enqueueOffline(roomId, request, reason);
    }

    // 防轰炸：超限直接拒绝
    if (!this.checkRateLimit(request.fromUserId, request.toolName)) {
      this.audit(roomId, request, {
        paramFilterResult: this.reasonParamResult(reason),
        approvalMode: 'manual',
        approved: false,
        result: { status: 'rejected', summary: `频率限制：${RATE_WINDOW_MS / 1000}秒内同工具弹窗超 ${RATE_LIMIT} 次` },
      });
      return Promise.resolve({ requestId: request.requestId, status: 'rejected', error: '频率限制：同一工具请求过于频繁，请稍后再试' });
    }
    this.hitRate(request.fromUserId, request.toolName);

    const timeoutMs = permission?.approvalTimeoutMs ?? this.opts.defaultApprovalTimeoutMs;
    return new Promise<ToolCallResult>((resolve) => {
      const timer = setTimeout(() => {
        this.pendingApprovals.delete(request.requestId);
        this.audit(roomId, request, {
          paramFilterResult: this.reasonParamResult(reason),
          approvalMode: 'manual',
          approved: false,
          result: { status: 'timeout', summary: `批准超时（${Math.round(timeoutMs / 1000)}s 未响应）` },
        });
        resolve({ requestId: request.requestId, status: 'timeout', error: '批准超时' });
      }, timeoutMs);
      this.pendingApprovals.set(request.requestId, { roomId, request, reason, createdAt: this.opts.now(), resolve, timer });
      this.opts.onApprovalRequested?.(roomId, {
        requestId: request.requestId,
        fromUserId: request.fromUserId,
        toUserId: request.toUserId,
        toolName: request.toolName,
        params: request.params,
        timeoutMs,
        reason,
      });
    });
  }

  /** 对方离线：入队等待。flushOfflineQueue 触发转批准，超时自动过期。 */
  private enqueueOffline(roomId: string, request: ToolCallRequest, reason: ApprovalReason): Promise<ToolCallResult> {
    return new Promise<ToolCallResult>((resolve) => {
      const timer = setTimeout(() => {
        this.offlineQueue.delete(request.requestId);
        this.audit(roomId, request, {
          paramFilterResult: this.reasonParamResult(reason),
          approvalMode: 'manual',
          approved: false,
          result: { status: 'rejected', summary: '对方离线超时，请求过期' },
        });
        resolve({ requestId: request.requestId, status: 'rejected', error: '对方长时间未上线，请求已过期' });
      }, this.opts.offlineQueueTimeoutMs);
      this.offlineQueue.set(request.requestId, { roomId, request, reason, createdAt: this.opts.now(), resolve, timer });
      this.opts.onQueuedOffline?.(roomId, request);
    });
  }

  /**
   * 参与者上线后调用：把离线队列中发给该用户的请求转入批准流程。
   * P6 集成（transport 连接恢复钩子）接入。
   */
  flushOfflineQueue(roomId: string, userId: string): void {
    for (const [requestId, q] of [...this.offlineQueue]) {
      if (q.roomId === roomId && q.request.toUserId === userId) {
        this.offlineQueue.delete(requestId);
        clearTimeout(q.timer);
        this.runApproval(roomId, q.request, q.reason).then(q.resolve, q.resolve);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 执行与审计
  // --------------------------------------------------------------------------

  private async execute(
    roomId: string,
    request: ToolCallRequest,
    decision: { approvalMode: 'whitelist' | 'manual'; paramFilterResult: 'passed' | 'rejected'; approved: boolean; note?: string }
  ): Promise<ToolCallResult> {
    const status: ToolCallStatus = decision.approvalMode === 'whitelist' ? 'approved_auto' : 'approved_manual';

    let output: unknown;
    let err: string | undefined;
    try {
      if (!this.opts.executor) throw new Error('未注册工具执行器（P6 集成接入）');
      const r = await this.opts.executor(roomId, request);
      if (!r.ok) err = r.error ?? '执行失败';
      else output = r.output;
    } catch (e) {
      err = e instanceof Error ? e.message : String(e);
    }

    const parts: string[] = [];
    if (decision.note) parts.push(decision.note);
    if (err !== undefined) parts.push(`错误: ${err}`);
    else if (output !== undefined) parts.push(`输出: ${truncate(summarizeValue(output), 300)}`);
    const summary = parts.length > 0 ? parts.join('；') : status;

    this.audit(roomId, request, {
      paramFilterResult: decision.paramFilterResult,
      approvalMode: decision.approvalMode,
      approved: decision.approved,
      result: { status: err !== undefined ? 'error' : 'executed', summary },
    });

    if (err !== undefined) return { requestId: request.requestId, status, error: err };
    return { requestId: request.requestId, status, result: output };
  }

  /** 拒绝路径的公共出口：统一写审计 + 组装失败结果 */
  private fail(
    roomId: string,
    request: ToolCallRequest,
    status: 'rejected' | 'blocked',
    error: string,
    approvalMode: 'whitelist' | 'manual' | 'blocked',
    summary: string
  ): ToolCallResult {
    this.audit(roomId, request, {
      paramFilterResult: 'rejected',
      approvalMode,
      approved: false,
      result: { status, summary },
    });
    return { requestId: request.requestId, status, error };
  }

  /** 写审计日志（失败静默，不打断主流程） */
  private audit(roomId: string, request: ToolCallRequest, fields: { paramFilterResult: 'passed' | 'rejected'; approvalMode: 'whitelist' | 'manual' | 'blocked'; approved: boolean; result?: { status: string; summary: string } }): void {
    try {
      this.auditLog.log({
        timestamp: this.opts.now(),
        roomId,
        fromUserId: request.fromUserId,
        toUserId: request.toUserId,
        toolName: request.toolName,
        params: request.params,
        ...fields,
      });
    } catch {
      /* ignore */
    }
  }

  // --------------------------------------------------------------------------
  // 查询辅助
  // --------------------------------------------------------------------------

  /** 列出房间内正在等待批准的请求（P2 UI 轮询/展示用） */
  listPendingApprovals(roomId?: string): Array<{ requestId: string; roomId: string; request: ToolCallRequest; reason: ApprovalReason; createdAt: number }> {
    const out: Array<{ requestId: string; roomId: string; request: ToolCallRequest; reason: ApprovalReason; createdAt: number }> = [];
    for (const p of this.pendingApprovals.values()) {
      if (!roomId || p.roomId === roomId) {
        out.push({ requestId: p.request.requestId, roomId: p.roomId, request: p.request, reason: p.reason, createdAt: p.createdAt });
      }
    }
    return out;
  }

  /** 离线队列中的请求数（诊断用） */
  get offlineQueueSize(): number {
    return this.offlineQueue.size;
  }

  /** 清理全部定时器并拒绝所有挂起请求（onunload 用） */
  dispose(): void {
    for (const [requestId, p] of [...this.pendingApprovals]) {
      clearTimeout(p.timer);
      this.pendingApprovals.delete(requestId);
      p.resolve({ requestId, status: 'timeout', error: '工具代理已关闭' });
    }
    for (const [requestId, q] of [...this.offlineQueue]) {
      clearTimeout(q.timer);
      this.offlineQueue.delete(requestId);
      q.resolve({ requestId, status: 'rejected', error: '工具代理已关闭' });
    }
    this.sessionApprovals.clear();
  }

  // --------------------------------------------------------------------------
  // 内部
  // --------------------------------------------------------------------------

  private findPermission(roomId: string, toolName: string): ToolPermission | undefined {
    return this.getPermissions(roomId).find((p) => p.toolName === toolName);
  }

  private extraParamKeys(toolName: string, params: Record<string, unknown>, permissions: ToolPermission[]): string[] {
    const perm = permissions.find((p) => p.toolName === toolName);
    if (!perm || !perm.paramFilters || Object.keys(perm.paramFilters).length === 0) return [];
    return Object.keys(params ?? {}).filter((k) => !(k in (perm.paramFilters as Record<string, unknown>)));
  }

  private reasonParamResult(reason: ApprovalReason): 'passed' | 'rejected' {
    // param_mismatch：白名单过滤未通过（值越界），靠人工补批 → 记 rejected
    return reason === 'param_mismatch' ? 'rejected' : 'passed';
  }

  private sessionKey(roomId: string, fromUserId: string, toUserId: string, toolName: string): string {
    return `${roomId}|${fromUserId}|${toUserId}|${toolName}`;
  }

  private rateKey(userId: string, toolName: string): string {
    return `${userId}:${toolName}`;
  }

  private hitRate(userId: string, toolName: string): void {
    const key = this.rateKey(userId, toolName);
    const now = this.opts.now();
    const recent = (this.rateHits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
    recent.push(now);
    this.rateHits.set(key, recent);
  }

  /** pattern -> RegExp 缓存；非法正则返回 null（视为永不匹配） */
  private regexFor(pattern: string): RegExp | null {
    const cached = this.regexCache.get(pattern);
    if (cached !== undefined) return cached;
    try {
      const re = new RegExp(pattern);
      this.regexCache.set(pattern, re);
      return re;
    } catch {
      this.regexCache.set(pattern, null);
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

/** 参数值 → 参与正则匹配的字符串 */
function paramToMatchString(v: unknown): string {
  if (v === undefined || v === null) return String(v); // "undefined" / "null"
  if (typeof v === 'string') return v;
  if (typeof v === 'object') return summarizeValue(v);
  return String(v);
}

/** 对象/数组安全序列化（失败降级为类型名） */
function summarizeValue(v: unknown): string {
  if (v === null) return 'null';
  if (typeof v === 'string') return v;
  const t = typeof v;
  if (t === 'number' || t === 'boolean' || t === 'bigint' || t === 'symbol') return String(v);
  if (t === 'function') return '[function]';
  if (t === 'undefined') return 'undefined';
  try {
    return JSON.stringify(v);
  } catch {
    return `[${Array.isArray(v) ? 'array' : 'object'}]`;
  }
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max)}…(截断)` : s;
}
