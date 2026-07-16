'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearToken, getTenantKind } from '../lib/api';

const LINKS = [
  { href: '/dashboard', label: 'Pacientes' },
  { href: '/dashboard/agenda', label: 'Agenda' },
  { href: '/dashboard/financeiro', label: 'Financeiro' },
  { href: '/dashboard/testes', label: 'Testes' },
  { href: '/dashboard/cursos', label: 'Cursos' },
  { href: '/dashboard/certificados', label: 'Certificados' },
  { href: '/dashboard/biblioteca', label: 'Biblioteca' },
  { href: '/dashboard/documentos', label: 'Documentos' },
  { href: '/dashboard/supervisao', label: 'Supervisão' },
  { href: '/dashboard/crm', label: 'CRM' },
  { href: '/dashboard/comunidade', label: 'Comunidade' },
  { href: '/dashboard/assistente', label: 'Assistente IA' },
  { href: '/dashboard/site', label: 'Site profissional' },
  { href: '/dashboard/assinatura', label: 'Assinatura' },
];

/** Contas ESTUDANTE só veem o ambiente de estudos — EstudanteAccessGuard bloqueia o resto no backend. */
const ESTUDANTE_LINKS = [
  { href: '/dashboard/cursos', label: 'Cursos' },
  { href: '/dashboard/certificados', label: 'Certificados' },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const links = getTenantKind() === 'ESTUDANTE' ? ESTUDANTE_LINKS : LINKS;

  function onLogout() {
    clearToken();
    router.push('/login');
  }

  return (
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
  );
}
