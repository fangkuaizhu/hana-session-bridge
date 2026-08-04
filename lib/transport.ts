// lib/transport.ts
// Transport 抽象层：MessageBus 只依赖此接口，不关心底层实现。
// Phase 1 实现 EventBusTransport（同机/同进程）；Phase 2 将新增 WebSocketTransport。
//
// 设计依据：DESIGN.md §3.2、Phase 1 任务书 M1。

/** 连接状态（Phase 1 同机场景恒为 connected） */
export type ConnectionStatus = "connected" | "disconnected" | "connecting";

/**
 * 房间内广播的消息（DESIGN.md §3.2 RoomMessage 的 Phase 1 子集）。
 * seq 为房间内全局单调递增序列号，由发送方在构造消息时从 RoomManager 分配。
 */
export interface Message {
  roomId: string;
  /** 发送方 userId */
  from: string;
  /** 房间内全局单调递增序列号 */
  seq: number;
  type:
    | "user_message"
    | "agent_reply"
    | "tool_call"
    | "tool_result"
    | "suggestion"
    | "participant_join"
    | "participant_leave";
  payload: unknown;
  timestamp: number;
}

/** Transport 通道抽象（Phase 1 任务书 M1 规格） */
export interface Transport {
  /** 加入房间的传输通道 */
  connect(roomId: string): Promise<void>;
  /** 断开房间的传输通道 */
  disconnect(roomId: string): Promise<void>;
  /** 向房间广播消息（一对多） */
  send(roomId: string, message: Message): Promise<void>;
  /** 注册消息处理器，返回取消订阅函数 */
  onMessage(roomId: string, handler: (msg: Message) => void): () => void;
  /** 注册连接状态变化处理器 */
  onConnectionChange(roomId: string, handler: (status: ConnectionStatus) => void): () => void;
}
