import Link from 'next/link';
import { Newsreader, Work_Sans } from 'next/font/google';
import { fetchPublicBanners } from '../lib/api';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-worksans',
  display: 'swap',
});

const TEAM = [
  { photo: '/team/nely.jpg', name: 'Nely Ito', role: 'Psicóloga clínica' },
  { photo: '/team/dioclides.jpg', name: 'Dioclides Soares', role: 'Psicólogo clínico' },
  { photo: '/team/lara.jpg', name: 'Lara Carolina', role: 'Psicóloga clínica' },
  { photo: '/team/pamela.jpg', name: 'Pamela Forziati', role: 'Psicóloga clínica' },
];

export default async function HomePage() {
  const banners = await fetchPublicBanners();

  return (
    <div
      className={`home-redesign ${newsreader.variable} ${workSans.variable}`}
      style={{ minHeight: '100vh', background: 'var(--ground)' }}
    >
      <header className="home-header">
        <a className="home-wordmark home-serif" href="#">
          <span className="home-mark">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3c-3 0-5 2.2-5 5 0 2 1 3.3 2 4.3-1.6.7-3 2.6-3 5.2 0 2.5 1.6 3.5 3 3.5.9 0 1.6-.4 2-1 .4.6 1.1 1 2 1 1.4 0 3-1 3-3.5 0-2.6-1.4-4.5-3-5.2 1-1 2-2.3 2-4.3 0-2.8-2-5-5-5Z"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Portal do Psi
        </a>
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
      <section className="home-section home-hero">
        <div className="home-hero-copy">
          <span className="home-eyebrow">Feito para psicólogos clínicos</span>
          <h1 className="home-serif" style={{ color: 'var(--ink)', margin: '0 0 1.2rem' }}>
            Sua clínica de psicologia, <em>organizada</em> do início ao fim.
          </h1>
          <p className="home-hero-sub">
            Agenda, prontuário, financeiro, cursos e supervisão em uma assinatura só — e uma página pública
            pronta pra seus pacientes te encontrarem e agendarem direto.
          </p>
          <div className="home-hero-actions">
            <Link href="/signup">
              <button style={{ fontSize: '0.95rem', padding: '0.75rem 1.5rem' }}>Sou psicólogo(a) — criar conta</button>
            </Link>
            <Link href="/profissionais">
              <button
                style={{
                  fontSize: '0.95rem',
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent)',
                }}
              >
                Encontrar um profissional
              </button>
            </Link>
          </div>
          <p className="home-hero-microcopy">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            Seus dados e os dos seus pacientes protegidos conforme a LGPD.
          </p>
        </div>
        <div className="home-hero-visual" aria-hidden="true">
          <div className="home-blob" />
          <div className="home-card-float float-1">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 10.5 20 7v10l-5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <rect x="3" y="6" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Teleconsulta pronta
          </div>
          <div className="home-session-card">
            <div className="home-session-card-head">
              <div>
                <div className="day home-serif">14</div>
                <div className="month">Quinta · Ago</div>
              </div>
              <span className="home-live-pill">
                <span className="dot" />
                Hoje
              </span>
            </div>
            <div className="home-appt">
              <span className="time">09:00</span>
              <span className="avatar" />
              <div>
                <p className="name">Marina A.</p>
                <p className="type">Sessão presencial</p>
              </div>
            </div>
            <div className="home-appt">
              <span className="time">10:30</span>
              <span className="avatar" />
              <div>
                <p className="name">Rafael T.</p>
                <p className="type">Teleconsulta</p>
              </div>
            </div>
            <div className="home-appt">
              <span className="time">14:00</span>
              <span className="avatar" />
              <div>
                <p className="name">Beatriz L.</p>
                <p className="type">Sessão presencial</p>
              </div>
            </div>
          </div>
          <div className="home-card-float float-2">
            Recebido hoje <span className="amt">✓</span>
          </div>
        </div>
      </section>

      <div className="home-trust">
        <div className="home-trust-inner">
          <div className="home-trust-item">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            Dados protegidos conforme a LGPD
          </div>
          <div className="home-trust-item">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 10.5 20 7v10l-5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <rect x="3" y="6" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Teleconsulta conforme Resolução CFP nº 11/2018
          </div>
          <div className="home-trust-item">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 12h16M4 6h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Prontuário estruturado, sempre com você
          </div>
          <div className="home-trust-item">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Assinatura única, sem limite de pacientes
          </div>
        </div>
      </div>

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
        <h2 className="home-serif" style={{ fontSize: '1.5rem', margin: '0 0 0.6rem', color: 'var(--ink)', textAlign: 'center' }}>
          Um único lugar, três formas de usar
        </h2>
        <p style={{ color: 'var(--ink-soft)', textAlign: 'center', maxWidth: '560px', margin: '0 auto 2.2rem' }}>
          Cada pessoa que passa pelo Portal do Psi entra por uma porta diferente — a experiência é pensada pra
          cada uma delas.
        </p>
        <div className="home-cards-grid">
          <div className="home-card">
            <div className="home-card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
                <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="home-serif">Pacientes</h3>
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
            <div className="home-card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M4 9.5h16M8 3v3.4M16 3v3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="home-serif">Psicólogos e clínicas</h3>
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
            <div className="home-card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 9 12 5l9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M7 11.3V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="home-serif">Estudantes de Psicologia</h3>
            <p>
              Cursos de formação em neurociência e marketing pra psicólogos, com certificado — compre avulso, sem
              assinatura. Exigimos comprovação de matrícula antes de liberar o acesso.
            </p>
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

      {/* Por dentro do Portal */}
      <div className="home-glimpse">
        <div className="home-glimpse-inner">
          <div className="home-glimpse-copy">
            <p className="home-section-eyebrow">Por dentro do Portal</p>
            <h2 className="home-serif">A sua semana, organizada antes mesmo de você abrir o consultório.</h2>
            <p>
              Nada de caderno, planilha e três aplicativos abertos ao mesmo tempo. Cada sessão já chega com
              prontuário, cobrança e sala de teleconsulta prontos.
            </p>
            <ul className="home-glimpse-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Agenda com confirmação e lembrete automáticos
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Sala de teleconsulta gerada por sessão, sem link avulso
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Cobrança automática, direto na sua conta
              </li>
            </ul>
          </div>
          <div className="home-mockup">
            <div className="home-mockup-bar">
              <span /><span /><span />
              <span className="title">portaldopsi.com.br/agenda</span>
            </div>
            <div className="home-mockup-body">
              <div className="home-mockup-toprow">
                <h4 className="home-serif">Quinta, 14 de agosto</h4>
                <span className="chip">6 sessões hoje</span>
              </div>
              <div className="home-mockup-grid">
                <span className="home-mockup-hour">09:00</span>
                <div className="home-mockup-slot">
                  <div>
                    <p className="who">Marina A.</p>
                    <p className="what">Sessão presencial · Sala 1</p>
                  </div>
                  <span className="tag">Confirmada</span>
                </div>
                <span className="home-mockup-hour">10:30</span>
                <div className="home-mockup-slot">
                  <div>
                    <p className="who">Rafael T.</p>
                    <p className="what">Teleconsulta</p>
                  </div>
                  <span className="tag">Sala pronta</span>
                </div>
                <span className="home-mockup-hour">12:00</span>
                <div className="home-mockup-empty-hour" />
                <span className="home-mockup-hour">14:00</span>
                <div className="home-mockup-slot is-quiet">
                  <div>
                    <p className="who">Beatriz L.</p>
                    <p className="what">Sessão presencial · Sala 1</p>
                  </div>
                  <span className="tag">Aguardando</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Psicólogos reais */}
      <section className="home-team">
        <h2 className="home-serif" style={{ fontSize: '1.5rem', margin: '0 0 0.6rem', color: 'var(--ink)', textAlign: 'center' }}>
          Psicólogos de verdade, atendendo de verdade
        </h2>
        <p style={{ color: 'var(--ink-soft)', textAlign: 'center', maxWidth: '560px', margin: '0 auto 2.2rem' }}>
          O Portal do Psi já faz parte do dia a dia de profissionais como estes — cada um com a própria
          especialidade, todos com a mesma clínica organizada.
        </p>
        <div className="home-team-grid">
          {TEAM.map((person) => (
            <figure className="home-team-card" key={person.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={person.photo} alt={`${person.name}, psicólogo(a) parceiro(a) do Portal do Psi`} />
              <figcaption className="home-team-caption">
                <p className="name home-serif">{person.name}</p>
                <p className="role">{person.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Como construímos */}
      <div className="home-mission">
        <div className="home-mission-inner">
          <div className="home-mission-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/team/missao.jpg" alt="Apresentação do Portal do Psi para um grupo de psicólogos" />
          </div>
          <div className="home-mission-copy">
            <p className="home-section-eyebrow">Como construímos</p>
            <h2 className="home-serif">Feito ao lado de quem atende, não atrás de uma tela</h2>
            <p>
              O Portal do Psi nasce de conversas reais com psicólogos sobre o que trava a rotina clínica — não
              de suposição de escritório. Cada atualização passa por essa mesma mesa antes de chegar até você.
            </p>
            <ul className="home-mission-values">
              <li>
                <p className="value-title home-serif">Ética antes da métrica</p>
                <p>Cada decisão de produto responde a uma pergunta primeiro: isso protege o sigilo e o cuidado, ou só a conveniência?</p>
              </li>
              <li>
                <p className="value-title home-serif">Simples por dentro, sério por fora</p>
                <p>Tecnologia que soma à rotina clínica, sem virar mais uma tela pra aprender entre uma sessão e outra.</p>
              </li>
              <li>
                <p className="value-title home-serif">Parceria, não só assinatura</p>
                <p>Quem usa o Portal do Psi ajuda a decidir o que vem a seguir — o roteiro do produto escuta antes de lançar.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Planos — sem valores aqui de propósito: o preço só aparece pro
          profissional já logado, na tela Assinatura, no momento de assinar. */}
      <section
        id="planos"
        className="home-section"
        style={{ background: 'var(--accent)', backgroundImage: 'linear-gradient(155deg, var(--accent) 0%, var(--accent-deep) 100%)', maxWidth: 'none' }}
      >
        <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="home-serif" style={{ fontSize: '1.7rem', margin: '0 0 0.7rem', color: '#fff' }}>
            Uma assinatura. Sem limite de pacientes.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0 0 1.8rem' }}>
            Crie sua conta agora e veja as condições — sem letra miúda, sem módulo extra escondido atrás de outro plano.
          </p>
          <Link href="/signup">
            <button style={{ fontSize: '0.95rem', padding: '0.75rem 1.5rem', background: '#fff', color: 'var(--accent-deep)' }}>
              Criar conta
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-links">
          <Link href="/profissionais" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Encontrar profissional</Link>
          <Link href="/loja" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Cursos</Link>
          <Link href="/login" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Sou psicólogo(a)</Link>
          <Link href="/paciente/login" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Sou paciente</Link>
          <Link href="/privacidade" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Privacidade</Link>
        </div>
        <p style={{ margin: 0 }}>Portal do Psi</p>
      </footer>
    </div>
  );
}
