'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import { AdminRevenueSummary, getAdminToken, getRevenueSummary } from '../../../lib/admin-api';

const STATUS_LABEL: Record<string, string> = {
  TRIALING: 'Período de teste',
  ACTIVE: 'Ativa',
  PAST_DUE: 'Pagamento atrasado',
  CANCELED: 'Cancelada',
};

function centsToReais(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function Card({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '1rem 1.2rem', minWidth: '220px' }}>
      <p className="sub" style={{ margin: '0 0 0.3rem' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{value}</p>
      {note && <p className="sub" style={{ margin: '0.3rem 0 0', fontSize: '0.78rem' }}>{note}</p>}
    </div>
  );
}

export default function AdminFinanceiroPage() {
  const router = useRouter();
  const [data, setData] = useState<AdminRevenueSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    getRevenueSummary()
      .then(setData)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell title={"Financeiro da plataforma"} description={"Três fontes de receita, com naturezas diferentes: MRR é uma projeção mensal a partir das assinaturas ativas agora; os totais de taxa retida e Loja são acumulados históricos (desde o início), não de um período fixo."}>
      {error && <span className="error">{error}</span>}

      {data && (
        <>
          <h3 style={{ fontSize: '0.92rem', marginTop: '1.2rem' }}>Assinaturas de tenants</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
            <Card
              label="MRR estimado"
              value={centsToReais(data.mrrCents)}
              note={
                data.subscriptionsMissingAsaasData > 0
                  ? `${data.subscriptionsMissingAsaasData} assinatura(s) ativa(s) sem dado de valor no Asaas — não entram nesse total.`
                  : `${data.activeSubscriptionsCount} assinatura(s) ativa(s)`
              }
            />
            {data.subscriptionsByStatus.map((s) => (
              <Card key={s.status} label={STATUS_LABEL[s.status] ?? s.status} value={String(s.count)} />
            ))}
            <Card
              label="Cortesias ativas (Programa Piloto)"
              value={String(data.complimentaryActiveCount)}
              note="Já incluídas nas assinaturas ativas acima, mas sem cobrança real — não entram no MRR."
            />
          </div>

          <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Cobranças de pacientes (Financeiro dos tenants)</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
            <Card
              label={`Taxa de plataforma retida (${data.patientInvoices.platformFeePercent}%)`}
              value={centsToReais(data.patientInvoices.platformFeeCents)}
              note="Acumulado histórico"
            />
            <Card
              label="Total cobrado dos pacientes (todas as clínicas)"
              value={centsToReais(data.patientInvoices.totalPaidCents)}
              note={`${data.patientInvoices.paidCount} cobrança(s) paga(s) — o restante vai direto pro psicólogo via split`}
            />
          </div>

          <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Loja de cursos (Marketplace)</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
            <Card
              label="Total vendido"
              value={centsToReais(data.marketplace.totalCents)}
              note={`${data.marketplace.count} compra(s) — vai inteiro pra plataforma, sem split`}
            />
          </div>
        </>
      )}
    </AdminShell>
  );
}
