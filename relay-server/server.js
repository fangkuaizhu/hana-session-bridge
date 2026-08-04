#!/usr/bin/env node
/**
 * hana-session-bridge Relay Server（Phase 2 · R1）
 *
 * 无状态信封路由层：不持久化房间、不保存消息历史，纯内存转发。
 * 房间状态（参与者、密码 hash）由各插件实例本地维护，Relay 仅做
 * 跨机消息的中转 + 轻量安全校验。
 *
 * 协议（客户端 → Relay）：
 *   { type: "register", roomId, userId, passwordHash? }  房主注册房间（房间不存在时创建，可携带 bcrypt hash）
 *   { type: "auth", roomId, userId, password? }         加入房间（验证存在性 + 密码）
 *   { type: "room_message", roomId, message }      向房间广播消息（信封转发）
 *   { type: "sync_request", roomId, lastSeq }      请求房间当前状态（参与者列表）
 *
 * 协议（Relay → 客户端）：
 *   { type: "auth_ok", roomId, participants }
 *   { type: "auth_fail", reason }
 *   { type: "room_message", roomId, message }
 *   { type: "sync_response", roomId, currentState }
 *   { type: "participant_join", roomId, userId }
 *   { type: "participant_leave", roomId, userId }
 *   { type: "error", message }
 *
 * 运维：
 *   - 心跳：30s ping，10s 无 pong 断开
 *   - 速率限制：每房间每秒最多 20 条消息
 *   - 幽灵房间：每 5 分钟扫描，60 分钟无活动删除
 *   - 房间上限：20 人（DESIGN.md §8.7）
 *
 * 部署：npm install ws bcryptjs && node server.js（监听 0.0.0.0:64162）
 */
import { WebSocketServer } from 'ws';
import bcrypt from 'bcryptjs';

const PORT = process.env.PORT ? Number(process.env.PORT) : 64162;
const ROOM_MAX_PARTICIPANTS = 20;
const RATE_LIMIT_PER_SECOND = 20;
const HEARTBEAT_INTERVAL_MS = 30_000;
const HEARTBEAT_TIMEOUT_MS = 10_000;
const GHOST_SCAN_INTERVAL_MS = 5 * 60_000;
const ROOM_IDLE_TIMEOUT_MS = 60 * 60_000;

/** roomId -> { participants: Map<ws,{userId}>, passwordHash?, createdAt, lastActivityAt } */
const rooms = new Map();
/** ws -> { roomId, userId } */
const clients = new Map();
/** roomId -> { count, resetAt } 滑动速率窗口 */
const rateBuckets = new Map();

function log(roomId, action, userId) {
  const ts = new Date().toTimeString().slice(0, 8);
  console.log(`[${ts}] ${roomId}:${action} ${userId ?? '-'}`);
}

function timestamp() {
  return Date.now();
}

function roomState(room) {
  return {
    roomId: room.roomId,
    participants: [...room.participants.values()].map(({ userId }) => ({ userId })),
    createdAt: room.createdAt,
  };
}

function send(ws, obj) {
  if (ws.readyState === 1 /* OPEN */) {
    try { ws.send(JSON.stringify(obj)); } catch { /* ignore */ }
  }
}

function broadcast(room, obj, exceptWs = null) {
  for (const ws of room.participants.keys()) {
    if (ws !== exceptWs) send(ws, obj);
  }
}

/** 滑动窗口速率限制：每房间每秒最多 RATE_LIMIT_PER_SECOND 条 */
function rateLimit(roomId) {
  const now = Date.now();
  let bucket = rateBuckets.get(roomId);
  if (!bucket || now - bucket.resetAt >= 1000) {
    bucket = { count: 0, resetAt: now };
    rateBuckets.set(roomId, bucket);
  }
  bucket.count += 1;
  return bucket.count <= RATE_LIMIT_PER_SECOND;
}

function removeClient(ws) {
  const entry = clients.get(ws);
  if (!entry) return;
  const { roomId, userId } = entry;
  clients.delete(ws);

  const room = rooms.get(roomId);
  if (room) {
    room.participants.delete(ws);
    room.lastActivityAt = timestamp();
    broadcast(room, { type: 'participant_leave', roomId, userId });
    log(roomId, 'leave', userId);
    if (room.participants.size === 0) {
      rooms.delete(roomId);
      rateBuckets.delete(roomId);
      log(roomId, 'destroy', '-');
    }
  }
}

const wss = new WebSocketServer({ port: PORT, host: '0.0.0.0' });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (data) => {
    let msg;
    try {
      msg = JSON.parse(data.toString());
    } catch {
      return send(ws, { type: 'error', message: '非法 JSON' });
    }
    if (!msg || typeof msg !== 'object') return send(ws, { type: 'error', message: '非法消息' });

    switch (msg.type) {
      case 'register': {
        // 房主注册房间：房间不存在则创建（可带 bcrypt passwordHash），已存在则幂等加入
        const roomId = String(msg.roomId ?? '').trim();
        if (!/^[A-Z0-9]{8}$/.test(roomId)) {
          return send(ws, { type: 'auth_fail', reason: '房间码格式不正确' });
        }
        let room = rooms.get(roomId);
        if (!room) {
          room = {
            roomId,
            participants: new Map(),
            passwordHash: typeof msg.passwordHash === 'string' && msg.passwordHash ? msg.passwordHash : null,
            createdAt: timestamp(),
            lastActivityAt: timestamp(),
          };
          rooms.set(roomId, room);
          log(roomId, 'register', '-');
        }
        if (room.participants.has(ws)) break; // 重复注册幂等
        if (room.participants.size >= ROOM_MAX_PARTICIPANTS) {
          return send(ws, { type: 'auth_fail', reason: '房间人数已满' });
        }
        const userId = String(msg.userId ?? 'unknown');
        room.participants.set(ws, { userId });
        clients.set(ws, { roomId, userId });
        room.lastActivityAt = timestamp();
        broadcast(room, { type: 'participant_join', roomId, userId }, ws);
        log(roomId, 'join', userId);
        return send(ws, { type: 'auth_ok', roomId, participants: roomState(room).participants });
      }

      case 'auth': {
        const roomId = String(msg.roomId ?? '').trim();
        const room = rooms.get(roomId);
        if (!room) return send(ws, { type: 'auth_fail', reason: '房间不存在' });
        if (room.participants.has(ws)) break;
        if (room.participants.size >= ROOM_MAX_PARTICIPANTS) {
          return send(ws, { type: 'auth_fail', reason: '房间人数已满' });
        }
        if (room.passwordHash) {
          const ok = typeof msg.password === 'string' && bcrypt.compareSync(msg.password, room.passwordHash);
          if (!ok) return send(ws, { type: 'auth_fail', reason: '密码错误' });
        }
        const userId = String(msg.userId ?? 'unknown');
        room.participants.set(ws, { userId });
        clients.set(ws, { roomId, userId });
        room.lastActivityAt = timestamp();
        broadcast(room, { type: 'participant_join', roomId, userId }, ws);
        log(roomId, 'join', userId);
        return send(ws, { type: 'auth_ok', roomId, participants: roomState(room).participants });
      }

      case 'room_message': {
        const entry = clients.get(ws);
        if (!entry || entry.roomId !== msg.roomId) {
          return send(ws, { type: 'error', message: '未加入该房间' });
        }
        if (!rateLimit(msg.roomId)) {
          return send(ws, { type: 'error', message: '消息频率过高' });
        }
        const room = rooms.get(msg.roomId);
        if (!room) return send(ws, { type: 'error', message: '房间不存在' });
        room.lastActivityAt = timestamp();
        // 信封转发：不改写消息内容（seq/payload 原样），只是广播给其他参与者
        broadcast(room, { type: 'room_message', roomId: msg.roomId, message: msg.message }, ws);
        return;
      }

      case 'sync_request': {
        const entry = clients.get(ws);
        if (!entry || entry.roomId !== msg.roomId) {
          return send(ws, { type: 'error', message: '未加入该房间' });
        }
        const room = rooms.get(msg.roomId);
        if (!room) return send(ws, { type: 'error', message: '房间不存在' });
        room.lastActivityAt = timestamp();
        return send(ws, { type: 'sync_response', roomId: msg.roomId, currentState: roomState(room) });
      }

      default:
        return send(ws, { type: 'error', message: `未知消息类型: ${msg.type}` });
    }
  });

  ws.on('close', () => removeClient(ws));
  ws.on('error', () => removeClient(ws));
});

// 心跳：30s ping，10s 无 pong 断开
const heartbeat = setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) {
      removeClient(ws);
      ws.terminate();
      continue;
    }
    ws.isAlive = false;
    try { ws.ping(); } catch { /* ignore */ }
  }
}, HEARTBEAT_INTERVAL_MS);

// 幽灵房间清理：5 分钟扫描，60 分钟无活动删除
const ghostScan = setInterval(() => {
  const now = timestamp();
  for (const [roomId, room] of rooms) {
    if (now - room.lastActivityAt > ROOM_IDLE_TIMEOUT_MS) {
      for (const ws of room.participants.keys()) {
        send(ws, { type: 'error', message: '房间因长时间无活动已被关闭' });
        clients.delete(ws);
        ws.close();
      }
      rooms.delete(roomId);
      rateBuckets.delete(roomId);
      log(roomId, 'ghost-clean', '-');
    }
  }
}, GHOST_SCAN_INTERVAL_MS);

wss.on('close', () => {
  clearInterval(heartbeat);
  clearInterval(ghostScan);
});

console.log(`[relay] session-bridge Relay listening on 0.0.0.0:${PORT}`);
