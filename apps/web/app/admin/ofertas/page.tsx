'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  AdminOffer,
  createOffer,
  deleteOffer,
  getAdminToken,
  listAllOffers,
  updateOffer,
} from '../../../lib/admin-api';

export default function AdminOffersPage() {
  const router = useRouter();
  const [offers, setOffers] = useState<AdminOffer[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listAllOffers()
      .then(setOffers)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const offer = await createOffer({ title, description, externalUrl, imageUrl: imageUrl || undefined });
      setOffers((prev) => [offer, ...prev]);
      setTitle('');
      setDescription('');
      setExternalUrl('');
      setImageUrl('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onToggleActive(offer: AdminOffer) {
    setError(null);
    try {
      const updated = await updateOffer(offer.id, { active: !offer.active });
      setOffers((prev) => prev.map((o) => (o.id === offer.id ? updated : o)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deleteOffer(id);
      setOffers((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Ofertas</h2>
      <p className="sub">Conteúdo promocional exibido pra todo tenant (novos treinamentos, produtos externos) — só o admin edita.</p>

      <table style={{ marginTop: '1rem' }}>
        <thead>
          <tr><th>Título</th><th>Link</th><th>Status</th><th>Ação</th></tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.id}>
              <td>{o.title}</td>
              <td><a href={o.externalUrl} target="_blank" rel="noreferrer">{o.externalUrl}</a></td>
              <td>{o.active ? 'Ativa' : 'Inativa'}</td>
              <td style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => onToggleActive(o)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                  {o.active ? 'Desativar' : 'Ativar'}
                </button>
                <button
                  onClick={() => onDelete(o.id)}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {offers.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhuma oferta cadastrada.</td></tr>
          )}
        </tbody>
      </table>

      <form onSubmit={onCreate} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label style={{ flex: 1 }}>
          Descrição
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Link externo
          <input type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://..." required />
        </label>
        <label>
          Imagem (opcional)
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
        </label>
        <button type="submit">Criar oferta</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
