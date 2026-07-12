'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  createAsaasCheckout,
  createStripeCheckout,
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

  useEffect(() => {
    Promise.all([listPlans(), fetchSubscription()])
      .then(([plansData, subscriptionData]) => {
        setPlans(plansData);
        setSubscription(subscriptionData);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onStripeCheckout() {
    setError(null);
    try {
      const { checkoutUrl } = await createStripeCheckout(selectedPlan, window.location.href, window.location.href);
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onAsaasCheckout(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      await createAsaasCheckout({ name, cpfCnpj, email, plan: selectedPlan });
      setInfo('Assinatura criada no Asaas — o status é atualizado automaticamente quando o pagamento for confirmado.');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Assinatura</h2>
      <p className="sub">
        Status atual: <strong>{STATUS_LABEL[subscription?.status ?? 'TRIALING']}</strong>
        {subscription?.currentPeriodEnd &&
          ` · renova em ${new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`}
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
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

      <div style={{ marginTop: '1.2rem' }}>
        <button onClick={onStripeCheckout}>Assinar via cartão (Stripe)</button>
      </div>

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Assinar via Pix/boleto (Asaas)</h3>
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
        <button type="submit">Assinar via Asaas</button>
      </form>

      {info && <div className="callout-box" style={{ marginTop: '1rem' }}>{info}</div>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
