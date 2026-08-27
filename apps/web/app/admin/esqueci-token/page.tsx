'use client';

import { useState } from 'react';
import Link from 'next/link';
import { requestAdminTokenReset } from '../../../lib/admin-api';

export default function AdminEsqueciTokenPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onConfirm() {
    setError(null);
    setLoading(true);
    try {
      await requestAdminTokenReset();
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="shell">
      <Link href="/admin/login" className="back-home">← Voltar ao login</Link>
      <h1>Esqueci o token</h1>
      <p className="sub">
        Não há e-mail pra digitar aqui — um token novo é enviado pro endereço de recuperação já
        configurado no servidor (se configurado). O token anterior deixa de funcionar assim que o
        novo for gerado.
      </p>
      {sent ? (
        <p className="sub">Se o e-mail de recuperação estiver configurado, um token novo foi enviado.</p>
      ) : (
        <>
          {error && <span className="error">{error}</span>}
          <button type="button" onClick={onConfirm} disabled={loading}>
            {loading ? 'Gerando…' : 'Gerar novo token e enviar por e-mail'}
          </button>
        </>
      )}
    </div>
  );
}
