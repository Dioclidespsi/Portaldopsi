'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardNav from '../../../../components/DashboardNav';
import { CommunityPostDetail, getCommunityPost, replyToCommunityPost } from '../../../../lib/api';

export default function ComunidadePostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<CommunityPostDetail | null>(null);
  const [reply, setReply] = useState('');
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

  if (loading) return <div className="shell">Carregando…</div>;
  if (!post) return null;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>{post.title}</h2>
      <p className="sub">{post.authorName} · {post.tenantName}</p>
      <p style={{ fontSize: '0.92rem' }}>{post.content}</p>

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.2rem' }}>Respostas</h3>
      {post.replies.map((r) => (
        <div key={r.id} style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontSize: '0.88rem', margin: '0 0 0.2rem' }}>{r.content}</p>
          <span className="sub" style={{ margin: 0 }}>{r.authorName} · {r.tenantName}</span>
        </div>
      ))}
      {post.replies.length === 0 && <p className="sub">Nenhuma resposta ainda.</p>}

      <form onSubmit={onReply} style={{ marginTop: '1rem' }}>
        <label>
          Responder
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={2}
            style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
