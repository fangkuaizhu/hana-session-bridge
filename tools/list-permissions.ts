// tools/list-permissions.ts
// session-bridge_list-permissions：列出房间当前的工具代理权限表（Phase 3 P4）。
import { defineTool } from '../vendor/plugin-runtime.js';
import { getSharedState } from '../lib/shared.ts';

export const { name, description, parameters, execute } = defineTool({
  name: 'list_permissions',
  description: '列出房间当前的工具代理权限配置（谁的工具、什么模式、参数过滤规则）。房间内参与者均可查看。',
  parameters: {
    type: 'object',
    properties: {
      roomId: {
        type: 'string',
        description: '8 位房间码（字母数字）',
      },
    },
    required: ['roomId'],
  },
  sessionPermission: { readOnly: true },
  async execute(input: { roomId: string }, ctx) {
    const { roomManager } = getSharedState(ctx);

    const roomId = String(input.roomId ?? '').trim().toUpperCase();
    if (!/^[A-Z0-9]{8}$/.test(roomId)) {
      return { error: '房间码格式不正确，应为 8 位字母数字' };
    }
    const room = roomManager.getRoom(roomId);
    if (!room) return { error: '房间不存在或已关闭' };

    // 仅房间参与者可查看
    const userId = ctx.userId ?? 'unknown';
    if (!room.participants.some((p) => p.userId === userId)) {
      return { error: '你不是该房间的参与者，无法查看权限配置' };
    }

    const permissions = roomManager.getToolPermissions(roomId);
    return {
      roomId,
      permissionLevel: room.permissionLevel,
      permissionCount: permissions.length,
      permissions,
      hint: permissions.length === 0
        ? '当前无工具权限配置（collaborate 房间默认拒绝全部工具；full_control 房间未配置工具需人工批准）。'
        : undefined,
    };
  },
});
