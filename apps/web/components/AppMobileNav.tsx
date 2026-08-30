'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarSection } from './AppSidebar';

/** Versão achatada da navegação da sidebar pra telas estreitas — ver .app-topbar-mobile/.app-mobile-nav no globals.css. */
export default function AppMobileNav({
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
  const items = sections.flatMap((s) => s.items);

  return (
    <>
      <div className="app-topbar-mobile">
        <Link href={brandHref} className="app-topbar-mobile-brand">{brandLabel}</Link>
        <button type="button" onClick={onLogout} style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)', fontSize: '0.8rem', padding: '0.35rem 0.7rem' }}>
          Sair
        </button>
      </div>
      <div className="app-mobile-nav">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
