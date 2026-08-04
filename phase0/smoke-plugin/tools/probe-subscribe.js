// Phase 0 · 假设 1：subscribeSessionEvents 存在性验证
// 从 @hana/plugin-runtime 导入（此处为 vendored 拷贝），检查：
// 1. 导出是否存在、是否为函数
// 2. 调用后是否返回 unsubscribe 函数
// 3. 能否订阅当前 session 的事件
import { defineTool, subscribeSessionEvents } from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'probe_subscribe',
  description: 'Phase 0 smoke test: verify subscribeSessionEvents exists, has correct signature, and can subscribe to the current session.',
  parameters: {
    type: 'object',
    properties: {
      waitMs: { type: 'number', default: 1500, description: 'How long to wait for an event before resolving.' },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input, ctx) {
    const results = {
      exported: typeof subscribeSessionEvents,
      signatureMatches: null,
      subscribeResult: null,
      eventReceived: null,
      unsubscribeWorks: null,
      errors: [],
    };

    // 1. 导出存在性
    if (typeof subscribeSessionEvents !== 'function') {
      return JSON.stringify({ ok: false, ...results, reason: 'subscribeSessionEvents not exported or not a function' });
    }

    // 2. 调用签名：subscribeSessionEvents(ctx, target, handler)
    let off = null;
    try {
      const target = ctx.sessionRef ?? { sessionId: ctx.sessionId };
      const received = [];
      off = subscribeSessionEvents(ctx, target, (event, meta) => {
        received.push({ event, meta });
      });
      results.subscribeResult = typeof off;
      results.signatureMatches = typeof off === 'function';

      // 3. 等一小段时间看是否有事件到达（不主动触发，只观察被动事件流）
      await new Promise((r) => setTimeout(r, input.waitMs ?? 1500));
      results.eventReceived = received.length > 0;
      results.eventSample = received.slice(0, 3).map((r) => ({
        type: r.event?.type ?? r.event?.kind ?? 'unknown',
        meta: r.meta,
      }));
    } catch (e) {
      results.errors.push(`subscribe call failed: ${e.message}`);
    }

    // 4. unsubscribe 是否可用
    if (off) {
      try {
        off();
        results.unsubscribeWorks = true;
      } catch (e) {
        results.unsubscribeWorks = false;
        results.errors.push(`unsubscribe failed: ${e.message}`);
      }
    }

    return JSON.stringify({ ok: true, ...results });
  },
});
