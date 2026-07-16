'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { activatePatientPortal, savePatientToken } from '../../../lib/patient-api';

function AtivarForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') ?? '';
  const token = searchParams.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      const { accessToken } = await activatePatientPortal({ slug, token, password });
      savePatientToken(accessToken);
      router.push('/paciente');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!slug || !token) {
    return (
      <div className="shell">
        <Link href="/" className="back-home">← Portal do Psi</Link>
        <h1>Link inválido</h1>
        <p className="sub">Este link de ativação está incompleto. Peça um novo pra sua clínica.</p>
      </div>
    );
  }

  return (
    <div className="shell">
      <Link href="/" className="back-home">← Portal do Psi</Link>
      <h1>Ativar meu acesso</h1>
      <p className="sub">Crie uma senha pra entrar no seu portal daqui em diante.</p>
      <form onSubmit={onSubmit}>
        <label>
          Senha
          <input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirmar senha
          <input type="password" minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? 'Ativando…' : 'Ativar e entrar'}</button>
      </form>
    </div>
  );
}

export default function AtivarPortalPage() {
  return (
    <Suspense fallback={<div className="shell">Carregando…</div>}>
      <AtivarForm />
    </Suspense>
  );
}
