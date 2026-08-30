'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import AdminWhatsAppButton from '../../../components/AdminWhatsAppButton';
import { AdminTenantOverview, AdminUsersOverview, getAdminToken, getUsersOverview } from '../../../lib/admin-api';
import { ADMIN_VERIFICATION_TEMPLATES } from '../../../lib/whatsapp';

const CRP_LABEL: Record<string, string> = {
  VERIFICADO: 'Verificado',
  EM_ANALISE: 'Em análise',
  NAO_ENVIADO: 'Não enviado',
  REJEITADO: 'Rejeitado',
  sem_titular: 'Sem titular',
};

const PLAN_LABEL: Record<string, string> = {
  premium_pago: 'Premium (pago)',
  cortesia_piloto: 'Cortesia (Programa Piloto)',
  inativa: 'Assinatura inativa',
  sem_assinatura: 'Sem assinatura (Free)',
};

const USAGE_LABELS: { key: keyof AdminTenantOverview['usage']; label: string }[] = [
  { key: 'perfil', label: 'Perfil' },
  { key: 'paciente', label: 'Paciente' },
  { key: 'agenda', label: 'Agenda' },
  { key: 'financeiro', label: 'Financeiro' },
  { key: 'teleconsulta', label: 'Teleconsulta' },
];

function StatCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card" style={{ flex: '1 1 220px' }}>
      <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-soft)' }}>{title}</p>
      {children}
    </div>
  );
}

function BreakdownList({ data, labels }: { data: Record<string, number>; labels: Record<string, string> }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return <p className="sub" style={{ margin: 0 }}>Sem dados ainda.</p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      {entries.map(([key, count]) => (
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
          <span style={{ color: 'var(--ink-soft)' }}>{labels[key] ?? key}</span>
          <strong>{count}</strong>
        </div>
      ))}
    </div>
  );
}

function UsageBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      style={{
        fontSize: '0.72rem', padding: '0.12rem 0.45rem', borderRadius: '999px', whiteSpace: 'nowrap',
        background: ok ? 'rgba(47,111,98,0.12)' : 'rgba(163,51,51,0.06)',
        color: ok ? 'var(--accent, #2F6F62)' : 'var(--ink-soft)',
        border: `1px solid ${ok ? 'var(--accent, #2F6F62)' : 'var(--line)'}`,
      }}
    >
      {ok ? '✓' : '✗'} {label}
    </span>
  );
}

export default function AdminUsuariosPage() {
  const router = useRouter();
  const [data, setData] = useState<AdminUsersOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    getUsersOverview()
      .then(setData)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell title={"Usuários"} description={"Quantos psicólogos(as)/clínicas estão cadastrados, em que condição (CRP e plano) e o que já usaram de fato — não só quem se cadastrou."}>
      {error && <span className="error">{error}</span>}

      {data && (
        <>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0' }}>
            <StatCard title="Total cadastrados">
              <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>{data.summary.total}</p>
              <p className="sub" style={{ margin: '0.2rem 0 0' }}>{data.summary.published} com página publicada</p>
            </StatCard>
            <StatCard title="Por status de CRP">
              <BreakdownList data={data.summary.byCrpStatus} labels={CRP_LABEL} />
            </StatCard>
            <StatCard title="Por condição de plano">
              <BreakdownList data={data.summary.byPlanCondition} labels={PLAN_LABEL} />
            </StatCard>
            <StatCard title="Quem já usou cada recurso">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {USAGE_LABELS.map(({ key, label }) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>{label}</span>
                    <strong>{data.summary.usageMilestones[key]} / {data.summary.total}</strong>
                  </div>
                ))}
              </div>
            </StatCard>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cadastro</th>
                <th>Contato</th>
                <th>CRP</th>
                <th>Plano</th>
                <th>Publicado</th>
                <th>Uso</th>
              </tr>
            </thead>
            <tbody>
              {data.tenants.map((t) => (
                <tr key={t.id}>
                  <td>
                    {t.name}
                    <div className="sub" style={{ margin: '0.1rem 0 0' }}>/{t.slug}</div>
                  </td>
                  <td>{new Date(t.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {t.email && (
                        <a href={`mailto:${t.email}`} style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
                          {t.email}
                        </a>
                      )}
                      {t.phone && (
                        <div>
                          <AdminWhatsAppButton name={t.name} phone={t.phone} templates={ADMIN_VERIFICATION_TEMPLATES} />
                        </div>
                      )}
                      {!t.email && !t.phone && <span className="sub">—</span>}
                    </div>
                  </td>
                  <td>{CRP_LABEL[t.crpStatus ?? 'sem_titular']}</td>
                  <td>{PLAN_LABEL[t.planCondition]}</td>
                  <td>{t.published ? 'Sim' : 'Não'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {USAGE_LABELS.map(({ key, label }) => (
                        <UsageBadge key={key} ok={t.usage[key]} label={label} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {data.tenants.length === 0 && (
                <tr><td colSpan={7} style={{ color: 'var(--ink-soft)' }}>Nenhum psicólogo cadastrado ainda.</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </AdminShell>
  );
}
