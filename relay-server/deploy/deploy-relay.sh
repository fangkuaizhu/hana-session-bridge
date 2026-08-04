#!/usr/bin/env bash
# relay.myczdfkz.shop 一键部署脚本（在 VPS 上执行，root）
# 前置：1) DNS 已加 A 记录 relay.myczdfkz.shop -> 47.93.186.189
#       2) relay-server 已运行（pm2 start server.js --name session-bridge-relay）
set -e

echo "==> 1/3 签发 Let's Encrypt 证书（webroot，依赖 DNS + 80 端口 HTTP-01）"
certbot certonly --webroot -w /var/www/sbti \
  -d relay.myczdfkz.shop \
  --agree-tos --no-eff-email -m admin@myczdfkz.shop \
  --non-interactive || { echo "证书签发失败：请确认 DNS 已生效（dig relay.myczdfkz.shop 返回 47.93.186.189）"; exit 1; }

echo "==> 2/3 启用 Nginx 反代配置"
cp /mnt/vdb1/relay-server/deploy/relay-nginx.conf /etc/nginx/conf.d/relay.conf
nginx -t && nginx -s reload

echo "==> 3/3 验证"
sleep 1
echo "本地 wss 握手测试（应返回 auth_fail 或 auth_ok 类 JSON 而非连接错误）："
curl -s -m 5 "http://127.0.0.1:8443/relay" -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" -H "Sec-WebSocket-Version: 13" | head -c 200 || true
echo
echo "完成。客户端 relayServerUrl 配置为：wss://relay.myczdfkz.shop:8443/relay"
