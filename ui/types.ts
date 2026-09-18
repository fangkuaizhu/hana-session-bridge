// ui/types.ts
// UI 与后端 route API 的共享类型。

export type PermissionLevel = 'readonly' | 'suggest' | 'collaborate' | 'full_control';

export interface RoomSummary {
  roomId: string;
  readableName?: string;
  permissionLevel: PermissionLevel;
  participantCount: number;
  hostId: string;
  createdAt: number;
  lastActivityAt: number;
}

export interface ParticipantInfo {
  userId: string;
  joinedAt: number;
  isHost: boolean;
}

export interface PendingJoinInfo {
  userId: string;
  requestedAt: number;
  timeoutSeconds: number;
}

export interface RoomDetail {
  roomId: string;
  readableName?: string;
  permissionLevel: PermissionLevel;
  hostId: string;
  status: 'active' | 'closing' | 'closed';
  createdAt: number;
  lastActivityAt: number;
  seqCounter: number;
  participants: ParticipantInfo[];
  pendingJoinRequests: PendingJoinInfo[];
}

export type RoomMessageType =
  | 'user_message'
  | 'agent_reply'
  | 'tool_call'
  | 'tool_result'
  | 'suggestion'
  | 'participant_join'
  | 'participant_leave';

export interface RoomMessage {
  roomId: string;
  from: string;
  seq: number;
  type: RoomMessageType;
  payload: unknown;
  timestamp: number;
}

/** 房间列表响应 */
export interface ListRoomsResponse {
  rooms: RoomSummary[];
}

/** 房间详情响应 */
export interface RoomDetailResponse {
  room: RoomDetail;
}

/** 创建房间请求/响应 */
export interface CreateRoomRequest {
  permissionLevel: PermissionLevel;
  password?: string;
  readableName?: string;
}
export interface CreateRoomResponse {
  roomId: string;
  permissionLevel: PermissionLevel;
  hasPassword: boolean;
  joinCode: string;
}

/** 加入房间请求/响应 */
export interface JoinRoomRequest {
  roomId: string;
  password?: string;
}
export interface JoinRoomResponse {
  status: 'joined' | 'pending';
  roomId: string;
  permissionLevel?: PermissionLevel;
}

/** 批准/拒绝请求 */
export interface ApprovalRequest {
  userId: string;
}
export interface ApprovalResponse {
  ok: boolean;
}

/** 建议消息请求 */
export interface SuggestionRequest {
  text: string;
}
export interface SuggestionResponse {
  ok: boolean;
  seq?: number;
}

/** 消息拉取响应（since 增量） */
export interface MessagesResponse {
  roomId: string;
  messages: RoomMessage[];
  hasMore: boolean;
}

// ------------------------------------------------------------------
// Phase 3 P2：工具调用批准弹窗
// ------------------------------------------------------------------

export type ToolApprovalReason = 'approval_mode' | 'param_mismatch' | 'unconfigured';
export type ToolApprovalScope = 'once' | 'session' | 'always';

/** 待批准的工具调用（GET rooms/:roomId/approvals 返回项） */
export interface ToolApproval {
  requestId: string;
  roomId: string;
  fromUserId: string;
  toUserId: string;
  toolName: string;
  params: Record<string, unknown>;
  reason: ToolApprovalReason;
  createdAt: number;
  timeoutMs: number;
  deadline: number;
}

export interface ApprovalsResponse {
  approvals: ToolApproval[];
}

export interface ToolApproveRequest {
  requestId: string;
  approved: boolean;
  scope?: ToolApprovalScope;
}
