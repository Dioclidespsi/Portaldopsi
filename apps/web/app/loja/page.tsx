'use client';

import { FormEvent, useEffect, useState } from 'react';
import { enrollInCourse, getToken, listMarketplaceCourses, MarketplaceCourse, purchaseCourse, saveToken } from '../../lib/api';

function centsToReais(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function LojaPage() {
  const [courses, setCourses] = useState<MarketplaceCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [buyingSlug, setBuyingSlug] = useState<string | null>(null);
  const [provider, setProvider] = useState<'STRIPE' | 'ASAAS'>('ASAAS');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const loggedIn = Boolean(getToken());

  useEffect(() => {
    listMarketplaceCourses().then(setCourses).finally(() => setLoading(false));
  }, []);

  function openBuyPanel(courseSlug: string) {
    setBuyingSlug(buyingSlug === courseSlug ? null : courseSlug);
    setError(null);
    setMessage(null);
  }

  async function onBuy(e: FormEvent, courseSlug: string) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const successUrl = window.location.href;
      const cancelUrl = window.location.href;
      if (loggedIn) {
        const result = await enrollInCourse({ courseSlug, provider, cpfCnpj: cpfCnpj || undefined, successUrl, cancelUrl });
        if (result.checkoutUrl) window.location.href = result.checkoutUrl;
        else if (result.paymentLink) setMessage(`Cobrança gerada — finalize o pagamento: ${result.paymentLink}`);
      } else {
        const result = await purchaseCourse({
          name,
          slug,
          email,
          password,
          courseSlug,
          provider,
          cpfCnpj: cpfCnpj || undefined,
          successUrl,
          cancelUrl,
        });
        saveToken(result.accessToken);
        if (result.checkoutUrl) window.location.href = result.checkoutUrl;
        else if (result.paymentLink) setMessage(`Conta criada — finalize o pagamento: ${result.paymentLink}`);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell shell-wide">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <h1>Loja de cursos</h1>
      <p className="sub">Compre um curso avulso sem assinar a plataforma completa — estudante de psicologia pode estudar sem atender paciente.</p>
      {message && <p style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>{message}</p>}
      {error && <span className="error">{error}</span>}

      {courses.map((c) => (
        <div key={c.slug} style={{ padding: '1.2rem 0', borderBottom: '1px solid var(--line)' }}>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.3rem' }}>{c.title}</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', margin: '0 0 0.5rem' }}>{c.description}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', margin: '0 0 0.6rem' }}>
            {c.modules.map((m) => `${m.title}${m.free ? ' (grátis)' : ''}`).join(' · ')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>{c.priceCents !== null ? centsToReais(c.priceCents) : 'Preço a definir'}</strong>
            {c.priceCents !== null && <button onClick={() => openBuyPanel(c.slug)}>Comprar</button>}
          </div>

          {buyingSlug === c.slug && (
            <form onSubmit={(e) => onBuy(e, c.slug)} style={{ marginTop: '0.8rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              {!loggedIn && (
                <>
                  <label>
                    Nome
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                  </label>
                  <label>
                    Identificador (slug)
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
                </>
              )}
              <label>
                Pagamento
                <select value={provider} onChange={(e) => setProvider(e.target.value as 'STRIPE' | 'ASAAS')}>
                  <option value="ASAAS">Pix/boleto (Asaas)</option>
                  <option value="STRIPE">Cartão (Stripe)</option>
                </select>
              </label>
              {provider === 'ASAAS' && (
                <label>
                  CPF/CNPJ
                  <input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
                </label>
              )}
              <button type="submit">Confirmar compra</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
