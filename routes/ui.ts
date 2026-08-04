// routes/ui.ts
// 插件页面 shell：渲染 RoomPanel 的 HTML 入口。
// 挂载于 /api/plugins/session-bridge/room-panel（manifest page route）。
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';

interface HonoLikeContext {
  req: { query(name: string): string | undefined };
  html(html: string): unknown;
}

export default function registerUiRoutes(app: { get: (p: string, h: (c: HonoLikeContext) => unknown) => void }, pluginCtx: HanaPluginContext) {
  app.get('/room-panel', (c: HonoLikeContext) => c.html(renderShell(c, pluginCtx)));
}

function renderShell(c: HonoLikeContext, ctx: HanaPluginContext): string {
  const hanaCss = c.req.query('hana-css') || '';
  const theme = c.req.query('hana-theme') || 'inherit';
  const assetBase = `/api/plugins/${encodeURIComponent(ctx.pluginId)}/assets`;
  const title = '共享房间';

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  ${hanaCss ? `<link rel="stylesheet" href="${escapeAttr(hanaCss)}">` : ''}
  <link rel="stylesheet" href="${assetBase}/panel.css">
</head>
<body data-hana-theme="${escapeAttr(theme)}">
  <div id="root"></div>
  <script type="module" src="${assetBase}/panel.js"></script>
</body>
</html>`;
}

function escapeAttr(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function escapeHtml(value: string): string {
  return escapeAttr(value).replace(/>/g, '&gt;');
}
