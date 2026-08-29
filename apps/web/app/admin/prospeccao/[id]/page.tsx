'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminNav from '../../../../components/AdminNav';
import AdminWhatsAppButton from '../../../../components/AdminWhatsAppButton';
import AdminEmailButton from '../../../../components/AdminEmailButton';
import AdminInstagramButton from '../../../../components/AdminInstagramButton';
import { getAdminToken } from '../../../../lib/admin-api';
import { ADMIN_PROSPECTING_EMAIL_TEMPLATES, ADMIN_PROSPECTING_WHATSAPP_TEMPLATES } from '../../../../lib/contactChannels';
import {
  addProspectActivity,
  blockProspect,
  deleteProspect,
  getProspect,
  Prospect,
  qualifyProspectWithAi,
  recomputeProspectScore,
  updateProspect,
} from '../../../../lib/prospecting-api';

const STAGE_OPTIONS = [
  'ENCONTRADO', 'QUALIFICADO', 'SELECIONADO', 'CONTATO_REALIZADO', 'RESPONDEU', 'INTERESSADO',
  'CADASTRO_INICIADO', 'CADASTRADO', 'SEM_INTERESSE', 'NAO_LOCALIZADO', 'DESCARTADO', 'OPT_OUT',
];

const STAGE_LABEL: Record<string, string> = {
  ENCONTRADO: 'Encontrado', QUALIFICADO: 'Qualificado', SELECIONADO: 'Selecionado',
  CONTATO_REALIZADO: 'Contato realizado', RESPONDEU: 'Respondeu', INTERESSADO: 'Interessado',
  CADASTRO_INICIADO: 'Cadastro iniciado', CADASTRADO: 'Cadastrado', SEM_INTERESSE: 'Sem interesse',
  NAO_LOCALIZADO: 'Não localizado', DESCARTADO: 'Descartado', OPT_OUT: 'Opt-out',
};

export default function ProspectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

  async function load() {
    try {
      const data = await getProspect(params.id);
      setProspect(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, params.id]);

  async function onStageChange(stage: string) {
    if (!prospect) return;
    setBusy(true);
    try {
      const updated = await updateProspect(prospect.id, { stage } as Partial<Prospect>);
      setProspect((prev) => (prev ? { ...prev, ...updated } : updated));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onRecomputeScore() {
    if (!prospect) return;
    setBusy(true);
    try {
      const updated = await recomputeProspectScore(prospect.id);
      setProspect((prev) => (prev ? { ...prev, ...updated } : updated));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onQualify() {
    if (!prospect) return;
    setBusy(true);
    setError(null);
    try {
      const updated = await qualifyProspectWithAi(prospect.id);
      setProspect((prev) => (prev ? { ...prev, ...updated } : updated));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onAddNote(e: FormEvent) {
    e.preventDefault();
    if (!prospect || !note.trim()) return;
    setBusy(true);
    try {
      await addProspectActivity(prospect.id, note.trim());
      setNote('');
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onDoNotContact() {
    if (!prospect) return;
    if (!window.confirm('Marcar como "não contatar"? O profissional para de aparecer nas listagens de prospecção.')) return;
    setBusy(true);
    try {
      const updated = await updateProspect(prospect.id, { doNotContact: true } as Partial<Prospect>);
      setProspect((prev) => (prev ? { ...prev, ...updated } : updated));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  /** Só limpeza (ex: dado de teste/erro de digitação) — a mesma pessoa pode voltar numa pesquisa futura. */
  async function onDelete() {
    if (!prospect) return;
    if (!window.confirm(`Remover "${prospect.fullName}" da prospecção? Ele(a) pode aparecer de novo numa pesquisa futura. Essa ação não pode ser desfeita.`)) return;
    setBusy(true);
    try {
      await deleteProspect(prospect.id);
      router.push('/admin/prospeccao');
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  /** Remove E bloqueia permanentemente — a mesma pessoa nunca mais volta como lead "novo". */
  async function onBlock() {
    if (!prospect) return;
    if (!window.confirm(`Bloquear "${prospect.fullName}" permanentemente? Ele(a) nunca mais será recriado(a) numa pesquisa futura, mesmo que apareça de novo. Essa ação não pode ser desfeita.`)) return;
    const reason = window.prompt('Motivo do bloqueio (opcional):') ?? undefined;
    setBusy(true);
    try {
      await blockProspect(prospect.id, reason);
      router.push('/admin/prospeccao');
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!prospect) return <div className="shell">Profissional não encontrado.</div>;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <Link href="/admin/prospeccao" style={{ fontSize: '0.85rem' }}>← Voltar pra lista</Link>

      <h2 style={{ fontSize: '1.1rem', marginTop: '0.6rem' }}>{prospect.fullName}</h2>
      <p className="sub">
        {[prospect.city, prospect.state].filter(Boolean).join('/') || 'Localização não informada'}
        {prospect.crp ? ` · CRP ${prospect.crp}` : ''}
      </p>

      {error && <span className="error">{error}</span>}

      {/* OPORTUNIDADE */}
      <div className="callout-box" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
          <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>
            Score: {prospect.score ?? '—'}/100
          </p>
          <button onClick={onRecomputeScore} disabled={busy} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
            Recalcular score
          </button>
        </div>
        {prospect.scoreBreakdown && (
          <div style={{ marginTop: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {prospect.scoreBreakdown.map((r, i) => (
              <p key={i} className="sub" style={{ margin: 0, fontSize: '0.82rem' }}>
                +{r.points} — <strong>{r.label}</strong>: {r.reason}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ANÁLISE DA IA */}
      <div className="callout-box" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Análise da IA</p>
          <button onClick={onQualify} disabled={busy} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
            {prospect.aiQualifiedAt ? 'Reanalisar' : 'Analisar com IA'}
          </button>
        </div>
        {prospect.aiSummary ? (
          <>
            <p style={{ marginTop: '0.6rem' }}>{prospect.aiSummary}</p>
            <p className="sub"><strong>Oportunidade:</strong> {prospect.aiOpportunity ?? '—'}</p>
            <p className="sub"><strong>Estratégia sugerida:</strong> {prospect.aiStrategy ?? '—'}</p>
          </>
        ) : (
          <p className="sub" style={{ marginTop: '0.6rem' }}>Ainda não analisado.</p>
        )}
      </div>

      {/* CONTATOS PÚBLICOS */}
      <div className="callout-box" style={{ marginTop: '1rem' }}>
        <p style={{ margin: '0 0 0.6rem', fontWeight: 700 }}>Contatos públicos e ações</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {prospect.whatsapp && (
            <AdminWhatsAppButton name={prospect.fullName} phone={prospect.whatsapp} templates={ADMIN_PROSPECTING_WHATSAPP_TEMPLATES} />
          )}
          {prospect.publicEmail && (
            <AdminEmailButton name={prospect.fullName} email={prospect.publicEmail} templates={ADMIN_PROSPECTING_EMAIL_TEMPLATES} />
          )}
          {prospect.instagram && (
            <AdminInstagramButton name={prospect.fullName} handle={prospect.instagram} templates={ADMIN_PROSPECTING_WHATSAPP_TEMPLATES} />
          )}
          {prospect.website && (
            <a href={prospect.website.startsWith('http') ? prospect.website : `https://${prospect.website}`} target="_blank" rel="noopener noreferrer">
              <button type="button" style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
                Abrir site
              </button>
            </a>
          )}
        </div>
        {!prospect.whatsapp && !prospect.publicEmail && !prospect.instagram && !prospect.website && (
          <p className="sub" style={{ marginTop: '0.5rem' }}>Nenhum canal de contato público registrado.</p>
        )}
      </div>

      {/* ATUAÇÃO */}
      <div className="callout-box" style={{ marginTop: '1rem' }}>
        <p style={{ margin: '0 0 0.4rem', fontWeight: 700 }}>Atuação profissional</p>
        <p className="sub" style={{ margin: 0 }}>Especialidades: {prospect.specialties ?? '—'}</p>
        <p className="sub" style={{ margin: 0 }}>Abordagens: {prospect.approaches ?? '—'}</p>
        <p className="sub" style={{ margin: 0 }}>Público: {prospect.audience ?? '—'}</p>
        <p className="sub" style={{ margin: 0 }}>Modalidade: {prospect.serviceMode ?? '—'}</p>
        <p className="sub" style={{ margin: 0 }}>Fonte: {prospect.source ?? '—'} {prospect.sourceUrl ? `(${prospect.sourceUrl})` : ''}</p>
      </div>

      {/* FUNIL / ESTÁGIO */}
      <div className="callout-box" style={{ marginTop: '1rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Estágio no funil
          <select value={prospect.stage} onChange={(e) => onStageChange(e.target.value)} disabled={busy}>
            {STAGE_OPTIONS.map((s) => (
              <option key={s} value={s}>{STAGE_LABEL[s]}</option>
            ))}
          </select>
        </label>
      </div>

      {/* CRM / HISTÓRICO */}
      <div className="callout-box" style={{ marginTop: '1rem' }}>
        <p style={{ margin: '0 0 0.6rem', fontWeight: 700 }}>Histórico</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.8rem' }}>
          {(prospect.activities ?? []).map((a) => (
            <p key={a.id} className="sub" style={{ margin: 0, fontSize: '0.82rem' }}>
              <strong>{new Date(a.createdAt).toLocaleString('pt-BR')}</strong> — {a.content}
            </p>
          ))}
          {(prospect.activities ?? []).length === 0 && <p className="sub" style={{ margin: 0 }}>Nenhuma atividade registrada ainda.</p>}
        </div>
        <form onSubmit={onAddNote} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            placeholder="Registrar contato, resposta, observação…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" disabled={busy || !note.trim()}>Registrar</button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button onClick={onDoNotContact} disabled={busy || prospect.doNotContact} style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
          {prospect.doNotContact ? 'Marcado como não contatar' : 'Marcar como "não contatar"'}
        </button>
        <button onClick={onDelete} disabled={busy} style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
          Remover (pode voltar numa pesquisa futura)
        </button>
        <button onClick={onBlock} disabled={busy} style={{ background: 'transparent', color: 'var(--crit, #a33)', border: '1px solid var(--crit, #a33)' }}>
          Bloquear permanentemente
        </button>
      </div>
    </div>
  );
}
