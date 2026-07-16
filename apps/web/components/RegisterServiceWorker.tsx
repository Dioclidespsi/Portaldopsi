'use client';

import { useEffect } from 'react';

/** Requisito de instalabilidade (Android/Capacitor, "Adicionar à tela inicial") — precisa rodar client-side, Server Component não tem navigator. */
export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    }
  }, []);
  return null;
}
