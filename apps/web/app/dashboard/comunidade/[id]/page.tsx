'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardNav from '../../../../components/DashboardNav';
import {
  CommunityPostDetail,
  getCommunityPost,
  replyToCommunityPost,
  reportCommunityPost,
  reportCommunityReply,
  toggleCommunityPostLike,
  toggleCommunityReplyLike,
} from '../../../../lib/api';
import { Avatar, CategoryChip, CrpBadge, relativeTime } from '../community-ui';

export default function ComunidadePostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<CommunityPostDetail | null>(null);
  const [reply, setReply] = useState('');
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportSent, setReportSent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommunityPost(params.id)
      .then(setPost)
      .catch(() => router.push('/dashboard/comunidade'))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  async function onReply(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const created = await replyToCommunityPost(params.id, reply);
      setPost((prev) => (prev ? { ...prev, replies: [...prev.replies, created] } : prev));
      setReply('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onTogglePostLike() {
    if (!post) return;
    setError(null);
    try {
      const { liked, count } = await toggleCommunityPostLike(post.id);
      setPost({ ...post, likedByMe: liked, _count: { replies: post._count?.replies ?? 0, likes: count } });
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onToggleReplyLike(replyId: string) {
    setError(null);
    try {
      const { liked, count } = await toggleCommunityReplyLike(replyId);
      setPost((prev) =>
        prev
          ? { ...prev, replies: prev.replies.map((r) => (r.id === replyId ? { ...r, likedByMe: liked, _count: { likes: count } } : r)) }
          : prev,
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSendReport(kind: 'post' | 'reply', id: string) {
    setError(null);
    try {
      if (kind === 'post') await reportCommunityPost(id, reportReason);
      else await reportCommunityReply(id, reportReason);
      setReportingId(null);
      setReportReason('');
      setReportSent(id);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!post) return null;

  return (
    <div className="shell shell-wide">
      <DashboardNav />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '1.1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.7rem' }}>
          <Avatar name={post.authorName} size={42} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <strong style={{ fontSize: '0.9rem' }}>{post.authorName}</strong>
              {post.authorCrpVerified && <CrpBadge />}
              <span className="sub" style={{ fontSize: '0.78rem' }}>· {post.tenantName}</span>
              <span className="sub" style={{ fontSize: '0.78rem' }}>· {relativeTime(post.createdAt)}</span>
            </div>
            {post.authorSpecialty && <p className="sub" style={{ margin: '0.1rem 0 0', fontSize: '0.78rem' }}>{post.authorSpecialty}</p>}

            <h2 style={{ fontSize: '1.05rem', margin: '0.5rem 0 0.4rem' }}>{post.title}</h2>
            <p style={{ fontSize: '0.92rem', whiteSpace: 'pre-wrap' }}>{post.content}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <CategoryChip category={post.category} />
              <button
                onClick={onTogglePostLike}
                style={{ fontSize: '0.78rem', padding: '0.2rem 0.5rem', background: 'transparent', color: post.likedByMe ? 'var(--accent)' : 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                {post.likedByMe ? '♥' : '♡'} {post._count?.likes ?? 0}
              </button>
              <button
                onClick={() => setReportingId(reportingId === post.id ? null : post.id)}
                style={{ fontSize: '0.78rem', padding: '0.2rem 0.5rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                🚩 Denunciar
              </button>
              {reportSent === post.id && <span className="sub" style={{ fontSize: '0.76rem' }}>Denúncia enviada.</span>}
            </div>

            {reportingId === post.id && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <label style={{ flex: 1, minWidth: '180px' }}>
                  Motivo da denúncia
                  <input value={reportReason} onChange={(e) => setReportReason(e.target.value)} required />
                </label>
                <button onClick={() => onSendReport('post', post.id)} style={{ fontSize: '0.82rem' }}>Enviar</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: '0.92rem' }}>Respostas ({post.replies.length})</h3>
      {post.replies.map((r) => (
        <div key={r.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '0.8rem', marginBottom: '0.6rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <Avatar name={r.authorName} size={30} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: '0.82rem' }}>{r.authorName}</strong>
                {r.authorCrpVerified && <CrpBadge />}
                <span className="sub" style={{ fontSize: '0.74rem' }}>· {r.tenantName}</span>
                <span className="sub" style={{ fontSize: '0.74rem' }}>· {relativeTime(r.createdAt)}</span>
              </div>
              <p style={{ fontSize: '0.87rem', margin: '0.3rem 0 0.4rem', whiteSpace: 'pre-wrap' }}>{r.content}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onToggleReplyLike(r.id)}
                  style={{ fontSize: '0.74rem', padding: '0.15rem 0.4rem', background: 'transparent', color: r.likedByMe ? 'var(--accent)' : 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  {r.likedByMe ? '♥' : '♡'} {r._count?.likes ?? 0}
                </button>
                <button
                  onClick={() => setReportingId(reportingId === r.id ? null : r.id)}
                  style={{ fontSize: '0.74rem', padding: '0.15rem 0.4rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  🚩 Denunciar
                </button>
                {reportSent === r.id && <span className="sub" style={{ fontSize: '0.72rem' }}>Denúncia enviada.</span>}
              </div>
              {reportingId === r.id && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <label style={{ flex: 1, minWidth: '160px' }}>
                    Motivo da denúncia
                    <input value={reportReason} onChange={(e) => setReportReason(e.target.value)} required />
                  </label>
                  <button onClick={() => onSendReport('reply', r.id)} style={{ fontSize: '0.8rem' }}>Enviar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {post.replies.length === 0 && <p className="sub">Nenhuma resposta ainda.</p>}

      <form onSubmit={onReply} style={{ marginTop: '1rem' }}>
        <label>
          Responder
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
            style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem', background: 'var(--ground)' }}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
