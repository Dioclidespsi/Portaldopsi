'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface SidebarSection {
  label?: string;
  items: SidebarItem[];
}

/**
 * Barra lateral compartilhada por AdminShell e DashboardShell — só recebe
 * dados (marca, seções, logout), não sabe nada de admin/dashboard
 * especificamente. Em telas estreitas (<900px) fica escondida via CSS
 * (.app-sidebar { display: none }) e a navegação equivalente aparece como
 * lista horizontal rolável (ver .app-mobile-nav, renderizado por cada shell).
 */
export default function AppSidebar({
  brandLabel,
  brandHref,
  sections,
  onLogout,
}: {
  brandLabel: React.ReactNode;
  brandHref: string;
  sections: SidebarSection[];
  onLogout: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar">
      <Link href={brandHref} className="app-sidebar-brand">
        {brandLabel}
      </Link>
      <nav className="app-sidebar-nav">
        {sections.map((section, i) => (
          <div className="app-sidebar-section" key={section.label ?? i}>
            {section.label && <p className="app-sidebar-section-label">{section.label}</p>}
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`app-sidebar-link${active ? ' active' : ''}`}>
                  <Icon size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="app-sidebar-footer">
        <button type="button" onClick={onLogout}>Sair</button>
      </div>
    </aside>
  );
}
