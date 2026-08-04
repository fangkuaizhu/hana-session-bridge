# Phase 1 同机共享 · 开发任务书

> 版本 1.0 · 2026-08-04
> 产品经理：Hanako
> 前置：Phase 0 验证通过（`subscribeSessionEvents` 存在、跨 session 操作可行）
> 设计文档：DESIGN.md §3~§5

---

## 一、Phase 1 目标

产出**可安装运行的插件**，实现同一 Hana 实例上两个用户实时共享会话上下文。输出：`session-bridge.zip`，拖拽安装即可用。

---

## 二、模块拆分与依赖顺序

```
Module 1: Transport 抽象 + EventBusTransport    [无依赖]
    │
Module 2: RoomManager（房间 CRUD + 持久化）     [依赖 M1]
    │
Module 3: MessageBus（事件订阅→广播路由）        [依赖 M1, M2]
    │
Module 4: Agent 工具（4 个）                     [依赖 M2, M3]
    │
Module 5: WebView UI（React 房间面板）           [依赖 M2, M3]
    │
Module 6: index.ts 生命周期 + manifest.json       [依赖 M1~M5]
```

**每个模块完成后必须 smoke test 通过才能进入下一个。**

---

## 三、逐模块详细规格

### Module 1：Transport 抽象 + EventBusTransport

**文件**：
- `lib/transport.ts` — 接口定义
- `lib/eventbus-transport.ts` — 实现

**transport.ts 规格**：

```typescript
export type ConnectionStatus = "connected" | "disconnected" | "connecting";

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

export interface Message {
  roomId: string;
  from: string;
  seq: number;
  type: "user_message" | "agent_reply" | "tool_call" | "tool_result" 
      | "suggestion" | "participant_join" | "participant_leave";
  payload: unknown;
  timestamp: number;
}
```

**eventbus-transport.ts 规格**：

- **`connect(roomId)`**：注册 `bus.handle("session-bridge:room:${roomId}", handler)` 用于接收消息；注册 `bus.subscribe` 用于广播接收
- **`disconnect(roomId)`**：移除对应 handler
- **`send(roomId, message)`**：通过 `bus.emit("session-bridge:broadcast:${roomId}", message)` 广播
- **`onMessage(roomId, handler)`**：内部维护 listener Map，收到广播时调用对应 handler
- **`onConnectionChange(roomId, handler)`**：同机环境下连接状态始终为 `"connected"`（无网络层）

**验证**：写 `tools/test-transport.ts`，创建两个 Transport 实例，A send → B onMessage 收到。确认消息 seq 递增。

---

### Module 2：RoomManager

**文件**：
- `lib/room-manager.ts`
- `lib/store.ts`（JSON 文件读写工具）

**room-manager.ts 规格**：

```typescript
export interface Room {
  roomId: string;
  readableName?: string;
  passwordHash?: string;       // bcrypt hash，无密码则为 undefined
  permissionLevel: "readonly" | "suggest" | "collaborate" | "full_control";
  hostId: string;
  participants: Participant[];
  pendingJoinRequests: PendingJoin[];
  createdAt: number;
  lastActivityAt: number;
  status: "active" | "closing" | "closed";
  seqCounter: number;          // 全局消息序列号
}

export interface Participant {
  userId: string;
  sessionPath: string;
  joinedAt: number;
}

export interface PendingJoin {
  userId: string;
  requestedAt: number;
  timeoutSeconds: number;
  status: "pending";
}

export class RoomManager {
  constructor(ctx: PluginContext);

  /** 创建房间。返回 roomId */
  createRoom(opts: {
    hostId: string;
    hostSessionPath: string;
    permissionLevel: PermissionLevel;
    password?: string;         // 明文，内部 bcrypt 哈希
  }): Promise<string>;

  /** 加入房间。需要密码则验证，无密码则创建 pending 请求 */
  joinRoom(roomId: string, opts: {
    userId: string;
    sessionPath: string;
    password?: string;
  }): Promise<"joined" | "pending">;

  /** 批准加入请求 */
  approveJoin(roomId: string, userId: string): Promise<boolean>;

  /** 拒绝加入请求 */
  rejectJoin(roomId: string, userId: string): Promise<void>;

  /** 离开房间 */
  leaveRoom(roomId: string, userId: string): Promise<void>;

  /** 获取房间信息 */
  getRoom(roomId: string): Room | null;

  /** 获取所有活跃房间 */
  listActiveRooms(): Room[];

  /** 分配下一个消息 seq */
  nextSeq(roomId: string): number;

  /** 更新最后活动时间 */
  touch(roomId: string): void;

  /** 启动超时定时器（30分钟） */
  startTimeoutTimer(roomId: string, onTimeout: () => void): void;

  /** 清理超时定时器 */
  clearTimeoutTimer(roomId: string): void;

  /** 转移房主 */
  transferHost(roomId: string, newHostId: string): void;
}
```

**store.ts 规格**：

```typescript
/** 读 JSON 文件，不存在返回 null */
export function readJSON<T>(filePath: string): T | null;

/** 写 JSON 文件（覆盖） */
export function writeJSON<T>(filePath: string, data: T): void;

/** 追加 JSONL 行 */
export function appendJSONL<T>(filePath: string, entry: T): void;

/** 删除文件 */
export function deleteFile(filePath: string): void;
```

**关键约束**：
- 房间持久化到 `plugin-data/session-bridge/rooms/{roomId}.json`
- 密码用 bcrypt 哈希（`npm install bcryptjs`）
- 房间码 8 位字母数字（`crypto.randomBytes(6).toString('base64url').slice(0, 8)` 或等效）
- 并发安全：RoomManager 内部用 `Map<string, Promise>` 做每个房间的互斥锁

**验证**：写 `tools/test-room.ts`，创建房间→持久化→读取→加入（密码验证）→离开→删除。确认 `rooms/{roomId}.json` 文件写入正确。

---

### Module 3：MessageBus

**文件**：`lib/message-bus.ts`

**message-bus.ts 规格**：

```typescript
import { Transport, Message } from "./transport";
import { RoomManager } from "./room-manager";

export class MessageBus {
  constructor(
    transport: Transport,
    roomManager: RoomManager,
    ctx: PluginContext
  );

  /**
   * 开始桥接：订阅 hostSession 的实时事件，广播到房间所有参与者
   * 
   * 核心流程：
   * 1. subscribeSessionEvents(ctx, { sessionId: hostSession }, callback)
   * 2. 收到事件 → 构造 Message → transport.send(roomId, message)
   * 3. 同时记录到 roomManager.touch(roomId) 更新活动时间
   * 
   * 事件类型映射：
   * - message_start → type: "user_message"（用户发送消息）
   * - agent_start → type: "agent_reply"（Agent 开始回复）
   * - tool_call → type: "tool_call"（保留 payload 为工具名+参数）
   * - tool_result → type: "tool_result"
   * 
   * 返回 unsubscribe 函数
   */
  bridgeSession(roomId: string, hostSessionPath: string): () => void;

  /**
   * 注入建议消息：将观众的建议以 context.beforeUser 注入房主 session
   */
  injectSuggestion(roomId: string, fromUserId: string, text: string): Promise<void>;

  /**
   * 处理接收到的消息：根据 type 分发到对应处理器
   */
  handleMessage(roomId: string, msg: Message): void;
}
```

**关键约束**：
- `bridgeSession` 内部调用 `subscribeSessionEvents`，事件回调里分配 seq（`roomManager.nextSeq`）再 `transport.send`
- `injectSuggestion` 内部调用 `sendSessionMessage` + `context.beforeUser`
- 消息去重：维护 `lastReceivedSeq` Map，丢弃已处理的消息
- 仅处理 `permissionLevel >= "suggest"` 的观众的建议消息

**验证**：写 `tools/test-message-bus.ts`，创建房间→bridgeSession→向 host session 发消息→检查 MessageBus 是否生成了对应的广播消息。

---

### Module 4：Agent 工具

**文件**：
- `tools/create-room.ts`
- `tools/join-room.ts`
- `tools/leave-room.ts`
- `tools/room-status.ts`

**各工具规格**：

#### `session-bridge_create-room`

```typescript
// 参数
{
  permissionLevel: "readonly" | "suggest" | "collaborate" | "full_control",  // 默认 "suggest"
  password?: string,      // 可选
  readableName?: string   // 可选
}

// 返回
{
  roomId: string,         // 8 位字母数字
  permissionLevel: string,
  hasPassword: boolean,
  joinCode: string        // 人类可读的加入指令，如 "session-bridge join A3K9X2M7"
}

// 逻辑
1. 从 ctx 获取当前 userId 和 sessionPath
2. 调用 RoomManager.createRoom()
3. 调用 MessageBus.bridgeSession(roomId, sessionPath)
4. 返回房间信息
```

#### `session-bridge_join-room`

```typescript
// 参数
{
  roomId: string,
  password?: string       // 可选
}

// 返回
{
  status: "joined" | "pending",
  roomId: string,
  permissionLevel?: string  // joined 时返回
}

// 逻辑
1. 调用 RoomManager.joinRoom()
2. 如果 "joined" → 调用 MessageBus.bridgeSession() 开始接收广播
3. 如果 "pending" → 通知用户等待批准
```

#### `session-bridge_leave-room`

```typescript
// 参数
{
  roomId: string
}

// 返回
{
  status: "left" | "room_closed"
}

// 逻辑
1. 调用 RoomManager.leaveRoom()
2. 如果自己是房主 → 触发房主移交逻辑
3. 如果房间无参与者 → 关闭房间
4. 通过 MessageBus 广播 participant_leave 消息
```

#### `session-bridge_room-status`

```typescript
// 参数：无（或可选 roomId）

// 返回
{
  activeRooms: Array<{
    roomId: string,
    permissionLevel: string,
    participantCount: number,
    createdAt: number,
    lastActivityAt: number
  }>
}

// 逻辑
1. 调用 RoomManager.listActiveRooms()
2. 如果传了 roomId → 返回该房间详细信息（含参与者列表）
```

**验证**：安装插件后，Agent 调用每个工具，检查返回值和副作用（文件写入、EventBus handler 注册）。

---

### Module 5：WebView UI

**技术栈**：React + TypeScript + `@hana/plugin-components` + `@hana/plugin-sdk`  
**构建**：Vite（`professional-react` 模板），输出到 `assets/dist/`  
**入口**：`src/RoomPanel.tsx`

**组件树**：

```
RoomPanel（主容器）
├── RoomList（活跃房间列表 + 创建按钮）
│   └── RoomCard（单个房间摘要）
├── RoomView（进入房间后的主视图）
│   ├── MessageStream（消息流，虚拟滚动）
│   │   └── MessageBubble（单条消息：用户/AI/系统）
│   ├── ParticipantList（侧栏：参与者列表）
│   └── InputBar（底部输入框，建议消息用）
├── CreateRoomDialog（创建房间弹窗）
│   ├── 权限级别选择（4 个 radio）
│   ├── 密码输入（可选）
│   └── 可读名称（可选）
├── JoinRoomDialog（加入房间弹窗）
│   ├── 房间码输入
│   └── 密码输入（可选）
└── ApprovalDialog（批准加入弹窗）
    ├── 请求者信息
    └── 批准/拒绝按钮
```

**交互规格**：

| 交互 | 触发方式 | UI 表现 |
|------|---------|---------|
| 查看房间列表 | 打开插件页面 | RoomList 展示所有活跃房间 |
| 创建房间 | 点击"创建房间"按钮 | CreateRoomDialog 弹出 |
| 加入房间 | 点击"加入房间"按钮 | JoinRoomDialog 弹出 |
| 查看房间内消息 | 点击 RoomCard | RoomView 展开，MessageStream 开始接收实时消息 |
| 发送建议 | InputBar 输入 + 发送 | 调用 `injectSuggestion`，消息出现在 MessageStream |
| 批准加入 | ApprovalDialog 弹出 | 点击批准/拒绝 |
| 离开房间 | 点击"离开"按钮 | 确认后离开，房间从 RoomList 移除 |
| 房间即将关闭 | 超时通知 | 顶部横幅 "房间将在 5 分钟后关闭" |
| 查看参与者 | 侧栏 | ParticipantList 显示在线/离线状态 |

**关键约束**：
- 消息流用虚拟滚动（无限制消息不爆 DOM）
- 每条消息显示：发送者（userId）+ 类型图标 + 内容 + 时间
- `agent_reply` 类型消息支持流式渲染（逐 chunk 更新）
- 连接状态指示器（Phase 1 始终为"本地连接"，Phase 2 才需要网络状态）
- 主题跟随 Hana（`HanaThemeProvider mode="inherit"`）

**路由**：
- `routes/room-api.ts`：WebView 通过 `hana.api.fetch()` 调用的后端 API
  - `GET /api/rooms` → `RoomManager.listActiveRooms()`
  - `GET /api/rooms/:roomId` → `RoomManager.getRoom()`
  - `POST /api/rooms/:roomId/approve` → `RoomManager.approveJoin()`
  - `POST /api/rooms/:roomId/reject` → `RoomManager.rejectJoin()`

**验证**：安装插件 → 打开页面 → 创建房间 → 加入房间 → 发送消息 → 检查消息流显示。

---

### Module 6：import { index.ts } from './lifecycle' + manifest.json

**文件**：
- `index.ts` — `definePlugin()` 入口
- `manifest.json` — 插件清单（见 DESIGN.md §12，已设计好，直接使用）

**index.ts 规格**：

```typescript
import { definePlugin } from './vendor/plugin-runtime';

export default definePlugin({
  async onload(ctx, { register }) {
    const roomManager = new RoomManager(ctx);
    const transport = new EventBusTransport(ctx);
    const messageBus = new MessageBus(transport, roomManager, ctx);

    // 注册 EventBus handler
    register(ctx.bus.handle("session-bridge:room:*", (payload) => {
      // 路由到对应房间的 messageBus.handleMessage
    }));

    // 扫描 plugin-data 目录，清理幽灵房间（status=active 但创建者已离线）
    roomManager.cleanupGhostRooms();

    // 注册清理
    register(async () => {
      // onunload: 通知所有房间参与者、关闭连接
      for (const room of roomManager.listActiveRooms()) {
        await transport.send(room.roomId, {
          type: "participant_leave",
          from: ctx.config.get("userId"),
          // ...
        });
      }
    });
  }
});
```

**manifest.json**：直接使用 DESIGN.md §12 的设计。

**验证**：完整安装 → 创建房间 → 另一个用户加入 → 共享会话 → 离开房间 → 卸载插件。

---

## 四、消息流完整链路（Phase 1）

```
用户A 在 Hana 发消息
  │
  ▼
subscribeSessionEvents 回调
  │
  ▼
MessageBus.bridgeSession 处理
  │ 构造 Message { type: "user_message", seq: roomManager.nextSeq() }
  ▼
Transport.send(roomId, message)
  │ EventBusTransport → bus.emit("session-bridge:broadcast:{roomId}", message)
  ▼
用户B 的插件实例收到 bus.subscribe 回调
  │ Transport.onMessage → MessageBus.handleMessage
  ▼
MessageBus.handleMessage 分派：
  ├─ user_message → WebView 推送（通过 EventBus 通知 UI 刷新）
  ├─ agent_reply → WebView 推送（流式更新）
  ├─ tool_call/tool_result → WebView 推送
  ├─ participant_join/leave → RoomManager 更新 + WebView 推送
  └─ suggestion → 仅权限>=suggest 的参与者可见
```

---

## 五、开发顺序与里程碑

| 序号 | 模块 | 预计时间 | 产出 | 验证方式 |
|------|------|---------|------|---------|
| M1 | Transport + EventBusTransport | 0.5天 | `lib/transport.ts` + `lib/eventbus-transport.ts` | 两个 Transport 互发消息 |
| M2 | RoomManager + Store | 0.5天 | `lib/room-manager.ts` + `lib/store.ts` | 创建/持久化/读取/删除房间 |
| M3 | MessageBus | 0.5天 | `lib/message-bus.ts` | bridgeSession 产生正确广播 |
| M4 | Agent 工具（4个） | 0.5天 | `tools/*.ts` | Agent 调用工具返回预期结果 |
| M5 | WebView UI | 1.5天 | `src/` + `routes/` | 页面创建/加入房间，消息流显示 |
| M6 | index.ts + manifest | 0.5天 | 可安装的完整插件 | 全链路端到端测试 |

**总计**：约 4 个工作日

---

## 六、开发纪律（重申）

1. 每个模块完成后 **git commit**（`phase1-m1: xxx` 格式）
2. 不确定的 SDK API → 查 https://github.com/liliMozi/openhanako/blob/main/PLUGINS.md
3. 设计文档写的数值和策略**不要自行调整**（如 8 位房间码、30 分钟超时、bcrypt 哈希）
4. 所有文件用 TypeScript（`.ts`），服务端代码不需要构建
5. UI 源码用 `.tsx`，Vite 构建输出到 `assets/dist/`
6. 不要在代码里硬编码 token、密钥或本地路径
7. 遇到设计文档未覆盖的细节 → 向产品经理确认（本会话中提出）
8. `@hana/plugin-runtime` 从本地 vendor 目录引用（Phase 0 已验证路径），不裸 import

---

## 七、FAQ 预设

**Q：`ctx` 从哪里来？**  
A：工具函数第二个参数，或 `definePlugin` 的 `onload` 参数。这些是 Hana PluginManager 自动注入的。

**Q：`bus.emit` vs `bus.request` 用哪个？**  
A：广播用 `bus.emit`（一对多，无需响应），请求-响应用 `bus.request`（如 Session API）。

**Q：Phase 1 需要处理断线重连吗？**  
A：不需要。同机 EventBus 不存在断线问题。重连逻辑在 Phase 2 WebSocket 才需要。

**Q：WebView 怎么知道有新消息？**  
A：两种方式：(a) MessageBus 通过 EventBus 推送到 WebView 的路由 API，WebView 轮询或 SSE；(b) Phase 1 简化：WebView 通过 `setInterval` 每秒调 `GET /api/rooms/:roomId/messages?since={lastSeq}` 拉取新消息。选 (b)，简单可靠。

**Q：`professional-react` 模板怎么用？**  
A：参考 `C:\Users\h2305\.hanako\skills\hana-plugin-creator\SKILL.md` 中的脚手架命令。Phase 0 已验证插件可安装，UI 部分复用同样的 dev loop 流程。
