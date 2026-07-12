'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  checkMarketingContent,
  ComplianceFlag,
  createMarketingPost,
  listMarketingPosts,
  MarketingPost,
  suggestCompliantRewrite,
  updateMarketingPostStatus,
} from '../../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  RASCUNHO: 'Rascunho',
  AGENDADO: 'Agendado',
  PUBLICADO: 'Publicado',
};

export default function MarketingPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<MarketingPost[]>([]);
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('');
  const [flags, setFlags] = useState<ComplianceFlag[] | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [rewriting, setRewriting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listMarketingPosts()
      .then(setPosts)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCheck() {
    setSuggestion(null);
    setFlags(await checkMarketingContent(content));
  }

  async function onRewrite() {
    if (!flags) return;
    setError(null);
    setRewriting(true);
    try {
      const { suggestion } = await suggestCompliantRewrite(content, flags.map((f) => f.reason));
      setSuggestion(suggestion);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setRewriting(false);
    }
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const post = await createMarketingPost({ content, platform: platform || undefined });
      setPosts((prev) => [post, ...prev]);
      setContent('');
      setFlags(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onStatusChange(id: string, status: string) {
    const updated = await updateMarketingPostStatus(id, status);
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Marketing</h2>
      <p className="sub">
        Rascunho e checklist ético básico (Resolução CFP nº 03/2007 + NT 01/2022) — não substitui
        revisão humana. Publicação de verdade fica com o InstaPostPro.
      </p>

      <form onSubmit={onCreate}>
        <label>
          Conteúdo do post
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
            required
          />
        </label>
        <label>Plataforma<input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Instagram, e-mail…" /></label>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button type="button" onClick={onCheck} style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
            Verificar
          </button>
          <button type="submit">Salvar rascunho</button>
        </div>
      </form>

      {flags && (
        flags.length === 0 ? (
          <p style={{ color: 'var(--accent)', fontSize: '0.85rem', marginTop: '0.6rem' }}>Nenhum alerta encontrado.</p>
        ) : (
          <>
            <div className="callout-box" style={{ marginTop: '0.6rem' }}>
              {flags.map((f, i) => <div key={i}><strong>"{f.match}"</strong> — {f.reason}</div>)}
            </div>
            <button
              type="button"
              onClick={onRewrite}
              disabled={rewriting}
              style={{ marginTop: '0.5rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)', fontSize: '0.85rem' }}
            >
              {rewriting ? 'Reescrevendo…' : 'Sugerir reescrita com IA'}
            </button>
          </>
        )
      )}
      {suggestion && (
        <div className="callout-box" style={{ marginTop: '0.6rem' }}>
          <strong>Sugestão:</strong> {suggestion}
        </div>
      )}
      {error && <span className="error">{error}</span>}

      <h3 style={{ fontSize: '0.95rem', marginTop: '1.5rem' }}>Posts</h3>
      <table>
        <thead><tr><th>Conteúdo</th><th>Plataforma</th><th>Alertas</th><th>Status</th></tr></thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td style={{ maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.content}</td>
              <td>{p.platform ?? '—'}</td>
              <td>{p.complianceFlags && p.complianceFlags.length > 0 ? `${p.complianceFlags.length} alerta(s)` : '—'}</td>
              <td>
                <select value={p.status} onChange={(e) => onStatusChange(p.id, e.target.value)}>
                  {Object.entries(STATUS_LABEL).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
                </select>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum post ainda.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
