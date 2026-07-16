'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveAdminToken, verifyAdminToken } from '../../../lib/admin-api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const ok = await verifyAdminToken(token);
      if (!ok) {
        setError('Token inválido.');
        return;
      }
      saveAdminToken(token);
      router.push('/admin');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="shell">
      <Link href="/" className="back-home">← Portal do Psi</Link>
      <h1>Console do administrador</h1>
      <p className="sub">Segredo único configurado em ADMIN_TOKEN no .env da API.</p>
      <form onSubmit={onSubmit}>
        <label>
          Token de administrador
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} required />
        </label>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
      </form>
    </div>
  );
}
