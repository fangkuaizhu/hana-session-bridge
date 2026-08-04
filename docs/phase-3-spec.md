# Phase 3 工具代理 + 协作权限 · 开发任务书

> 版本 1.0 · 2026-08-05
> 前置：Phase 1+2 完成（同机+跨机共享可用），WebView 页面转圈问题待修

---

## 前置任务：修复 WebView 转圈

**症状**：点击「共享房间」tab 后页面一直加载中

**排查路径**：
1. 查 `routes/ui.ts` 是否正确返回 HTML（该文件应 serve `assets/panel.js` + `panel.css`）
2. 检查浏览器控制台是否有 JS 错误（路径可能不对）
3. 确认 `assets/panel.js` 是否存在且被正确引用
4. 如果 route handler 缺失或有 404，补写或修正

**验证**：打开「共享房间」tab → 看到 RoomPanel 界面（非空白/非转圈）

---

## Phase 3 核心目标

在 Phase 1+2 的只读/建议级别基础上，实现**协作级别和完全控制级别**的跨用户工具调用。

---

## 模块拆分

```
FIX: WebView 转圈修复
    │
P1: Tool Proxy（参数级过滤引擎）         → lib/tool-proxy.ts
    │
P2: Approval UI（批准弹窗组件）          → src/ApprovalDialog.tsx
    │
P3: Audit Log（审计日志）               → lib/audit-log.ts
    │
P4: 工具注册 + 权限配置                  → tools/set-permission.ts + config schema
    │
P5: 多 Agent 上下文同步（协作级别）       → lib/context-sync.ts
    │
P6: 集成 + 回归测试                      → 完整 smoke test
```

---

## 逐模块规格

### FIX：WebView 转圈

⚠️ **这是 Phase 3 的前置条件，必须先修好。**

检查点：
- `routes/ui.ts` 是否 export 了正确的 route handler
- `assets/panel.js` 和 `assets/panel.css` 路径是否可访问
- 路由注册是否正确（manifest 里 `route: "/room-panel"` → 实际 URL `GET /api/plugins/session-bridge/room-panel`）

---

### P1：Tool Proxy 参数级过滤引擎

**文件**：`lib/tool-proxy.ts`

```typescript
interface ToolPermission {
  toolName: string;
  mode: "whitelist" | "approval" | "blocked";
  scope: "once" | "session" | "always";
  paramFilters?: Record<string, { pattern: string; description: string }>;
  approvalTimeoutMs?: number;
}

interface ToolCallRequest {
  requestId: string;
  fromUserId: string;
  toUserId: string;
  toolName: string;
  params: Record<string, unknown>;
  timestamp: number;
}

interface ToolCallResult {
  requestId: string;
  status: "approved_auto" | "approved_manual" | "rejected" | "blocked" | "timeout";
  result?: unknown;
  error?: string;
}

export class ToolProxy {
  constructor(roomManager: RoomManager, messageBus: MessageBus, auditLog: AuditLog);

  /**
   * 检查工具调用权限并路由
   * 1. 查白名单 → 匹配 paramFilters 正则 → 通过则自动执行
   * 2. 白名单不匹配 → 走批准流程
   * 3. blocked → 直接拒绝
   * 4. 不在线的被调用方 → 入队等待（最长 5 分钟）
   */
  async proxyToolCall(roomId: string, request: ToolCallRequest): Promise<ToolCallResult>;

  /** 响应批准弹窗（用户点了批准/拒绝） */
  async respondApproval(requestId: string, approved: boolean, scope?: "once" | "session" | "always"): Promise<void>;

  /** 检查参数是否匹配白名单过滤规则 */
  checkParamFilters(toolName: string, params: Record<string, unknown>, permissions: ToolPermission[]): boolean;

  /** 防轰炸：同一工具 60 秒内最多弹窗 3 次 */
  checkRateLimit(userId: string, toolName: string): boolean;
}
```

**参数过滤逻辑**：
- `paramFilters` 中每个 key 对应工具参数的一个字段
- `pattern` 是正则，`params[key]` 必须完全匹配正则
- 如果 `params` 中有字段未在 `paramFilters` 中声明 → 拒绝（默认拒绝策略）
- 如果 `paramFilters` 为空对象 `{}` → 允许所有参数（危险，仅用于信任场景）

**验证**：本地 Node.js 脚本测试正则匹配/不匹配/边界情况。

---

### P2：Approval UI 批准弹窗

**文件**：`src/ApprovalDialog.tsx`

**交互规格**：

```
┌─────────────────────────────────────┐
│  ⚠️ 工具调用请求                     │
│                                     │
│  「清末」的 Agent 想执行：           │
│  exec_command                       │
│  cmd: chkdsk C:                     │
│                                     │
│  [批准本次] [批准会话] [拒绝]        │
│              [始终批准 → 加入白名单] │
│  ⏱ 28s 后自动拒绝                   │
└─────────────────────────────────────┘
```

**关键约束**：
- 弹窗不打断 Agent 执行流——覆盖在 WebView 上方，不阻塞其他操作
- 超时倒计时：默认 30 秒，每秒递减，归零自动拒绝
- 三个批准范围按钮：`批准本次`（once）/ `批准会话`（session）/ `始终批准`（always，写入白名单）
- 防轰炸：同一工具 60 秒内第 4 次请求自动拒绝
- 弹窗内容调用 `routes/room-api.ts` 的 `POST /api/rooms/:roomId/approve`

**WebView → 后端通信**：
- 批准弹窗出现 → 用户点击 → `hana.api.fetch('api/rooms/${roomId}/approve', { method: 'POST', body: { requestId, approved, scope } })`
- 后端 `routes/room-api.ts` 新增 `POST /api/rooms/:roomId/approve` 路由

---

### P3：Audit Log 审计日志

**文件**：`lib/audit-log.ts`

```typescript
interface AuditEntry {
  timestamp: number;
  roomId: string;
  fromUserId: string;
  toUserId: string;
  toolName: string;
  params: Record<string, unknown>;
  paramFilterResult: "passed" | "rejected";
  approvalMode: "whitelist" | "manual" | "blocked";
  approved: boolean;
  result?: { status: string; summary: string };
}

export class AuditLog {
  constructor(dataDir: string);

  log(entry: AuditEntry): void;
  query(roomId: string, opts?: { from?: string; tool?: string; limit?: number }): AuditEntry[];
}
```

- 存储到 `plugin-data/session-bridge/audit/{roomId}.jsonl`
- 每次工具代理调用自动记录
- `query` 支持按房间/用户/工具名过滤

---

### P4：工具注册 + 权限配置

**文件**：`tools/set-permission.ts`（Agent 工具）

```typescript
// session-bridge_set-permission
// 参数：
{
  roomId: string,
  toolName: string,
  mode: "whitelist" | "approval" | "blocked",
  paramFilters?: Record<string, { pattern: string; description: string }>
}
// 返回：{ ok: true, permissions: ToolPermission[] }

// session-bridge_list-permissions
// 参数：{ roomId: string }
// 返回：{ permissions: ToolPermission[] }
```

**权限配置存储**：每个房间的 `rooms/{roomId}.json` 中增加 `toolPermissions: ToolPermission[]` 字段

**系统预设模板**（`lib/permission-templates.ts`）：
```typescript
export const PRESETS = {
  "diagnostics": [
    { toolName: "exec_command", mode: "whitelist", paramFilters: { cmd: { pattern: "^(chkdsk|sfc|dism|systeminfo|ipconfig|ping|tracet|netstat|tasklist)\\b" } } },
    { toolName: "read", mode: "whitelist", paramFilters: { path: { pattern: "^C:\\\\Users\\\\" } } },
    { toolName: "ls", mode: "whitelist" },
  ],
  "strict": [
    // 仅允许只读操作
    { toolName: "read", mode: "whitelist" },
    { toolName: "ls", mode: "whitelist" },
    { toolName: "grep", mode: "whitelist" },
    { toolName: "web_search", mode: "approval" },
  ]
};
```

---

### P5：多 Agent 上下文同步（协作级别）

**文件**：`lib/context-sync.ts`

当权限级别为 `collaborate` 或 `full_control` 时：
- 每个参与者有各自的 Agent（Phase 1 只在 RoomManager 里存了 agentId，但没实际创建）
- 协作级别的 Agent 由 `createAgent(ctx, { name: "SessionBridge-{userId}", visibility: "plugin_private" })` 创建
- 共享上下文通过 `sendSessionMessage` 的 `context.beforeUser` 注入

```typescript
export class ContextSync {
  constructor(ctx: PluginContext, roomManager: RoomManager, messageBus: MessageBus);

  /** 为房间创建所有参与者的隐藏 Agent */
  async ensureAgents(roomId: string): Promise<void>;

  /** 将房间内最近的消息合并为共享上下文，注入到指定 Agent 的 session */
  async injectSharedContext(roomId: string, targetSessionPath: string): Promise<void>;
}
```

**注意**：Phase 3 的协作级别真正创建了 Agent（之前的只读/建议级别不需要）。Agent 创建在 `join-room` 工具中触发（仅当 permissionLevel >= "collaborate"）。

---

### P6：集成 + 回归测试

- [ ] P1-P5 各模块独立 smoke test
- [ ] Phase 1+2 全链路回归（确保不改坏原有功能）
- [ ] Tool Proxy 全场景：whitelist 通过/拒绝、approval 批准/拒绝/超时、blocked、不在线队列
- [ ] Audit Log 写入并查询
- [ ] 多 Agent 创建 + 上下文注入
- [ ] 更新 zip 打包

---

## 开发顺序

```
FIX: WebView 转圈（必须先修）
  │
P1: Tool Proxy（核心引擎）
  │
P2: Approval UI（依赖 P1 的 respondApproval）
  │
P3: Audit Log（被 P1 调用，可并行）
  │
P4: 工具注册 + 权限模板（依赖 P1 的 ToolPermission 类型）
  │
P5: 多 Agent 上下文（依赖 createAgent API）
  │
P6: 集成 + 回归
```

---

## 关键约束

- 不改 Phase 1+2 的 Transport/RoomManager/MessageBus 接口（只加新模块）
- 白名单正则用 `new RegExp(pattern)` 测试，注意转义
- 批准弹窗不打断 Agent 流（异步、非阻塞）
- `createAgent` API 参考 Phase 0 验证过的签名
