// tools/test-transport.ts
// M1 smoke test：两个 EventBusTransport 实例互发消息。
// 验证：
//   1. A send → B onMessage 收到
//   2. 消息 seq 递增
//   3. 回声过滤：A 发消息后，A 自己（不同 selfId 的监听）不应收到
//   4. disconnect 后不再接收
// 通过 dev loop 调用：plugin.dev.invokeTool("session-bridge", "session-bridge_test_transport")
//
// 注意：Hana dev loop 对顶层静态 import 的 lib 模块做 ESM 缓存，reload 不刷新依赖；
// 因此这里用动态 import + cache-busting query 每次拿最新模块实例。
import { defineTool } from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'test_transport',
  description: 'M1 smoke test: two EventBusTransport instances exchange messages, verify seq increments and echo filtering.',
  parameters: {
    type: 'object',
    properties: {
      waitMs: { type: 'number', default: 300, description: 'How long to wait for async bus delivery.' },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input: { waitMs?: number }, ctx) {
    const waitMs = input.waitMs ?? 300;
    const results: Record<string, unknown> = { ok: false, steps: [] };
    const step = (name: string, detail: unknown) => results.steps.push({ name, ...(typeof detail === 'object' ? detail : { detail }) });

    const { EventBusTransport } = await import(`../lib/eventbus-transport.ts?v=${Date.now()}`);

    // 两个实例共享同一进程 EventBus（ctx.bus），用不同 selfId 模拟两个参与者
    const transportA = new EventBusTransport(ctx, { selfId: 'test-user-A' });
    const transportB = new EventBusTransport(ctx, { selfId: 'test-user-B' });
    const roomId = 'TESTROOM1';

    const receivedByB: Array<{ seq: number; type: string; from: string }> = [];
    const receivedByA: Array<{ seq: number; type: string; from: string }> = [];
    const offB = transportB.onMessage(roomId, (msg) => receivedByB.push({ seq: msg.seq, type: msg.type, from: msg.from }));
    const offA = transportA.onMessage(roomId, (msg) => receivedByA.push({ seq: msg.seq, type: msg.type, from: msg.from }));
    const statusesB: string[] = [];
    const offStatusB = transportB.onConnectionChange(roomId, (s) => statusesB.push(s));

    try {
      await transportA.connect(roomId);
      await transportB.connect(roomId);

      // 发送 3 条消息，seq 递增
      const base = Date.now();
      for (let i = 1; i <= 3; i++) {
        await transportA.send(roomId, {
          roomId,
          from: 'test-user-A',
          seq: i,
          type: i % 2 === 0 ? 'tool_call' : 'user_message',
          payload: { text: `msg-${i}` },
          timestamp: base + i,
        });
      }

      await new Promise((r) => setTimeout(r, waitMs));

      // 断言 1：B 收到 3 条，seq 递增
      results.bReceivedCount = receivedByB.length;
      results.bReceivedSeqs = receivedByB.map((m) => m.seq);
      const seqsB = receivedByB.map((m) => m.seq);
      const seqIncremental = seqsB.length === 3 && seqsB.every((s, i) => s === i + 1);
      step('b_received_incremental_seq', { pass: seqIncremental, seqs: seqsB });
      if (!seqIncremental) throw new Error(`B received wrong seqs: ${JSON.stringify(seqsB)}`);

      // 断言 2：B 收到消息内容正确（type 交替）
      const typesB = receivedByB.map((m) => m.type);
      step('b_received_types', { pass: JSON.stringify(typesB) === JSON.stringify(['user_message', 'tool_call', 'user_message']), types: typesB });

      // 断言 3：回声过滤，A（selfId=test-user-A）不应收到自己发的消息
      step('a_no_echo', { pass: receivedByA.length === 0, aReceived: receivedByA.length });

      // 断言 4：B 连接状态为 connected
      step('b_status_connected', { pass: statusesB.includes('connected'), statuses: statusesB });

      // 断言 5：disconnect 后不再接收
      await transportB.disconnect(roomId);
      const before = receivedByB.length;
      await transportA.send(roomId, {
        roomId,
        from: 'test-user-A',
        seq: 4,
        type: 'user_message',
        payload: { text: 'msg-4' },
        timestamp: base + 4,
      });
      await new Promise((r) => setTimeout(r, waitMs));
      step('b_stopped_after_disconnect', { pass: receivedByB.length === before, before, after: receivedByB.length });

      results.ok = true;
    } catch (e) {
      results.error = e instanceof Error ? e.message : String(e);
      results.ok = false;
    } finally {
      offA(); offB(); offStatusB();
      await transportA.disconnect(roomId).catch(() => {});
    }

    return JSON.stringify(results, null, 2);
  },
});
