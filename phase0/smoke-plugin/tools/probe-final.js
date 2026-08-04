// Phase 0 · 终局探针：空闲 foreign session 写入 + ownerPluginId 过滤 + context 注入
// 1. 向一个空闲（非活跃）的 foreign session 发送消息 → 成功 or busy or 权限？
// 2. listSessions({ ownerPluginId }) 能否列出插件私有 session
// 3. sendSessionMessage 的 context 注入是否被接受
import {
  defineTool,
  createSession,
  sendSessionMessage,
  listSessions,
} from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'probe_final',
  description: 'Phase 0 final probe: idle foreign-session send, ownerPluginId filtering, context injection acceptance.',
  parameters: {
    type: 'object',
    properties: {
      waitMs: { type: 'number', default: 800 },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input, ctx) {
    const results = { idleForeignSend: {}, ownerFilter: {}, contextInjection: {}, errors: [] };

    // 1. 空闲 foreign session：选 messageCount 最小（最不可能活跃）的非当前 session
    try {
      const sessions = await listSessions(ctx, {});
      const arr = Array.isArray(sessions) ? sessions : sessions?.sessions ?? [];
      const candidates = arr.filter((s) => {
        const p = s?.path ?? s?.sessionId;
        return p && p !== ctx.sessionPath && p !== ctx.sessionId && s?.visibility !== 'plugin_private';
      });
      candidates.sort((a, b) => (a.messageCount ?? 0) - (b.messageCount ?? 0));
      const idle = candidates[0];
      results.idleForeignSend.candidate = idle
        ? { path: idle.path, title: idle.title, messageCount: idle.messageCount, modified: idle.modified, agentId: idle.agentId }
        : null;
      if (idle) {
        const target = idle.sessionId ? { sessionId: idle.sessionId } : { sessionPath: idle.path };
        try {
          const res = await sendSessionMessage(ctx, target, {
            text: 'phase0-idle-foreign-probe',
            context: {
              beforeUser: [{ label: 'bridge', text: 'This is a Phase 0 cross-session bridge probe.' }],
            },
          });
          results.idleForeignSend.result = 'ok';
          results.idleForeignSend.detail = res;
        } catch (e) {
          results.idleForeignSend.result = 'error';
          results.idleForeignSend.errorMessage = e.message;
          results.idleForeignSend.errorType = e?.name ?? 'unknown';
          results.idleForeignSend.isPermission = /permission|forbidden|403|denied/i.test(e.message);
          results.idleForeignSend.isBusy = /busy/i.test(e.message);
          results.idleForeignSend.isManifest = /manifest/i.test(e.message);
        }
      }
    } catch (e) {
      results.errors.push(`idle foreign: ${e.message}`);
    }

    // 2. ownerPluginId 过滤
    try {
      const mine = await listSessions(ctx, { ownerPluginId: ctx.pluginId });
      const arr = Array.isArray(mine) ? mine : mine?.sessions ?? [];
      results.ownerFilter.pluginId = ctx.pluginId;
      results.ownerFilter.count = arr.length;
      results.ownerFilter.sample = arr.slice(0, 5).map((s) => ({
        path: s?.path ?? s?.sessionId ?? '?',
        visibility: s?.visibility ?? '?',
        ownerPluginId: s?.ownerPluginId ?? '?',
        kind: s?.kind ?? '?',
      }));
    } catch (e) {
      results.ownerFilter.error = e.message;
      results.errors.push(e.message);
    }

    // 3. context 注入接受性：向插件私有 session 发送带 context 的消息
    try {
      const s = await createSession(ctx, { kind: 'ctx-test', visibility: 'plugin_private', memoryEnabled: false });
      const ref = s?.sessionRef ?? s;
      const res = await sendSessionMessage(ctx, ref, {
        text: 'context-injection-probe',
        context: {
          system: 'You are the SessionBridge test session.',
          beforeUser: [{ label: 'state', text: 'phase0-context-check' }],
        },
      });
      results.contextInjection.result = 'ok';
      results.contextInjection.detail = res;
    } catch (e) {
      results.contextInjection.result = 'error';
      results.contextInjection.errorMessage = e.message;
      results.errors.push(e.message);
    }

    return JSON.stringify({ ok: true, ...results });
  },
});
