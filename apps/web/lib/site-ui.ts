import { CSSProperties } from 'react';

/**
 * Estilo compartilhado dos componentes do Site Profissional (/{slug}) —
 * extraído porque estava copiado, byte a byte, em BookingWidget/
 * CommentsSection/ContactForm. Usa as CSS custom properties `--site-*`
 * (ver page.tsx/site-palettes.ts), então funciona em qualquer paleta sem
 * precisar receber cor como argumento.
 */
export function siteFieldStyle(): CSSProperties {
  return {
    padding: '0.6rem 0.75rem',
    border: '1px solid var(--site-line)',
    borderRadius: '6px',
    fontFamily: 'inherit',
    fontSize: '0.92rem',
    background: 'var(--site-surface)',
    color: 'var(--site-ink)',
    width: '100%',
  };
}

export function sitePrimaryButtonStyle(opts?: { disabled?: boolean }): CSSProperties {
  const disabled = opts?.disabled ?? false;
  return {
    alignSelf: 'flex-start',
    display: 'inline-block',
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#fff',
    background: 'var(--site-accent)',
    border: 'none',
    borderRadius: '8px',
    padding: '0.7rem 1.4rem',
    textDecoration: 'none',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.7 : 1,
  };
}
