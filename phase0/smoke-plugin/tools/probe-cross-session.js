// Phase 0 · 假设 2：插件能否跨用户操作 session
// 流程：
// 1. 创建两个插件私有 session（模拟"两个用户"的会话边界）
// 2. 用 subscribeSessionEvents 订阅其中一个 session 的事件
// 3. 用 sendSessionMessage 向另一个 session 发送消息（跨 session 写入）
// 4. 记录是否报权限错误，事件是否到达订阅者
import {
  defineTool,
  createSession,
  sendSessionMessage,
  subscribeSessionEvents,
} from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'probe_cross_session',
  description: 'Phase 0 smoke test: verify a plugin can operate on sessions other than the current one (create/subscribe/send) and record permission behavior.',
  parameters: {
    type: 'object',
    properties: {
      waitMs: { type: 'number', default: 1200, description: 'Wait for event delivery after sending.' },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input, ctx) {
    const results = {
      created: [],
      subscribeCrossSession: null,
      sendCrossSession: null,
      eventReceived: null,
      permissionErrors: [],
      errors: [],
    };

    // 1. 创建两个插件私有 session
    try {
      const a = await createSession(ctx, {
        kind: 'smoke-a',
        visibility: 'plugin_private',
        memoryEnabled: false,
      });
      results.created.push({ label: 'A', sessionRef: a?.sessionRef ?? a });
    } catch (e) {
      results.errors.push(`createSession A failed: ${e.message}`);
    }
    try {
      const b = await createSession(ctx, {
        kind: 'smoke-b',
        visibility: 'plugin_private',
        memoryEnabled: false,
      });
      results.created.push({ label: 'B', sessionRef: b?.sessionRef ?? b });
    } catch (e) {
      results.errors.push(`createSession B failed: ${e.message}`);
    }

    const aRef = results.created[0]?.sessionRef;
    const bRef = results.created[1]?.sessionRef;

    // 2. 订阅 session A 的事件（从当前 session 上下文订阅另一个 session）
    let off = null;
    const received = [];
    if (aRef) {
      try {
        off = subscribeSessionEvents(ctx, aRef, (event, meta) => {
          received.push({ event, meta });
        });
        results.subscribeCrossSession = 'ok';
      } catch (e) {
        results.subscribeCrossSession = 'error';
        results.errors.push(`subscribe cross-session failed: ${e.message}`);
        if (/permission|forbidden|403|denied/i.test(e.message)) results.permissionErrors.push(e.message);
      }
    }

    // 3. 向 session B 发送消息（跨 session 写入）
    if (bRef) {
      try {
        const res = await sendSessionMessage(ctx, bRef, {
          text: 'phase0-cross-session-probe',
        });
        results.sendCrossSession = 'ok';
        results.sendResult = res;
      } catch (e) {
        results.sendCrossSession = 'error';
        results.errors.push(`sendSessionMessage cross-session failed: ${e.message}`);
        if (/permission|forbidden|403|denied/i.test(e.message)) results.permissionErrors.push(e.message);
      }
    }

    // 4. 等事件到达
    await new Promise((r) => setTimeout(r, input.waitMs ?? 1200));
    results.eventReceived = received.length > 0;
    results.eventSample = received.slice(0, 3).map((r) => ({
      type: r.event?.type ?? r.event?.kind ?? 'unknown',
      meta: r.meta,
    }));

    if (off) {
      try { off(); } catch { /* ignore */ }
    }

    return JSON.stringify({ ok: true, ...results });
  },
});
