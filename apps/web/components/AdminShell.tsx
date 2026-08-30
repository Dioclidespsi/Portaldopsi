'use client';

import { useRouter } from 'next/navigation';
import {
  BarChart3, BookOpen, Building2, DollarSign, FileText, GraduationCap, Image as ImageIcon, Megaphone,
  MessageSquare, Music, Palette, ShieldCheck, Sparkles, Users, Video,
} from 'lucide-react';
import AppSidebar, { SidebarSection } from './AppSidebar';
import AppMobileNav from './AppMobileNav';
import { clearAdminToken } from '../lib/admin-api';

const SECTIONS: SidebarSection[] = [
  { items: [{ href: '/admin', label: 'Verificação de CRP', icon: ShieldCheck }] },
  {
    label: 'Crescimento',
    items: [
      { href: '/admin/prospeccao', label: 'Prospecção', icon: Sparkles },
      { href: '/admin/programa-piloto', label: 'Programa Piloto', icon: Megaphone },
    ],
  },
  {
    label: 'Pessoas',
    items: [
      { href: '/admin/usuarios', label: 'Usuários', icon: Users },
      { href: '/admin/estudantes', label: 'Estudantes', icon: GraduationCap },
      { href: '/admin/supervisores', label: 'Supervisores', icon: Building2 },
    ],
  },
  {
    label: 'Financeiro',
    items: [
      { href: '/admin/financeiro', label: 'Financeiro', icon: DollarSign },
      { href: '/admin/custo-ia', label: 'Custo de IA', icon: BarChart3 },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      { href: '/admin/cursos', label: 'Cursos', icon: GraduationCap },
      { href: '/admin/biblioteca', label: 'Biblioteca', icon: BookOpen },
      { href: '/admin/certificados', label: 'Certificados', icon: ShieldCheck },
      { href: '/admin/testes', label: 'Testes', icon: FileText },
      { href: '/admin/videos', label: 'Vídeos de apresentação', icon: Video },
      { href: '/admin/meditacao', label: 'Meditação', icon: Music },
    ],
  },
  {
    label: 'Comunidade',
    items: [
      { href: '/admin/comunidade', label: 'Comunidade', icon: MessageSquare },
      { href: '/admin/comentarios', label: 'Comentários dos sites', icon: MessageSquare },
    ],
  },
  {
    label: 'Documentos',
    items: [
      { href: '/admin/contratos', label: 'Contratos', icon: FileText },
      { href: '/admin/prontuarios', label: 'Prontuários (CRP)', icon: FileText },
    ],
  },
  {
    label: 'Aparência',
    items: [
      { href: '/admin/banners', label: 'Banners da home', icon: ImageIcon },
      { href: '/admin/aparencia', label: 'Aparência do site', icon: Palette },
    ],
  },
];

const BRAND = <>Portal do Psi <span>Admin</span></>;

export default function AdminShell({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  const router = useRouter();

  function onLogout() {
    clearAdminToken();
    router.push('/admin/login');
  }

  return (
    <div className="app-shell">
      <AppSidebar brandLabel={BRAND} brandHref="/admin" sections={SECTIONS} onLogout={onLogout} />
      <AppMobileNav brandLabel={BRAND} brandHref="/admin" sections={SECTIONS} onLogout={onLogout} />
      <main className="app-main">
        <div className="app-page-header">
          <h1>{title}</h1>
          {description && <p className="sub" style={{ margin: 0 }}>{description}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}
