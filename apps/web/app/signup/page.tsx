'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveToken, signup } from '../../lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [clinicName, setClinicName] = useState('');
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken } = await signup({ clinicName, slug, name, email, password });
      saveToken(accessToken);
      router.push('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="shell">
      <h1>Criar clínica</h1>
      <p className="sub">Você vira o psicólogo titular da conta.</p>
      <form onSubmit={onSubmit}>
        <label>
          Nome da clínica
          <input value={clinicName} onChange={(e) => setClinicName(e.target.value)} required />
        </label>
        <label>
          Identificador (slug) — usado para entrar depois
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            pattern="[a-z0-9-]+"
            placeholder="ex: clinica-ana-silva"
            required
          />
        </label>
        <label>
          Seu nome
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Senha
          <input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? 'Criando…' : 'Criar clínica'}</button>
      </form>
      <p className="foot-link">Já tem conta? <Link href="/login">Entrar</Link></p>
    </div>
  );
}
