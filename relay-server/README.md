# hana-session-bridge Relay Server

Phase 2 跨机中继：无状态 WebSocket 信封路由层。

## 运行

```bash
npm install        # ws + bcryptjs
node server.js     # 监听 0.0.0.0:64162（PORT 环境变量可覆盖）
```

生产部署（VPS 47.93.186.189）已由 PM2 保活：

```bash
pm2 start server.js --name session-bridge-relay --time && pm2 save
```

## 协议

客户端 → Relay：

| 类型 | 载荷 | 说明 |
|------|------|------|
| `register` | `{ roomId, userId, passwordHash? }` | 房主注册房间。房间不存在则创建（可携带 bcrypt hash），已存在则幂等加入 |
| `auth` | `{ roomId, userId, password? }` | 加入房间。验证房间存在性 + 密码（bcrypt 对比） |
| `room_message` | `{ roomId, message }` | 向房间广播消息（信封转发，不改写 message） |
| `sync_request` | `{ roomId, lastSeq }` | 请求房间当前状态（参与者列表） |

Relay → 客户端：

| 类型 | 载荷 |
|------|------|
| `auth_ok` | `{ roomId, participants }` |
| `auth_fail` | `{ reason }` |
| `room_message` | `{ roomId, message }` |
| `sync_response` | `{ roomId, currentState }` |
| `participant_join` | `{ roomId, userId }` |
| `participant_leave` | `{ roomId, userId }` |
| `error` | `{ message }` |

## 运维参数

| 参数 | 值 |
|------|-----|
| 心跳 | 30s ping，10s 无 pong 断开 |
| 速率限制 | 每房间每秒 20 条消息 |
| 幽灵房间清理 | 每 5 分钟扫描，60 分钟无活动删除 |
| 房间人数上限 | 20 人 |

## 公网入口（wss）

**现状**（2026-08-05 部署）：

- VPS：47.93.186.189，Relay 监听 127.0.0.1 可达端口 64162（对外未开，走 Nginx 反代）
- **443 被 frps 占用**（手机 MC 服务器 frp 隧道依赖），relay 复用 **8443** 端口 SNI 多域名
- 目标地址：`wss://relay.myczdfkz.shop:8443/relay`

**DNS**：需要阿里云控制台为 `relay.myczdfkz.shop` 添加 A 记录 → `47.93.186.189`
（注意：通配符 `*.myczdfkz.shop` 记录实际不存在，sbti 也是单独加的 A 记录）

**证书 + Nginx 反代**（DNS 生效后执行 `deploy/deploy-relay.sh`）：

```bash
cd /mnt/vdb1/relay-server && bash deploy/deploy-relay.sh
```

脚本内容：certbot webroot 签发 `relay.myczdfkz.shop` 证书 → 启用 `deploy/relay-nginx.conf`
（HTTP-01 验证 + 8443 SSL + `/relay` 路径 WebSocket 反代）→ 本地验证。

Nginx 配置要点：

```nginx
location /relay {
    proxy_pass http://127.0.0.1:64162;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 300s;
}
```

## 测试

```bash
node test-smoke.mjs   # 本地完整协议流程（12 项断言），需先起 relay
```
