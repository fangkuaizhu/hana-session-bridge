// lib/audit-log.ts
// 审计日志（Phase 3 P3）：每次工具代理调用追加一条 JSONL 记录。
// 存储位置：{dataDir}/audit/{roomId}.jsonl
//   - dataDir 由调用方传入；插件侧传 ctx.dataDir（= plugin-data/session-bridge，
//     见 DESIGN.md §3.1 数据模型），与 RoomManager 的 rooms/ 同级。
// 设计依据：DESIGN.md §6.3、Phase 3 任务书 P3。
//
// 约束：
// - 纯追加，不修改历史行；单行损坏跳过不阻断查询
// - roomId 用于拼文件名，白名单校验防路径穿越
// - log() 失败静默（审计不能打断工具代理主流程）
import fs from 'node:fs';
import path from 'node:path';
import { appendJSONL } from './store.ts';

export interface AuditEntry {
  timestamp: number;
  roomId: string;
  fromUserId: string;
  toUserId: string;
  toolName: string;
  /** 工具参数（已清洗为可 JSON 序列化） */
  params: Record<string, unknown>;
  /** 参数级过滤结果：passed=白名单全匹配 / rejected=未通过（含默认拒绝） */
  paramFilterResult: 'passed' | 'rejected';
  /** 本次调用的裁决模式：whitelist=白名单自动 / manual=人工批准 / blocked=禁用 */
  approvalMode: 'whitelist' | 'manual' | 'blocked';
  /** 最终是否获批（approved_auto / approved_manual 为 true） */
  approved: boolean;
  /** 执行结果摘要：status=executed|error|blocked|rejected|timeout，summary 输出截断 */
  result?: { status: string; summary: string };
}

export interface AuditQueryOpts {
  /** 按发起方用户过滤 */
  from?: string;
  /** 按工具名过滤 */
  tool?: string;
  /** 返回条数上限（取最新 N 条，保持时间升序） */
  limit?: number;
}

/** roomId 参与文件名拼接，仅允许安全字符，防止路径穿越 */
const SAFE_ID = /^[A-Za-z0-9_-]{1,64}$/;
/** 单行摘要/输出最大长度（DESIGN.md §6.3：输出截断） */
export const AUDIT_SUMMARY_MAX = 500;

export class AuditLog {
  private auditDir: string;

  constructor(dataDir: string) {
    this.auditDir = path.join(dataDir, 'audit');
  }

  /** 审计目录绝对路径（调试/清理用） */
  get dir(): string {
    return this.auditDir;
  }

  /** 追加一条审计记录。写入失败不影响调用方（静默忽略）。 */
  log(entry: AuditEntry): void {
    try {
      const file = this.filePath(entry.roomId);
      if (!file) return; // roomId 非法：不入盘
      const safe: AuditEntry = {
        ...entry,
        params: sanitizeParams(entry.params),
        result: entry.result ? {
          status: String(entry.result.status).slice(0, 40),
          summary: truncate(String(entry.result.summary ?? ''), AUDIT_SUMMARY_MAX),
        } : undefined,
      };
      appendJSONL(file, safe);
    } catch {
      /* 审计失败不打断主流程 */
    }
  }

  /**
   * 按房间查询审计记录（文件即按 roomId 隔离，过滤只是保险）。
   * 返回按 timestamp 升序；limit 取最新 N 条。
   */
  query(roomId: string, opts?: AuditQueryOpts): AuditEntry[] {
    const file = this.filePath(roomId);
    if (!file) return [];

    const entries: AuditEntry[] = [];
    try {
      const raw = fs.readFileSync(file, 'utf-8');
      for (const line of raw.split('\n')) {
        if (!line.trim()) continue;
        try {
          entries.push(JSON.parse(line) as AuditEntry);
        } catch {
          /* 单行损坏跳过 */
        }
      }
    } catch {
      return []; // 文件不存在/不可读 → 空
    }

    if (opts?.from) {
      const from = opts.from;
      const filtered = entries.filter((e) => e.fromUserId === from);
      entries.length = 0;
      entries.push(...filtered);
    }
    if (opts?.tool) {
      const tool = opts.tool;
      const filtered = entries.filter((e) => e.toolName === tool);
      entries.length = 0;
      entries.push(...filtered);
    }

    entries.sort((a, b) => a.timestamp - b.timestamp);
    if (typeof opts?.limit === 'number' && opts.limit >= 0 && entries.length > opts.limit) {
      return entries.slice(-opts.limit);
    }
    return entries;
  }

  // ------------------------------------------------------------------
  // 内部
  // ------------------------------------------------------------------

  private filePath(roomId: string): string | null {
    if (!SAFE_ID.test(String(roomId ?? ''))) return null;
    return path.join(this.auditDir, `${roomId}.jsonl`);
  }
}

/** 参数值清洗：保证整条记录可 JSON 序列化（函数/BigInt/循环引用兜底） */
function sanitizeParams(params: Record<string, unknown> | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params ?? {})) {
    out[k] = jsonSafe(v);
  }
  return out;
}

function jsonSafe(v: unknown): unknown {
  if (v === undefined) return null;
  const t = typeof v;
  if (t === 'bigint' || t === 'function' || t === 'symbol') return String(v);
  if (v !== null && t === 'object') {
    try {
      JSON.stringify(v);
      return v;
    } catch {
      return '[unserializable]';
    }
  }
  return v;
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max)}…(截断)` : s;
}
