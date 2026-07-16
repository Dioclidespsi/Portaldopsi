'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  CommunityReportItem,
  getAdminToken,
  listCommunityReports,
  removeCommunityPost,
  removeCommunityReply,
  resolveCommunityReport,
} from '../../../lib/admin-api';

export default function AdminComunidadePage() {
  const router = useRouter();
  const [reports, setReports] = useState<CommunityReportItem[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [removeReason, setRemoveReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listCommunityReports()
      .then(setReports)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

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
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Moderação da Comunidade</h2>
      <p className="sub">
        Fila de denúncias de posts e respostas — único espaço do sistema que atravessa clínicas diferentes.
      </p>

      {reports.map((r) => (
        <div key={r.id} className="callout-box" style={{ marginTop: '1rem' }}>
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
      {error && <span className="error">{error}</span>}
    </div>
  );
}
