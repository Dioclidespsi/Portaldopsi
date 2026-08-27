import { SitePalette } from '../../lib/site-palettes';

/**
 * Índice de seções da página — só aparece em telas largas (ver .site-sidenav
 * em globals.css, escondido por padrão e mostrado a partir de 1120px), pra
 * quem tem tela de computador conseguir ver e pular direto pra qualquer
 * seção sem precisar rolar tudo. Em celular simplesmente não aparece — a
 * página continua a rolagem linear normal.
 */
export default function SideNav({ items, p }: { items: { href: string; label: string }[]; p: SitePalette }) {
  if (items.length < 2) return null;

  return (
    <nav
      className="site-sidenav"
      aria-label="Navegação da página"
      style={{ background: p.surface, border: `1px solid ${p.line}` }}
    >
      {items.map((item) => (
        <a key={item.href} href={item.href} style={{ color: p.inkSoft }}>
          <span style={{ background: p.accent }} />
          {item.label}
        </a>
      ))}
    </nav>
  );
}
