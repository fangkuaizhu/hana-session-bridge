// tools/create-room.ts
// session-bridge_create-room：创建共享房间。
// 返回 8 位房间码 + 人类可读的加入指令。
import { defineTool } from '../vendor/plugin-runtime.js';
import { getSharedState } from '../lib/shared.ts';
import type { PermissionLevel } from '../lib/room-manager.ts';

export const { name, description, parameters, execute } = defineTool({
  name: 'create_room',
  description: '创建一个会话共享房间。房主创建后获得 8 位房间码，其他人用该码加入，实时共享本会话的上下文（消息、Agent 回复、工具调用）。',
  parameters: {
    type: 'object',
    properties: {
      permissionLevel: {
        type: 'string',
        enum: ['readonly', 'suggest', 'collaborate', 'full_control'],
        default: 'suggest',
        description: '房间权限级别：readonly=只读观看，suggest=可发送建议（默认），collaborate=协作，full_control=完全控制',
      },
      password: {
        type: 'string',
        description: '可选密码。设置后加入者需输入密码直接加入；不设置则需房主手动批准',
      },
      readableName: {
        type: 'string',
        description: '可选的可读名称，便于识别房间',
      },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input: { permissionLevel?: PermissionLevel; password?: string; readableName?: string }, ctx) {
    const { roomManager, messageBus } = getSharedState(ctx);

    const permissionLevel = input.permissionLevel ?? 'suggest';
    const userId = ctx.userId ?? 'unknown';
    const sessionPath = ctx.sessionPath ?? ctx.sessionRef?.sessionPath ?? null;

    if (!sessionPath) {
      return { error: '无法确定当前会话路径，无法创建房间' };
    }

    const roomId = await roomManager.createRoom({
      hostId: userId,
      hostSessionPath: sessionPath,
      permissionLevel,
      password: input.password,
      readableName: input.readableName,
    });

    // 开始桥接：将房主会话的实时事件广播到房间
    messageBus.bridgeSession(roomId, sessionPath);
    // 房主作为参与者连接传输通道
    await getSharedState(ctx).transport.connect(roomId);

    return {
      roomId,
      permissionLevel,
      hasPassword: Boolean(input.password),
      joinCode: `session-bridge join ${roomId}`,
      hint: input.password
        ? `房间 ${roomId} 已创建（密码保护）。告诉对方加入指令和密码。`
        : `房间 ${roomId} 已创建（无密码）。对方加入后需要你批准。`,
    };
  },
});
