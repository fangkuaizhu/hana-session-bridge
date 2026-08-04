// tools/leave-room.ts
// session-bridge_leave-room：离开共享房间。
// 流程（Phase 1 任务书 M4）：
//   1. 广播 participant_leave（离开前广播，此时房间仍 active，nextSeq 可用）
//   2. 自己是房主且有其他参与者 → transferHost 移交给最早的参与者
//   3. roomManager.leaveRoom（参与者为空时房间自动置 closed）
//   4. 清理本端资源：unbridge + transport.disconnect
import { defineTool } from '../vendor/plugin-runtime.js';
import { getSharedState } from '../lib/shared.ts';

export const { name, description, parameters, execute } = defineTool({
  name: 'leave_room',
  description: '离开一个会话共享房间。离开后不再接收该房间的消息广播；若你是房主，房主身份会移交给最早加入的其他参与者，房间无人时自动关闭。',
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
    const { roomManager, transport, messageBus } = getSharedState(ctx);

    const roomId = String(input.roomId ?? '').trim().toUpperCase();
    if (!/^[A-Z0-9]{8}$/.test(roomId)) {
      return { error: '房间码格式不正确，应为 8 位字母数字（如 A3K9X2M7）' };
    }

    const userId = ctx.userId ?? 'unknown';
    const room = roomManager.getRoom(roomId);
    if (!room) return { error: '房间不存在' };
    if (room.status !== 'active') return { status: 'room_closed', roomId, hint: '房间已关闭' };
    if (!room.participants.some((p) => p.userId === userId)) {
      return { error: '你不是该房间的参与者' };
    }

    const wasHost = room.hostId === userId;

    // 1. 广播 participant_leave（房间 active 状态下 nextSeq 可用）
    try {
      await transport.send(roomId, {
        roomId,
        from: userId,
        seq: roomManager.nextSeq(roomId),
        type: 'participant_leave',
        payload: { userId },
        timestamp: Date.now(),
      });
    } catch {
      // 广播失败不阻塞离开流程
    }

    // 2. 房主移交：自己是房主且还有其他参与者 → 移交给最早加入者
    let transferredTo: string | null = null;
    if (wasHost) {
      const others = room.participants.filter((p) => p.userId !== userId);
      if (others.length > 0) {
        transferredTo = others[0].userId;
        roomManager.transferHost(roomId, transferredTo);
      }
    }

    // 3. 离开房间（无参与者时 roomManager 自动置 closed）
    await roomManager.leaveRoom(roomId, userId);

    // 4. 清理本端资源
    messageBus.unbridge(roomId);
    await transport.disconnect(roomId);

    const roomAfter = roomManager.getRoom(roomId);
    if (!roomAfter || roomAfter.status === 'closed') {
      return { status: 'room_closed', roomId, hint: '你是最后一位参与者，房间已关闭', transferredTo };
    }
    return {
      status: 'left',
      roomId,
      transferredTo,
      hint: transferredTo ? `已离开房间，房主身份已移交给 ${transferredTo}` : '已离开房间',
    };
  },
});
