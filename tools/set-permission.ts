// tools/set-permission.ts
// session-bridge_set-permission：设置房间内某工具的工具代理权限（Phase 3 P4）。
// 仅房主可配置；权限持久化到 rooms/{roomId}.json 的 toolPermissions 字段，
// 并同步到 ToolProxy 内存裁决表。
import { defineTool } from '../vendor/plugin-runtime.js';
import { getSharedState } from '../lib/shared.ts';
import { validatePermission } from '../lib/permission-templates.ts';
import type { ToolPermission } from '../lib/tool-proxy.ts';

export const { name, description, parameters, execute } = defineTool({
  name: 'set_permission',
  description:
    '设置房间内某工具的工具代理权限（仅房主）。mode: whitelist=白名单（参数匹配 paramFilters 自动执行，含未声明参数默认拒绝）/ approval=需对方人工批准 / blocked=禁用。scope 默认 always。paramFilters 示例：{"cmd":{"pattern":"^ipconfig$","description":"仅允许 ipconfig"}}；不传 paramFilters = 该工具所有参数放行（仅信任场景）。',
  parameters: {
    type: 'object',
    properties: {
      roomId: {
        type: 'string',
        description: '8 位房间码（字母数字）',
      },
      toolName: {
        type: 'string',
        description: '工具名（如 exec_command / read / ls）',
      },
      mode: {
        type: 'string',
        enum: ['whitelist', 'approval', 'blocked'],
        description: 'whitelist=参数白名单自动执行，approval=每次需人工批准，blocked=禁用',
      },
      scope: {
        type: 'string',
        enum: ['once', 'session', 'always'],
        default: 'always',
        description: '授权范围（配置场景默认 always=长期有效）',
      },
      paramFilters: {
        type: 'object',
        description: '参数级正则过滤，仅 whitelist 模式生效：{ 参数名: { pattern: 正则, description: 说明 } }',
      },
      approvalTimeoutMs: {
        type: 'number',
        description: '可选：批准模式弹窗超时毫秒数（默认 30000）',
      },
    },
    required: ['roomId', 'toolName', 'mode'],
  },
  sessionPermission: { readOnly: true },
  async execute(input: { roomId: string; toolName: string; mode: 'whitelist' | 'approval' | 'blocked'; scope?: 'once' | 'session' | 'always'; paramFilters?: Record<string, { pattern: string; description: string }>; approvalTimeoutMs?: number }, ctx) {
    const { roomManager, toolProxy } = getSharedState(ctx);

    const roomId = String(input.roomId ?? '').trim().toUpperCase();
    if (!/^[A-Z0-9]{8}$/.test(roomId)) {
      return { error: '房间码格式不正确，应为 8 位字母数字' };
    }
    const room = roomManager.getRoom(roomId);
    if (!room) return { error: '房间不存在或已关闭' };
    if (room.status !== 'active') return { error: '房间已关闭' };

    // 仅房主可配置权限
    const userId = ctx.userId ?? 'unknown';
    if (room.hostId !== userId) {
      return { error: '仅房主可以配置工具权限' };
    }

    const toolName = String(input.toolName ?? '').trim();
    const permission: ToolPermission = {
      toolName,
      mode: input.mode,
      scope: input.scope ?? 'always',
    };
    if (input.paramFilters && typeof input.paramFilters === 'object' && Object.keys(input.paramFilters).length > 0) {
      permission.paramFilters = input.paramFilters;
    }
    if (typeof input.approvalTimeoutMs === 'number') {
      permission.approvalTimeoutMs = input.approvalTimeoutMs;
    }

    // 运行时校验（mode/scope/paramFilters 结构 + 正则可编译）
    const invalid = validatePermission(permission);
    if (invalid) return { error: `权限配置不合法：${invalid}` };

    // 1) 持久化到房间 JSON（磁盘真相）
    await roomManager.setToolPermission(roomId, permission);
    // 2) 同步 ToolProxy 内存裁决表
    toolProxy.setPermission(roomId, permission);

    return {
      ok: true,
      roomId,
      permissions: toolProxy.getPermissions(roomId),
      hint: `工具 ${toolName} 已设为 ${permission.mode}${permission.mode === 'whitelist' && permission.paramFilters ? '（带参数过滤）' : ''}。`,
    };
  },
});
