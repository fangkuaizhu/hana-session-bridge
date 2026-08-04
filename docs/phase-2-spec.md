# Phase 2 跨机 WebSocket Relay · 开发任务书

> 版本 1.0 · 2026-08-04
> 产品经理：Hanako
> 前置：Phase 1 同机共享已完成（session-bridge.zip 可安装）
> 设计文档：DESIGN.md §3.2、§7、§8

---

## 一、Phase 2 目标

在 Phase 1 同机共享基础上，增加**跨机器**协作能力。两个用户在**不同物理机**上各运行独立 Hana 实例，通过 Relay Server 共享会话上下文。

产出：
- `relay-server/` — 独立部署的 WebSocket Relay（~100 行 Node.js）
- `lib/websocket-transport.ts` — Transport 接口的跨机实现
- 更新后的 `session-bridge.zip` — Phase 1+2 完整包

---

## 二、架构回顾

```
机器 A（Hana + Plugin）              VPS（Relay）              机器 B（Hana + Plugin）
┌──────────────────┐          ┌──────────────┐          ┌──────────────────┐
│ WebSocketTransport│◄─ wss ─►│ Relay Server │◄─ wss ─►│ WebSocketTransport│
│       ↕          │          │  路由+广播    │          │       ↕          │
│   MessageBus     │          │  房间管理    │          │   MessageBus     │
│       ↕          │          │  速率限制    │          │       ↕          │
│   RoomManager    │          │  心跳检测    │          │   RoomManager    │
└──────────────────┘          └──────────────┘          └──────────────────┘
```

Relay 是**无状态路由层**——不持久化房间数据，不保存消息历史，纯粹做信封转发。房间状态由各插件实例的内存 + 本地持久化维护。

---

## 三、模块拆分

```
R1: Relay Server                   [独立部署，无依赖]
    │
R2: WebSocketTransport             [依赖 R1 协议]
    │
R3: 插件集成（manifest + 配置）      [依赖 R2]
    │
R4: 跨机 smoke test                [依赖 R1+R2+R3]
```

---

## 四、模块详细规格

### R1：Relay Server

**文件**：`relay-server/server.js`

**技术栈**：Node.js + `ws`（WebSocket 库）

**协议规格**：

```typescript
// 客户端 → Relay
type ClientMessage =
  | { type: "auth"; roomId: string; userId: string; password?: string }
  | { type: "room_message"; roomId: string; message: Message }
  | { type: "sync_request"; roomId: string; lastSeq: number };

// Relay → 客户端
type ServerMessage =
  | { type: "auth_ok"; roomId: string; participants: string[] }
  | { type: "auth_fail"; reason: string }
  | { type: "room_message"; roomId: string; message: Message }
  | { type: "sync_response"; roomId: string; currentState: RoomState }
  | { type: "participant_join"; roomId: string; userId: string }
  | { type: "participant_leave"; roomId: string; userId: string }
  | { type: "error"; message: string };
```

**核心逻辑**：

```javascript
// 数据结构
const rooms = new Map();  // roomId -> { participants: Map<ws, {userId}>, password?, createdAt }
const clients = new Map(); // ws -> { roomId, userId }

// 路由
ws.on('message', (data) => {
  const msg = JSON.parse(data);

  switch (msg.type) {
    case 'auth':
      // 1. 验证房间存在/密码
      // 2. 加入房间 participants
      // 3. 广播 participant_join 给房间其他人
      // 4. 返回 auth_ok
      break;

    case 'room_message':
      // 1. 验证 sender 在房间中
      // 2. 广播给房间所有其他参与者
      break;

    case 'sync_request':
      // 返回房间当前状态（参与者列表等）
      break;
  }
});

ws.on('close', () => {
  // 从房间移除，广播 participant_leave
  // 如果房间无参与者 → 删除房间
});
```

**安全与运维**：

- 速率限制：每房间每秒最多 20 条消息（`Map<roomId, {count, resetAt}>`）
- 房间码验证：加入时检查房间是否存在于 `rooms` Map
- 密码验证：auth 消息携带密码，Relay 对比房间创建时的密码（bcrypt 哈希）
- 心跳：30 秒 ping，10 秒无 pong 断开
- 幽灵房间清理：每 5 分钟扫描，60 分钟无活动删除
- 日志：`console.log` 格式 `[HH:MM:SS] room:action userId`

**部署**：

```
# 在 VPS 上
cd relay-server/
npm install ws
node server.js  # 监听 0.0.0.0:64162

# Nginx 反代（复用现有证书）
location /relay {
    proxy_pass http://127.0.0.1:64162;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

**验证**：本地 `node relay-server/server.js` → 用 `wscat` 或 Node.js 脚本连接，模拟 auth + room_message 流程。

---

### R2：WebSocketTransport

**文件**：`lib/websocket-transport.ts`

**实现**：实现 `Transport` 接口（和 EventBusTransport 同一接口）。

```typescript
import WebSocket from 'ws';  // full-access 插件有完整 Node.js API
import { Transport, Message, ConnectionStatus } from './transport';

export class WebSocketTransport implements Transport {
  private connections = new Map<string, WebSocket>();  // roomId -> ws
  private messageHandlers = new Map<string, Set<(msg: Message) => void>>();
  private statusHandlers = new Map<string, Set<(status: ConnectionStatus) => void>>();
  private relayUrl: string;
  private userId: string;
  private reconnectTimers = new Map<string, NodeJS.Timeout>();

  constructor(relayUrl: string, userId: string);

  async connect(roomId: string, password?: string): Promise<void> {
    // 1. 建立 WebSocket 连接
    // 2. 发送 auth 消息
    // 3. 等待 auth_ok
    // 4. 注册 message 监听器
    // 5. 启动心跳
  }

  async disconnect(roomId: string): Promise<void> {
    // 1. 清除重连定时器
    // 2. 关闭 WebSocket
    // 3. 清理 handlers
  }

  async send(roomId: string, message: Message): Promise<void> {
    // ws.send(JSON.stringify({ type: 'room_message', roomId, message }))
  }

  onMessage(roomId: string, handler: (msg: Message) => void): () => void;
  onConnectionChange(roomId: string, handler: (status: ConnectionStatus) => void): () => void;

  // 重连逻辑
  private startReconnect(roomId: string): void {
    // 指数退避：1s, 2s, 4s, 8s, 16s, 30s（封顶）
    // 无限重试
    // 重连成功后发送 sync_request
  }
}
```

**关键约束**：

- 重连后发送 `sync_request { roomId, lastSeq }`，Relay 返回当前状态
- 消息去重：维护 `lastReceivedSeq`，丢弃 `seq <= lastReceivedSeq` 的消息
- 心跳：30 秒 ping，收到 pong 更新 lastSeen
- `ws` 库从 npm 安装，vendor 到 `vendor/ws/` 目录（和 bcryptjs 一样）
- `relayUrl` 从 `ctx.config.get('relayServerUrl')` 读取

**验证**：本地启动 Relay → 两个 WebSocketTransport 实例互发消息 → 确认 seq 递增 + 回声过滤。

---

### R3：插件集成

**文件修改**：

1. **`lib/shared.ts`**：Transport 选择逻辑
   ```typescript
   function createTransport(ctx: PluginContext): Transport {
     const relayUrl = ctx.config.get('relayServerUrl');
     if (relayUrl) {
       return new WebSocketTransport(relayUrl, getUserDisplayName(ctx));
     }
     return new EventBusTransport(ctx);
   }
   ```

2. **`manifest.json`**：unchanged（`network.fetch` 已声明，但 WebSocket 不走 `ctx.network.fetch()`，走 `ws` 库直连）

3. **`vendor/`**：新增 `ws/` 目录（vendor ws 库）

**配置 schema 补充**：Phase 1 manifest 已有 `relayServerUrl` 配置项，不需要改。

**验证**：设置 `relayServerUrl` → 创建房间 → 确认使用 WebSocketTransport 而非 EventBusTransport。

---

### R4：跨机 smoke test

**部署 Relay**：
```bash
# VPS 上
cd /mnt/vdb1/
mkdir relay-server
# 上传 relay-server/server.js
cd relay-server && npm install ws
# PM2 保活
pm2 start server.js --name session-bridge-relay
# Nginx 反代（wss://relay.myczdfkz.shop → localhost:64162）
```

**测试流程**：
1. VPS 启动 Relay
2. 机器 A 安装插件，设置 `relayServerUrl = "wss://relay.myczdfkz.shop"`
3. 机器 B 安装插件，同样设置 Relay URL
4. A 创建房间 → 获得房间码
5. B 用房间码加入 → 确认 participant_join 广播
6. A 向 Agent 发消息 → B 的 WebView 实时看到
7. B 发送建议 → A 的会话上下文收到注入
8. 断开 B 的网络 → 确认 A 看到 participant_leave → B 重连后恢复

---

## 五、开发顺序

| 序号 | 模块 | 预计时间 | 产出 |
|------|------|---------|------|
| R1 | Relay Server | 0.5天 | `relay-server/server.js` + `package.json` |
| R2 | WebSocketTransport | 1天 | `lib/websocket-transport.ts` + vendor ws |
| R3 | 插件集成 | 0.5天 | shared.ts 更新 + manifest 不变 |
| R4 | 跨机 smoke test | 0.5天 | VPS 部署 + 双机验证 |

**总计**：约 2-3 个工作日

---

## 六、与 Phase 1 的关系

- **Transport 抽象**已在 Phase 1 设计好，Phase 2 只加一个实现，不改接口
- **MessageBus / RoomManager / Agent 工具**不需要修改
- **WebView UI** 不需要修改（连接状态指示器从"始终本地"变为真实网络状态，由 Transport 的 `onConnectionChange` 驱动）
- Phase 2 的 zip 在 Phase 1 基础上增加：`relay-server/`、`lib/websocket-transport.ts`、`vendor/ws/`

---

## 七、关键约束

1. Relay 部署用**现有 VPS**（47.93.186.189），和 cat-alan/DST 等服务共存，新开端口 64162
2. 域名 `relay.myczdfkz.shop`（需在阿里云 DNS 加 A 记录，或复用 `*.myczdfkz.shop` 通配符）
3. `ws` 库 vendor 到插件内（和 bcryptjs 一样），不依赖 `node_modules/`
4. Relay 的 `server.js` 不 vendor 到插件 zip（它是独立部署的），但在仓库里保留
5. Phase 2 的 zip 必须保持向后兼容：不填 relayServerUrl 配置时，退化为纯 EventBusTransport（Phase 1 行为）
