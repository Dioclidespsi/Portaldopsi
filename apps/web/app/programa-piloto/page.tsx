'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { FormEvent, useEffect, useState } from 'react';
import { getPilotProgress, submitCampaignLead } from '../../lib/api';

const META_PIXEL_ID = '2157418404823610';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const fieldStyle: React.CSSProperties = {
  padding: '0.6rem 0.75rem',
  border: '1px solid var(--line)',
  borderRadius: '6px',
  fontFamily: 'inherit',
  fontSize: '0.92rem',
  background: 'var(--ground)',
  color: 'var(--ink)',
  width: '100%',
};

const FOUNDER_BENEFITS = [
  'Testar novos recursos antes de todo mundo',
  'Falar direto com quem constrói o produto — sua sugestão vira prioridade, não vira ticket de suporte',
  'Ajudar a decidir o que entra (e o que não entra) no Portal do Psi',
  'Garantir uma condição especial quando o piloto terminar',
  'Fazer parte da primeira comunidade de psicólogos fundadores da plataforma',
];

const FEATURE_BENEFITS = [
  { title: 'Agenda', benefit: 'Organize seus atendimentos sem perder tempo trocando de aplicativo.' },
  { title: 'Prontuário', benefit: 'Tenha o histórico de cada paciente organizado num único lugar, sempre à mão.' },
  { title: 'Financeiro', benefit: 'Saiba exatamente quanto sua prática está gerando, sem planilha.' },
  { title: 'Teleconsulta', benefit: 'Atenda por vídeo sem depender de Zoom, Meet ou WhatsApp separados.' },
  { title: 'Página pública', benefit: 'Deixe novos pacientes te encontrarem e agendarem sozinhos, 24h por dia.' },
];

const VALUE_STACK = [
  { item: 'Agenda online', price: 'R$ 30/mês' },
  { item: 'Prontuário eletrônico', price: 'R$ 60/mês' },
  { item: 'Controle financeiro', price: 'R$ 40/mês' },
  { item: 'Videochamada profissional', price: 'R$ 50/mês' },
  { item: 'Site profissional', price: 'R$ 60/mês' },
];

export default function ProgramaPilotoPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<{ converted: number; remaining: number } | null>(null);

  useEffect(() => {
    getPilotProgress()
      .then(setProgress)
      .catch(() => {
        // Se a busca falhar, a página cai pro texto genérico "100 vagas" —
        // nunca deixa isso quebrar a página.
      });
  }, []);

  /**
   * Validação explícita em vez de confiar só no `required` nativo do HTML — o navegador embutido
   * do Instagram/Facebook (de onde vem a maior parte do tráfego pago) é conhecido por não exibir a
   * bolha de validação nativa em alguns casos: a pessoa clica em enviar, nada acontece visivelmente
   * e ela desiste achando que o botão não funciona. Isso pode explicar uma taxa de conversão real de
   * 0% em cliques pagos mesmo com o formulário tecnicamente funcionando (caso real, 2026-08-04).
   */
  function validate(): string | null {
    if (!name.trim()) return 'Preencha seu nome.';
    if (!email.trim()) return 'Preencha seu e-mail.';
    if (!phone.trim()) return 'Preencha seu WhatsApp.';
    if (!consent) return 'Marque a caixinha de consentimento pra podermos te contatar.';
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitCampaignLead({ name, email, phone, consent });
      window.fbq?.('track', 'Lead');
      router.push('/programa-piloto/confirmado');
    } catch (err) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ground)' }}>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <header className="home-header">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <strong style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>Portal do Psi</strong>
        </Link>
        <nav className="home-nav-links">
          <Link href="/login" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Já tenho conta
          </Link>
        </nav>
      </header>

      <section className="home-hero">
        <div className="home-hero-copy">
          <h1 style={{ color: 'var(--ink)' }}>
            Você não é só mais um usuário grátis. Você é um Psicólogo Fundador do Portal do Psi.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
            Estamos selecionando 100 psicólogos(as) pra ajudar a construir a próxima geração da
            gestão profissional — 3 meses de acesso completo (agenda, prontuário, financeiro,
            teleconsulta e página pública de agendamento), sem cartão de crédito, em troca da sua
            experiência real de uso.
          </p>
          {progress && (
            <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 700, margin: '0.8rem 0 0' }}>
              {progress.remaining} de 100 vagas disponíveis
            </p>
          )}
        </div>
        <div className="home-hero-art" aria-hidden="true">
          <div
            style={{
              background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px',
              padding: '2rem', textAlign: 'center', color: 'var(--ink-soft)', fontSize: '0.9rem',
            }}
          >
            <div style={{ fontSize: '2.6rem', marginBottom: '0.6rem' }}>🎁</div>
            100 vagas · 3 meses grátis · sem cartão de crédito
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2 style={{ fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>
          Como Psicólogo Fundador, você vai poder
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {FOUNDER_BENEFITS.map((benefit) => (
            <li
              key={benefit}
              style={{ display: 'flex', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}
            >
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section">
        <h2 style={{ fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>
          O que muda no seu dia a dia
        </h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {FEATURE_BENEFITS.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px',
                padding: '1.2rem',
              }}
            >
              <p style={{ margin: '0 0 0.4rem', fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>
                {feature.title}
              </p>
              <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                {feature.benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section" style={{ maxWidth: '480px' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>
          Quanto custaria ter tudo isso separado?
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: '0 0 1rem' }}>
          Valores aproximados de mercado pra cada ferramenta contratada separadamente:
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '1.2rem' }}>
          {VALUE_STACK.map((row) => (
            <div
              key={row.item}
              style={{
                display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem',
                color: 'var(--ink-soft)', padding: '0.4rem 0', borderBottom: '1px solid var(--line)',
              }}
            >
              <span>{row.item}</span>
              <span>{row.price}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', padding: '0.6rem 0 0' }}>
            <span>Total separado</span>
            <span>~R$ 240/mês</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent)', padding: '0.4rem 0 0' }}>
            <span>Portal do Psi — tudo junto</span>
            <span>Grátis por 3 meses</span>
          </div>
        </div>
      </section>

      <section className="home-section" style={{ maxWidth: '480px' }}>
        <div
          style={{
            background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px',
            padding: '1.5rem',
          }}
        >
          <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              Nome
              <input value={name} onChange={(e) => setName(e.target.value)} required style={fieldStyle} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              E-mail
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={fieldStyle} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              WhatsApp
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(00) 00000-0000" required style={fieldStyle} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                style={{ width: 'auto' }}
              />
              Aceito ser contatado(a) pelo Portal do Psi sobre o Programa Piloto.
            </label>
            <button
              type="submit"
              disabled={submitting}
              style={{
                fontSize: '0.95rem', fontWeight: 700, color: '#fff',
                background: 'var(--accent)', border: 'none', borderRadius: '8px',
                padding: '0.75rem 1.4rem', cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'Enviando…' : 'Quero ser um Psicólogo Fundador'}
            </button>
            {error && (
              <div
                style={{
                  color: '#a33', background: '#fdeeee', border: '1px solid #f0caca',
                  borderRadius: '6px', padding: '0.6rem 0.75rem', fontSize: '0.85rem', fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer-links">
          <Link href="/" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Portal do Psi</Link>
          <Link href="/signup" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Já quero me cadastrar</Link>
          <Link href="/privacidade" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Privacidade</Link>
        </div>
        <p style={{ margin: 0 }}>Portal do Psi</p>
      </footer>
    </div>
  );
}
