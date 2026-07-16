'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { listOwnTests, PatientTestSummary } from '../../../lib/patient-api';

const STATUS_LABEL: Record<string, string> = {
  pendente: 'Pendente — responder',
  respondido: 'Enviado — aguardando seu psicólogo',
  corrigido: 'Concluído',
};

export default function PatientTestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<PatientTestSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listOwnTests()
      .then(setTests)
      .catch(() => router.push('/paciente/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <div className="topbar">
        <div>
          <h1>Meus testes</h1>
          <p className="sub">Seu psicólogo decide como e quando conversar sobre o resultado — não mostramos pontuação aqui.</p>
        </div>
        <Link href="/paciente"><button style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>Voltar</button></Link>
      </div>

      {tests.map((t) => (
        <div key={t.id} style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
          <div>
            <p style={{ fontSize: '0.95rem', margin: '0 0 0.2rem' }}>{t.testTemplate.title}</p>
            <span className="sub" style={{ margin: 0 }}>{STATUS_LABEL[t.status]}</span>
          </div>
          {t.status === 'pendente' && (
            <Link href={`/paciente/testes/${t.id}`}>
              <button style={{ fontSize: '0.85rem', padding: '0.4rem 0.7rem' }}>Responder</button>
            </Link>
          )}
        </div>
      ))}
      {tests.length === 0 && <p className="sub">Nenhum teste disponibilizado ainda.</p>}
    </div>
  );
}
