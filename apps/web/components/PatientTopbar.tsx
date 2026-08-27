'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearPatientToken } from '../lib/patient-api';

/** Cabeçalho comum das páginas do paciente — mesmo padrão do DashboardNav pros profissionais: sempre visível, com saída direta sem precisar voltar pro painel primeiro. */
export default function PatientTopbar({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  const router = useRouter();

  function onLogout() {
    clearPatientToken();
    router.push('/paciente/login');
  }

  return (
    <div className="topbar">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="sub">{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link href="/paciente">
          <button style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>Voltar</button>
        </Link>
        <button type="button" onClick={onLogout} style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
          Sair
        </button>
      </div>
    </div>
  );
}
