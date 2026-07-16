'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { completeOwnHomework, listOwnHomework, PatientHomework } from '../../../lib/patient-api';

export default function PatientHomeworkPage() {
  const router = useRouter();
  const [homeworks, setHomeworks] = useState<PatientHomework[]>([]);
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listOwnHomework()
      .then(setHomeworks)
      .catch(() => router.push('/paciente/login'))
      .finally(() => setLoading(false));
  }, [router]);

  function openComplete(id: string) {
    setAnsweringId(id);
    setNote('');
  }

  async function onComplete(e: FormEvent) {
    e.preventDefault();
    if (!answeringId) return;
    setError(null);
    try {
      const updated = await completeOwnHomework(answeringId, note || undefined);
      setHomeworks((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
      setAnsweringId(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <div className="topbar">
        <div>
          <h1>Dever de casa</h1>
          <p className="sub">Tarefas que seu psicólogo(a) atribuiu entre as sessões.</p>
        </div>
        <Link href="/paciente">
          <button style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>Voltar</button>
        </Link>
      </div>

      {error && <span className="error">{error}</span>}

      {homeworks.map((h) => (
        <div key={h.id} style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontSize: '0.98rem', fontWeight: 600, margin: '0 0 0.3rem' }}>{h.title}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: '0 0 0.4rem' }}>{h.instructions}</p>
          {h.dueDate && (
            <p className="sub" style={{ margin: '0 0 0.4rem' }}>Prazo: {new Date(h.dueDate).toLocaleDateString('pt-BR')}</p>
          )}
          {h.status === 'concluido' ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--accent)', margin: 0 }}>
              Concluído {h.completedAt && `em ${new Date(h.completedAt).toLocaleDateString('pt-BR')}`}
              {h.patientNote && ` — "${h.patientNote}"`}
            </p>
          ) : answeringId === h.id ? (
            <form onSubmit={onComplete} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '420px' }}>
              <label>
                Quer deixar algum comentário? (opcional)
                <input value={note} onChange={(e) => setNote(e.target.value)} />
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit" style={{ fontSize: '0.85rem', padding: '0.4rem 0.7rem' }}>Marcar como feito</button>
                <button
                  type="button"
                  onClick={() => setAnsweringId(null)}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button onClick={() => openComplete(h.id)} style={{ fontSize: '0.85rem', padding: '0.4rem 0.7rem' }}>
              Marcar como feito
            </button>
          )}
        </div>
      ))}
      {homeworks.length === 0 && <p className="sub">Nenhum dever de casa por enquanto.</p>}
    </div>
  );
}
