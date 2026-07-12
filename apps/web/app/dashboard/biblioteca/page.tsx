'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import { LibraryResource, listLibrary } from '../../../lib/api';

const CATEGORY_LABEL: Record<string, string> = {
  REGULAMENTACAO: 'Regulamentação',
  ETICA: 'Ética',
};

export default function BibliotecaPage() {
  const router = useRouter();
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listLibrary()
      .then(setResources)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Biblioteca</h2>
      <p className="sub">Regulamentação e ética profissional — acervo cresce com o tempo.</p>

      {resources.map((r) => (
        <div key={r.slug} style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.3rem' }}>
            <strong style={{ fontSize: '0.92rem' }}>{r.title}</strong>
            <span className="chip-free" style={{ color: 'var(--ink-soft)', borderColor: 'var(--line)' }}>{CATEGORY_LABEL[r.category] ?? r.category}</span>
          </div>
          <p style={{ fontSize: '0.87rem', color: 'var(--ink-soft)', margin: '0 0 0.3rem' }}>{r.summary}</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--ink-faint, var(--ink-soft))', margin: 0 }}>{r.whereToFind}</p>
        </div>
      ))}
    </div>
  );
}
