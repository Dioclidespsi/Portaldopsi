'use client';

import { DragEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  addLeadActivity,
  convertLead,
  createLead,
  deleteLead,
  getLeadFunnelReport,
  Lead,
  LeadActivity,
  LeadFunnelReport,
  listLeadActivities,
  listLeads,
  listTeamMembers,
  suggestLeadFollowUpMessage,
  TeamMember,
  updateLead,
} from '../../../lib/api';

const STAGES = ['NOVO', 'CONTATADO', 'AGENDADO', 'CONVERTIDO', 'PERDIDO'] as const;
const STAGE_LABEL: Record<string, string> = {
  NOVO: 'Novo',
  CONTATADO: 'Contatado',
  AGENDADO: 'Agendado',
  CONVERTIDO: 'Convertido',
  PERDIDO: 'Perdido',
};
const OPEN_STAGES = new Set(['NOVO', 'CONTATADO', 'AGENDADO']);
const STALE_DAYS = 7;

function isStale(lead: Lead): boolean {
  if (!OPEN_STAGES.has(lead.stage)) return false;
  const days = (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return days >= STALE_DAYS;
}

interface EditDraft {
  name: string;
  contact: string;
  source: string;
  notes: string;
  assignedToId: string;
}

export default function CrmPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [report, setReport] = useState<LeadFunnelReport | null>(null);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [source, setSource] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [suggestingId, setSuggestingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditDraft>({ name: '', contact: '', source: '', notes: '', assignedToId: '' });
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [newActivity, setNewActivity] = useState('');
  const [draggingId, setDraggingId] = useState<string | null>(null);

  function reload(filters?: { search?: string }) {
    return Promise.all([listLeads(filters), getLeadFunnelReport()]).then(([l, r]) => {
      setLeads(l);
      setReport(r);
    });
  }

  useEffect(() => {
    Promise.all([reload(), listTeamMembers().then(setTeam)])
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function onFilter(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await reload({ search: search || undefined });
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const lead = await createLead({ name, contact: contact || undefined, source: source || undefined });
      setLeads((prev) => [lead, ...prev]);
      setReport((prev) => (prev ? { ...prev, total: prev.total + 1, countByStage: { ...prev.countByStage, NOVO: (prev.countByStage.NOVO ?? 0) + 1 } } : prev));
      setName('');
      setContact('');
      setSource('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onStageChange(id: string, stage: string) {
    setError(null);
    try {
      const updated = await updateLead(id, { stage });
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
      getLeadFunnelReport().then(setReport);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function onDragStart(e: DragEvent<HTMLDivElement>, leadId: string) {
    setDraggingId(leadId);
    e.dataTransfer.setData('text/plain', leadId);
  }

  function onDropOnColumn(e: DragEvent<HTMLDivElement>, stage: string) {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain') || draggingId;
    setDraggingId(null);
    if (!leadId) return;
    const lead = leads.find((l) => l.id === leadId);
    if (!lead || lead.stage === stage) return;
    onStageChange(leadId, stage);
  }

  function selectLead(lead: Lead) {
    if (selectedId === lead.id) {
      setSelectedId(null);
      return;
    }
    setSelectedId(lead.id);
    setDraft({
      name: lead.name,
      contact: lead.contact ?? '',
      source: lead.source ?? '',
      notes: lead.notes ?? '',
      assignedToId: lead.assignedToId ?? '',
    });
    setInfo(null);
    listLeadActivities(lead.id).then(setActivities);
  }

  async function onSaveEdit(id: string) {
    setError(null);
    try {
      const updated = await updateLead(id, {
        name: draft.name,
        contact: draft.contact || undefined,
        source: draft.source || undefined,
        notes: draft.notes || undefined,
        assignedToId: draft.assignedToId || null,
      });
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedId === id) setSelectedId(null);
      getLeadFunnelReport().then(setReport);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onConvert(id: string) {
    setError(null);
    setInfo(null);
    try {
      const { patient, matchedExisting } = await convertLead(id);
      setInfo(
        matchedExisting
          ? `Lead vinculado ao paciente já cadastrado: ${patient.name}.`
          : `Novo paciente criado: ${patient.name}.`,
      );
      await reload({ search: search || undefined });
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSuggestMessage(id: string) {
    setError(null);
    setSuggestingId(id);
    try {
      const { message } = await suggestLeadFollowUpMessage(id);
      setSuggestions((prev) => ({ ...prev, [id]: message }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSuggestingId(null);
    }
  }

  async function onAddActivity(leadId: string) {
    if (!newActivity.trim()) return;
    setError(null);
    try {
      const activity = await addLeadActivity(leadId, newActivity);
      setActivities((prev) => [...prev, activity]);
      setNewActivity('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const selectedLead = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>CRM</h2>
      <p className="sub">Funil de leads até virarem paciente na Agenda. Arraste o cartão entre colunas pra mudar o estágio.</p>

      {report && (
        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          <span><strong>{report.total}</strong> leads no total</span>
          <span><strong>{(report.conversionRate * 100).toFixed(0)}%</strong> taxa de conversão</span>
          {report.staleCount > 0 && (
            <span style={{ color: '#b45309' }}>
              <strong>{report.staleCount}</strong> parado(s) há mais de {report.staleDaysThreshold} dias
            </span>
          )}
        </div>
      )}

      <form onSubmit={onFilter} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '0.8rem' }}>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Buscar por nome ou contato
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar…" />
        </label>
        <button type="submit" style={{ fontSize: '0.85rem' }}>Filtrar</button>
      </form>

      <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          return (
            <div
              key={stage}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDropOnColumn(e, stage)}
              style={{ minWidth: '230px', flex: '1 0 230px', background: 'var(--panel, rgba(0,0,0,0.02))', border: '1px solid var(--line)', borderRadius: '8px', padding: '0.6rem' }}
            >
              <h4 style={{ fontSize: '0.85rem', margin: '0 0 0.6rem' }}>{STAGE_LABEL[stage]} ({stageLeads.length})</h4>
              {stageLeads.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, lead.id)}
                  onClick={() => selectLead(lead)}
                  style={{
                    background: 'var(--surface, #fff)',
                    border: selectedId === lead.id ? '1px solid var(--accent)' : '1px solid var(--line)',
                    borderRadius: '6px',
                    padding: '0.5rem 0.6rem',
                    marginBottom: '0.5rem',
                    cursor: 'grab',
                    fontSize: '0.82rem',
                  }}
                >
                  <strong>{lead.name}</strong>
                  {isStale(lead) && <span title={`Parado há mais de ${STALE_DAYS} dias`} style={{ marginLeft: '0.3rem' }}>🔴</span>}
                  <div className="sub" style={{ fontSize: '0.76rem' }}>{lead.contact ?? '—'}</div>
                  {lead.source && <div className="sub" style={{ fontSize: '0.72rem' }}>{lead.source}</div>}
                  {lead.assignedTo && <div style={{ fontSize: '0.72rem', marginTop: '0.2rem' }}>👤 {lead.assignedTo.name}</div>}
                </div>
              ))}
              {stageLeads.length === 0 && <p className="sub" style={{ fontSize: '0.76rem' }}>Vazio</p>}
            </div>
          );
        })}
      </div>

      {info && <p className="sub" style={{ marginTop: '0.8rem' }}>{info}</p>}

      {selectedLead && (
        <div className="callout-box" style={{ marginTop: '1rem' }}>
          <h3 style={{ fontSize: '0.92rem', marginTop: 0 }}>{selectedLead.name}</h3>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <label style={{ flex: 1, minWidth: '160px' }}>
              Nome
              <input value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
            </label>
            <label style={{ flex: 1, minWidth: '160px' }}>
              Contato
              <input value={draft.contact} onChange={(e) => setDraft((d) => ({ ...d, contact: e.target.value }))} />
            </label>
            <label style={{ flex: 1, minWidth: '160px' }}>
              Origem
              <input value={draft.source} onChange={(e) => setDraft((d) => ({ ...d, source: e.target.value }))} />
            </label>
            <label style={{ flex: 1, minWidth: '160px' }}>
              Responsável
              <select value={draft.assignedToId} onChange={(e) => setDraft((d) => ({ ...d, assignedToId: e.target.value }))}>
                <option value="">Ninguém atribuído</option>
                {team.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
          </div>
          <label>
            Notas
            <textarea
              value={draft.notes}
              onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
              rows={2}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit' }}
            />
          </label>
          <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => onSaveEdit(selectedLead.id)}>Salvar</button>
            {selectedLead.stage !== 'CONVERTIDO' && (
              <>
                <button type="button" onClick={() => onConvert(selectedLead.id)} style={{ fontSize: '0.85rem' }}>
                  Converter em paciente
                </button>
                <button
                  type="button"
                  onClick={() => onSuggestMessage(selectedLead.id)}
                  disabled={suggestingId === selectedLead.id}
                  style={{ fontSize: '0.85rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  {suggestingId === selectedLead.id ? 'Gerando…' : 'Sugerir mensagem (IA)'}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => onDelete(selectedLead.id)}
              style={{ fontSize: '0.85rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
            >
              Excluir
            </button>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              style={{ fontSize: '0.85rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
            >
              Fechar
            </button>
          </div>

          {suggestions[selectedLead.id] && (
            <div className="callout-box" style={{ marginTop: '0.8rem' }}>
              <p style={{ margin: '0 0 0.3rem', fontWeight: 600 }}>Rascunho de mensagem:</p>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{suggestions[selectedLead.id]}</p>
            </div>
          )}

          <h4 style={{ fontSize: '0.85rem', marginTop: '1rem', marginBottom: '0.4rem' }}>Histórico de interações</h4>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '0.5rem' }}>
            {activities.length === 0 && <p className="sub" style={{ margin: 0, fontSize: '0.8rem' }}>Nenhuma interação registrada ainda.</p>}
            {activities.map((a) => (
              <div key={a.id} style={{ marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                <strong>{a.author.name}</strong>
                <span className="sub" style={{ fontSize: '0.72rem', marginLeft: '0.4rem' }}>{new Date(a.createdAt).toLocaleString('pt-BR')}</span>
                <p style={{ margin: '0.1rem 0 0' }}>{a.content}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Registrar interação (ex: liguei, sem resposta)"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={() => onAddActivity(selectedLead.id)}>Registrar</button>
          </div>
        </div>
      )}

      <h3 style={{ fontSize: '0.95rem', marginTop: '1.6rem' }}>Novo lead</h3>
      <form onSubmit={onCreate} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>Nome<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
        <label>Contato<input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="e-mail ou telefone" /></label>
        <label>Origem<input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Instagram, indicação…" /></label>
        <button type="submit">Adicionar lead</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
