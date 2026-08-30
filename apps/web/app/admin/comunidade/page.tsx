'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import {
  AdminCommunityPost,
  CommunityReportItem,
  getAdminToken,
  listAllCommunityPosts,
  listCommunityReports,
  removeCommunityPost,
  removeCommunityReply,
  resolveCommunityReport,
} from '../../../lib/admin-api';

const DEFAULT_REMOVE_REASON = 'Removido pela administração da plataforma por descumprir as diretrizes de uso.';

export default function AdminComunidadePage() {
  const router = useRouter();
  const [reports, setReports] = useState<CommunityReportItem[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [removeReason, setRemoveReason] = useState('');
  const [allPosts, setAllPosts] = useState<AdminCommunityPost[]>([]);
  const [postSearch, setPostSearch] = useState('');
  const [removingPostId, setRemovingPostId] = useState<string | null>(null);
  const [removePostReason, setRemovePostReason] = useState(DEFAULT_REMOVE_REASON);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  function loadAllPosts(search = '') {
    return listAllCommunityPosts(search || undefined).then((r) => setAllPosts(r.posts));
  }

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    Promise.all([listCommunityReports().then(setReports), loadAllPosts()])
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function onSearchPosts(e: FormEvent) {
    e.preventDefault();
    setError(null);
    loadAllPosts(postSearch).catch((err) => setError((err as Error).message));
  }

  function toggleRemovePostForm(id: string) {
    if (removingPostId === id) {
      setRemovingPostId(null);
      return;
    }
    setRemovingPostId(id);
    setRemovePostReason(DEFAULT_REMOVE_REASON);
  }

  async function onRemoveAnyPost(id: string) {
    setError(null);
    try {
      await removeCommunityPost(id, removePostReason || DEFAULT_REMOVE_REASON);
      setAllPosts((prev) => prev.map((p) => (p.id === id ? { ...p, removedAt: new Date().toISOString(), removedReason: removePostReason } : p)));
      setRemovingPostId(null);
      setRemovePostReason(DEFAULT_REMOVE_REASON);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDismiss(id: string) {
    setError(null);
    try {
      await resolveCommunityReport(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onRemoveContent(report: CommunityReportItem) {
    setError(null);
    try {
      if (report.post) await removeCommunityPost(report.post.id, removeReason);
      else if (report.reply) await removeCommunityReply(report.reply.id, removeReason);
      await resolveCommunityReport(report.id);
      setReports((prev) => prev.filter((r) => r.id !== report.id));
      setRemovingId(null);
      setRemoveReason('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell title={"Moderação da Comunidade"} description={"Fila de denúncias de posts e respostas — único espaço do sistema que atravessa clínicas diferentes."}>
      {reports.map((r) => (
        <div key={r.id} className="card" style={{ marginTop: '1rem' }}>
          <p style={{ margin: '0 0 0.3rem', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
            Denunciado por <strong>{r.reporter.name}</strong> — motivo: {r.reason}
          </p>
          {r.post && (
            <div>
              <p style={{ margin: '0 0 0.2rem', fontWeight: 600 }}>{r.post.title}</p>
              <p style={{ margin: '0 0 0.3rem', fontSize: '0.88rem' }}>{r.post.content}</p>
              <p className="sub" style={{ fontSize: '0.78rem' }}>Autor: {r.post.authorName}{r.post.removedAt && ' — já removido'}</p>
            </div>
          )}
          {r.reply && (
            <div>
              <p style={{ margin: '0 0 0.3rem', fontSize: '0.88rem' }}>{r.reply.content}</p>
              <p className="sub" style={{ fontSize: '0.78rem' }}>Resposta de: {r.reply.authorName}{r.reply.removedAt && ' — já removida'}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
            <button onClick={() => onDismiss(r.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
              Descartar denúncia
            </button>
            <button
              onClick={() => setRemovingId(removingId === r.id ? null : r.id)}
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
            >
              Remover conteúdo
            </button>
          </div>

          {removingId === r.id && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <label style={{ flex: 1, minWidth: '200px' }}>
                Motivo da remoção
                <input value={removeReason} onChange={(e) => setRemoveReason(e.target.value)} required />
              </label>
              <button onClick={() => onRemoveContent(r)}>Confirmar remoção</button>
            </div>
          )}
        </div>
      ))}
      {reports.length === 0 && <p className="sub" style={{ marginTop: '1rem' }}>Nenhuma denúncia pendente.</p>}

      <h3 style={{ fontSize: '0.95rem', marginTop: '2rem' }}>Todos os posts</h3>
      <p className="sub" style={{ marginTop: 0 }}>
        Remover aqui não depende de denúncia — qualquer post pode ser removido, com um motivo curto (pré-preenchido,
        pode editar).
      </p>
      <form onSubmit={onSearchPosts} style={{ display: 'flex', gap: '0.6rem', margin: '0.6rem 0 1rem', maxWidth: '420px' }}>
        <input
          value={postSearch}
          onChange={(e) => setPostSearch(e.target.value)}
          placeholder="Buscar por título, conteúdo ou autor…"
          style={{ flex: 1 }}
        />
        <button type="submit" style={{ fontSize: '0.85rem' }}>Buscar</button>
      </form>

      {allPosts.map((p) => (
        <div key={p.id} className="card" style={{ marginBottom: '0.8rem', opacity: p.removedAt ? 0.6 : 1 }}>
          <p style={{ margin: '0 0 0.2rem', fontWeight: 600 }}>{p.title}</p>
          <p style={{ margin: '0 0 0.3rem', fontSize: '0.88rem' }}>{p.content}</p>
          <p className="sub" style={{ fontSize: '0.78rem' }}>
            {p.authorName} · {p.tenantName} · {new Date(p.createdAt).toLocaleDateString('pt-BR')}
            {p._count && ` · ${p._count.replies} resposta(s)`}
            {p.removedAt && ` — removido: ${p.removedReason}`}
          </p>

          {!p.removedAt && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => toggleRemovePostForm(p.id)}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--crit, #a33)', border: '1px solid var(--crit, #a33)' }}
              >
                Remover
              </button>
            </div>
          )}

          {removingPostId === p.id && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <label style={{ flex: 1, minWidth: '260px' }}>
                Motivo (o autor não vê isso, é só registro interno)
                <input value={removePostReason} onChange={(e) => setRemovePostReason(e.target.value)} required />
              </label>
              <button onClick={() => onRemoveAnyPost(p.id)}>Confirmar remoção</button>
            </div>
          )}
        </div>
      ))}
      {allPosts.length === 0 && <p className="sub">Nenhum post encontrado.</p>}

      {error && <span className="error">{error}</span>}
    </AdminShell>
  );
}
