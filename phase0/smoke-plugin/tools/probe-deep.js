// Phase 0 · 深入探针：隔离性真相 + session_busy 归因 + listSessions 真实结构
// 1. dump listSessions 原始结构（字段名）
// 2. 从列表选一个非当前、非插件私有的 session，向它发消息 → 判断 busy vs 权限
// 3. 订阅 A → 向 B 发消息 → 记录 A 收到的所有事件完整内容，判断是广播还是误报
import {
  defineTool,
  createSession,
  sendSessionMessage,
  subscribeSessionEvents,
  listSessions,
} from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'probe_deep',
  description: 'Phase 0 deep probe: listSessions raw shape, foreign-session send attribution (busy vs permission), and cross-session event isolation truth.',
  parameters: {
    type: 'object',
    properties: {
      waitMs: { type: 'number', default: 1200 },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input, ctx) {
    const waitMs = input.waitMs ?? 1200;
    const results = { rawList: null, foreignSend: {}, isolation: {}, errors: [] };

    // 1. listSessions 原始结构
    try {
      const sessions = await listSessions(ctx, {});
      results.rawList = sessions;
      const arr = Array.isArray(sessions) ? sessions : sessions?.sessions ?? [];
      results.rawListArrayLen = arr.length;
      if (arr.length > 0) {
        results.rawListFirstKeys = Object.keys(arr[0]);
        results.rawListFirst = arr[0];
      }
    } catch (e) {
      results.errors.push(`listSessions: ${e.message}`);
    }

    // 2. 向一个"外来" session 发消息（优先选 public 且不是当前 session 的）
    try {
      const sessions = await listSessions(ctx, {});
      const arr = Array.isArray(sessions) ? sessions : sessions?.sessions ?? [];
      const foreign = arr.find((s) => {
        const id = s?.sessionId ?? s?.path ?? s?.id;
        return id && id !== ctx.sessionPath && s?.visibility !== 'plugin_private';
      });
      if (foreign) {
        const id = foreign.sessionId ?? foreign.path ?? foreign.id;
        // normalizeSessionTarget: 字符串 → { sessionPath }；对象接受 sessionPath/path
        const target = foreign.sessionId ? { sessionId: foreign.sessionId } : { sessionPath: foreign.path };
        results.foreignSend.target = { id, visibility: foreign.visibility, kind: foreign.kind ?? foreign.sessionKind, used: target };
        try {
          const res = await sendSessionMessage(ctx, target, { text: 'phase0-foreign-probe' });
          results.foreignSend.result = 'ok';
          results.foreignSend.detail = res;
        } catch (e) {
          results.foreignSend.result = 'error';
          results.foreignSend.errorMessage = e.message;
          results.foreignSend.errorType = e?.name ?? 'unknown';
          results.foreignSend.isPermission = /permission|forbidden|403|denied/i.test(e.message);
          results.foreignSend.isBusy = /busy/i.test(e.message);
        }
      } else {
        results.foreignSend.result = 'no-foreign-session-found';
      }
    } catch (e) {
      results.errors.push(`foreign send: ${e.message}`);
    }

    // 3. 隔离性真相：订阅 A → 向 B 发消息 → dump A 收到的完整事件
    try {
      const a = await createSession(ctx, { kind: 'iso-a', visibility: 'plugin_private', memoryEnabled: false });
      const b = await createSession(ctx, { kind: 'iso-b', visibility: 'plugin_private', memoryEnabled: false });
      const aRef = a?.sessionRef ?? a;
      const bRef = b?.sessionRef ?? b;
      const gotA = [];
      let off = null;
      try {
        off = subscribeSessionEvents(ctx, aRef, (event, meta) => {
          gotA.push({ event, meta });
        });
        await sendSessionMessage(ctx, bRef, { text: 'iso-ping-B' });
        await new Promise((r) => setTimeout(r, waitMs));
      } catch (e) {
        results.errors.push(`isolation setup: ${e.message}`);
      }
      results.isolation.subscribedTo = aRef?.sessionId;
      results.isolation.sentTo = bRef?.sessionId;
      results.isolation.aReceivedCount = gotA.length;
      results.isolation.aReceivedFull = gotA.map((r) => ({
        type: r.event?.type ?? r.event?.kind ?? 'unknown',
        sessionIdInEvent: r.event?.sessionId ?? null,
        metaSessionId: r.meta?.sessionId ?? null,
      }));
      if (off) { try { off(); } catch { /* ignore */ } }
    } catch (e) {
      results.errors.push(`isolation: ${e.message}`);
    }

    return JSON.stringify({ ok: true, ...results });
  },
});
