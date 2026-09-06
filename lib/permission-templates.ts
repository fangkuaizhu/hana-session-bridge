// lib/permission-templates.ts
// 系统预设权限模板（Phase 3 P4）：宿主可直接把 PRESETS[key] 逐条写入房间，
// 或作为 set-permission 的参考。设计依据：DESIGN.md §6.1、Phase 3 任务书 P4。
//
// 模板语义：
//   diagnostics — 远程协助排查：只放行系统诊断命令 + 用户目录只读，其余拒绝/批准
//   strict      — 只读环境：仅允许无副作用读取，web 搜索需人工批准
import type { ToolPermission } from './tool-proxy.ts';

export type PresetName = 'diagnostics' | 'strict';

export const PRESETS: Record<PresetName, ToolPermission[]> = {
  diagnostics: [
    {
      toolName: 'exec_command',
      mode: 'whitelist',
      scope: 'always',
      paramFilters: {
        cmd: {
          pattern: '^(chkdsk|sfc|dism|systeminfo|ipconfig|ping|tracert|netstat|tasklist)\\b',
          description: '仅系统诊断命令（chkdsk/sfc/dism/systeminfo/ipconfig/ping/tracert/netstat/tasklist）',
        },
      },
    },
    {
      toolName: 'read',
      mode: 'whitelist',
      scope: 'always',
      paramFilters: {
        path: { pattern: '^C:\\\\Users\\\\', description: '仅用户目录（Windows）' },
      },
    },
    { toolName: 'ls', mode: 'whitelist', scope: 'always' },
  ],
  strict: [
    { toolName: 'read', mode: 'whitelist', scope: 'always' },
    { toolName: 'ls', mode: 'whitelist', scope: 'always' },
    { toolName: 'grep', mode: 'whitelist', scope: 'always' },
    { toolName: 'web_search', mode: 'approval', scope: 'once' },
  ],
};

export const PRESET_NAMES: PresetName[] = ['diagnostics', 'strict'];

/**
 * 校验一条 ToolPermission 的合法性（工具/工具值由 TS 类型约束，这里做运行时防御）。
 * 返回错误信息字符串；合法返回 null。
 * 校验点：mode/scope 枚举、paramFilters 结构、pattern 正则可编译。
 */
export function validatePermission(perm: Partial<ToolPermission> & { toolName?: string }): string | null {
  if (!perm || typeof perm.toolName !== 'string' || !perm.toolName.trim()) {
    return 'toolName 不能为空';
  }
  if (!['whitelist', 'approval', 'blocked'].includes(perm.mode ?? '')) {
    return 'mode 必须是 whitelist / approval / blocked';
  }
  if (perm.scope !== undefined && !['once', 'session', 'always'].includes(perm.scope)) {
    return 'scope 必须是 once / session / always';
  }
  if (perm.approvalTimeoutMs !== undefined && (!Number.isFinite(perm.approvalTimeoutMs) || perm.approvalTimeoutMs <= 0)) {
    return 'approvalTimeoutMs 必须是正数';
  }
  if (perm.paramFilters !== undefined) {
    if (perm.paramFilters === null || typeof perm.paramFilters !== 'object' || Array.isArray(perm.paramFilters)) {
      return 'paramFilters 必须是对象 { 参数名: { pattern, description } }';
    }
    for (const [key, rule] of Object.entries(perm.paramFilters)) {
      const r = rule as { pattern?: unknown; description?: unknown } | null;
      if (!r || typeof r !== 'object' || typeof r.pattern !== 'string' || !r.pattern) {
        return `paramFilters.${key}.pattern 必须是字符串正则`;
      }
      try {
        new RegExp(r.pattern);
      } catch {
        return `paramFilters.${key}.pattern 不是合法正则：${r.pattern}`;
      }
    }
  }
  return null;
}

/** 深拷贝一份预设（避免调用方修改共享模板对象） */
export function presetCopy(name: PresetName): ToolPermission[] {
  return JSON.parse(JSON.stringify(PRESETS[name])) as ToolPermission[];
}
