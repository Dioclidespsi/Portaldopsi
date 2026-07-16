'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAdminToken } from '../lib/admin-api';

const LINKS = [
  { href: '/admin', label: 'Verificação de CRP' },
  { href: '/admin/supervisores', label: 'Supervisores' },
  { href: '/admin/comunidade', label: 'Comunidade' },
  { href: '/admin/cursos', label: 'Cursos' },
  { href: '/admin/documentos', label: 'Documentos' },
  { href: '/admin/biblioteca', label: 'Biblioteca' },
  { href: '/admin/certificados', label: 'Certificados' },
  { href: '/admin/testes', label: 'Testes' },
  { href: '/admin/banners', label: 'Banners da home' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  function onLogout() {
    clearAdminToken();
    router.push('/admin/login');
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
        {LINKS.map((link) => (
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
      <button onClick={onLogout} style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
        Sair
      </button>
    </nav>
  );
}
