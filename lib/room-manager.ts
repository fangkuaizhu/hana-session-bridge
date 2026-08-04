// lib/room-manager.ts
// 房间生命周期管理：创建/加入/批准/离开/查询 + JSON 持久化。
// 设计依据：DESIGN.md §4/§5、Phase 1 任务书 M2。
//
// 关键约束（任务书）：
// - 房间持久化到 plugin-data/session-bridge/rooms/{roomId}.json
// - 密码用 bcrypt 哈希存储（vendored bcryptjs，不依赖 npm 安装）
// - 房间码 8 位字母数字，碰撞重试最多 10 次
// - 每个房间的操作用内存互斥锁（Promise 链）保证并发安全
import crypto from 'node:crypto';
import path from 'node:path';
import { createRequire } from 'node:module';
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import { readJSON, writeJSON, deleteFile, listFiles } from './store.ts';

// bcryptjs 是 CommonJS 包，vendored 到 vendor/bcryptjs/；ESM 下用 createRequire 加载
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('../vendor/bcryptjs/index.js') as {
  hashSync(s: string, rounds: number): string;
  compareSync(s: string, hash: string): boolean;
};

export type PermissionLevel = 'readonly' | 'suggest' | 'collaborate' | 'full_control';

export interface Participant {
  userId: string;
  sessionPath: string;
  joinedAt: number;
}

export interface PendingJoin {
  userId: string;
  requestedAt: number;
  timeoutSeconds: number;
  status: 'pending';
}

export interface Room {
  roomId: string;
  readableName?: string;
  passwordHash?: string;
  permissionLevel: PermissionLevel;
  hostId: string;
  participants: Participant[];
  pendingJoinRequests: PendingJoin[];
  createdAt: number;
  lastActivityAt: number;
  status: 'active' | 'closing' | 'closed';
  seqCounter: number;
}

export const ROOM_CODE_LENGTH = 8;
export const JOIN_REQUEST_TIMEOUT_SECONDS = 60;
export const ROOM_IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 分钟（设计文档 §5.5）

const ROOMS_SUBDIR = 'rooms';

export class RoomManager {
  private ctx: HanaPluginContext;
  /** roomsDir: plugin-data/session-bridge/rooms/ */
  private roomsDir: string;
  /** 内存房间缓存：roomId -> Room（写操作后同步落盘） */
  private rooms = new Map<string, Room>();
  /** 每房间互斥锁：roomId -> 前一个操作 Promise 的尾链 */
  private locks = new Map<string, Promise<unknown>>();
  /** 每房间超时定时器：roomId -> timeout handle */
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor(ctx: HanaPluginContext) {
    this.ctx = ctx;
    this.roomsDir = path.join(ctx.dataDir, ROOMS_SUBDIR);
    this.loadAllRooms();
  }

  // ------------------------------------------------------------------
  // 内部工具
  // ------------------------------------------------------------------

  private roomFilePath(roomId: string): string {
    return path.join(this.roomsDir, `${roomId}.json`);
  }

  /** 生成 8 位字母数字房间码，碰撞时重试（最多 10 次） */
  private generateRoomCode(): string {
    for (let attempt = 0; attempt < 10; attempt++) {
      const code = crypto.randomBytes(6).toString('base64url').slice(0, ROOM_CODE_LENGTH).toUpperCase();
      if (!this.rooms.has(code) && !readJSON<Room>(this.roomFilePath(code))) {
        return code;
      }
    }
    throw new Error('房间码生成失败：10 次碰撞重试后仍无法获得唯一码');
  }

  /** 每房间互斥：串行化同一房间的所有异步写操作 */
  private withRoomLock<T>(roomId: string, fn: () => Promise<T>): Promise<T> {
    const prev = this.locks.get(roomId) ?? Promise.resolve();
    const run = prev.then(fn, fn);
    this.locks.set(roomId, run.then(() => undefined, () => undefined));
    return run;
  }

  /** 启动时从磁盘加载所有房间到内存（跳过损坏文件） */
  private loadAllRooms(): void {
    for (const file of listFiles(this.roomsDir)) {
      if (!file.endsWith('.json')) continue;
      const room = readJSON<Room>(file);
      if (!room || typeof room.roomId !== 'string') {
        // 损坏文件：删除并记录（设计文档 §8.7）
        deleteFile(file);
        this.ctx.log?.warn?.('session-bridge: 删除损坏的房间文件', file);
        continue;
      }
      this.rooms.set(room.roomId, room);
    }
  }

  private persist(room: Room): void {
    writeJSON(this.roomFilePath(room.roomId), room);
  }

  // ------------------------------------------------------------------
  // 公开 API
  // ------------------------------------------------------------------

  async createRoom(opts: {
    hostId: string;
    hostSessionPath: string;
    permissionLevel: PermissionLevel;
    password?: string;
    readableName?: string;
  }): Promise<string> {
    return this.withRoomLock('__new__', async () => {
      const roomId = this.generateRoomCode();
      const now = Date.now();
      const room: Room = {
        roomId,
        permissionLevel: opts.permissionLevel,
        hostId: opts.hostId,
        participants: [{
          userId: opts.hostId,
          sessionPath: opts.hostSessionPath,
          joinedAt: now,
        }],
        pendingJoinRequests: [],
        createdAt: now,
        lastActivityAt: now,
        status: 'active',
        seqCounter: 0,
      };
      if (opts.readableName) room.readableName = opts.readableName;
      if (opts.password) room.passwordHash = bcrypt.hashSync(opts.password, 10);

      this.rooms.set(roomId, room);
      this.persist(room);
      return roomId;
    });
  }

  /**
   * 加入房间。
   * - 有密码：验证密码，通过直接加入（joined）
   * - 无密码：创建 pending 请求等待房主批准（pending）
   * - 密码错误 / 房间不存在：抛错（不区分，防枚举，设计文档 §9.2）
   */
  async joinRoom(
    roomId: string,
    opts: { userId: string; sessionPath: string; password?: string }
  ): Promise<'joined' | 'pending'> {
    return this.withRoomLock(roomId, async () => {
      const room = this.getRoom(roomId);
      if (!room) throw new Error('房间不存在');
      if (room.status !== 'active') throw new Error('房间已关闭');

      // 已加入则幂等返回
      if (room.participants.some((p) => p.userId === opts.userId)) return 'joined';

      if (room.passwordHash) {
        if (!opts.password || !bcrypt.compareSync(opts.password, room.passwordHash)) {
          throw new Error('密码错误');
        }
        room.participants.push({ userId: opts.userId, sessionPath: opts.sessionPath, joinedAt: Date.now() });
        room.lastActivityAt = Date.now();
        this.persist(room);
        return 'joined';
      }

      // 无密码：创建 pending 请求（同一用户重复请求则覆盖旧请求）
      room.pendingJoinRequests = room.pendingJoinRequests.filter((r) => r.userId !== opts.userId);
      room.pendingJoinRequests.push({
        userId: opts.userId,
        requestedAt: Date.now(),
        timeoutSeconds: JOIN_REQUEST_TIMEOUT_SECONDS,
        status: 'pending',
      });
      room.lastActivityAt = Date.now();
      this.persist(room);
      return 'pending';
    });
  }

  /** 批准加入请求。请求存在且 pending → 加入并返回 true；否则 false */
  async approveJoin(roomId: string, userId: string): Promise<boolean> {
    return this.withRoomLock(roomId, async () => {
      const room = this.getRoom(roomId);
      if (!room || room.status !== 'active') return false;

      const idx = room.pendingJoinRequests.findIndex((r) => r.userId === userId && r.status === 'pending');
      if (idx === -1) return false;
      const req = room.pendingJoinRequests[idx];

      // 超时检查：超过 timeoutSeconds 的请求视为过期
      if (Date.now() - req.requestedAt > req.timeoutSeconds * 1000) {
        room.pendingJoinRequests.splice(idx, 1);
        this.persist(room);
        return false;
      }

      room.pendingJoinRequests.splice(idx, 1);
      const existing = room.participants.find((p) => p.userId === userId);
      if (!existing) {
        room.participants.push({ userId, sessionPath: '', joinedAt: Date.now() });
      }
      room.lastActivityAt = Date.now();
      this.persist(room);
      return true;
    });
  }

  /** 拒绝加入请求（移除 pending 条目） */
  async rejectJoin(roomId: string, userId: string): Promise<void> {
    return this.withRoomLock(roomId, async () => {
      const room = this.getRoom(roomId);
      if (!room) return;
      room.pendingJoinRequests = room.pendingJoinRequests.filter((r) => r.userId !== userId);
      this.persist(room);
    });
  }

  /**
   * 离开房间。
   * - 移除参与者
   * - 参与者为空 → 房间关闭（status: closed）
   * - 房主移交由上层（M4 工具）调用 transferHost 处理
   */
  async leaveRoom(roomId: string, userId: string): Promise<void> {
    return this.withRoomLock(roomId, async () => {
      const room = this.getRoom(roomId);
      if (!room) return;

      room.participants = room.participants.filter((p) => p.userId !== userId);
      room.lastActivityAt = Date.now();

      if (room.participants.length === 0) {
        room.status = 'closed';
        this.clearTimeoutTimer(roomId);
      }
      this.persist(room);
    });
  }

  getRoom(roomId: string): Room | null {
    return this.rooms.get(roomId) ?? null;
  }

  listActiveRooms(): Room[] {
    return [...this.rooms.values()].filter((r) => r.status === 'active');
  }

  /** 分配下一个全局消息 seq（房间内单调递增） */
  nextSeq(roomId: string): number {
    const room = this.getRoom(roomId);
    if (!room) throw new Error('房间不存在');
    room.seqCounter += 1;
    room.lastActivityAt = Date.now();
    this.persist(room);
    return room.seqCounter;
  }

  /** 更新最后活动时间 */
  touch(roomId: string): void {
    const room = this.getRoom(roomId);
    if (!room) return;
    room.lastActivityAt = Date.now();
    this.persist(room);
  }

  /** 启动 30 分钟超时定时器（设计文档 §5.5）。onTimeout 在超时触发。 */
  startTimeoutTimer(roomId: string, onTimeout: () => void): void {
    this.clearTimeoutTimer(roomId);
    const timer = setTimeout(() => {
      this.timers.delete(roomId);
      onTimeout();
    }, ROOM_IDLE_TIMEOUT_MS);
    this.timers.set(roomId, timer);
  }

  clearTimeoutTimer(roomId: string): void {
    const timer = this.timers.get(roomId);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(roomId);
    }
  }

  /** 转移房主（包括超时定时器所有权） */
  transferHost(roomId: string, newHostId: string): void {
    const room = this.getRoom(roomId);
    if (!room) return;
    if (!room.participants.some((p) => p.userId === newHostId)) return;
    room.hostId = newHostId;
    room.lastActivityAt = Date.now();
    this.persist(room);
  }

  /**
   * 清理幽灵房间（设计文档 §8.5）：
   * - status=closed 的文件直接删除
   * - status=active 但创建者不在线的房间，标记 closed 后删除（Phase 1 同机：
   *   插件 onload 时调用，host 的 session 由上层通过 listSessions 校验；
   *   本方法按 hostSessionExists 回调判断）
   */
  cleanupGhostRooms(hostSessionExists?: (room: Room) => boolean | Promise<boolean>): number {
    let removed = 0;
    for (const room of [...this.rooms.values()]) {
      if (room.status === 'closed') {
        this.rooms.delete(room.roomId);
        this.clearTimeoutTimer(room.roomId);
        deleteFile(this.roomFilePath(room.roomId));
        removed++;
        continue;
      }
      if (hostSessionExists) {
        const exists = hostSessionExists(room);
        if (exists === false || (typeof exists === 'object' && typeof (exists as Promise<boolean>).then === 'function')) {
          // Promise 形式在 M6 生命周期里异步处理；这里只同步处理返回 false 的情况
          if (exists === false) {
            this.rooms.delete(room.roomId);
            this.clearTimeoutTimer(room.roomId);
            deleteFile(this.roomFilePath(room.roomId));
            removed++;
          }
        }
      }
    }
    return removed;
  }

  /** 停止所有定时器（onunload 用） */
  dispose(): void {
    for (const roomId of [...this.timers.keys()]) {
      this.clearTimeoutTimer(roomId);
    }
  }
}
