// Phase 0 · 假设 2 v2：跨 session / 跨用户操作权限的完整边界测试
// 测试矩阵：
// 1. 插件私有 session A/B：订阅 A → 向 A 发消息 → 事件是否到达（事件流真实性）
// 2. 插件私有 session A：订阅 A → 向 B 发消息 → A 是否收到事件（隔离性验证）
// 3. 插件不拥有的 session（当前主会话 ctx.sessionRef）：发送消息 → 是否被拒
// 4. listSessions 无过滤 → 可见性范围
import {
  defineTool,
  createSession,
  sendSessionMessage,
  subscribeSessionEvents,
  listSessions,
} from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'probe_cross_session_v2',
  description: 'Phase 0 smoke test v2: full cross-session/cross-user boundary matrix (event delivery, isolation, foreign-session send, list visibility).',
  parameters: {
    type: 'object',
    properties: {
      waitMs: { type: 'number', default: 1200, description: 'Wait for event delivery after sending.' },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input, ctx) {
    const waitMs = input.waitMs ?? 1200;
    const results = {
      currentSession: { sessionId: ctx.sessionId, sessionRef: ctx.sessionRef, sessionPath: ctx.sessionPath },
      matrix: {},
      errors: [],
    };

    // 1. 创建两个插件私有 session
    const created = {};
    for (const label of ['A', 'B']) {
      try {
        const s = await createSession(ctx, {
          kind: `smoke-${label.toLowerCase()}`,
          visibility: 'plugin_private',
          memoryEnabled: false,
        });
        created[label] = s?.sessionRef ?? s;
        results.matrix[`create_${label}`] = 'ok';
      } catch (e) {
        results.matrix[`create_${label}`] = `error: ${e.message}`;
        results.errors.push(e.message);
      }
    }
    const aRef = created.A;
    const bRef = created.B;

    // 2. 订阅 A → 向 A 发消息 → 事件应到达（事件流真实性）
    if (aRef) {
      const gotA = [];
      let offA = null;
      try {
        offA = subscribeSessionEvents(ctx, aRef, (event, meta) => {
          gotA.push({ event, meta });
        });
        await sendSessionMessage(ctx, aRef, { text: 'ping-A-from-probe' });
        await new Promise((r) => setTimeout(r, waitMs));
        results.matrix['subscribe_A_send_A_eventReceived'] = gotA.length > 0;
        results.matrix['subscribe_A_send_A_eventSample'] = gotA.slice(0, 3).map((r) => ({
          type: r.event?.type ?? r.event?.kind ?? 'unknown',
          meta: r.meta,
        }));
      } catch (e) {
        results.matrix['subscribe_A_send_A'] = `error: ${e.message}`;
        results.errors.push(e.message);
      }
      if (offA) { try { offA(); } catch { /* ignore */ } }
    }

    // 3. 订阅 A → 向 B 发消息 → A 不应收到（隔离性）
    if (aRef && bRef) {
      const gotA2 = [];
      let offA2 = null;
      try {
        offA2 = subscribeSessionEvents(ctx, aRef, (event, meta) => {
          gotA2.push({ event, meta });
        });
        await sendSessionMessage(ctx, bRef, { text: 'ping-B-from-probe' });
        await new Promise((r) => setTimeout(r, waitMs));
        results.matrix['subscribe_A_send_B_A_isolated'] = gotA2.length === 0;
      } catch (e) {
        results.matrix['subscribe_A_send_B'] = `error: ${e.message}`;
        results.errors.push(e.message);
      }
      if (offA2) { try { offA2(); } catch { /* ignore */ } }
    }

    // 4. 向插件不拥有的 session（当前主会话）发消息 → 权限行为
    const foreignTarget = ctx.sessionRef ?? { sessionId: ctx.sessionId };
    try {
      const res = await sendSessionMessage(ctx, foreignTarget, { text: 'phase0-foreign-session-probe' });
      results.matrix['send_to_current_session'] = 'ok';
      results.matrix['send_to_current_session_result'] = res;
    } catch (e) {
      results.matrix['send_to_current_session'] = `error: ${e.message}`;
      results.matrix['send_to_current_session_errorType'] = e?.name ?? 'unknown';
      if (/permission|forbidden|403|denied/i.test(e.message)) {
        results.matrix['permissionDenied'] = true;
      }
    }

    // 5. listSessions 无过滤 → 可见性范围
    try {
      const sessions = await listSessions(ctx, {});
      const arr = Array.isArray(sessions) ? sessions : sessions?.sessions ?? [];
      results.matrix['listSessions_noFilter'] = 'ok';
      results.matrix['listSessions_count'] = arr.length;
      results.matrix['listSessions_sample'] = arr.slice(0, 5).map((s) => ({
        sessionId: s?.sessionId ?? s?.id ?? '?',
        visibility: s?.visibility ?? '?',
        ownerPluginId: s?.ownerPluginId ?? s?.ownerPlugin ?? '?',
      }));
    } catch (e) {
      results.matrix['listSessions_noFilter'] = `error: ${e.message}`;
      results.errors.push(e.message);
    }

    return JSON.stringify({ ok: true, ...results });
  },
});
