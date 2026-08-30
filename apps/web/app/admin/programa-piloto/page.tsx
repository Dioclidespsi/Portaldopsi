'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import AdminWhatsAppButton from '../../../components/AdminWhatsAppButton';
import {
  AdminCampaignLead,
  AdminTenantSearchResult,
  CampaignLeadActivation,
  deleteCampaignLead,
  getAdminToken,
  getCampaignLeadActivation,
  grantComplimentaryTrial,
  listCampaignLeads,
  searchTenants,
  updateCampaignLead,
} from '../../../lib/admin-api';
import { ADMIN_CAMPAIGN_LEAD_TEMPLATES } from '../../../lib/whatsapp';

const STATUS_LABEL: Record<string, string> = {
  NOVO: 'Novo',
  CONTATADO: 'Contatado',
  CONVERTIDO: 'Convertido',
  DESCARTADO: 'Descartado',
};

const ACTIVATION_LABELS: { key: keyof Omit<CampaignLeadActivation, 'score'>; label: string }[] = [
  { key: 'perfil', label: 'Perfil' },
  { key: 'paciente', label: 'Paciente' },
  { key: 'agenda', label: 'Agenda' },
  { key: 'financeiro', label: 'Financeiro' },
  { key: 'teleconsulta', label: 'Teleconsulta' },
];

function ActivationBadges({ activation }: { activation: CampaignLeadActivation | null | undefined }) {
  if (activation === undefined) return null;
  if (activation === null) {
    return (
      <p className="sub" style={{ fontSize: '0.78rem', margin: '0 0 0.6rem' }}>
        Índice de Ativação: sem dados ainda.
      </p>
    );
  }
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0 0 0.6rem' }}>
      {ACTIVATION_LABELS.map(({ key, label }) => {
        const ok = activation[key];
        return (
          <span
            key={key}
            style={{
              fontSize: '0.74rem', padding: '0.15rem 0.5rem', borderRadius: '999px',
              background: ok ? 'rgba(47,111,98,0.12)' : 'rgba(163,51,51,0.08)',
              color: ok ? 'var(--accent, #2F6F62)' : 'var(--ink-soft)',
              border: `1px solid ${ok ? 'var(--accent, #2F6F62)' : 'var(--line)'}`,
            }}
          >
            {ok ? '✓' : '✗'} {label}
          </span>
        );
      })}
      <span style={{ fontSize: '0.74rem', color: 'var(--ink-soft)' }}>{activation.score}/5 ativado</span>
    </div>
  );
}

export default function AdminProgramaPilotoPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<AdminCampaignLead[]>([]);
  const [slugById, setSlugById] = useState<Record<string, string>>({});
  const [tenantOptionsById, setTenantOptionsById] = useState<Record<string, AdminTenantSearchResult[]>>({});
  const [activationById, setActivationById] = useState<Record<string, CampaignLeadActivation | null>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listCampaignLeads()
      .then((list) => {
        setLeads(list);
        // Índice de Ativação só existe pra quem já converteu (tem tenant vinculado).
        list
          .filter((lead) => lead.status === 'CONVERTIDO')
          .forEach((lead) => {
            getCampaignLeadActivation(lead.id)
              .then((activation) => setActivationById((prev) => ({ ...prev, [lead.id]: activation })))
              .catch(() => undefined);
          });
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onSetStatus(id: string, status: 'CONTATADO' | 'DESCARTADO') {
    setError(null);
    setBusyId(id);
    try {
      const updated = await updateCampaignLead(id, { status });
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  async function onTenantQueryChange(id: string, value: string) {
    setSlugById((prev) => ({ ...prev, [id]: value }));
    if (value.trim().length < 2) {
      setTenantOptionsById((prev) => ({ ...prev, [id]: [] }));
      return;
    }
    try {
      const options = await searchTenants(value.trim());
      setTenantOptionsById((prev) => ({ ...prev, [id]: options }));
    } catch {
      // busca é só uma conveniência — se falhar, o admin ainda pode digitar o slug exato.
    }
  }

  async function onGrantTrial(id: string) {
    const typed = (slugById[id] ?? '').trim();
    // Se o admin escolheu uma sugestão da busca, o valor digitado já é o slug exato;
    // senão, tenta casar pelo nome digitado com uma das opções encontradas.
    const matched = tenantOptionsById[id]?.find((t) => t.slug === typed || t.name === typed);
    const tenantSlug = matched?.slug ?? typed;
    if (!tenantSlug) {
      setError('Busque e selecione o tenant antes de conceder o teste.');
      return;
    }
    setError(null);
    setBusyId(id);
    try {
      const updated = await grantComplimentaryTrial(id, tenantSlug);
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      getCampaignLeadActivation(id)
        .then((activation) => setActivationById((prev) => ({ ...prev, [id]: activation })))
        .catch(() => undefined);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  async function onDelete(id: string, name: string) {
    if (!window.confirm(`Remover "${name}" da lista? Essa ação não pode ser desfeita.`)) return;
    setError(null);
    setBusyId(id);
    try {
      await deleteCampaignLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell title={"Programa Piloto"} description={"Interessados captados em /programa-piloto. Depois que a pessoa se cadastrar de verdade em /signup, busque pelo nome ou identificador (slug) do tenant dela aqui pra conceder 3 meses de acesso sem cobrança. O Índice de Ativação mostra quem está realmente usando o produto, não só quem se cadastrou."}>
      {error && <span className="error">{error}</span>}

      {leads.map((lead) => (
        <div key={lead.id} className="callout-box" style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <p style={{ margin: '0 0 0.3rem', fontSize: '0.92rem', fontWeight: 700 }}>{lead.name}</p>
            <AdminWhatsAppButton name={lead.name} phone={lead.phone} templates={ADMIN_CAMPAIGN_LEAD_TEMPLATES} />
          </div>
          <p style={{ margin: '0 0 0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
            {lead.email} · {lead.phone}
          </p>
          <p className="sub" style={{ fontSize: '0.78rem', margin: '0 0 0.6rem' }}>
            {STATUS_LABEL[lead.status] ?? lead.status} — captado em {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
            {lead.convertedTenantId ? ` — convertido (tenant ${lead.convertedTenantId})` : ''}
          </p>

          {lead.status === 'CONVERTIDO' && <ActivationBadges activation={activationById[lead.id]} />}

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {lead.status === 'NOVO' && (
              <button
                onClick={() => onSetStatus(lead.id, 'CONTATADO')}
                disabled={busyId === lead.id}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                Marcar contatado
              </button>
            )}
            {lead.status !== 'DESCARTADO' && lead.status !== 'CONVERTIDO' && (
              <button
                onClick={() => onSetStatus(lead.id, 'DESCARTADO')}
                disabled={busyId === lead.id}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: '#a33', border: '1px solid var(--line)' }}
              >
                Descartar
              </button>
            )}
            <input
              value={slugById[lead.id] ?? ''}
              onChange={(e) => onTenantQueryChange(lead.id, e.target.value)}
              placeholder="busque pelo nome ou slug"
              list={`tenant-options-${lead.id}`}
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.6rem', maxWidth: '220px' }}
            />
            <datalist id={`tenant-options-${lead.id}`}>
              {(tenantOptionsById[lead.id] ?? []).map((t) => (
                <option key={t.id} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </datalist>
            <button
              onClick={() => onGrantTrial(lead.id)}
              disabled={busyId === lead.id}
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
            >
              {lead.status === 'CONVERTIDO' ? 'Renovar 3 meses grátis' : 'Conceder 3 meses grátis'}
            </button>
            <button
              onClick={() => onDelete(lead.id, lead.name)}
              disabled={busyId === lead.id}
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--crit, #a33)', border: '1px solid var(--crit, #a33)' }}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
      {leads.length === 0 && <p className="sub" style={{ marginTop: '1rem' }}>Nenhum interessado ainda.</p>}
    </AdminShell>
  );
}
