import Link from 'next/link';

export default function ProgramaPilotoConfirmadoPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ground)' }}>
      <header className="home-header">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <strong style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>Portal do Psi</strong>
        </Link>
      </header>

      <section className="home-section" style={{ maxWidth: '560px' }}>
        <div
          style={{
            background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px',
            padding: '2rem',
          }}
        >
          <div style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>🎉</div>
          <h1 style={{ fontSize: '1.4rem', color: 'var(--ink)', margin: '0 0 0.6rem' }}>
            Parabéns — recebemos sua inscrição pro Programa Piloto!
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 1.4rem' }}>
            Você acabou de dar o primeiro passo pra virar um Psicólogo Fundador do Portal do Psi.
            Veja o que acontece agora:
          </p>

          <ol style={{ margin: '0 0 1.6rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <li style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ink)' }}>Revisão manual:</strong> nossa equipe confere sua
              inscrição e entra em contato pelo WhatsApp que você informou — normalmente em até 2 dias
              úteis.
            </li>
            <li style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ink)' }}>Cadastro:</strong> a gente te ajuda a criar sua
              conta e ativa os 3 meses grátis assim que ela existir.
            </li>
            <li style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ink)' }}>Onboarding:</strong> um passo a passo rápido pra
              você já sair usando agenda, prontuário, financeiro e a teleconsulta.
            </li>
          </ol>

          <div
            style={{
              background: 'var(--ground)', border: '1px dashed var(--line)', borderRadius: '10px',
              padding: '1rem', marginBottom: '1.4rem',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ink)' }}>Comunidade dos Fundadores:</strong> em breve você
              vai receber o convite pro grupo fechado onde os primeiros psicólogos do Portal do Psi
              trocam ideia direto com a equipe.
              {/* TODO: trocar este parágrafo por um link de convite assim que o grupo (WhatsApp/Discord) existir. */}
            </p>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
            Não quer esperar o contato?{' '}
            <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 700 }}>
              Crie sua conta agora
            </Link>{' '}
            e já comece a configurar seu perfil enquanto isso.
          </p>
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
