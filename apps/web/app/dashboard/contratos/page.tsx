'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '../../../components/DashboardShell';
import {
  acceptDocumentTemplate,
  DocumentTemplate,
  downloadDocumentTemplate,
  listDocumentTemplates,
  listPendingAcceptance,
} from '../../../lib/api';

export default function ContratosPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [pending, setPending] = useState<DocumentTemplate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([listDocumentTemplates(), listPendingAcceptance()])
      .then(([all, pend]) => {
        setTemplates(all);
        setPending(pend);
      })
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

  async function onAccept(id: string) {
    setError(null);
    setAccepting(id);
    try {
      await acceptDocumentTemplate(id);
      setPending((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setAccepting(null);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const otherTemplates = templates.filter((t) => !pending.some((p) => p.id === t.id));

  return (
    <DashboardShell title={"Contratos"} description={"Termos de serviço da plataforma e modelos de contrato incluídos na sua assinatura."}>
      {error && <span className="error">{error}</span>}

      {pending.length > 0 && (
        <div className="callout-box" style={{ marginTop: '1rem', borderColor: 'var(--accent)' }}>
          <p style={{ margin: '0 0 0.7rem', fontWeight: 600 }}>
            ⚠ Você precisa aceitar {pending.length === 1 ? 'este documento' : 'estes documentos'} para continuar
            usando o Portal do Psi:
          </p>
          {pending.map((t) => (
            <div
              key={t.id}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--line)', borderRadius: '8px', padding: '0.8rem 1rem', marginBottom: '0.6rem', background: 'var(--surface)' }}
            >
              <div>
                <p style={{ margin: '0 0 0.2rem', fontWeight: 600 }}>{t.title}</p>
                <p className="sub" style={{ margin: 0 }}>{t.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onDownload(t.id, t.title)}
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  Ler antes
                </button>
                <button onClick={() => onAccept(t.id)} disabled={accepting === t.id} style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}>
                  {accepting === t.id ? 'Aceitando…' : 'Li e aceito'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.6rem' }}>Modelos e contratos disponíveis</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '0.6rem' }}>
        {otherTemplates.map((t) => (
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
        {otherTemplates.length === 0 && <p className="sub">Nenhum outro modelo disponível ainda.</p>}
      </div>
    </DashboardShell>
  );
}
