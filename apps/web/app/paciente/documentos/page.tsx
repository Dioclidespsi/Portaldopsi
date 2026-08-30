'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PatientShell from '../../../components/PatientShell';
import {
  acceptOwnPsychDocument,
  downloadOwnPsychDocument,
  listOwnPsychDocuments,
  OwnPsychDocument,
} from '../../../lib/patient-api';

export default function PatientDocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<OwnPsychDocument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState<string | null>(null);

  useEffect(() => {
    listOwnPsychDocuments()
      .then(setDocuments)
      .catch(() => router.push('/paciente/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onDownload(doc: OwnPsychDocument) {
    setError(null);
    try {
      await downloadOwnPsychDocument(doc.tenant.slug, doc.id, `${doc.templateSlug}-${doc.id}.pdf`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onAccept(doc: OwnPsychDocument) {
    setError(null);
    setAccepting(doc.id);
    try {
      await acceptOwnPsychDocument(doc.tenant.slug, doc.id);
      setDocuments((prev) => prev.map((d) => (d.id === doc.id ? { ...d, acceptedByPatientAt: new Date().toISOString() } : d)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setAccepting(null);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <PatientShell
      title="Meus documentos"
      description="Laudos, relatórios, atestados, contratos e outros documentos que seu psicólogo(a) disponibilizou."
    >
      {error && <span className="error">{error}</span>}

      {documents.map((doc) => (
        <div key={doc.id} style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
          <div>
            <p style={{ fontSize: '0.98rem', fontWeight: 600, margin: '0 0 0.2rem' }}>{doc.title}</p>
            <p className="sub" style={{ margin: 0 }}>
              {doc.tenant.name} · Disponível desde {doc.releasedToPatientAt ? new Date(doc.releasedToPatientAt).toLocaleDateString('pt-BR') : '—'}
              {doc.requiresPatientAcceptance && (
                doc.acceptedByPatientAt
                  ? ` · Aceito em ${new Date(doc.acceptedByPatientAt).toLocaleDateString('pt-BR')}`
                  : ' · Aguardando seu aceite'
              )}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => onDownload(doc)} style={{ fontSize: '0.85rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
              Ler / baixar PDF
            </button>
            {doc.requiresPatientAcceptance && !doc.acceptedByPatientAt && (
              <button onClick={() => onAccept(doc)} disabled={accepting === doc.id} style={{ fontSize: '0.85rem', padding: '0.4rem 0.7rem' }}>
                {accepting === doc.id ? 'Aceitando…' : 'Aceitar'}
              </button>
            )}
          </div>
        </div>
      ))}
      {documents.length === 0 && <p className="sub">Nenhum documento disponibilizado ainda.</p>}
    </PatientShell>
  );
}
