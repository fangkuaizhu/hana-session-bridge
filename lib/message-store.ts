// lib/message-store.ts
// 消息缓冲区：每个房间保留最近 N 条消息在内存（设计文档 §9.3：500 条）。
// WebView 通过 route API 按 seq 增量拉取（任务书 M5 FAQ：轮询 since）。
// 同机场景：发送方（bridgeSession 广播时）与接收方（handleMessage 时）都写入，
// 双方 seq 全局一致（roomManager.nextSeq），故按 seq 拉取即可对齐。
import type { Message } from './transport.ts';

const MAX_MESSAGES_PER_ROOM = 500;

export class MessageStore {
  /** roomId -> 消息数组（按 seq 升序） */
  private messages = new Map<string, Message[]>();

  push(roomId: string, msg: Message): void {
    let list = this.messages.get(roomId);
    if (!list) {
      list = [];
      this.messages.set(roomId, list);
    }
    list.push(msg);
    // 超出上限清理最旧（保持 seq 单调）
    if (list.length > MAX_MESSAGES_PER_ROOM) {
      list.splice(0, list.length - MAX_MESSAGES_PER_ROOM);
    }
  }

  /** 拉取 seq > since 的消息，返回 (messages, hasMore) */
  getSince(roomId: string, sinceSeq: number): { messages: Message[]; hasMore: boolean } {
    const list = this.messages.get(roomId) ?? [];
    const filtered = list.filter((m) => m.seq > sinceSeq);
    return { messages: filtered, hasMore: filtered.length >= MAX_MESSAGES_PER_ROOM };
  }

  /** 最近 seq（用于初始 since；无消息返回 0） */
  getLastSeq(roomId: string): number {
    const list = this.messages.get(roomId) ?? [];
    return list.length > 0 ? list[list.length - 1].seq : 0;
  }

  /** 房间全部消息（调试/回放用） */
  getAll(roomId: string): Message[] {
    return [...(this.messages.get(roomId) ?? [])];
  }

  clear(roomId: string): void {
    this.messages.delete(roomId);
  }
}
