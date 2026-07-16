'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getTenantKind, login, saveToken } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken } = await login({ slug, email, password });
      saveToken(accessToken);
      router.push(getTenantKind() === 'ESTUDANTE' ? '/dashboard/cursos' : '/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="shell">
      <Link href="/" className="back-home">← Portal do Psi</Link>
      <h1>Entrar</h1>
      <p className="sub">Informe o identificador da clínica junto com suas credenciais.</p>
      <form onSubmit={onSubmit}>
        <label>
          Identificador (slug) da clínica
          <input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} required />
        </label>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Senha
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
      </form>
      <p className="foot-link">Ainda não tem clínica? <Link href="/signup">Criar agora</Link></p>
    </div>
  );
}
