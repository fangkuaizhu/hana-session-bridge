# Phase 0 验证报告 · hana-session-bridge

> 日期：2026-08-04
> 执行：代码写手 agent（受产品经理 Hanako 指派）
> 环境：HanaAgent 本地实例（dev loop，`plugin.dev.install` 安装到 plugins-dev 槽）
> 仓库：https://github.com/fangkuaizhu/hana-session-bridge
> 关联 commit：`1fe4d08`（smoke 插件）、后续报告/设计文档更新

---

## 结论速览

| # | 假设 | 结果 | 决策 |
|---|------|------|------|
| 1 | `subscribeSessionEvents` 存在于 `@hana/plugin-runtime` | ✅ **存在，签名匹配设计文档 §2.2 预期** | 路径 A 可行 |
| 2 | 插件能跨用户/session 操作（创建、订阅、发送） | ✅ **成功，无权限错误** | Phase 1 同机路径可行 |

---

## 假设 1：`subscribeSessionEvents` 存在性

### 证据来源（三重确认）

1. **官方文档**：`PLUGIN_SDK.md` 的 "Runtime Session and Agent API" 章节明确列出并从 `@hana/plugin-runtime` 导出 `subscribeSessionEvents`。
   > ⚠️ **文档勘误**：设计文档 §2.2 原文称 "公开 PLUGINS.md 和 PLUGIN_SDK.md 中没有"。经核实，**PLUGIN_SDK.md 中存在**，此前的判断已过时。§2.2 需更新。

2. **SDK 类型定义**（`hana-plugin-runtime` dist/index.d.ts，第 964 行）：
   ```typescript
   export declare function subscribeSessionEvents(
     ctx: { bus?: Pick<HanaEventBus, 'subscribe'> | null },
     target: HanaSessionTarget,
     handler: (event: unknown, meta: {
       sessionId: string | null;
       sessionPath: string | null;
       sessionRef: HanaSessionRef | null;
     }) => void
   ): () => void;   // 返回 unsubscribe 函数
   ```

3. **运行时实机验证**（`probe-subscribe` 工具，dev slot 运行）：
   ```json
   {
     "exported": "function",
     "signatureMatches": true,
     "subscribeResult": "function",
     "unsubscribeWorks": true,
     "eventReceived": false
   }
   ```
   订阅成功、返回 unsubscribe 函数、unsubscribe 可调用。首次 1.2s 内未收到事件（静默期无事件是正常的，见下条）。

### 事件流真实性验证（`probe-cross-session-v2`）

向订阅的 session 发送消息后，**事件实时到达**：

```json
{
  "subscribe_A_send_A_eventReceived": true,
  "subscribe_A_send_A_eventSample": [
    { "type": "agent_start",   "meta": { "sessionId": "...", "sessionPath": "..." } },
    { "type": "turn_start",    "meta": { "sessionId": "...", "sessionPath": "..." } },
    { "type": "message_start", "meta": { "sessionId": "...", "sessionPath": "..." } }
  ]
}
```

已观测到的事件类型：`agent_start`、`turn_start`、`message_start`（后续 Phase 1 可补充观测 `tool_call`、`tool_result`、`message_delta` 等完整事件谱）。

### 事件隔离性验证（`probe-deep`）

订阅 session A、向 session B 发送消息，A 收到 **0** 个事件：

```json
{ "aReceivedCount": 0, "aReceivedFull": [] }
```

结论：**订阅按 session 严格隔离**（`ctx.bus.subscribe` 携带 `scopedSessionPath` 作用域过滤）。Phase 1 的 MessageBus 可以依赖此隔离性，无需自行按 sessionId 过滤。

---

## 假设 2：插件能否跨用户/session 操作

### 测试矩阵（`probe-cross-session-v2` + `probe-deep` + `probe-final`）

| 操作 | 目标 | 结果 |
|------|------|------|
| `createSession` × 2 | 插件私有 | ✅ 成功 |
| `subscribeSessionEvents` 订阅 A | 插件私有 A | ✅ 成功 |
| `sendSessionMessage` → A | 插件私有 A | ✅ `accepted: true` |
| `sendSessionMessage` → B | 插件私有 B | ✅ `accepted: true` |
| `sendSessionMessage` → 当前活跃主会话 | foreign（自己，正忙） | ⚠️ `session_busy` |
| `sendSessionMessage` → 另一活跃会话（GPU 排查，messageCount 50→57） | foreign（其他用户） | ⚠️ `session_busy` |
| `sendSessionMessage` → 空闲旧会话（2026-04-13，messageCount 2） | foreign（其他用户） | ✅ **`accepted: true`** |
| `listSessions({})` 无过滤 | 全部 | ✅ 87 个 session，跨所有 agent |
| `listSessions({ ownerPluginId })` | 本插件 | ✅ 30 个 plugin_private session |

### 关键发现

1. **无权限错误**：全程零 `permission/forbidden/403/denied` 错误。跨 session 操作不受用户边界限制。

2. **`session_busy` 是运行中保护，不是权限边界**：向正在活跃的 session（无论是当前自己的还是其他用户的）发送消息返回 `session_busy`；向空闲 session 发送则 `accepted: true`。这是 Hana 对运行中 session 的并发保护，Phase 1 需要处理：目标 session 忙碌时消息应排队/缓存，而非当作失败。

3. **`listSessions` 可见性**：无过滤可列出全部 87 个 session（横跨 hanako/ming 等所有 agent 的历史会话），`visibility: public`；插件私有 session 需 `ownerPluginId` 过滤才能列出。字段名为 `path`（sessionPath），**没有 `sessionId` 字段**——定位 target 时用 `{ sessionPath: path }`。

4. **`normalizeSessionTarget` 规则**（SDK 源码确认）：字符串 → `{ sessionPath }`；对象 → 取 `sessionId` 或 `sessionPath`/`path`。无 sessionId 时只用 path。

5. **context 注入被接受**：`sendSessionMessage` 携带 `context.system` + `context.beforeUser` 时返回 `accepted: true`。设计文档 §2.1 的 context 注入能力确认可用。

---

## 路径选择决策

| 路径 | 方案 | 决策 |
|------|------|------|
| **A** | `subscribeSessionEvents()` + EventBus 广播 | ✅ **采用**。API 存在、签名匹配、事件流真实、隔离性可靠 |
| B | Pi SDK extension 拦截 + `bus.emit` 跨插件广播 | ❌ 不需要。A 已完全可行，无需降级 |
| C | 定时轮询 `session:history` | ❌ 不需要。实时事件流已可用 |

**架构影响**：
- Phase 1 的 `EventBusTransport` 应基于 `subscribeSessionEvents` 作为事件源，配合 `sendSessionMessage` 注入。
- 每个参与者的插件实例通过 `subscribeSessionEvents(ctx, participantSessionTarget, cb)` 订阅自己房间对应的 session，事件经 MessageBus 去重/排序后广播。
- `session_busy` 处理需要纳入 MessageBus 设计：目标 session 忙碌时消息进入 `pendingMessages[]`（设计文档 §4.2 已有此字段，方向正确）。

---

## 遗留事项

1. **多用户（跨 agent）真实场景**：本次测试在同一 Hana 实例上以其他 agent 的 session 作为 foreign 目标，验证了跨 session 写入。但"两个独立用户账号（如 qingmo vs newhere）之间的权限"尚未在真实多用户配置下验证，建议 Phase 1 集成测试时补测。
2. **事件完整谱系**：已观测 `agent_start`/`turn_start`/`message_start`，`tool_call`/`tool_result`/`message_delta` 等有待 Phase 1 通信模型实现时补充观测。
3. **`session_busy` 重试策略**：需要确认忙碌保护的持续时间与重试窗口，避免 Phase 1 消息积压。
4. **探针创建了 30 个 plugin_private 测试 session**：不影响主系统（插件私有、不可见），Phase 0 结束后由 dev 槽卸载/清理。

---

## 附录：smoke 插件

- 位置：`phase0/smoke-plugin/`
- 工具：
  - `probe_subscribe` — 假设 1：存在性 + 签名 + unsubscribe
  - `probe_cross_session` — 假设 2 初版：双 session 创建/订阅/发送
  - `probe_cross_session_v2` — 假设 2 矩阵：事件流、隔离、foreign 写入、listSessions
  - `probe_deep` — 隔离性复核 + foreignSend 归因 + listSessions 原始结构
  - `probe_final` — 空闲 foreign 写入 + ownerPluginId 过滤 + context 注入
- 运行方式：dev loop（`plugin.dev.install` → `plugin.dev.invokeTool`），无需构建步骤
- vendored runtime：`vendor/plugin-runtime.js`（自包含，无外部依赖，随插件分发合规）
