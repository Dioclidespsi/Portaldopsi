'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '../../../components/DashboardShell';
import PaymentBadges from '../../../components/PaymentBadges';
import {
  createAsaasCheckout,
  fetchAsaasPaymentLink,
  fetchSubscription,
  listPlans,
  Plan,
  PlanKey,
  SubscriptionInfo,
} from '../../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  TRIALING: 'Período de teste',
  ACTIVE: 'Ativa',
  PAST_DUE: 'Pagamento atrasado',
  CANCELED: 'Cancelada',
};

export default function AssinaturaPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Record<PlanKey, Plan> | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('MONTHLY');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [loadingLink, setLoadingLink] = useState(false);

  useEffect(() => {
    Promise.all([listPlans(), fetchSubscription()])
      .then(([plansData, subscriptionData]) => {
        setPlans(plansData);
        setSubscription(subscriptionData);
        if (subscriptionData.hasAsaas && subscriptionData.status !== 'ACTIVE') {
          fetchAsaasPaymentLink()
            .then((r) => setPaymentLink(r.paymentLink))
            .catch(() => {});
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onAsaasCheckout(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      const result = await createAsaasCheckout({ name, cpfCnpj, email, plan: selectedPlan });
      setPaymentLink(result.paymentLink);
      setInfo(
        result.paymentLink
          ? 'Assinatura criada — clique no botão abaixo para pagar. O status é atualizado automaticamente quando o pagamento for confirmado.'
          : 'Assinatura criada — o status é atualizado automaticamente quando o pagamento for confirmado.',
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onRefreshLink() {
    setLoadingLink(true);
    setError(null);
    try {
      const result = await fetchAsaasPaymentLink();
      setPaymentLink(result.paymentLink);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingLink(false);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const now = Date.now();
  const periodEndMs = subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).getTime() : null;
  const daysRemaining = periodEndMs !== null ? Math.ceil((periodEndMs - now) / (1000 * 60 * 60 * 24)) : null;
  const status = subscription?.status ?? 'TRIALING';
  const nearExpiration =
    status === 'PAST_DUE' ||
    status === 'CANCELED' ||
    (daysRemaining !== null && daysRemaining <= 7 && (status === 'ACTIVE' || status === 'TRIALING'));

  function onRenewNow() {
    document.getElementById('planos-checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <DashboardShell title="Assinatura">
      <p className="sub">
        Status atual: <strong>{STATUS_LABEL[status]}</strong>
        {subscription?.currentPeriodEnd && (
          <>
            {' '}· {status === 'TRIALING' ? 'período de teste termina em' : 'renova em'}{' '}
            {new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            {daysRemaining !== null && (daysRemaining >= 0 ? ` (${daysRemaining} dia${daysRemaining === 1 ? '' : 's'})` : ' (vencido)')}
          </>
        )}
      </p>

      {status !== 'ACTIVE' && subscription?.hasAsaas && (
        <div className="callout-box" style={{ marginTop: '0.8rem' }}>
          {paymentLink ? (
            <>
              <p style={{ margin: '0 0 0.6rem' }}>
                Você tem uma cobrança em aberto — pague direto por aqui (Pix, boleto ou cartão, à sua escolha na
                próxima tela) em vez de esperar o e-mail.
              </p>
              <a
                href={paymentLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block', fontWeight: 700, color: '#fff', background: 'var(--accent)',
                  borderRadius: '8px', padding: '0.6rem 1.2rem', textDecoration: 'none',
                }}
              >
                Pagar agora
              </a>
            </>
          ) : (
            <>
              <p style={{ margin: '0 0 0.6rem' }}>Ainda não encontramos uma cobrança em aberto.</p>
              <button onClick={onRefreshLink} disabled={loadingLink}>
                {loadingLink ? 'Buscando…' : 'Buscar link de pagamento'}
              </button>
            </>
          )}
        </div>
      )}

      {nearExpiration && (
        <div className="callout-box" style={{ marginTop: '0.8rem', borderColor: 'var(--accent)' }}>
          <p style={{ margin: '0 0 0.6rem', fontWeight: 600 }}>
            {status === 'PAST_DUE' && '⚠ Pagamento atrasado — renove agora para não perder o acesso.'}
            {status === 'CANCELED' && '⚠ Sua assinatura está cancelada.'}
            {(status === 'ACTIVE' || status === 'TRIALING') &&
              daysRemaining !== null &&
              (daysRemaining >= 0
                ? `⚠ ${status === 'TRIALING' ? 'Seu período de teste termina' : 'Sua assinatura vence'} em ${daysRemaining} dia${daysRemaining === 1 ? '' : 's'}.`
                : '⚠ Sua assinatura venceu.')}
          </p>
          <button onClick={onRenewNow}>Renovar agora</button>
        </div>
      )}

      <div id="planos-checkout" style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
        {plans &&
          (Object.keys(plans) as PlanKey[]).map((key) => (
            <label
              key={key}
              style={{
                border: `1px solid ${selectedPlan === key ? 'var(--accent)' : 'var(--line)'}`,
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                cursor: 'pointer',
                minWidth: '220px',
              }}
            >
              <input
                type="radio"
                name="plan"
                value={key}
                checked={selectedPlan === key}
                onChange={() => setSelectedPlan(key)}
                style={{ marginRight: '0.5rem' }}
              />
              {plans[key].label}
            </label>
          ))}
      </div>

      {status === 'ACTIVE' ? (
        <div className="callout-box" style={{ marginTop: '1.2rem' }}>
          <p style={{ margin: 0 }}>
            Sua assinatura já está ativa
            {subscription?.currentPeriodEnd &&
              ` até ${new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`}
            . Não é necessário assinar novamente.
          </p>
        </div>
      ) : (
        <>
          <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Assinar</h3>
          <form onSubmit={onAsaasCheckout} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <label>
              Nome completo
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              E-mail
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              CPF/CNPJ
              <input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
            </label>
            <div style={{ flexBasis: '100%' }}>
              <PaymentBadges />
            </div>
            <button type="submit">Assinar</button>
          </form>
        </>
      )}

      {info && <div className="callout-box" style={{ marginTop: '1rem' }}>{info}</div>}
      {error && <span className="error">{error}</span>}
    </DashboardShell>
  );
}
