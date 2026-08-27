import Link from 'next/link';
import { verifyEmailToken } from '../../lib/api';

export default async function VerifyEmailPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token;
  const verified = token ? await verifyEmailToken(token) : false;

  return (
    <div className="shell">
      <Link href="/" className="back-home">← Portal do Psi</Link>
      {verified ? (
        <>
          <h1>E-mail confirmado</h1>
          <p className="sub">Seu cadastro está com o e-mail verificado. Pode continuar usando o Portal do Psi normalmente.</p>
        </>
      ) : (
        <>
          <h1>Link inválido ou expirado</h1>
          <p className="sub">
            Esse link de confirmação não é mais válido — pode ter expirado (24h) ou já ter sido usado.
            Entre na sua conta para gerar um novo.
          </p>
        </>
      )}
      <p className="foot-link"><Link href="/login">Entrar</Link></p>
    </div>
  );
}
