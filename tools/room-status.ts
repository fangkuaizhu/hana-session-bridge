// tools/room-status.ts
// session-bridge_room-status：查看活跃房间列表 / 指定房间详情。
// 无 roomId → 返回所有活跃房间摘要；有 roomId → 返回该房间完整信息（含参与者、待批准请求）。
import { defineTool } from '../vendor/plugin-runtime.js';
import { getSharedState } from '../lib/shared.ts';

export const { name, description, parameters, execute } = defineTool({
  name: 'room_status',
  description: '查看当前所有活跃的共享房间，或指定房间的详细信息（参与者列表、权限级别、待批准请求）。',
  parameters: {
    type: 'object',
    properties: {
      roomId: {
        type: 'string',
        description: '可选。8 位房间码，传入则返回该房间详情',
      },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input: { roomId?: string }, ctx) {
    const { roomManager } = getSharedState(ctx);

    if (input?.roomId) {
      const roomId = String(input.roomId).trim().toUpperCase();
      if (!/^[A-Z0-9]{8}$/.test(roomId)) {
        return { error: '房间码格式不正确，应为 8 位字母数字（如 A3K9X2M7）' };
      }
      const room = roomManager.getRoom(roomId);
      if (!room) return { error: '房间不存在' };

      return {
        roomId: room.roomId,
        readableName: room.readableName ?? null,
        permissionLevel: room.permissionLevel,
        status: room.status,
        hasPassword: Boolean(room.passwordHash),
        hostId: room.hostId,
        participantCount: room.participants.length,
        participants: room.participants.map((p) => ({
          userId: p.userId,
          joinedAt: p.joinedAt,
          isHost: p.userId === room.hostId,
        })),
        pendingJoinRequests: room.pendingJoinRequests.map((r) => ({
          userId: r.userId,
          requestedAt: r.requestedAt,
          status: r.status,
        })),
        createdAt: room.createdAt,
        lastActivityAt: room.lastActivityAt,
      };
    }

    const activeRooms = roomManager.listActiveRooms().map((r) => ({
      roomId: r.roomId,
      readableName: r.readableName ?? null,
      permissionLevel: r.permissionLevel,
      participantCount: r.participants.length,
      hostId: r.hostId,
      hasPassword: Boolean(r.passwordHash),
      createdAt: r.createdAt,
      lastActivityAt: r.lastActivityAt,
    }));
    return { activeRooms };
  },
});
