'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PasswordInput from '../../components/PasswordInput';
import { getTenantKind, login, saveToken } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // Preenchido só no raro caso de o mesmo e-mail existir em mais de uma
  // clínica — o usuário escolhe qual, e a gente refaz o login já com o slug.
  const [tenantOptions, setTenantOptions] = useState<{ slug: string; tenantName: string }[] | null>(null);

  async function attemptLogin(slug?: string) {
    setError(null);
    setLoading(true);
    try {
      const result = await login({ slug, email, password });
      if ('chooseTenant' in result) {
        setTenantOptions(result.options);
        return;
      }
      saveToken(result.accessToken);
      router.push(getTenantKind() === 'ESTUDANTE' ? '/dashboard/cursos' : '/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    attemptLogin();
  }

  if (tenantOptions) {
    return (
      <div className="shell">
        <Link href="/" className="back-home">← Portal do Psi</Link>
        <h1>Qual clínica?</h1>
        <p className="sub">Seu e-mail está cadastrado em mais de uma clínica — escolha qual você quer acessar agora.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {tenantOptions.map((t) => (
            <button key={t.slug} type="button" disabled={loading} onClick={() => attemptLogin(t.slug)}>
              {t.tenantName}
            </button>
          ))}
        </div>
        {error && <span className="error">{error}</span>}
        <p className="foot-link">
          <button
            type="button"
            onClick={() => setTenantOptions(null)}
            style={{ background: 'transparent', color: 'var(--ink-soft)', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}
          >
            ← Voltar
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="shell">
      <Link href="/" className="back-home">← Portal do Psi</Link>
      <h1>Entrar</h1>
      <p className="sub">Informe seu e-mail e senha.</p>
      <form onSubmit={onSubmit}>
        <label>
          E-mail
          <input
            type="email"
            name="username"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha
          <PasswordInput
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
      </form>
      <p className="foot-link"><Link href="/esqueci-senha">Esqueci minha senha</Link></p>
      <p className="foot-link">Ainda não tem clínica? <Link href="/signup">Criar agora</Link></p>
    </div>
  );
}
