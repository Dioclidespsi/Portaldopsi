'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Award, BookOpen, Bot, Building2, Calendar, DollarSign, FileText, Globe, GraduationCap,
  MessageSquare, Settings, Sparkles, Users,
} from 'lucide-react';
import AppSidebar, { SidebarSection } from './AppSidebar';
import AppMobileNav from './AppMobileNav';
import { AccessStatus, clearToken, getAccessStatus, getTenantKind } from '../lib/api';

const SECTIONS: SidebarSection[] = [
  {
    label: 'Atendimento',
    items: [
      { href: '/dashboard', label: 'Pacientes', icon: Users },
      { href: '/dashboard/agenda', label: 'Agenda', icon: Calendar },
      { href: '/dashboard/crm', label: 'CRM', icon: Sparkles },
    ],
  },
  {
    label: 'Financeiro',
    items: [
      { href: '/dashboard/financeiro', label: 'Financeiro', icon: DollarSign },
      { href: '/dashboard/assinatura', label: 'Assinatura', icon: Award },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      { href: '/dashboard/testes', label: 'Testes', icon: FileText },
      { href: '/dashboard/cursos', label: 'Cursos', icon: GraduationCap },
      { href: '/dashboard/certificados', label: 'Certificados', icon: Award },
      { href: '/dashboard/biblioteca', label: 'Biblioteca', icon: BookOpen },
    ],
  },
  {
    label: 'Gestão',
    items: [
      { href: '/dashboard/documentos', label: 'Documentos', icon: FileText },
      { href: '/dashboard/contratos', label: 'Contratos', icon: FileText },
      { href: '/dashboard/supervisao', label: 'Supervisão', icon: Building2 },
    ],
  },
  {
    label: 'Comunidade e IA',
    items: [
      { href: '/dashboard/comunidade', label: 'Comunidade', icon: MessageSquare },
      { href: '/dashboard/assistente', label: 'Assistente IA', icon: Bot },
    ],
  },
  {
    label: 'Minha presença',
    items: [
      { href: '/dashboard/site', label: 'Site profissional', icon: Globe },
      { href: '/dashboard/conta', label: 'Minha conta', icon: Settings },
    ],
  },
];

const ESTUDANTE_SECTIONS: SidebarSection[] = [
  {
    items: [
      { href: '/dashboard/cursos', label: 'Cursos', icon: GraduationCap },
      { href: '/dashboard/certificados', label: 'Certificados', icon: Award },
      { href: '/dashboard/conta', label: 'Minha conta', icon: Settings },
    ],
  },
];

const BRAND = <>Portal do Psi</>;

export default function DashboardShell({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isEstudante = getTenantKind() === 'ESTUDANTE';
  const sections = isEstudante ? ESTUDANTE_SECTIONS : SECTIONS;
  const [status, setStatus] = useState<AccessStatus | null>(null);

  /** Banner persistente (nunca redirect forçado) — mesmo padrão do DashboardNav original. */
  useEffect(() => {
    if (isEstudante) return;
    getAccessStatus()
      .then(setStatus)
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="app-shell">
      <AppSidebar brandLabel={BRAND} brandHref="/dashboard" sections={sections} onLogout={onLogout} />
      <AppMobileNav brandLabel={BRAND} brandHref="/dashboard" sections={sections} onLogout={onLogout} />
      <main className="app-main">
        <div className="app-page-header">
          <h1>{title}</h1>
          {description && <p className="sub" style={{ margin: 0 }}>{description}</p>}
        </div>

        {missing.length > 0 && (
          <div className="callout-box" style={{ marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 0.4rem', fontWeight: 600 }}>
              Ainda falta completar pra usar as ferramentas de atendimento (pacientes, agenda, teleconsulta,
              documentos, testes, financeiro, assistente IA):
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

        {children}
      </main>
    </div>
  );
}
