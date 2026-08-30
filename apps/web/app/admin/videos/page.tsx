'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import {
  approvePresentationVideo,
  getAdminToken,
  listPendingPresentationVideos,
  PendingPresentationVideo,
  rejectPresentationVideo,
} from '../../../lib/admin-api';
import { extractYouTubeId } from '../../../lib/youtube';

export default function AdminVideosPage() {
  const router = useRouter();
  const [pending, setPending] = useState<PendingPresentationVideo[]>([]);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listPendingPresentationVideos()
      .then(setPending)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onApprove(tenantId: string) {
    setError(null);
    try {
      await approvePresentationVideo(tenantId);
      setPending((prev) => prev.filter((t) => t.id !== tenantId));
      if (previewId === tenantId) setPreviewId(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onReject(tenantId: string) {
    setError(null);
    try {
      await rejectPresentationVideo(tenantId, reason);
      setPending((prev) => prev.filter((t) => t.id !== tenantId));
      setRejectingId(null);
      setReason('');
      if (previewId === tenantId) setPreviewId(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell title={"Vídeos de apresentação"} description={"Só o admin da plataforma publica um vídeo de apresentação — assista antes de aprovar, pra evitar conteúdo que viole o código de ética do CRP. Os vídeos ficam hospedados no YouTube do próprio profissional (não listados)."}>
      {error && <span className="error">{error}</span>}

      {pending.map((t) => {
        const videoId = extractYouTubeId(t.presentationVideoUrl);
        return (
          <div key={t.id} className="callout-box" style={{ marginTop: '1rem' }}>
            <p style={{ margin: '0 0 0.6rem', fontWeight: 600 }}>
              {t.name} ({t.slug})
            </p>
            <p className="sub" style={{ margin: '0 0 0.6rem', wordBreak: 'break-all' }}>
              <a href={t.presentationVideoUrl} target="_blank" rel="noreferrer">{t.presentationVideoUrl}</a>
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
              {videoId && (
                <button onClick={() => setPreviewId(previewId === t.id ? null : t.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                  {previewId === t.id ? 'Fechar prévia' : 'Assistir'}
                </button>
              )}
              <button onClick={() => onApprove(t.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                Publicar
              </button>
              <button
                onClick={() => setRejectingId(rejectingId === t.id ? null : t.id)}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                Rejeitar
              </button>
            </div>

            {previewId === t.id && videoId && (
              <div style={{ width: '100%', maxWidth: '480px', aspectRatio: '16 / 9', marginBottom: '0.6rem' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Vídeo de ${t.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                />
              </div>
            )}

            {rejectingId === t.id && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <label style={{ flex: 1, minWidth: '200px' }}>
                  Motivo da rejeição
                  <input value={reason} onChange={(e) => setReason(e.target.value)} required />
                </label>
                <button onClick={() => onReject(t.id)}>Confirmar rejeição</button>
              </div>
            )}
          </div>
        );
      })}
      {pending.length === 0 && <p className="sub" style={{ marginTop: '1rem' }}>Nenhum vídeo aguardando revisão.</p>}
    </AdminShell>
  );
}
