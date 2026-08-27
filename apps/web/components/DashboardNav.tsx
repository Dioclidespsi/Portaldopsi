'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AccessStatus, clearToken, getAccessStatus, getTenantKind } from '../lib/api';

const LINKS = [
  { href: '/dashboard', label: 'Pacientes' },
  { href: '/dashboard/agenda', label: 'Agenda' },
  { href: '/dashboard/financeiro', label: 'Financeiro' },
  { href: '/dashboard/testes', label: 'Testes' },
  { href: '/dashboard/cursos', label: 'Cursos' },
  { href: '/dashboard/certificados', label: 'Certificados' },
  { href: '/dashboard/biblioteca', label: 'Biblioteca' },
  { href: '/dashboard/documentos', label: 'Documentos' },
  { href: '/dashboard/contratos', label: 'Contratos' },
  { href: '/dashboard/supervisao', label: 'Supervisão' },
  { href: '/dashboard/crm', label: 'CRM' },
  { href: '/dashboard/comunidade', label: 'Comunidade' },
  { href: '/dashboard/assistente', label: 'Assistente IA' },
  { href: '/dashboard/site', label: 'Site profissional' },
  { href: '/dashboard/assinatura', label: 'Assinatura' },
  { href: '/dashboard/conta', label: 'Minha conta' },
];

/** Contas ESTUDANTE só veem o ambiente de estudos — EstudanteAccessGuard bloqueia o resto no backend. */
const ESTUDANTE_LINKS = [
  { href: '/dashboard/cursos', label: 'Cursos' },
  { href: '/dashboard/certificados', label: 'Certificados' },
  { href: '/dashboard/conta', label: 'Minha conta' },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const links = getTenantKind() === 'ESTUDANTE' ? ESTUDANTE_LINKS : LINKS;
  const [status, setStatus] = useState<AccessStatus | null>(null);

  /**
   * Banner persistente (nunca redirect forçado) — qualquer página do
   * dashboard renderiza este nav, então é o lugar central pra checar. Só
   * CLINICA (ESTUDANTE não passa por este gate). O bloqueio de verdade
   * acontece no backend (ver ClinicalAccessGuard) — isto aqui só avisa o
   * que falta, nunca impede navegação.
   */
  useEffect(() => {
    if (getTenantKind() === 'ESTUDANTE') return;
    getAccessStatus()
      .then(setStatus)
      .catch(() => undefined);
  }, [pathname]);

  function onLogout() {
    clearToken();
    router.push('/login');
  }

  const missing = status && !status.ok
    ? [
        status.missingCrp && { label: 'verificação do CRP', href: '/dashboard' },
        status.missingSubscription && { label: 'assinatura ativa', href: '/dashboard/assinatura' },
        status.missingTerms && { label: 'aceite dos termos de uso', href: '/dashboard/contratos' },
      ].filter((item): item is { label: string; href: string } => Boolean(item))
    : [];

  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', rowGap: '0.4rem' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.88rem',
                fontWeight: pathname === link.href ? 700 : 400,
                color: pathname === link.href ? 'var(--accent)' : 'var(--ink-soft)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          onClick={onLogout}
          style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
        >
          Sair
        </button>
      </nav>
      {missing.length > 0 && (
        <div className="callout-box" style={{ marginBottom: '1.5rem', borderColor: 'var(--accent)' }}>
          <p style={{ margin: '0 0 0.4rem', fontWeight: 600 }}>
            Ainda falta completar pra usar as ferramentas de atendimento (pacientes, agenda, teleconsulta, documentos,
            testes, financeiro, assistente IA):
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {missing.map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
                {item.label} →
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
