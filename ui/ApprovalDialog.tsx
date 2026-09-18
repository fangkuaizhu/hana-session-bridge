// ui/ApprovalDialog.tsx
// Phase 3 P2 批准弹窗：覆盖在 WebView 上方（不打断 Agent 流）。
// 展示「谁」的 Agent 想执行「什么工具」+ 参数，带 30 秒倒计时自动拒绝。
// 三个批准范围按钮：批准本次(once) / 批准会话(session) / 始终批准(always) + 拒绝。
import { useEffect, useState } from 'react';
import { Button } from '@hana/plugin-components';
import type { ToolApproval, ToolApprovalScope } from './types.ts';

const TICK_MS = 1000;

const REASON_LABELS: Record<ToolApproval['reason'], string> = {
  approval_mode: '该工具设为需人工批准',
  param_mismatch: '参数未通过白名单过滤，降级人工批准',
  unconfigured: '工具未配置权限（完全控制房间兜底）',
};

function formatParams(params: Record<string, unknown>): string {
  try {
    const s = JSON.stringify(params);
    return s && s !== '{}' ? s : '';
  } catch {
    return String(params);
  }
}

function ApprovalCard(props: {
  approval: ToolApproval;
  now: number;
  onRespond: (requestId: string, approved: boolean, scope?: ToolApprovalScope) => Promise<void>;
}) {
  const { approval, now, onRespond } = props;
  const remaining = Math.max(0, Math.ceil((approval.deadline - now) / 1000));
  const paramsStr = formatParams(approval.params);

  return (
    <div className="sb-approval-card">
      <div className="sb-approval-head">
        <span className="sb-approval-title">⚠️ 工具调用请求</span>
        <span className="sb-approval-countdown" data-urgent={remaining <= 5 ? 'true' : undefined}>
          {remaining}s
        </span>
      </div>
      <div className="sb-approval-who">
        「{approval.fromUserId}」的 Agent 想在你的环境执行：
      </div>
      <div className="sb-approval-tool">{approval.toolName}</div>
      {paramsStr && <pre className="sb-approval-params">{paramsStr}</pre>}
      <div className="sb-approval-reason">{REASON_LABELS[approval.reason] ?? approval.reason}</div>
      <div className="sb-approval-actions">
        <Button variant="primary" onClick={() => onRespond(approval.requestId, true, 'once')}>批准本次</Button>
        <Button variant="primary" onClick={() => onRespond(approval.requestId, true, 'session')}>批准会话</Button>
        <Button variant="ghost" onClick={() => onRespond(approval.requestId, true, 'always')}>始终批准</Button>
        <Button variant="danger" onClick={() => onRespond(approval.requestId, false)}>拒绝</Button>
      </div>
    </div>
  );
}

export function ApprovalDialog(props: {
  approvals: ToolApproval[];
  onRespond: (requestId: string, approved: boolean, scope?: ToolApprovalScope) => Promise<void>;
}) {
  const { approvals, onRespond } = props;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(timer);
  }, []);

  if (approvals.length === 0) return null;

  return (
    <div className="sb-approval-overlay">
      {approvals.map((a) => (
        <ApprovalCard key={a.requestId} approval={a} now={now} onRespond={onRespond} />
      ))}
    </div>
  );
}