'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import { AdminBanner, deleteBanner, getAdminToken, listBanners, upsertBanner } from '../../../lib/admin-api';

const POSITIONS = [1, 2] as const;

function BannerSlot({ position, banner, onSaved, onDeleted }: {
  position: 1 | 2;
  banner?: AdminBanner;
  onSaved: (b: AdminBanner) => void;
  onDeleted: (position: 1 | 2) => void;
}) {
  const [linkUrl, setLinkUrl] = useState(banner?.linkUrl ?? '');
  const [active, setActive] = useState(banner?.active ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!banner && !file) {
      setError('Envie uma imagem pra este banner.');
      return;
    }
    setSaving(true);
    try {
      const updated = await upsertBanner(position, { linkUrl: linkUrl || undefined, active }, file ?? undefined);
      onSaved(updated);
      setFile(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    setError(null);
    try {
      await deleteBanner(position);
      onDeleted(position);
      setLinkUrl('');
      setActive(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '0.92rem', margin: '0 0 0.7rem' }}>Banner {position}</h3>
      {banner?.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={banner.imageUrl} alt={`Banner ${position}`} style={{ maxWidth: '100%', maxHeight: '160px', borderRadius: '6px', marginBottom: '0.7rem', display: 'block' }} />
      )}
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>
          Imagem {banner ? '(opcional, substitui a atual)' : ''}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Link (opcional)
          <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://…" />
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} style={{ width: 'auto' }} />
          Ativo
        </label>
        <button type="submit" disabled={saving}>{saving ? 'Salvando…' : 'Salvar'}</button>
        {banner && (
          <button
            type="button"
            onClick={onDelete}
            style={{ background: 'transparent', color: 'var(--crit)', border: '1px solid var(--crit)' }}
          >
            Remover
          </button>
        )}
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default function AdminBannersPage() {
  const router = useRouter();
  const [banners, setBanners] = useState<AdminBanner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listBanners()
      .then(setBanners)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  function onSaved(updated: AdminBanner) {
    setBanners((prev) => [...prev.filter((b) => b.position !== updated.position), updated]);
  }

  function onDeleted(position: 1 | 2) {
    setBanners((prev) => prev.filter((b) => b.position !== position));
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Banners da home</h2>
      <p className="sub">
        Até 2 banners promocionais exibidos na página inicial pública da plataforma. Cada um pode ter um link opcional.
      </p>

      {POSITIONS.map((position) => (
        <BannerSlot
          key={position}
          position={position}
          banner={banners.find((b) => b.position === position)}
          onSaved={onSaved}
          onDeleted={onDeleted}
        />
      ))}
    </div>
  );
}
