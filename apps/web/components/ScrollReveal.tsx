'use client';

import { useEffect } from 'react';

/**
 * Revela elementos com a classe .reveal suavemente conforme entram na tela —
 * uma vez só (some o observer depois), pra não ficar piscando ao rolar pra
 * cima e pra baixo. Não renderiza nada visível; só monta o observer depois
 * que a página (Server Component) já chegou no navegador. Respeita
 * prefers-reduced-motion via CSS (ver .reveal em globals.css).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
