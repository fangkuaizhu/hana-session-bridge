// lib/tool-executor.ts
// 工具执行器（Phase 3 P6）：ToolProxy 裁决通过后，真正执行工具调用的运行时。
// 当前为「可注入结构 + 占位实现」——返回明确错误而不假装执行成功。
//
// 真实接入方向（P6 之后）：
//   1. 经 sendSessionMessage 向被调用方（toUserId）的 session 发送执行指令，
//      让被调用方 Agent 用其工具集真正执行，并把结果回填；
//   2. 或等待 Hana 提供插件级工具调用 API（当前 plugin-runtime 无直接 invoke-tool 能力）。
//
// tool-proxy 本身不 import vendor runtime（保持纯引擎可测），执行器由 shared.ts
// 装配时注入：new ToolProxy(..., { executor: createToolExecutor(ctx) })。
import type { HanaPluginContext } from '../vendor/plugin-runtime.js';
import type { ToolExecutor } from './tool-proxy.ts';

/**
 * 创建默认工具执行器（占位）。
 * 接入真实工具运行时后，替换此函数体为真正的调用逻辑
 * （返回 { ok: true, output } 或 { ok: false, error }）。
 */
export function createToolExecutor(_ctx: HanaPluginContext): ToolExecutor {
  return async (_roomId, request) => ({
    ok: false,
    error: `工具执行运行时尚未接入（占位实现）：tool=${request.toolName} requestId=${request.requestId}`,
  });
}