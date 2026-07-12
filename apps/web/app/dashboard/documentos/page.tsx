'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import { DocumentTemplate, downloadDocumentTemplate, listDocumentTemplates } from '../../../lib/api';

export default function DocumentosPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listDocumentTemplates()
      .then(setTemplates)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onDownload(id: string, title: string) {
    setError(null);
    try {
      await downloadDocumentTemplate(id, title);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Documentos</h2>
      <p className="sub">Modelos de documento incluídos na sua assinatura — sem custo adicional.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '1rem' }}>
        {templates.map((t) => (
          <div
            key={t.id}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--line)', borderRadius: '8px', padding: '0.8rem 1rem' }}
          >
            <div>
              <p style={{ margin: '0 0 0.2rem', fontWeight: 600 }}>{t.title}</p>
              <p className="sub" style={{ margin: 0 }}>{t.description}</p>
            </div>
            <button onClick={() => onDownload(t.id, t.title)} style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}>
              Baixar
            </button>
          </div>
        ))}
        {templates.length === 0 && <p className="sub">Nenhum modelo de documento disponível ainda.</p>}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
