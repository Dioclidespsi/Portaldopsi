'use client';

import { useEffect } from 'react';

/**
 * Rede de segurança pra qualquer tela do paciente (/paciente e todas as sub-rotas) — sem isto, um
 * erro de render em qualquer lugar (ex: o crash real que travou o acesso à teleconsulta da Lorena
 * em 2026-08-03) derruba a página inteira sem nenhuma saída, exatamente no meio de uma sessão.
 * "Tentar novamente" tenta re-renderizar sem sair da página; "Recarregar" refaz o carregamento do
 * zero pra quando o estado em memória ficou mesmo inconsistente.
 */
export default function PatientError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell" style={{ textAlign: 'center', paddingTop: '3rem' }}>
      <div className="patient-info-card" style={{ display: 'inline-block', textAlign: 'left', maxWidth: '440px' }}>
        <p style={{ fontWeight: 600, margin: '0 0 0.5rem' }}>Algo deu errado nesta tela.</p>
        <p className="sub" style={{ margin: '0 0 1rem' }}>
          Isso não deveria ter acontecido — já foi registrado. Tente de novo; se persistir, recarregue a página.
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
          <button type="button" onClick={reset}>Tentar novamente</button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
          >
            Recarregar página
          </button>
        </div>
      </div>
    </div>
  );
}
