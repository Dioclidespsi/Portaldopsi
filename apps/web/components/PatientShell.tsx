'use client';

import { useRouter } from 'next/navigation';
import { ClipboardCheck, FileText, Flower2, Home, ListChecks } from 'lucide-react';
import AppSidebar, { SidebarSection } from './AppSidebar';
import AppMobileNav from './AppMobileNav';
import { clearPatientToken } from '../lib/patient-api';

const SECTIONS: SidebarSection[] = [
  {
    items: [
      { href: '/paciente', label: 'Início', icon: Home },
      { href: '/paciente/dever-de-casa', label: 'Dever de casa', icon: ClipboardCheck },
      { href: '/paciente/documentos', label: 'Documentos', icon: FileText },
      { href: '/paciente/testes', label: 'Testes', icon: ListChecks },
      { href: '/paciente/meditacao', label: 'Meditação', icon: Flower2 },
    ],
  },
];

const BRAND = <>Portal do Psi</>;

export default function PatientShell({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  const router = useRouter();

  function onLogout() {
    clearPatientToken();
    router.push('/paciente/login');
  }

  return (
    <div className="app-shell">
      <AppSidebar brandLabel={BRAND} brandHref="/paciente" sections={SECTIONS} onLogout={onLogout} />
      <AppMobileNav brandLabel={BRAND} brandHref="/paciente" sections={SECTIONS} onLogout={onLogout} />
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
