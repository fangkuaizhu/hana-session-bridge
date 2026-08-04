# HanaAgent 共享会话插件 · 设计文档

> 版本 v0.3 · 2026-08-04
> 代号：SessionBridge
> 审核人：ming（架构+安全）· 菲伦（设计哲学+UX）

---

## 变更记录

| 版本 | 日期 | 变更 |
|------|------|------|
| v0.1 | 08-04 | 初始草案 |
| v0.2 | 08-04 | 基于官方 PLUGIN_SDK.md + PLUGINS.md 确认 SDK API |
| v0.3 | 08-04 | 整合 ming 和菲伦审核意见：重新建模、Phase 0、Transport 抽象、生命周期、安全强化 |
| v0.4 | 08-04 | Phase 0 验证完成：subscribeSessionEvents 确认存在且签名匹配（§2.2），跨 session 操作无权限错误（§2.3 路径 A 采用） |

---

## 1. 概述

### 1.1 核心概念（重构）

**SessionBridge = 一个共享的 Agent 工作空间，支持不同粒度的协作权限。**

所有设计决策围绕这个模型展开。不再区分离散的"主持模式"/"会议模式"，而是提供一个连续的权限光谱：

```
只读 ──────→ 建议 ──────→ 协作 ──────→ 完全控制
(观看)      (评论)       (共享工具)    (完全代理)
```

| 权限级别 | 能看到 | 能做 | Agent | 典型场景 |
|---------|--------|------|-------|---------|
| 只读 | 所有消息+Agent回复+工具调用 | - | 不可用 | 教学演示、旁听 |
| 建议 | 同上 | 发送建议消息注入上下文 | 不可用 | 协同讨论 |
| 协作 | 同上 | 建议 + 共享指定工具 | 各自独立 Agent | 远程协助、协同开发 |
| 完全控制 | 同上 | 全部工具 | 各自独立 Agent | 完全信任的协作 |

权限级别由房间创建者设置，加入者接受创建者的权限设定。使用类比来解释：只读=屏幕共享，建议=带弹幕的直播，协作=配对编程，完全控制=共享桌面。

### 1.2 典型场景

- **远程协助**（建议→协作级别）：技术者帮小白排查问题，Agent 在小白机器上执行诊断
- **协同开发**（协作级别）：两人讨论代码架构，各自 Agent 辅助
- **教学演示**（只读→建议级别）：老师演示 Agent 用法，学生实时观看
- **头脑风暴**（建议级别）：多人讨论，Agent 参与梳理

---

## 2. SDK 底层能力

### 2.1 已确认 API

| API | 来源 | 用途 |
|-----|------|------|
| `createSession(ctx, opts)` | `@hana/plugin-runtime` | 创建插件私有会话 |
| `sendSessionMessage(ctx, target, opts)` | `@hana/plugin-runtime` | 程序化发送消息 + `context` 注入 |
| `listSessions(ctx, { ownerPluginId })` | `@hana/plugin-runtime` | 列举插件拥有的会话 |
| `createAgent(ctx, opts)` | `@hana/plugin-runtime` | 创建隐藏 Agent |
| `sampleText(ctx, opts)` | `@hana/plugin-runtime` | 非流式工具模型调用 |
| `createChatSurfaceCard(ctx, ref, opts)` | `@hana/plugin-runtime` | 展示插件私有会话卡片 |
| `bus.request` / `bus.handle` | EventBus | 插件间请求-响应通信 |
| `ctx.network.fetch()` | Plugin Context | HTTP 请求（跨机器 Relay 通道） |
| `ctx.config` | Plugin Context | 配置存储 |
| `ctx.resources` | Plugin Context | 用户资源读写 |
| `definePlugin()` | `@hana/plugin-runtime` | 有状态插件入口 |
| `defineTool()` | `@hana/plugin-runtime` | 类型安全工具定义 |

### 2.2 ✅ 已验证 API（Phase 0 完成）

> Phase 0 实机验证结论（2026-08-04）：`subscribeSessionEvents` 存在、签名匹配、事件流真实可达且按 session 隔离；跨 session 操作无权限错误。详见 [docs/phase-0-report.md](./docs/phase-0-report.md)。

| API | 签名（实测） | 状态 |
|-----|------|------|
| `subscribeSessionEvents(ctx, target, handler)` | `(ctx, target: HanaSessionTarget, handler: (event, meta) => void) => () => void`（返回 unsubscribe） | ✅ 已验证（存在，签名匹配预期） |
| 跨用户 session 操作 | 创建/订阅/发送均成功，零权限错误；`session_busy` 是运行中保护而非权限边界 | ✅ 已验证（同机路径可行） |
| `listSessions(ctx, { ownerPluginId })` | 插件私有 session 需 ownerPluginId 过滤；返回字段为 `path`（无 `sessionId` 字段） | ✅ 已验证 |
| `sendSessionMessage` 的 `context` 注入 | `context.system` + `context.beforeUser` 被接受（`accepted: true`） | ✅ 已验证 |
| 事件类型（已观测） | `agent_start` / `turn_start` / `message_start` | ✅ 部分验证（完整谱系待 Phase 1 补充） |

**实测事件隔离性**：订阅 session A 后向 session B 发消息，A 收到 0 个事件。订阅按 session 严格隔离，MessageBus 无需自行过滤。

### 2.3 实时消息通道方案（Phase 0 已决策）

**路径 A（✅ 已采用）**：`subscribeSessionEvents()` + EventBus 广播

- Phase 0 已验证：API 存在、签名匹配、事件流实时到达、按 session 隔离。
- Phase 1 的 `EventBusTransport` 以 `subscribeSessionEvents` 为事件源，`sendSessionMessage` 为写入通道。
- 参与者各自订阅自己房间对应的 session，事件经 MessageBus 去重/排序后广播。
- **`session_busy` 处理**：目标 session 活跃时发送返回 `session_busy`，消息应进入 `pendingMessages[]`（§4.2）等待重试，而非当作失败。

**路径 B（❌ 已排除）**：Pi SDK extension 拦截事件 + `bus.emit` 跨插件广播
- 不需要。路径 A 已完全可行，无需降级。保留作为极端情况（未来某事件类型无法通过 subscribeSessionEvents 获取时）的备选。

**路径 C（❌ 已排除）**：定时轮询 `session:history` + 序列号差量同步
- 不需要。实时事件流已可用。

---

## 3. 核心架构

### 3.1 统一架构图

```
┌──────────────────────────────────────────────────────┐
│                SessionBridge Plugin                    │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Room    │  │ Message  │  │  Tool    │           │
│  │ Manager  │  │   Bus    │  │  Proxy   │           │
│  │          │  │          │  │          │           │
│  │ 生命周期  │  │ 路由+广播 │  │ 权限检查  │           │
│  │ 权限管理  │  │ 序列号   │  │ 参数过滤  │           │
│  │ 超时清理  │  │ 去重     │  │ 审计日志  │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│       │              │              │                 │
│  ┌────┴──────────────┴──────────────┴──────────────┐ │
│  │              Transport Layer                     │ │
│  │  ┌────────────┐  ┌────────────┐                 │ │
│  │  │ EventBus   │  │ WebSocket  │  ← 可插拔       │ │
│  │  │ Transport  │  │ Transport  │                 │ │
│  │  │ (同机/同进程) │  │ (跨机/公网) │                 │ │
│  │  └────────────┘  └────────────┘                 │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │  Plugin Store    │  │  WebView/iframe UI       │  │
│  │  rooms/          │  │  (React +                │  │
│  │  messages/       │  │   @hana/plugin-components)│  │
│  │  audit-logs/     │  │                           │  │
│  └──────────────────┘  └──────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### 3.2 Transport 抽象层（Phase 1 引入）

```typescript
// lib/transport.ts
interface Transport {
  connect(roomId: string): Promise<void>;
  disconnect(roomId: string): Promise<void>;
  send(roomId: string, message: RoomMessage): Promise<void>;
  onMessage(roomId: string, handler: (msg: RoomMessage) => void): () => void;
  onConnectionChange(roomId: string, handler: (status: ConnectionStatus) => void): () => void;
}

interface RoomMessage {
  roomId: string;
  from: string;          // userId
  seq: number;           // 房间内全局单调递增序列号
  type: "user_message" | "agent_reply" | "tool_call" | "tool_result" | "suggestion" | "participant_join" | "participant_leave" | "permission_request" | "permission_response";
  payload: unknown;
  timestamp: number;
}
```

Phase 1 实现 `EventBusTransport`（同进程，广播用 `bus.emit`/接收用 `bus.subscribe`，请求-响应用 `bus.request`/`bus.handle`）。
Phase 2 新增 `WebSocketTransport`（跨机器，客户端用 Node.js `ws` 库直连 Relay；`ctx.network.fetch()` 仅用于 HTTP API，不用于 WebSocket 连接）。full-access 插件有完整 Node.js API 访问权限，`ws` 库可用。
MessageBus 只依赖 `Transport` 接口，不关心底层实现。

**seq 分配**：房间创建者（房主）的插件实例作为 seq 分配器。房主离开时移交 seq 分配权给新宿主。发送方不自行分配 seq，而是通过 `Transport` 从房间获取全局递增序号。

### 3.3 同机 vs 跨机（明确定义）

**同机**：同一 Hana 实例上的多个用户 session。插件运行在 Hana 的单进程内，通信走 EventBus。每个参与者都必须安装 SessionBridge 插件。

**跨机**：不同物理机器上的独立 Hana 实例。通信走 WebSocket Relay。每个参与者都必须安装 SessionBridge 插件。

不存在"仅主持安装、观众不安装"的同机路径。这是因为插件通过 Session Bus 操作 session 的能力可能受用户边界限制（Phase 0 验证），且 EventBus 要求双方都注册 handler。

### 3.4 插件激活策略

`activationEvents: ["onToolCall:create-room", "onToolCall:join-room"]` 实现按需加载：
- 插件在首次调用 `create-room` 或 `join-room` 时激活
- 激活后生命周期持续运行（`onload` → `onunload`），不会在工具调用结束后自动卸载
- 好处：不占用启动资源，仅在需要时才建立 EventBus handler 和 WebSocket 连接
- 风险：如果插件因 Hana 内部机制而被卸载（如长时间无活动），已建立的房间和连接会丢失。需在 `onunload` 中通知所有参与者并清理资源

### 3.5 构建方式

插件 UI 用 `professional-react` 模板（Vite + `@hana/plugin-sdk` + `@hana/plugin-components`）。
- 源码：`src/`（React/TypeScript）
- 构建输出：`assets/dist/`（Vite build）
- 服务端代码：`index.ts`、`tools/`、`lib/`、`routes/`（直接由 Hana PluginManager 加载，无需构建）
- 生产部署：打包为 .zip 时包含 `assets/dist/` 和所有服务端 .js 文件

---

## 4. 数据模型

### 4.1 房间

```typescript
interface Room {
  roomId: string;              // 8 位字母数字（v0.3 从 6 位加长到 8 位）
  readableName?: string;       // 可选可读词组，如 "蓝色-河流-3"
  password?: string;           // 可选密码，留空则手动确认
  permissionLevel: PermissionLevel;
  hostId: string;
  participants: Map<string, Participant>;
  pendingJoinRequests: JoinRequest[];
  createdAt: number;
  lastActivityAt: number;
  status: "active" | "closing" | "closed";
}

type PermissionLevel = "readonly" | "suggest" | "collaborate" | "full_control";

interface Participant {
  userId: string;
  sessionPath: string;
  agentId?: string;            // 协作级别及以上有 Agent
  transportType: "eventbus" | "websocket";
  connectionId: string;        // 区分同一用户的多设备
  joinedAt: number;
  lastSeenAt: number;
}

interface JoinRequest {
  userId: string;
  requestedAt: number;
  status: "pending" | "approved" | "rejected";
  timeoutSeconds: 60;          // 60 秒内未批准自动拒绝
}
```

### 4.2 消息去重与同步

```typescript
interface ParticipantState {
  lastReceivedSeq: number;     // 该参与者已收到的最新 seq
  lastConfirmedSeq: number;    // 该参与者已确认处理的最新 seq
  pendingMessages: RoomMessage[];  // 未确认的消息（断线重放用）
}
```

---

## 5. 房间生命周期

### 5.1 创建

1. 用户通过 Agent 工具 (`create-room`) 或 WebView UI 创建房间
2. 生成 8 位字母数字码 + 可选可读词组别名
3. 设置权限级别和可选密码
4. 房间状态：`active`
5. 持久化到 `plugin-data/session-bridge/rooms/{roomId}.json`

### 5.2 加入

**有密码**：输入密码 → 验证 → 加入
**无密码**：发送加入请求 → 房间内现有成员收到通知 → 第一个响应决定批准/拒绝 → 60 秒超时自动拒绝

批准交互：WebView UI 弹出卡片「用户 xxx 请求加入房间（权限级别：协作），批准/拒绝？」。不打断 Agent 的当前执行流——卡片叠加在会话上方而非中断。

### 5.3 观众补回历史（只读/建议级别）

加入时：
1. 发送最近 20 轮的**压缩摘要**（每轮：用户说了什么 + Agent 回复摘要 + 工具调用摘要）
2. 更早的消息通过"加载更多"按钮按需加载
3. 每条消息携带 `seq`，用于增量更新

### 5.4 离开

- 参与者主动离开 → 立即移除
- 房主离开：
  - 只读/建议级别 → 房间进入「只读回放」模式，不再有新消息，所有参与者可查看历史
  - 协作/完全控制级别 → 移交房主给最早加入的参与者（包括 seq 分配权 + 超时定时器所有权）。如无其他参与者，房间关闭
- 断线（WebSocket）：参见 §8.1 重连策略

### 5.5 超时与销毁

- 超时定时器由**房主**的插件实例持有
- 房主移交时定时器随同转移
- 如果房主意外断开且无其他参与者 → 定时器失效，房间在 Relay（跨机）或内存（同机）中残留。通过 §8.5 的幽灵房间清理机制处理
- `lastActivityAt` 超过 30 分钟无消息 → 房主通知所有参与者「房间即将关闭」
- 5 分钟后自动销毁
- 销毁后持久化到 `rooms/{roomId}.jsonl`（保留 7 天）
- 密码以 `bcrypt` 哈希存储，不存明文
- 7 天后自动清理

---

## 6. 工具代理安全设计

### 6.1 白名单（参数级过滤）

白名单从工具名级别升级到**参数级**：

```typescript
interface ToolPermission {
  toolName: string;
  mode: "whitelist" | "approval" | "blocked";
  scope: "once" | "session" | "always";

  // 参数级过滤（正则匹配）
  paramFilters?: Record<string, {
    pattern: string;      // 正则表达式
    description: string;  // 人类可读的说明
  }>;

  // 仅对批准模式
  approvalTimeoutMs?: number;  // 默认 30000
}
```

示例：
```json
{
  "toolName": "exec_command",
  "mode": "whitelist",
  "paramFilters": {
    "cmd": { "pattern": "^(chkdsk|sfc|dism|systeminfo|ipconfig|ping|tracert)\\b", "description": "仅系统诊断命令" },
    "workdir": { "pattern": "^C:\\\\Users\\\\", "description": "仅用户目录" }
  }
}
```

### 6.2 批准模式

- **超时**：默认 30 秒，超时自动拒绝。被调用方 Agent 收到超时通知
- **防轰炸**：同一工具 60 秒内最多弹窗 3 次。超出后自动拒绝并通知调用方「频率限制」
- **批准范围**：`once`（仅本次）/ `session`（本次会话内不重复询问）/ `always`（写入白名单）
- **不在线**：如果被调用方离线，请求入队，等待对方上线后处理（最长等待 5 分钟）

### 6.3 审计日志

每次工具代理操作记录：
- 谁请求了什么工具、什么参数
- 参数过滤结果（通过/拒绝）
- 被调用方是否批准
- 执行结果摘要（成功/失败/输出截断）
- 时间戳

存储在 `plugin-data/session-bridge/audit/{roomId}.jsonl`。

### 6.4 待定问题（Phase 3 详细设计时解决）

> 以下问题目前不阻塞 Phase 1-2，但需要在 Phase 3 启动前有明确答案。

- **Q1**：白名单是用户自己配还是系统预设？→ 倾向：用户配置 + 系统提供默认模板
- **Q2**：批准流程会不会打断 Agent 的执行流？→ 需要设计异步确认机制，Agent 不应被阻塞
- **Q3**：如果被调用方不在线，队列中的请求在重连后如何恢复？→ 参见 §8.1

---

## 7. Relay 安全性

### 7.1 威胁模型声明

> **Relay 消息在传输层不加密。** Relay 运维者（你）可以读取所有共享会话的内容。如果会话内容包含敏感信息，应在应用层加密。

### 7.2 安全措施

| 措施 | 说明 |
|------|------|
| `wss://` TLS | WebSocket 强制 HTTPS，防中间人 |
| 8 位房间码 | 36^8 ≈ 2.8 万亿种组合，暴力枚举不可行 |
| 可选密码 | 房间级密码，不经过 Relay（本地验证后仅发送 `authenticated: true`） |
| 速率限制 | Relay 每个房间码每秒最多 20 条消息 |
| 握手验证 | 加入房间时 Relay 验证房间码是否存在于活跃房间列表 |

### 7.3 未来可选的端到端加密

- 房间创建时生成对称密钥（AES-256-GCM）
- 密钥通过房间码 + 密码线下传递给加入者（例如：`session-bridge join A3K9X2M7 -k <base64key>`）
- Relay 仅做信封路由，不解密 payload
- **当前版本不实现，标注为未来扩展**

---

## 8. 边界条件

### 8.1 WebSocket 重连

| 参数 | 值 |
|------|-----|
| 心跳间隔 | 30 秒 ping |
| 断线判定 | 10 秒无 pong |
| 重连策略 | 指数退避：1s, 2s, 4s, 8s, 16s, 30s（封顶） |
| 最大重试 | 无限（UI 显示"重连中…"） |

**重连后状态恢复**：
1. 重新握手（房间码 + 密码/批准）
2. 发送 `sync_request { roomId, lastSeq }`
3. Relay 返回 `sync_response { currentState, missedMessages[] }`
4. 客户端按 seq 去重：`seq <= lastReceivedSeq` 的消息丢弃

### 8.2 消息去重

```
收到消息 → 检查 seq
  ├─ seq <= lastReceivedSeq[roomId] → 丢弃
  ├─ seq == lastReceivedSeq[roomId] + 1 → 正常处理，lastReceivedSeq++
  └─ seq > lastReceivedSeq[roomId] + 1 → 漏消息，请求补发
```

### 8.3 多设备

同一用户从桌面端和手机端同时加入：每个设备分配独立 `connectionId`。消息广播到所有 `connectionId`。UI 侧按 `connectionId` 去重显示（已读状态按用户合并）。

### 8.4 网络延迟

- 跨机器（公网 Relay）：预期延迟 50-200ms
- 插件内置 5 秒消息确认超时（用于判断是否需要重发）
- 连续 3 条消息未确认 → 判定连接异常，触发重连

### 8.5 幽灵房间清理

房主异常断开（进程崩溃、断电）且无其他参与者时，房间可能残留：
- **同机**：插件 `onunload` 中清理所有本机创建的房间。如果 `onunload` 未触发（崩溃），下次插件加载时扫描 `rooms/` 目录，删除所有状态为 `active` 但创建者不在线的房间
- **跨机**：Relay 每 5 分钟扫描所有房间，移除最后活跃时间超过 60 分钟的房间

### 8.6 并发安全

- **房间码碰撞**：生成时检查 `rooms/{roomId}.json` 是否存在，碰撞则重新生成（最多 10 次）
- **同时加入**：RoomManager 对每个房间的加入操作用内存锁（`Promise` 互斥），保证 `participants` 原子更新
- **同时批准**：多个参与者同时响应加入请求 → 第一个响应生效，其余忽略
- **房主移交竞争**：房主断开时，多个参与者可能同时触发移交逻辑 → 按 `joinedAt` 时间戳确定继承顺序，最早加入者成为新房主

### 8.7 极端场景

| 场景 | 风险 | 处理 |
|------|------|------|
| 100 人同时加入同一房间 | 消息广播 O(n) 爆炸，单条消息 → 100 次 `bus.emit` | 房间人数上限 20 人（可通过配置调整） |
| 单参与者每秒发送 1000 条消息 | EventBus 无原生限流 | 插件端限流：每 userId 每秒最多 10 条消息，超出丢弃并警告 |
| Agent 回复极长（10KB+ 流式输出） | RoomMessage payload 过大 | 流式消息分 chunk 发送（每 500 字符或每 200ms 一个 chunk），接收端拼接 |
| 房间持久化文件损坏（停电/磁盘满） | `rooms/{roomId}.json` 不可解析 | 启动时 JSON.parse 失败 → 删除损坏文件 + 记录日志。房间视为从未存在 |
| 用户同时从两个设备加入同一房间 | 重复 participant 条目 | 后加入的连接覆盖旧连接（按 userId 去重），旧连接被踢出并通知 |
| 共享的 session 被用户删除 | 房间失去事件源 | 检测到 session 不存在 → 房间进入 `closing` 状态 → 通知所有参与者 → 5 分钟后销毁 |
| 插件被禁用/卸载 | 所有房间连接丢失 | `onunload` 中遍历所有活跃房间，发送 `participant_leave` 给其他参与者，关闭连接 |

---

## 9. 实现注意事项

### 9.1 SDK 依赖管理

使用 `professional-react` 模板时，SDK 包通过 `--sdk-mode bundled` 嵌入。生产部署时确保：
- `@hana/plugin-runtime` 的服务端代码已打包或随插件分发
- `@hana/plugin-sdk` 和 `@hana/plugin-components` 的 iframe 端代码已通过 Vite 打包到 `assets/dist/`
- 不在 `manifest.json` 中声明对 SDK 包的裸 import（Hana 不会自动 `npm install`）

### 9.2 错误处理矩阵

| 错误场景 | 处理方式 |
|---------|---------|
| `sendSessionMessage` 失败 | 重试 3 次（指数退避），失败后通知用户「消息未送达」 |
| 房间码碰撞（生成重复） | 重新生成，最多 10 次，10 次后报错 |
| WebSocket 连接失败 | 指数退避重连，UI 显示「连接中…」（参见 §8.1） |
| EventBus handler 重复注册 | 在 `onload` 中先 `bus.handle`，用 `HANA_BUS_SKIP` 跳过自己不处理的事件 |
| 插件被禁用/卸载时房间仍存在 | `onunload` 中清理所有本机持有的房间连接，通知参与者 |
| 密码不匹配 | 返回错误「密码错误」，不透露房间是否存在（防枚举） |

### 9.3 内存管理

- 房间消息缓冲区：每个房间保留最近 500 条消息在内存，更旧的从磁盘读取
- 参与者断线后的消息：保留在 `pendingMessages[]` 中，最多 1000 条。超出则清理最旧的
- WebView UI 虚拟滚动：消息列表用 `react-window` 或类似方案，避免 DOM 节点爆炸

---

## 10. 实施路线图

### Phase 0 · 最小验证 ✅（已完成 2026-08-04）

**目标**：验证两个核心假设

1. `subscribeSessionEvents` 是否存在、签名正确？
   ✅ 存在且签名匹配（`(ctx, target, handler) => () => void`），事件流实时可达、按 session 隔离。
2. 插件能否跨用户操作 session？
   ✅ 创建/订阅/发送均成功，零权限错误；`session_busy` 为运行中保护非权限边界。

**通过标准**（全部达成）：
- `subscribeSessionEvents` 存在且签名匹配文档 → **采用路径 A** ✅
- 跨用户操作成功 → Phase 1 同机路径可行 ✅

验证产物：`docs/phase-0-report.md` + `phase0/smoke-plugin/`

### Phase 1 · 同机共享（1-2 周）

- [ ] Transport 抽象接口
- [ ] EventBusTransport 实现
- [ ] 房间创建/加入/离开（Agent 工具 `create-room`/`join-room`/`leave-room`）
- [ ] 消息广播（实时事件 → MessageBus → 参与者）
- [ ] 观众建议消息注入
- [ ] 基础 WebView UI（React + `@hana/plugin-components`）
- [ ] 房间生命周期（超时、销毁）
- [ ] 验证：同机多用户测试

### Phase 2 · 跨机 Relay（1-2 周）

- [ ] Relay Server 部署（阿里云 ECS 47.93.186.189）
  - [ ] Node.js WebSocket server（~100 行）
  - [ ] wss:// 证书（复用 `*.myczdfkz.shop` Let's Encrypt）
  - [ ] PM2 保活
- [ ] WebSocketTransport 实现
- [ ] 重连 + 心跳 + 去重（边界条件 §8）
- [ ] 验证：两台机器公网测试

### Phase 3 · 工具代理 + 协作权限（2-3 周）

- [ ] 参数级白名单 + 正则过滤
- [ ] 批准模式 UI（异步确认 + 防轰炸 + 超时）
- [ ] 审计日志
- [ ] 协作级别多 Agent 上下文同步
- [ ] 离线请求队列
- [ ] 待定问题确认（§6.4）

### Phase 4 · 打磨

- [ ] 消息持久化（离开房间后可回溯 7 天）
- [ ] 更多权限模板（预设白名单模板）
- [ ] 性能优化（大房间消息批处理）
- [ ] 文档与使用指南

---

## 11. 插件结构

```
session-bridge/
├── manifest.json
├── index.ts                  # definePlugin() 入口（注册 EventBus handler）
├── tools/
│   ├── create-room.ts        # session-bridge_create-room
│   ├── join-room.ts          # session-bridge_join-room
│   ├── leave-room.ts         # session-bridge_leave-room
│   └── room-status.ts        # session-bridge_room-status
├── lib/
│   ├── transport.ts          # Transport 抽象接口
│   ├── eventbus-transport.ts # EventBusTransport（Phase 1）
│   ├── websocket-transport.ts# WebSocketTransport（Phase 2）
│   ├── room-manager.ts       # 房间生命周期
│   ├── message-bus.ts        # 消息路由 + 去重 + 序列号
│   ├── tool-proxy.ts         # 工具代理 + 权限检查
│   ├── context-sync.ts       # 上下文同步 + 观众补回
│   └── audit-log.ts          # 审计日志
├── routes/
│   ├── room-api.ts           # WebView → 后端 REST API
│   └── relay-ws.ts           # WebSocket 升级端点（Phase 2）
├── assets/                   # React 构建产物
│   └── dist/
├── src/                      # React 源码（@hana/plugin-components）
│   ├── RoomPanel.tsx
│   ├── MessageStream.tsx
│   ├── ParticipantList.tsx
│   ├── JoinDialog.tsx
│   └── ApprovalDialog.tsx
└── relay-server/             # 独立部署的 Relay Server（Phase 2）
    ├── package.json
    └── server.js
```

---

## 12. manifest.json

```json
{
  "manifestVersion": 1,
  "id": "session-bridge",
  "name": "会话共享",
  "version": "0.1.0",
  "trust": "full-access",
  "activationEvents": ["onToolCall:create-room", "onToolCall:join-room"],
  "capabilities": [
    "session.read",
    "session.write",
    "agent.read",
    "agent.write",
    "network.fetch",
    "resource.read",
    "resource.write"
  ],
  "network": {
    "allowedHosts": ["relay.myczdfkz.shop"],
    "methods": ["GET", "POST"],
    "defaultTimeoutMs": 30000,
    "maxResponseBytes": 1048576
  },
  "ui": {
    "hostCapabilities": ["external.open", "clipboard.writeText"]
  },
  "contributes": {
    "configuration": {
      "properties": {
        "relayServerUrl": {
          "type": "string",
          "title": "Relay 服务器地址",
          "default": "wss://relay.myczdfkz.shop"
        },
        "userId": {
          "type": "string",
          "title": "用户标识名",
          "default": ""
        }
      }
    },
    "tools": [
      "tools/create-room.js",
      "tools/join-room.js",
      "tools/leave-room.js",
      "tools/room-status.js"
    ],
    "page": {
      "title": "共享房间",
      "route": "room-panel"
    }
  }
}
```

关键变更：`activationEvents` 从 `["onStartup"]` 改为 `["onToolCall:create-room", "onToolCall:join-room"]`。按需加载——只有用户主动使用共享功能时才启动插件生命周期。WebSocket 连接在加入第一个房间时建立，离开所有房间后断开。

---

## 13. 审核总结

| 审核轮次 | 审核人 | 主要意见 | 修复 |
|---------|--------|---------|------|
| 第1轮 | 菲伦 | 模式离散→权限光谱、房间码UX、Phase 3黑盒 | ✅ 全部采纳 |
| 第1轮 | ming | subscribeSessionEvents 存疑、Transport 抽象、白名单粒度、生命周期、边界条件 | ✅ 全部采纳 |
| 第2轮 | 自审（实现者视角） | WebSocket 实现细节缺失、EventBus 广播语义不清、seq 分配未定义、并发安全缺失、构建方式未说明 | ✅ 全部修复 |
| 第3轮 | 自审（极端场景） | 100人房间、刷屏攻击、长消息分块、文件损坏、session 被删、多设备冲突 | ✅ 全部修复 |
