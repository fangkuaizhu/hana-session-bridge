// ui/RoomPanel.tsx
// 共享房间主面板：房间列表 / 房间视图（消息流 + 参与者 + 建议输入）/ 弹窗。
// 数据通道（任务书 M5 FAQ）：setInterval 每秒轮询 GET rooms/:roomId/messages?since=。
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { hana } from '@hana/plugin-sdk';
import {
  Button,
  CardShell,
  EmptyState,
  HanaThemeProvider,
  TextInput,
} from '@hana/plugin-components';
import '@hana/plugin-components/styles.css';
import './panel.css';
import type {
  CreateRoomRequest,
  CreateRoomResponse,
  JoinRoomRequest,
  JoinRoomResponse,
  ListRoomsResponse,
  MessagesResponse,
  PermissionLevel,
  RoomDetailResponse,
  RoomMessage,
  RoomSummary,
} from './types.ts';

const POLL_INTERVAL_MS = 1000;
const PERMISSION_LABELS: Record<PermissionLevel, string> = {
  readonly: '只读',
  suggest: '建议',
  collaborate: '协作',
  full_control: '完全控制',
};
const PERMISSION_OPTIONS: PermissionLevel[] = ['readonly', 'suggest', 'collaborate', 'full_control'];

type DialogState = 'none' | 'create' | 'join';

function apiFetch<T>(route: string, init?: RequestInit): Promise<T> {
  return hana.api.fetch(route, init) as Promise<T>;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

function RoomPanel() {
  const [rooms, setRooms] = useState<RoomSummary[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogState>('none');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshRooms = useCallback(async () => {
    try {
      const res = await apiFetch<ListRoomsResponse>('rooms');
      setRooms(res.rooms ?? []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hana.ready();
    refreshRooms();
    const timer = setInterval(refreshRooms, POLL_INTERVAL_MS * 3);
    return () => clearInterval(timer);
  }, [refreshRooms]);

  const activeRoom = useMemo(
    () => rooms.find((r) => r.roomId === activeRoomId) ?? null,
    [rooms, activeRoomId]
  );

  return (
    <HanaThemeProvider mode="inherit" className="sb-panel">
      <CardShell
        title="共享房间"
        description="同一 Hana 实例上的实时会话共享"
        actions={
          <>
            <Button variant="ghost" onClick={() => setDialog('join')}>加入房间</Button>
            <Button variant="primary" onClick={() => setDialog('create')}>创建房间</Button>
          </>
        }
      >
        {error && <div className="sb-error">{error}</div>}

        {loading && rooms.length === 0 ? (
          <EmptyState title="加载中…" description="正在获取活跃房间" />
        ) : activeRoom ? (
          <RoomView
            room={activeRoom}
            onBack={() => setActiveRoomId(null)}
            onRoomsChanged={refreshRooms}
          />
        ) : (
          <RoomList
            rooms={rooms}
            onOpen={(roomId) => setActiveRoomId(roomId)}
            onRoomsChanged={refreshRooms}
          />
        )}
      </CardShell>

      {dialog === 'create' && (
        <CreateRoomDialog
          onClose={() => setDialog('none')}
          onCreated={(roomId) => {
            setDialog('none');
            setActiveRoomId(roomId);
            refreshRooms();
          }}
        />
      )}
      {dialog === 'join' && (
        <JoinRoomDialog
          onClose={() => setDialog('none')}
          onJoined={(roomId) => {
            setDialog('none');
            setActiveRoomId(roomId);
            refreshRooms();
          }}
        />
      )}
    </HanaThemeProvider>
  );
}

// ------------------------------------------------------------------
// 房间列表
// ------------------------------------------------------------------

function RoomList(props: { rooms: RoomSummary[]; onOpen: (roomId: string) => void; onRoomsChanged: () => void }) {
  const { rooms, onOpen } = props;
  if (rooms.length === 0) {
    return <EmptyState title="暂无活跃房间" description="点击右上角「创建房间」开始共享会话" />;
  }
  return (
    <div className="sb-room-list">
      {rooms.map((r) => (
        <button key={r.roomId} className="sb-room-card" onClick={() => onOpen(r.roomId)}>
          <div className="sb-room-card-head">
            <span className="sb-room-id">{r.roomId}</span>
            <span className="sb-badge">{PERMISSION_LABELS[r.permissionLevel]}</span>
          </div>
          <div className="sb-room-card-meta">
            {r.readableName ? <span>{r.readableName}</span> : <span>房主 {r.hostId}</span>}
            <span>{r.participantCount} 人</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ------------------------------------------------------------------
// 房间视图
// ------------------------------------------------------------------

function RoomView(props: { room: RoomSummary; onBack: () => void; onRoomsChanged: () => void }) {
  const { room, onBack, onRoomsChanged } = props;
  const roomId = room.roomId;

  const [detail, setDetail] = useState<RoomDetailResponse['room'] | null>(null);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [lastSeq, setLastSeq] = useState(0);
  const [suggestText, setSuggestText] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 房间详情（参与者/待批准）
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await apiFetch<RoomDetailResponse>(`rooms/${roomId}`);
        if (alive) setDetail(res.room ?? null);
      } catch { /* 忽略瞬时错误 */ }
    };
    load();
    const timer = setInterval(load, POLL_INTERVAL_MS * 3);
    return () => { alive = false; clearInterval(timer); };
  }, [roomId]);

  // 消息轮询（任务书 FAQ 方案 b）
  useEffect(() => {
    let alive = true;
    const poll = async () => {
      try {
        const res = await apiFetch<MessagesResponse>(`rooms/${roomId}/messages?since=${lastSeq}`);
        if (!alive) return;
        if (res.messages && res.messages.length > 0) {
          setMessages((prev) => [...prev, ...res.messages]);
          const maxSeq = Math.max(...res.messages.map((m) => m.seq));
          setLastSeq(maxSeq);
        }
      } catch { /* 忽略瞬时错误 */ }
    };
    poll();
    const timer = setInterval(poll, POLL_INTERVAL_MS);
    return () => { alive = false; clearInterval(timer); };
  }, [roomId, lastSeq]);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendSuggestion = async () => {
    const text = suggestText.trim();
    if (!text) return;
    try {
      await apiFetch<{ ok: boolean }>(`rooms/${roomId}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      setSuggestText('');
      setNotice('建议已发送');
    } catch (e) {
      setNotice(e instanceof Error ? e.message : String(e));
    }
    setTimeout(() => setNotice(null), 3000);
  };

  const approve = async (userId: string, ok: boolean) => {
    await apiFetch(`rooms/${roomId}/${ok ? 'approve' : 'reject'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    onRoomsChanged();
  };

  const leave = async () => {
    await apiFetch(`rooms/${roomId}/leave`, { method: 'POST' });
    onRoomsChanged();
    onBack();
  };

  const pending = detail?.pendingJoinRequests ?? [];

  return (
    <div className="sb-room-view">
      <div className="sb-room-view-head">
        <Button variant="ghost" onClick={onBack}>← 返回</Button>
        <span className="sb-room-id">{roomId}</span>
        {room.readableName ? <span>{room.readableName}</span> : null}
        <span className="sb-badge">{PERMISSION_LABELS[room.permissionLevel]}</span>
        <span className="sb-status-dot" title="本地连接" />
        <Button variant="danger" onClick={leave}>离开</Button>
      </div>

      {pending.length > 0 && (
        <div className="sb-approvals">
          <strong>加入请求</strong>
          {pending.map((p) => (
            <div key={p.userId} className="sb-approval-item">
              <span>{p.userId} 请求加入</span>
              <Button variant="primary" onClick={() => approve(p.userId, true)}>批准</Button>
              <Button variant="ghost" onClick={() => approve(p.userId, false)}>拒绝</Button>
            </div>
          ))}
        </div>
      )}

      {notice && <div className="sb-notice">{notice}</div>}

      <div className="sb-room-body">
        <MessageStream messages={messages} scrollRef={scrollRef} />
        <ParticipantList room={room} detail={detail} />
      </div>

      <InputBar value={suggestText} onChange={setSuggestText} onSend={sendSuggestion} />
    </div>
  );
}

// ------------------------------------------------------------------
// 消息流
// ------------------------------------------------------------------

const TYPE_ICONS: Record<RoomMessage['type'], string> = {
  user_message: '👤',
  agent_reply: '🤖',
  tool_call: '🔧',
  tool_result: '📦',
  suggestion: '💡',
  participant_join: '🟢',
  participant_leave: '🔴',
};

function MessageStream(props: { messages: RoomMessage[]; scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const { messages, scrollRef } = props;
  if (messages.length === 0) {
    return (
      <div className="sb-stream sb-empty-stream">
        <EmptyState title="等待消息" description="房主会话的消息将实时显示在这里" />
      </div>
    );
  }
  return (
    <div className="sb-stream" ref={scrollRef}>
      {messages.map((m) => (
        <MessageBubble key={m.seq} msg={m} />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: RoomMessage }) {
  const icon = TYPE_ICONS[msg.type] ?? '•';
  let content = '';
  const p = msg.payload as { text?: unknown; toolName?: unknown; args?: unknown; output?: unknown; userId?: unknown } | null;
  if (msg.type === 'tool_call') {
    content = `调用 ${String(p?.toolName ?? 'unknown')}`;
  } else if (msg.type === 'tool_result') {
    content = String(p?.output ?? '');
  } else {
    content = String(p?.text ?? '');
  }
  if (msg.type === 'participant_join') content = `${String(p?.userId ?? msg.from)} 加入了房间`;
  if (msg.type === 'participant_leave') content = `${String(p?.userId ?? msg.from)} 离开了房间`;

  return (
    <div className={`sb-bubble sb-bubble-${msg.type}`}>
      <span className="sb-bubble-icon">{icon}</span>
      <div className="sb-bubble-body">
        <div className="sb-bubble-meta">
          <span className="sb-bubble-from">{msg.from}</span>
          <span className="sb-bubble-time">{formatTime(msg.timestamp)}</span>
        </div>
        <div className="sb-bubble-content">{content || '(空)'}</div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 参与者列表
// ------------------------------------------------------------------

function ParticipantList(props: { room: RoomSummary; detail: RoomDetailResponse['room'] | null }) {
  const { room, detail } = props;
  const participants = detail?.participants ?? [];
  return (
    <aside className="sb-participants">
      <div className="sb-participants-title">参与者（{room.participantCount}）</div>
      {participants.length === 0 ? (
        <div className="sb-participants-empty">暂无数据</div>
      ) : (
        participants.map((p) => (
          <div key={p.userId} className="sb-participant">
            <span className="sb-participant-dot" />
            <span className="sb-participant-name">
              {p.userId}{p.isHost ? ' 👑' : ''}
            </span>
          </div>
        ))
      )}
    </aside>
  );
}

// ------------------------------------------------------------------
// 输入栏
// ------------------------------------------------------------------

function InputBar(props: { value: string; onChange: (v: string) => void; onSend: () => void }) {
  const { value, onChange, onSend } = props;
  return (
    <div className="sb-inputbar">
      <TextInput
        placeholder="发送建议（会注入房主会话上下文）…"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); } }}
      />
      <Button variant="primary" onClick={onSend}>发送</Button>
    </div>
  );
}

// ------------------------------------------------------------------
// 弹窗
// ------------------------------------------------------------------

function CreateRoomDialog(props: { onClose: () => void; onCreated: (roomId: string) => void }) {
  const { onClose, onCreated } = props;
  const [permissionLevel, setPermissionLevel] = useState<PermissionLevel>('suggest');
  const [password, setPassword] = useState('');
  const [readableName, setReadableName] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const create = async () => {
    setBusy(true);
    setErr(null);
    try {
      const body: CreateRoomRequest = { permissionLevel };
      if (password) body.password = password;
      if (readableName) body.readableName = readableName;
      const res = await apiFetch<CreateRoomResponse>('rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      onCreated(res.roomId);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="sb-overlay" onClick={onClose}>
      <div className="sb-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>创建房间</h3>
        <label>权限级别</label>
        <div className="sb-perm-options">
          {PERMISSION_OPTIONS.map((p) => (
            <label key={p} className="sb-perm-option">
              <input
                type="radio"
                name="perm"
                checked={permissionLevel === p}
                onChange={() => setPermissionLevel(p)}
              />
              {PERMISSION_LABELS[p]}
            </label>
          ))}
        </div>
        <TextInput label="可读名称（可选）" value={readableName} onChange={(e) => setReadableName(e.currentTarget.value)} />
        <TextInput label="密码（可选）" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        {err && <div className="sb-error">{err}</div>}
        <div className="sb-dialog-actions">
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button variant="primary" disabled={busy} onClick={create}>{busy ? '创建中…' : '创建'}</Button>
        </div>
      </div>
    </div>
  );
}

function JoinRoomDialog(props: { onClose: () => void; onJoined: (roomId: string) => void }) {
  const { onClose, onJoined } = props;
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const join = async () => {
    const rid = roomId.trim().toUpperCase();
    if (!/^[A-Z0-9]{8}$/.test(rid)) { setMsg('请输入 8 位房间码'); return; }
    setBusy(true);
    setMsg(null);
    try {
      const body: JoinRoomRequest = { roomId: rid };
      if (password) body.password = password;
      const res = await apiFetch<JoinRoomResponse>(`rooms/${rid}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password || undefined }),
      });
      if (res.status === 'joined') {
        onJoined(rid);
      } else {
        setMsg('加入请求已发送，等待房主批准');
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="sb-overlay" onClick={onClose}>
      <div className="sb-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>加入房间</h3>
        <TextInput label="房间码" value={roomId} onChange={(e) => setRoomId(e.currentTarget.value)} placeholder="如 A3K9X2M7" />
        <TextInput label="密码（可选）" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        {msg && <div className="sb-notice">{msg}</div>}
        <div className="sb-dialog-actions">
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button variant="primary" disabled={busy} onClick={join}>{busy ? '加入中…' : '加入'}</Button>
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById('root');
if (root) createRoot(root).render(<RoomPanel />);
