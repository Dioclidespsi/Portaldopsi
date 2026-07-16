import Link from 'next/link';
import { fetchPublicBanners, fetchPublicPlans } from '../lib/api';

export default async function HomePage() {
  const [banners, plans] = await Promise.all([fetchPublicBanners(), fetchPublicPlans()]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ground)' }}>
      <div className="home-construction-banner">
        🚧 Site em construção — algumas áreas ainda estão sendo finalizadas, mas tudo aqui já funciona.
      </div>

      <header className="home-header">
        <strong style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>Portal do Psi</strong>
        <nav className="home-nav-links">
          <Link href="/profissionais" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Encontrar um profissional
          </Link>
          <Link href="/loja" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Cursos
          </Link>
          <Link href="#planos" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Planos
          </Link>
          <Link href="/login">
            <button style={{ fontSize: '0.88rem', padding: '0.55rem 1.1rem' }}>Entrar</button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1 style={{ color: 'var(--ink)' }}>
            Sua clínica de psicologia, organizada do início ao fim.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
            Agenda, prontuário, financeiro, cursos e supervisão em uma assinatura só — e uma página pública pronta
            pra seus pacientes te encontrarem e agendarem direto.
          </p>
          <div className="home-hero-actions">
            <Link href="/profissionais">
              <button style={{ fontSize: '0.95rem', padding: '0.75rem 1.5rem' }}>Encontrar um profissional</button>
            </Link>
            <Link href="/signup">
              <button
                style={{
                  fontSize: '0.95rem', padding: '0.75rem 1.5rem',
                  background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)',
                }}
              >
                Sou psicólogo(a) — criar conta
              </button>
            </Link>
          </div>
        </div>
        <div className="home-hero-art" aria-hidden="true">
          <div
            style={{
              background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px',
              padding: '2rem', textAlign: 'center', color: 'var(--ink-soft)', fontSize: '0.9rem',
            }}
          >
            <div style={{ fontSize: '2.6rem', marginBottom: '0.6rem' }}>🧠</div>
            Agenda · Prontuário · Financeiro · Cursos
          </div>
        </div>
      </section>

      {/* Banners administráveis */}
      {banners.length > 0 && (
        <div className="home-banner-strip">
          {banners.map((b) =>
            b.linkUrl ? (
              <a key={b.id} href={b.linkUrl} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.imageUrl} alt="Banner promocional" />
              </a>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={b.id} src={b.imageUrl} alt="Banner promocional" />
            ),
          )}
        </div>
      )}

      {/* Para quem é */}
      <section className="home-section">
        <h2 style={{ fontSize: '1.4rem', margin: '0 0 1.5rem', color: 'var(--ink)', textAlign: 'center' }}>
          Feito para todos os lados do cuidado
        </h2>
        <div className="home-cards-grid">
          <div className="home-card">
            <h3>Pacientes</h3>
            <p>Encontre um profissional, veja a especialidade certa pra você e agende sua sessão direto, sem burocracia.</p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link href="/profissionais"><button style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>Buscar profissional</button></Link>
              <Link href="/paciente/login">
                <button style={{ fontSize: '0.85rem', padding: '0.55rem 1rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
                  Já sou paciente
                </button>
              </Link>
            </div>
          </div>
          <div className="home-card">
            <h3>Psicólogos e clínicas</h3>
            <p>Agenda, prontuário eletrônico, financeiro com cobrança automática e sua própria página pública com agendamento.</p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link href="/signup"><button style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>Criar clínica</button></Link>
              <Link href="/login">
                <button style={{ fontSize: '0.85rem', padding: '0.55rem 1rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
                  Entrar
                </button>
              </Link>
            </div>
          </div>
          <div className="home-card">
            <h3>Estudantes</h3>
            <p>Cursos de formação em neurociência e marketing pra psicólogos, com certificado — compre avulso, sem assinatura.</p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link href="/loja"><button style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>Ver cursos</button></Link>
              <Link href="/login">
                <button style={{ fontSize: '0.85rem', padding: '0.55rem 1rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
                  Já sou aluno(a)
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      {plans && (
        <section id="planos" className="home-section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', maxWidth: 'none' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem', color: 'var(--ink)', textAlign: 'center' }}>
              Assinatura para profissionais
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--ink-soft)', margin: '0 0 1.8rem' }}>
              Um único plano, sem limite de pacientes.
            </p>
            <div className="home-plans-grid">
              {Object.values(plans).map((plan) => (
                <div key={plan.label} className="home-card" style={{ textAlign: 'center' }}>
                  <h3>{plan.label}</h3>
                  <Link href="/signup">
                    <button style={{ fontSize: '0.9rem', padding: '0.65rem 1.3rem' }}>Assinar</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-links">
          <Link href="/profissionais" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Encontrar profissional</Link>
          <Link href="/loja" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Cursos</Link>
          <Link href="/login" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Sou psicólogo(a)</Link>
          <Link href="/paciente/login" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Sou paciente</Link>
        </div>
        <p style={{ margin: 0 }}>Portal do Psi</p>
      </footer>
    </div>
  );
}
