'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { resetPassword } from '../../lib/api';

function RedefinirSenhaForm() {
  const router = useRouter();
  const token = useSearchParams().get('token') ?? '';
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword({ token, newPassword });
      router.push('/login');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="shell">
        <h1>Link inválido</h1>
        <p className="sub">Este link de redefinição está incompleto. Peça um novo em <Link href="/esqueci-senha">Esqueci minha senha</Link>.</p>
      </div>
    );
  }

  return (
    <div className="shell">
      <h1>Redefinir senha</h1>
      <p className="sub">Escolha uma nova senha pra sua conta.</p>
      <form onSubmit={onSubmit}>
        <label>
          Nova senha
          <input type="password" minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </label>
        <label>
          Confirme a nova senha
          <input type="password" minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </label>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? 'Salvando…' : 'Redefinir senha'}</button>
      </form>
    </div>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<div className="shell">Carregando…</div>}>
      <RedefinirSenhaForm />
    </Suspense>
  );
}
