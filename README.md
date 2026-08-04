# hana-session-bridge

HanaAgent 跨设备跨地域共享会话插件。

**代号**：SessionBridge  
**当前阶段**：设计完成，待 Phase 0 最小验证  
**产品经理**：Hanako  
**设计文档**：[DESIGN.md](./DESIGN.md)  
**审核人**：ming（架构+安全）· 菲伦（设计哲学+UX）

**贡献者**：fangkuaizhu · Hanako

---

## 核心概念

**SessionBridge = 一个共享的 Agent 工作空间，支持不同粒度的协作权限。**

```
只读 ──→ 建议 ──→ 协作 ──→ 完全控制
(观看)   (评论)   (共享工具) (完全代理)
```

## 开发原则（八荣八耻）

> 编码 agent 必须遵守以下纪律：

1. **以认真查询为荣，以瞎猜接口为耻** — 不确定的 SDK API 必须先查 [PLUGINS.md](https://github.com/liliMozi/openhanako/blob/main/PLUGINS.md) / [PLUGIN_SDK.md](https://github.com/liliMozi/openhanako/blob/main/PLUGIN_SDK.md)
2. **以寻求确认为荣，以模糊执行为耻** — 设计文档写"待定"的地方，不要自己脑补
3. **以人类确认为荣，以臆想业务为耻** — 对业务逻辑有疑问时，向产品经理（Hanako）确认
4. **以复用现有为荣，以创造接口为耻** — 能用 `@hana/plugin-runtime` helpers 就不用 raw bus 调用
5. **以主动测试为荣，以跳过验证为耻** — Phase 0 smoke test 必须先通过再进入 Phase 1
6. **以遵循规范为荣，以破坏架构为耻** — Transport 抽象、权限光谱、参数级白名单等架构决策不得绕过
7. **以诚实无知为荣，以假装理解为耻** — 不懂就说，不要编造
8. **以谨慎重构为荣，以盲目修改为耻** — 修改设计文档前先和产品经理对齐

## 开发流程

```
Phase 0（最小验证）
  └─ 验证 subscribeSessionEvents 存在性 + 跨用户权限
  └─ 输出：验证报告，存入 docs/phase-0-report.md

Phase 1（同机共享）
  └─ Transport 抽象 + EventBusTransport
  └─ 房间 CRUD + 消息广播
  └─ WebView UI（React + @hana/plugin-components）

Phase 2（跨机 Relay）
  └─ WebSocketTransport + Relay Server

Phase 3（工具代理）
  └─ 参数级白名单 + 批准 UI + 审计日志

Phase 4（打磨）
```

### 每次提交前检查

- [ ] 代码是否引用了 DESIGN.md 中的已验证 API？
- [ ] 新增文件是否符合插件目录结构（`tools/` / `lib/` / `routes/` / `src/`）？
- [ ] 是否修改了 DESIGN.md？如果是，是否已更新变更记录？
- [ ] manifest.json 的 capabilities 是否与实际使用的 API 一致？

## 项目结构

```
session-bridge/
├── README.md                # 本文件 — 开发入口
├── DESIGN.md                # 完整设计文档
├── manifest.json            # 插件清单
├── .gitignore
├── index.ts                 # definePlugin() 入口
├── tools/                   # Agent 工具
│   ├── create-room.ts
│   ├── join-room.ts
│   ├── leave-room.ts
│   └── room-status.ts
├── lib/                     # 核心逻辑
│   ├── transport.ts         # Transport 抽象接口
│   ├── eventbus-transport.ts
│   ├── websocket-transport.ts
│   ├── room-manager.ts
│   ├── message-bus.ts
│   ├── tool-proxy.ts
│   ├── context-sync.ts
│   └── audit-log.ts
├── routes/                  # HTTP API
│   ├── room-api.ts
│   └── relay-ws.ts
├── src/                     # React UI 源码
│   ├── RoomPanel.tsx
│   ├── MessageStream.tsx
│   ├── ParticipantList.tsx
│   ├── JoinDialog.tsx
│   └── ApprovalDialog.tsx
├── assets/dist/             # Vite 构建产物（.gitignore？待定）
├── relay-server/            # 独立 Relay 服务
│   ├── package.json
│   └── server.js
└── docs/                    # 开发过程文档
    └── phase-0-report.md
```

## 关键参考

- Hana 插件开发指南: https://github.com/liliMozi/openhanako/blob/main/PLUGINS.md
- Hana Plugin SDK: https://github.com/liliMozi/openhanako/blob/main/PLUGIN_SDK.md
- Hana 源码: https://github.com/liliMozi/openhanako
