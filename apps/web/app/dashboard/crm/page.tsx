'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import { convertLead, createLead, Lead, listLeads, suggestLeadFollowUpMessage, updateLead } from '../../../lib/api';

const STAGE_LABEL: Record<string, string> = {
  NOVO: 'Novo',
  CONTATADO: 'Contatado',
  AGENDADO: 'Agendado',
  CONVERTIDO: 'Convertido',
  PERDIDO: 'Perdido',
};

export default function CrmPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [source, setSource] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [suggestingId, setSuggestingId] = useState<string | null>(null);

  useEffect(() => {
    listLeads()
      .then(setLeads)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const lead = await createLead({ name, contact: contact || undefined, source: source || undefined });
      setLeads((prev) => [lead, ...prev]);
      setName('');
      setContact('');
      setSource('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onStageChange(id: string, stage: string) {
    const updated = await updateLead(id, { stage });
    setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
  }

  async function onConvert(id: string) {
    setError(null);
    try {
      await convertLead(id);
      const updated = await listLeads();
      setLeads(updated);
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

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>CRM</h2>
      <p className="sub">Funil de leads até virarem paciente na Agenda.</p>

      <table>
        <thead><tr><th>Nome</th><th>Contato</th><th>Origem</th><th>Estágio</th><th></th></tr></thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>{l.contact ?? '—'}</td>
              <td>{l.source ?? '—'}</td>
              <td>
                <select value={l.stage} onChange={(e) => onStageChange(l.id, e.target.value)} disabled={Boolean(l.convertedPatientId)}>
                  {Object.entries(STAGE_LABEL).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
                </select>
              </td>
              <td style={{ display: 'flex', gap: '0.4rem' }}>
                {!l.convertedPatientId && (
                  <>
                    <button onClick={() => onConvert(l.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                      Converter em paciente
                    </button>
                    <button
                      onClick={() => onSuggestMessage(l.id)}
                      disabled={suggestingId === l.id}
                      style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                    >
                      {suggestingId === l.id ? 'Gerando…' : 'Sugerir mensagem (IA)'}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr><td colSpan={5} style={{ color: 'var(--ink-soft)' }}>Nenhum lead ainda.</td></tr>
          )}
        </tbody>
      </table>

      {Object.entries(suggestions).map(([leadId, message]) => {
        const lead = leads.find((l) => l.id === leadId);
        if (!lead) return null;
        return (
          <div key={leadId} className="callout-box" style={{ marginTop: '0.8rem' }}>
            <p style={{ margin: '0 0 0.3rem', fontWeight: 600 }}>Rascunho para {lead.name}:</p>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message}</p>
          </div>
        );
      })}

      <form onSubmit={onCreate} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>Nome<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
        <label>Contato<input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="e-mail ou telefone" /></label>
        <label>Origem<input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Instagram, indicação…" /></label>
        <button type="submit">Adicionar lead</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
