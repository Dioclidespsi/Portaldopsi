'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { enrollInCourse, getTenantKind, getToken, listMarketplaceCourses, MarketplaceCourse, purchaseCourse, saveToken } from '../../lib/api';
import PaymentBadges from '../../components/PaymentBadges';

function centsToReais(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function LojaPage() {
  const [courses, setCourses] = useState<MarketplaceCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [buyingSlug, setBuyingSlug] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [institution, setInstitution] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const loggedIn = Boolean(getToken());
  const isEstudante = !loggedIn || getTenantKind() === 'ESTUDANTE';

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
        const result = await enrollInCourse({
          courseSlug,
          provider: 'ASAAS',
          termsAccepted: isEstudante ? termsAccepted : undefined,
          cpfCnpj: cpfCnpj || undefined,
          successUrl,
          cancelUrl,
        });
        if (result.paymentLink) setMessage(`Cobrança gerada — finalize o pagamento: ${result.paymentLink}`);
      } else {
        if (!documentFile) {
          setError('Envie a declaração de matrícula (PDF, JPG ou PNG).');
          return;
        }
        const result = await purchaseCourse({
          name,
          slug,
          email,
          password,
          courseSlug,
          provider: 'ASAAS',
          institution,
          enrollmentNumber,
          document: documentFile,
          termsAccepted,
          cpfCnpj: cpfCnpj || undefined,
          successUrl,
          cancelUrl,
        });
        saveToken(result.accessToken);
        const statusMsg =
          result.enrollmentStatus === 'VERIFICADO'
            ? 'Matrícula verificada automaticamente — acesso liberado.'
            : 'Sua matrícula está em análise pela nossa equipe — você recebe acesso assim que for aprovada.';
        if (result.paymentLink) setMessage(`Conta criada. ${statusMsg} Finalize o pagamento: ${result.paymentLink}`);
        else setMessage(statusMsg);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell shell-wide">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <Link href="/" className="back-home">← Portal do Psi</Link>
      <h1>Loja de cursos</h1>
      <p className="sub">
        Compre um curso avulso sem assinar a plataforma completa — feito para estudante de psicologia que quer
        estudar sem atender paciente. Exigimos comprovação de matrícula (instituição + declaração) antes de
        liberar o acesso.
      </p>
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

          {buyingSlug === c.slug && !loggedIn && (
            <div className="callout-box" style={{ marginTop: '0.8rem' }}>
              <strong style={{ fontSize: '0.9rem' }}>Cadastro de Estudante de Psicologia</strong>
              <p className="sub" style={{ margin: '0.3rem 0 0.7rem' }}>
                Diferente do cadastro de clínica, aqui pedimos também a comprovação da sua matrícula — sua conta
                fica em análise até a instituição/matrícula serem confirmadas (automático quando possível, ou
                revisado pela nossa equipe).
              </p>
            </div>
          )}

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
                  <label>
                    Instituição de ensino
                    <input value={institution} onChange={(e) => setInstitution(e.target.value)} required />
                  </label>
                  <label>
                    Número de matrícula
                    <input value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} required />
                  </label>
                  <label>
                    Declaração de matrícula (PDF/JPG/PNG)
                    <input
                      type="file"
                      accept="application/pdf,image/jpeg,image/png"
                      onChange={(e) => setDocumentFile(e.target.files?.[0] ?? null)}
                      required
                    />
                  </label>
                </>
              )}
              <label>
                CPF/CNPJ
                <input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
              </label>
              <div style={{ flexBasis: '100%' }}>
                <PaymentBadges />
              </div>
              {isEstudante && (
                <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.4rem', flexBasis: '100%' }}>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                    style={{ width: 'auto' }}
                  />
                  Li e aceito o{' '}
                  <Link href="/termos-aluno" target="_blank">
                    Termo de Uso do Aluno
                  </Link>
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
