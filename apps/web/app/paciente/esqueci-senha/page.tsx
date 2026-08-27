'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { requestPatientPasswordReset } from '../../../lib/patient-api';

export default function PacienteEsqueciSenhaPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await requestPatientPasswordReset({ email });
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="shell">
        <Link href="/paciente/login" className="back-home">← Voltar ao login</Link>
        <h1>Verifique seu e-mail</h1>
        <p className="sub">
          Se esse e-mail tiver uma conta, enviamos um link pra redefinir a senha. O link expira em 1
          hora.
        </p>
      </div>
    );
  }

  return (
    <div className="shell">
      <Link href="/paciente/login" className="back-home">← Voltar ao login</Link>
      <h1>Esqueci minha senha</h1>
      <p className="sub">Informe o e-mail da sua conta de paciente.</p>
      <form onSubmit={onSubmit}>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? 'Enviando…' : 'Enviar link de redefinição'}</button>
      </form>
    </div>
  );
}
