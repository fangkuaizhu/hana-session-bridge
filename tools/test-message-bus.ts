// tools/test-message-bus.ts
// M3 smoke test：MessageBus 全链路验证。
//   1. 创建插件私有 session，bridgeSession 订阅
//   2. 向该 session 发送消息，触发真实事件流（message_start/agent_start）
//   3. 验证广播消息类型映射正确、seq 递增
//   4. injectSuggestion 权限逻辑
//   5. handleMessage 去重
// 通过 dev loop 调用：plugin.dev.invokeTool("session-bridge", "session-bridge_test_message_bus")
import { defineTool, createSession, sendSessionMessage } from '../vendor/plugin-runtime.js';

export const { name, description, parameters, execute } = defineTool({
  name: 'test_message_bus',
  description: 'M3 smoke test: MessageBus bridges a real session event stream to room broadcast.',
  parameters: {
    type: 'object',
    properties: {
      waitMs: { type: 'number', default: 1500, description: 'How long to wait for session events.' },
    },
  },
  sessionPermission: { readOnly: true },
  async execute(input: { waitMs?: number }, ctx) {
    const waitMs = input.waitMs ?? 1500;
    const results: Record<string, unknown> = { ok: false, steps: [] };
    const step = (name: string, pass: boolean, detail?: unknown) => results.steps.push({ name, pass, ...(typeof detail === 'object' ? detail : { detail }) });

    const { EventBusTransport } = await import(`../lib/eventbus-transport.ts?v=${Date.now()}`);
    const { RoomManager } = await import(`../lib/room-manager.ts?v=${Date.now()}`);
    const { MessageBus } = await import(`../lib/message-bus.ts?v=${Date.now()}`);

    const rm = new RoomManager(ctx);
    const transport = new EventBusTransport(ctx, { selfId: ctx.userId ?? 'dev-host' });
    const mb = new MessageBus(transport, rm, ctx);

    // 1. 创建插件私有 session 作为"宿主会话"（Phase 0 已验证此路径可行）
    const created = await createSession(ctx, { visibility: 'plugin_private' }) as Record<string, unknown>;
    const hostSessionPath = (created as { path?: string } | null)?.path
      ?? (created as { sessionPath?: string } | null)?.sessionPath
      ?? (created as { sessionRef?: { sessionPath?: string } } | null)?.sessionRef?.sessionPath
      ?? null;
    step('create_host_session', typeof hostSessionPath === 'string' && hostSessionPath.length > 0, { hostSessionPath });

    // 2. 创建房间（host 为当前用户）
    const roomId = await rm.createRoom({
      hostId: ctx.userId ?? 'dev-host',
      hostSessionPath: hostSessionPath ?? '/dev/session',
      permissionLevel: 'suggest',
      readableName: 'mb-test',
    });

    // 3. bridgeSession 订阅宿主 session 事件
    const unsub = mb.bridgeSession(roomId, hostSessionPath ?? '/dev/session');

    // 4. 观察者 B 接收广播
    const observer = new EventBusTransport(ctx, { selfId: 'dev-observer' });
    const received: Array<{ seq: number; type: string; payload: unknown }> = [];
    const offObs = observer.onMessage(roomId, (m) => received.push({ seq: m.seq, type: m.type, payload: m.payload }));
    await observer.connect(roomId);
    // 观察者也加入房间，以便 injectSuggestion 测试
    await rm.joinRoom(roomId, { userId: 'dev-observer', sessionPath: '/dev/observer' });
    await rm.approveJoin(roomId, 'dev-observer');

    // 5. 向宿主 session 发送消息，触发事件流
    const sendRes = await sendSessionMessage(ctx, { sessionPath: hostSessionPath ?? '/dev/session' }, {
      text: 'M3 测试消息',
    }) as Record<string, unknown>;
    step('send_to_host_session', sendRes?.accepted === true || sendRes?.ok === true || sendRes?.error === undefined, { sendRes });

    // 6. 等待事件流到达
    await new Promise((r) => setTimeout(r, waitMs));
    unsub();

    // 7. 断言：广播消息被观察者收到，类型为 user_message（message_start 映射）
    const userMsgs = received.filter((m) => m.type === 'user_message');
    step('broadcast_user_message_received', userMsgs.length >= 1, { userMessageCount: userMsgs.length, allTypes: received.map((m) => m.type) });

    // 8. 断言：seq 严格递增
    const seqs = received.map((m) => m.seq);
    const seqStrictlyIncreasing = seqs.every((s, i) => i === 0 || s > seqs[i - 1]);
    step('seq_strictly_increasing', seqStrictlyIncreasing, { seqs });

    // 9. injectSuggestion 权限：readonly 房间禁止
    const roRoom = await rm.createRoom({ hostId: ctx.userId ?? 'dev-host', hostSessionPath: '/dev/ro', permissionLevel: 'readonly' });
    await rm.joinRoom(roRoom, { userId: 'dev-observer', sessionPath: '/dev/observer' });
    await rm.approveJoin(roRoom, 'dev-observer');
    let readonlyThrew = false;
    try {
      await mb.injectSuggestion(roRoom, 'dev-observer', '只读建议');
    } catch { readonlyThrew = true; }
    step('suggestion_blocked_readonly', readonlyThrew, {});

    // 10. handleMessage 去重
    let dispatched = 0;
    const busOff = ctx.bus.subscribe((type: unknown) => {
      if (type === 'session-bridge:message:received') dispatched++;
    });
    const dupMsg = { roomId, from: 'dev-observer', seq: 999, type: 'user_message' as const, payload: { text: 'dup' }, timestamp: Date.now() };
    mb.handleMessage(roomId, dupMsg);
    mb.handleMessage(roomId, dupMsg);
    step('handle_message_dedup', dispatched === 1, { dispatched });
    busOff();

    // 清理
    offObs();
    await observer.disconnect(roomId).catch(() => {});
    await rm.leaveRoom(roRoom, 'dev-observer').catch(() => {});
    await rm.leaveRoom(roRoom, ctx.userId ?? 'dev-host').catch(() => {});
    await rm.leaveRoom(roomId, 'dev-observer').catch(() => {});
    await rm.leaveRoom(roomId, ctx.userId ?? 'dev-host').catch(() => {});
    rm.cleanupGhostRooms();
    rm.dispose();

    results.ok = results.steps.every((s) => (s as any).pass === true);
    return JSON.stringify(results, null, 2);
  },
});
