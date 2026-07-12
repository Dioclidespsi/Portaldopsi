'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNav from '../../../components/DashboardNav';
import { CommunityPost, createCommunityPost, listCommunityPosts } from '../../../lib/api';

export default function ComunidadePage() {
  const router = useRouter();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCommunityPosts()
      .then(setPosts)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const post = await createCommunityPost({ title, content });
      setPosts((prev) => [post, ...prev]);
      setTitle('');
      setContent('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Comunidade</h2>
      <p className="sub">Espaço entre assinantes de clínicas diferentes — troca de caso, indicação, networking.</p>

      {posts.map((p) => (
        <Link key={p.id} href={`/dashboard/comunidade/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--line)' }}>
            <strong style={{ fontSize: '0.95rem' }}>{p.title}</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: '0.2rem 0 0.3rem' }}>{p.content.slice(0, 140)}</p>
            <span className="sub" style={{ margin: 0 }}>
              {p.authorName} · {p.tenantName} · {p._count?.replies ?? 0} resposta(s)
            </span>
          </div>
        </Link>
      ))}
      {posts.length === 0 && <p className="sub">Nenhum post ainda — comece a conversa.</p>}

      <form onSubmit={onCreate} style={{ marginTop: '1.2rem' }}>
        <label>Título<input value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
        <label>
          Conteúdo
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
            required
          />
        </label>
        <button type="submit">Publicar</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
