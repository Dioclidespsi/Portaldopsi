'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import {
  AdminSiteComment,
  blockSiteComment,
  getAdminToken,
  listAdminSiteComments,
  unblockSiteComment,
} from '../../../lib/admin-api';

export default function AdminComentariosPage() {
  const router = useRouter();
  const [comments, setComments] = useState<AdminSiteComment[]>([]);
  const [blockingId, setBlockingId] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listAdminSiteComments()
      .then(setComments)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onBlock(id: string) {
    setError(null);
    try {
      const updated = await blockSiteComment(id, reason);
      setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setBlockingId(null);
      setReason('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onUnblock(id: string) {
    setError(null);
    try {
      const updated = await unblockSiteComment(id);
      setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell title={"Comentários dos sites profissionais"} description={"Só aparece aqui o que o profissional já publicou de fato na própria página pública. Restrinja em caso de violação do código de ética do CRP ou de outra política da plataforma — o texto nunca é editável, só some da página pública."}>
      {error && <span className="error">{error}</span>}

      {comments.map((c) => (
        <div key={c.id} className="card" style={{ marginTop: '1rem' }}>
          <p style={{ margin: '0 0 0.3rem', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
            {c.tenant.name} ({c.tenant.slug}) — {new Date(c.createdAt).toLocaleDateString('pt-BR')}
          </p>
          <p style={{ margin: '0 0 0.3rem', fontSize: '0.92rem' }}>{c.content}</p>
          <p className="sub" style={{ fontSize: '0.78rem', margin: '0 0 0.6rem' }}>— {c.authorName}</p>

          {c.blockedByAdmin ? (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', color: '#a33' }}>Restrito — {c.blockedReason}</span>
              <button onClick={() => onUnblock(c.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
                Remover restrição
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setBlockingId(blockingId === c.id ? null : c.id)}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
              >
                Restringir
              </button>
              {blockingId === c.id && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <label style={{ flex: 1, minWidth: '200px' }}>
                    Motivo (ex: violação do código de ética do CRP)
                    <input value={reason} onChange={(e) => setReason(e.target.value)} required />
                  </label>
                  <button onClick={() => onBlock(c.id)}>Confirmar restrição</button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
      {comments.length === 0 && <p className="sub" style={{ marginTop: '1rem' }}>Nenhum comentário publicado ainda.</p>}
    </AdminShell>
  );
}
