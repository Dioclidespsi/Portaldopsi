'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNav from '../../../components/DashboardNav';
import {
  CommunityCategory,
  CommunityNotification,
  CommunityPost,
  COMMUNITY_CATEGORY_LABEL,
  createCommunityPost,
  listCommunityNotifications,
  listCommunityPosts,
  markAllCommunityNotificationsRead,
  markCommunityNotificationRead,
  toggleCommunityPostLike,
} from '../../../lib/api';
import { Avatar, CATEGORY_OPTIONS, CategoryChip, CrpBadge, relativeTime } from './community-ui';

export default function ComunidadePage() {
  const router = useRouter();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const take = 20;
  const [category, setCategory] = useState<CommunityCategory | ''>('');
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState<CommunityNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityCategory>('GERAL');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  function reload(p = page) {
    return listCommunityPosts({ category: category || undefined, search: search || undefined, page: p }).then((r) => {
      setPosts(r.posts);
      setTotal(r.total);
      setPage(r.page);
    });
  }

  useEffect(() => {
    Promise.all([reload(1), listCommunityNotifications().then(setNotifications)])
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function onFilter(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await reload(1);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await createCommunityPost({ title, content, category: newCategory });
      setTitle('');
      setContent('');
      setNewCategory('GERAL');
      await reload(1);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onToggleLike(id: string) {
    setError(null);
    try {
      const { liked, count } = await toggleCommunityPostLike(id);
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likedByMe: liked, _count: { replies: p._count?.replies ?? 0, likes: count } } : p)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function onOpenNotifications() {
    setShowNotifications((v) => !v);
  }

  async function onNotificationClick(n: CommunityNotification) {
    if (!n.readAt) {
      const updated = await markCommunityNotificationRead(n.id);
      setNotifications((prev) => prev.map((x) => (x.id === n.id ? updated : x)));
    }
    router.push(`/dashboard/comunidade/${n.postId}`);
  }

  async function onMarkAllRead() {
    await markAllCommunityNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, readAt: n.readAt ?? new Date().toISOString() })));
  }

  const unreadCount = notifications.filter((n) => !n.readAt).length;
  const totalPages = Math.max(1, Math.ceil(total / take));

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.05rem', margin: 0 }}>Comunidade</h2>
          <p className="sub">Troca de casos, indicações e experiências entre psicólogos de todo o Brasil.</p>
        </div>
        <div style={{ position: 'relative' }}>
          <button
            onClick={onOpenNotifications}
            style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink)', position: 'relative', padding: '0.5rem 0.7rem' }}
          >
            🔔
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute', top: -4, right: -4, background: 'var(--crit)', color: '#fff',
                  borderRadius: '50%', fontSize: '0.65rem', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div
              style={{
                position: 'absolute', right: 0, top: '2.6rem', width: '320px', maxHeight: '360px', overflowY: 'auto',
                background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '8px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                padding: '0.6rem', zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.82rem' }}>Notificações</strong>
                {unreadCount > 0 && (
                  <button onClick={onMarkAllRead} style={{ fontSize: '0.72rem', padding: '0.2rem 0.4rem', background: 'transparent', color: 'var(--accent)' }}>
                    Marcar todas como lidas
                  </button>
                )}
              </div>
              {notifications.length === 0 && <p className="sub" style={{ fontSize: '0.8rem', margin: 0 }}>Nenhuma notificação ainda.</p>}
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => onNotificationClick(n)}
                  style={{
                    padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem',
                    background: n.readAt ? 'transparent' : 'var(--warn-soft)', marginBottom: '0.3rem',
                  }}
                >
                  <p style={{ margin: 0 }}>{n.message}</p>
                  <span className="sub" style={{ fontSize: '0.7rem' }}>{relativeTime(n.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={onFilter} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'flex-end', margin: '1rem 0' }}>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Buscar
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por título ou conteúdo…" />
        </label>
        <label>
          Categoria
          <select value={category} onChange={(e) => setCategory(e.target.value as CommunityCategory | '')}>
            <option value="">Todas</option>
            {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{COMMUNITY_CATEGORY_LABEL[c]}</option>)}
          </select>
        </label>
        <button type="submit" style={{ fontSize: '0.85rem' }}>Filtrar</button>
      </form>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px',
            padding: '1rem', marginBottom: '0.8rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.7rem' }}>
            <Avatar name={post.authorName} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.15rem' }}>
                <strong style={{ fontSize: '0.85rem' }}>{post.authorName}</strong>
                {post.authorCrpVerified && <CrpBadge />}
                <span className="sub" style={{ fontSize: '0.76rem' }}>· {post.tenantName}</span>
                <span className="sub" style={{ fontSize: '0.76rem' }}>· {relativeTime(post.createdAt)}</span>
              </div>
              {post.authorSpecialty && <p className="sub" style={{ margin: '0 0 0.4rem', fontSize: '0.76rem' }}>{post.authorSpecialty}</p>}

              <Link href={`/dashboard/comunidade/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ fontSize: '0.98rem', margin: '0.2rem 0 0.3rem' }}>{post.title}</h3>
                <p style={{ margin: '0 0 0.6rem', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
                  {post.content.length > 180 ? `${post.content.slice(0, 180)}…` : post.content}
                </p>
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                <CategoryChip category={post.category} />
                <button
                  onClick={() => onToggleLike(post.id)}
                  style={{ fontSize: '0.78rem', padding: '0.2rem 0.5rem', background: 'transparent', color: post.likedByMe ? 'var(--accent)' : 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  {post.likedByMe ? '♥' : '♡'} {post._count?.likes ?? 0}
                </button>
                <Link href={`/dashboard/comunidade/${post.id}`} style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
                  💬 {post._count?.replies ?? 0} resposta{(post._count?.replies ?? 0) === 1 ? '' : 's'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      {posts.length === 0 && <p className="sub">Nenhum post encontrado.</p>}

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', margin: '1rem 0' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => reload(p)}
              style={{
                fontSize: '0.8rem', padding: '0.3rem 0.6rem',
                background: p === page ? 'var(--accent)' : 'transparent',
                color: p === page ? '#fff' : 'var(--ink-soft)',
                border: '1px solid var(--line)',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <h3 style={{ fontSize: '0.95rem', marginTop: '1.6rem' }}>Novo post</h3>
      <form onSubmit={onCreate}>
        <label>
          Categoria
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as CommunityCategory)}>
            {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{COMMUNITY_CATEGORY_LABEL[c]}</option>)}
          </select>
        </label>
        <label>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Conteúdo
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', background: 'var(--ground)' }}
            required
          />
        </label>
        <button type="submit">Publicar</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
