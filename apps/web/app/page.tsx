import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="shell">
      <h1>Portal do Psi</h1>
      <p className="sub">Agenda, prontuário, financeiro, cursos e supervisão em uma assinatura só.</p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Link href="/login"><button>Entrar</button></Link>
        <Link href="/signup"><button style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>Criar clínica</button></Link>
      </div>
    </div>
  );
}
