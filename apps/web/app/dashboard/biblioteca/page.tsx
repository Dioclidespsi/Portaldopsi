'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import { LibraryMaterial, downloadLibraryMaterial, listLibrary } from '../../../lib/api';

export default function BibliotecaPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<LibraryMaterial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listLibrary()
      .then(setMaterials)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onDownload(m: LibraryMaterial) {
    setError(null);
    try {
      await downloadLibraryMaterial(m.id, m.title);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const byCategory = materials.reduce<Record<string, LibraryMaterial[]>>((acc, m) => {
    (acc[m.category] ??= []).push(m);
    return acc;
  }, {});

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Biblioteca</h2>
      <p className="sub">Materiais de apoio disponibilizados pela plataforma — baixe o que precisar.</p>

      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} style={{ marginTop: '1.2rem' }}>
          <h3 style={{ fontSize: '0.92rem' }}>{cat}</h3>
          {items.map((m) => (
            <div key={m.id} style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
              <div>
                <strong style={{ fontSize: '0.92rem' }}>{m.title}</strong>
                {m.description && <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', margin: '0.2rem 0 0' }}>{m.description}</p>}
              </div>
              <button onClick={() => onDownload(m)} style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem', whiteSpace: 'nowrap' }}>
                Baixar
              </button>
            </div>
          ))}
        </div>
      ))}
      {materials.length === 0 && <p className="sub">Nenhum material disponível ainda.</p>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
