import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { fetchPlatformSettings } from '../lib/api';
import { getPalette } from '../lib/site-palettes';

export const metadata: Metadata = {
  title: 'Portal do Psi',
  description: 'Plataforma para administrar a clínica, estudar, receber supervisão e acompanhar pacientes.',
};

/**
 * Paleta da PLATAFORMA em si (escolhida pelo admin em /admin/aparencia),
 * aplicada sobrescrevendo as variáveis padrão de globals.css — afeta home,
 * logins, loja, dashboard, admin. Não afeta /p/{slug} (página do psicólogo),
 * que usa seu próprio namespace de variáveis (--site-*, ver site-palettes.ts
 * usado direto em p/[slug]/page.tsx), completamente independente desta.
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchPlatformSettings();
  const p = getPalette(settings.colorPalette);
  const themeVars = {
    '--ground': p.ground,
    '--surface': p.surface,
    '--line': p.line,
    '--ink': p.ink,
    '--ink-soft': p.inkSoft,
    '--accent': p.accent,
  } as CSSProperties;

  return (
    <html lang="pt-BR">
      <body style={themeVars}>{children}</body>
    </html>
  );
}
