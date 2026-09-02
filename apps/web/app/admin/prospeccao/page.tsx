'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import { getAdminToken } from '../../../lib/admin-api';
import {
  createProspect,
  createSearchRequest,
  deleteFinishedSearchRequests,
  executeSearchRequest,
  getProspectingReport,
  importProspectingCsv,
  listProspects,
  listSearchRequests,
  Prospect,
  ProspectingReport,
  ProspectSearchRequest,
  updateSearchRequestStatus,
} from '../../../lib/prospecting-api';

const STAGE_LABEL: Record<string, string> = {
  ENCONTRADO: 'Encontrado',
  QUALIFICADO: 'Qualificado',
  SELECIONADO: 'Selecionado',
  CONTATO_REALIZADO: 'Contato realizado',
  RESPONDEU: 'Respondeu',
  INTERESSADO: 'Interessado',
  CADASTRO_INICIADO: 'Cadastro iniciado',
  CADASTRADO: 'Cadastrado',
  SEM_INTERESSE: 'Sem interesse',
  NAO_LOCALIZADO: 'Não localizado',
  DESCARTADO: 'Descartado',
  OPT_OUT: 'Opt-out',
};

// Trava de segurança só do front — o backend já para sozinho quando o Serper não
// tem mais resultado (results.length === 0 vira CONCLUIDA); isso aqui é só pra
// nunca martelar a API indefinidamente se algo inesperado impedir o status de
// virar CONCLUIDA.
const MAX_AUTO_EXECUTIONS = 30;

const SEARCH_REQUEST_STATUS_LABEL: Record<string, string> = {
  PENDENTE: 'Pendente — aguardando execução manual',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída',
  CANCELADA: 'Cancelada',
};

/** Lista curada — não é uma taxonomia oficial da plataforma (Tenant.specialties é texto livre), só uma conveniência de UI pra esta tela. "Outro" libera o campo de texto. */
const ESPECIALIDADE_OPTIONS = ['Ansiedade', 'Depressão', 'Relacionamentos', 'Terapia de Casal', 'Terapia Infantil', 'Terapia Familiar', 'Luto', 'Trauma', 'TOC', 'Autoestima', 'Carreira', 'Neuropsicologia', 'Outro'];
const ABORDAGEM_OPTIONS = ['TCC', 'Psicanálise', 'Gestalt-terapia', 'Terapia Sistêmica', 'Humanista', 'ACT', 'Terapia de Esquemas', 'Comportamental', 'Psicodrama', 'Outro'];
const PUBLICO_OPTIONS = ['Adultos', 'Adolescentes', 'Crianças', 'Casais', 'Famílias', 'Idosos', 'Outro'];
const MODALIDADE_OPTIONS = ['Online', 'Presencial', 'Híbrido'];

function priorityLabel(score: number | null): { label: string; color: string } {
  if (score === null) return { label: 'Não avaliado', color: 'var(--ink-soft)' };
  if (score >= 90) return { label: '🔥 Máxima', color: '#a33' };
  if (score >= 75) return { label: '🟢 Alta', color: '#2F6F62' };
  if (score >= 60) return { label: '🟡 Média', color: '#a67c00' };
  if (score >= 40) return { label: '⚪ Baixa', color: 'var(--ink-soft)' };
  return { label: '🔴 Revisar', color: '#a33' };
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card" style={{ flex: '1 1 140px', textAlign: 'center' }}>
      <p style={{ margin: '0 0 0.2rem', fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)' }}>{value}</p>
      <p className="sub" style={{ margin: 0, fontSize: '0.78rem' }}>{label}</p>
    </div>
  );
}

/** Select com opção "Outro" que revela um campo de texto livre — usado pros 3 filtros com lista suspensa. */
function DropdownWithOther({
  value, onChange, options, placeholder,
}: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  const isCustom = value !== '' && !options.includes(value);
  const [useCustom, setUseCustom] = useState(isCustom);

  if (useCustom) {
    return (
      <input
        placeholder={`${placeholder} (personalizado)`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => { if (!value) setUseCustom(false); }}
      />
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => {
        if (e.target.value === 'Outro') { setUseCustom(true); onChange(''); }
        else onChange(e.target.value);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function AdminProspeccaoPage() {
  const router = useRouter();
  const [items, setItems] = useState<Prospect[]>([]);
  const [report, setReport] = useState<ProspectingReport | null>(null);
  const [searchRequests, setSearchRequests] = useState<ProspectSearchRequest[]>([]);
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('');
  const [minScore, setMinScore] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [clearingHistory, setClearingHistory] = useState(false);
  const [saving, setSaving] = useState(false);
  const [importingCsv, setImportingCsv] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', city: '', state: '', specialties: '', approaches: '', audience: '', serviceMode: '',
    website: '', instagram: '', whatsapp: '', publicEmail: '', crp: '', source: '',
  });
  const [searchForm, setSearchForm] = useState({
    city: '', state: '', specialty: '', approach: '', audience: '', serviceMode: '',
    includeKeywords: '', excludeKeywords: '', quantity: 10,
  });

  async function load() {
    setError(null);
    try {
      const [list, rep, requests] = await Promise.all([
        listProspects({
          search: search || undefined,
          stage: stage || undefined,
          minScore: minScore ? Number(minScore) : undefined,
        }),
        getProspectingReport(),
        listSearchRequests(),
      ]);
      setItems(list.items);
      setReport(rep);
      setSearchRequests(requests);
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
  }, [router]);

  function onFilterSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    load();
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!formData.fullName.trim()) return;
    setSaving(true);
    setError(null);
    setInfo(null);
    try {
      const result = await createProspect(formData);
      if (result.blocked) {
        setInfo('Este profissional está na lista de bloqueio (já pediu pra não ser mais contatado) — não foi cadastrado.');
      } else {
        setFormData({
          fullName: '', city: '', state: '', specialties: '', approaches: '', audience: '', serviceMode: '',
          website: '', instagram: '', whatsapp: '', publicEmail: '', crp: '', source: '',
        });
        setShowForm(false);
      }
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function onCreateSearchRequest(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createSearchRequest(searchForm);
      setSearchForm({ city: '', state: '', specialty: '', approach: '', audience: '', serviceMode: '', includeKeywords: '', excludeKeywords: '', quantity: 10 });
      setShowSearchForm(false);
      setInfo('Pedido de pesquisa registrado — hoje a execução é feita manualmente (sem Apify/API contratada); acompanhe o status abaixo.');
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function onCancelSearchRequest(id: string) {
    setError(null);
    try {
      await updateSearchRequestStatus(id, 'CANCELADA');
      load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  /**
   * Cada chamada ao backend processa só 1 página do Google (até 10 resultados
   * brutos, que depois dos filtros costumam virar bem menos leads de verdade)
   * — pedir "10 leads" podia exigir vários cliques manuais em "Executar mais"
   * sem isso ficar claro, dando a impressão de que a busca não rende nada.
   * Agora um clique só continua sozinho, lote após lote, até a pesquisa
   * concluir (ou até MAX_AUTO_EXECUTIONS, trava de segurança).
   */
  async function onExecuteSearchRequest(id: string) {
    setError(null);
    setInfo(null);
    setExecutingId(id);
    try {
      let updated = await executeSearchRequest(id);
      let attempts = 1;
      while (updated.status === 'EM_ANDAMENTO' && attempts < MAX_AUTO_EXECUTIONS) {
        setInfo(`Buscando… ${updated.resultCount}/${updated.quantity} encontrado(s) até agora.`);
        load();
        updated = await executeSearchRequest(id);
        attempts++;
      }
      setInfo(
        updated.status === 'CONCLUIDA'
          ? `Pesquisa concluída — ${updated.resultCount} profissional(is) encontrado(s) no total.`
          : `Parado após ${attempts} lote(s) sem concluir (limite de segurança) — ${updated.resultCount}/${updated.quantity} até agora. Clique em "Executar mais" pra continuar.`,
      );
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setExecutingId(null);
    }
  }

  async function onClearHistory() {
    if (!window.confirm('Apagar o histórico de pesquisas concluídas/canceladas? Os leads já extraídos e classificados não são afetados.')) return;
    setError(null);
    setInfo(null);
    setClearingHistory(true);
    try {
      const { deleted } = await deleteFinishedSearchRequests();
      setInfo(deleted > 0 ? `${deleted} pesquisa(s) removida(s) do histórico.` : 'Nenhuma pesquisa concluída/cancelada pra remover.');
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setClearingHistory(false);
    }
  }

  async function onImportCsv(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ''; // permite escolher o mesmo arquivo de novo depois
    if (!file) return;
    setError(null);
    setInfo(null);
    setImportingCsv(true);
    try {
      const result = await importProspectingCsv(file);
      setInfo(
        `Importação concluída — ${result.created} novo(s), ${result.duplicates} já existente(s), ` +
          `${result.blocked} bloqueado(s), ${result.withoutWhatsapp} sem WhatsApp, ${result.withoutName} sem nome ` +
          `(de ${result.totalRows} linha(s) no arquivo).`,
      );
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setImportingCsv(false);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const hasFinishedSearchRequests = searchRequests.some((r) => r.status === 'CONCLUIDA' || r.status === 'CANCELADA');

  return (
    <AdminShell
      title="Prospecção Inteligente de Profissionais"
      description="Máquina de descoberta e qualificação — não é uma lista de contatos, é a priorização de quem abordar primeiro. Nenhum contato é feito automaticamente: cada ação de comunicação é aberta manualmente por você, na página de detalhe de cada profissional."
    >
      {error && <span className="error">{error}</span>}
      {info && <p className="sub" style={{ background: 'rgba(47,111,98,0.08)', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>{info}</p>}

      {report && (
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', margin: '1rem 0' }}>
          <StatCard label="Total encontrados" value={report.total} />
          <StatCard label="Prioridade máxima" value={report.prioridadeMaxima} />
          <StatCard label="Alta prioridade" value={report.altaPrioridade} />
          <StatCard label="Cadastrados" value={report.countByStage.CADASTRADO ?? 0} />
          <StatCard label="Taxa de conversão" value={`${(report.conversionRate * 100).toFixed(1)}%`} />
        </div>
      )}

      {/* NOVA PESQUISA */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Nova pesquisa</p>
          <button type="button" onClick={() => setShowSearchForm((v) => !v)}>
            {showSearchForm ? 'Cancelar' : '+ Nova pesquisa'}
          </button>
        </div>
        <p className="sub" style={{ fontSize: '0.8rem', margin: '0.4rem 0 0' }}>
          Define os critérios da busca. Depois de registrar, clique em &quot;Executar&quot; pra rodar a busca
          (via Serper + extração por IA) — continua sozinho, lote após lote, até bater a quantidade
          desejada ou os resultados acabarem. Sem SERPER_API_KEY configurada no servidor, a execução fica
          indisponível.
        </p>

        {showSearchForm && (
          <form onSubmit={onCreateSearchRequest} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.6rem', marginTop: '0.8rem' }}>
            <input placeholder="Cidade" value={searchForm.city} onChange={(e) => setSearchForm({ ...searchForm, city: e.target.value })} />
            <input placeholder="Estado (UF)" value={searchForm.state} onChange={(e) => setSearchForm({ ...searchForm, state: e.target.value })} />
            <DropdownWithOther value={searchForm.specialty} onChange={(v) => setSearchForm({ ...searchForm, specialty: v })} options={ESPECIALIDADE_OPTIONS} placeholder="Especialidade" />
            <DropdownWithOther value={searchForm.approach} onChange={(v) => setSearchForm({ ...searchForm, approach: v })} options={ABORDAGEM_OPTIONS} placeholder="Abordagem" />
            <DropdownWithOther value={searchForm.audience} onChange={(v) => setSearchForm({ ...searchForm, audience: v })} options={PUBLICO_OPTIONS} placeholder="Público atendido" />
            <select value={searchForm.serviceMode} onChange={(e) => setSearchForm({ ...searchForm, serviceMode: e.target.value })}>
              <option value="">Modalidade</option>
              {MODALIDADE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <input placeholder="Incluir palavras (separadas por vírgula)" value={searchForm.includeKeywords} onChange={(e) => setSearchForm({ ...searchForm, includeKeywords: e.target.value })} />
            <input placeholder="Excluir palavras (separadas por vírgula)" value={searchForm.excludeKeywords} onChange={(e) => setSearchForm({ ...searchForm, excludeKeywords: e.target.value })} />
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              Quantidade de leads
              <input type="number" min={1} max={200} value={searchForm.quantity} onChange={(e) => setSearchForm({ ...searchForm, quantity: Number(e.target.value) })} />
            </label>
            <button type="submit" disabled={saving} style={{ gridColumn: '1 / -1' }}>
              {saving ? 'Registrando…' : 'Registrar pedido de pesquisa'}
            </button>
          </form>
        )}

        {searchRequests.length > 0 && (
          <div style={{ marginTop: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {searchRequests.map((r) => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span>
                  {[r.city, r.state, r.specialty, r.approach, r.audience, r.serviceMode].filter(Boolean).join(' · ') || 'Sem critérios específicos'}
                  {' — '}{r.quantity} leads desejados
                </span>
                <span className="sub" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {SEARCH_REQUEST_STATUS_LABEL[r.status]}{r.resultCount > 0 ? ` (${r.resultCount}/${r.quantity} encontrados)` : ''}
                  {(r.status === 'PENDENTE' || r.status === 'EM_ANDAMENTO') && (
                    <button
                      type="button"
                      onClick={() => onExecuteSearchRequest(r.id)}
                      disabled={executingId === r.id}
                      style={{ fontSize: '0.74rem', padding: '0.15rem 0.5rem', background: 'var(--accent)', color: '#fff', border: 'none' }}
                    >
                      {executingId === r.id ? 'Executando…' : r.status === 'EM_ANDAMENTO' ? 'Executar mais' : 'Executar'}
                    </button>
                  )}
                  {(r.status === 'PENDENTE' || r.status === 'EM_ANDAMENTO') && (
                    <button type="button" onClick={() => onCancelSearchRequest(r.id)} disabled={executingId === r.id} style={{ fontSize: '0.74rem', padding: '0.15rem 0.4rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
                      Cancelar
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}

        {hasFinishedSearchRequests && (
          <button
            type="button"
            onClick={onClearHistory}
            disabled={clearingHistory}
            style={{ marginTop: '0.8rem', fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
          >
            {clearingHistory ? 'Limpando…' : 'Limpar histórico (concluídas/canceladas)'}
          </button>
        )}
      </div>

      {/* IMPORTAR CSV (scraper externo) */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <p style={{ margin: 0, fontWeight: 700 }}>Importar leads de um CSV</p>
        <p className="sub" style={{ fontSize: '0.8rem', margin: '0.4rem 0 0.7rem' }}>
          Colete com o scraper de sua preferência (ex: Google Maps) e suba o arquivo aqui — como o dado já vem
          pronto, não passa pela IA de extração, só pelo mesmo filtro de qualidade da busca automática (exige
          WhatsApp, nunca duplica). Reconhece colunas como Nome/Name, Telefone/Phone, Site/Website, E-mail/Email,
          Cidade/City, Estado/State e Categoria/Category, em qualquer ordem.
        </p>
        <label style={{ display: 'inline-block' }}>
          <input type="file" accept=".csv,text/csv" onChange={onImportCsv} disabled={importingCsv} style={{ display: 'none' }} />
          <span style={{ display: 'inline-block', padding: '0.55rem 1rem', background: importingCsv ? 'var(--line)' : 'var(--accent)', color: importingCsv ? 'var(--ink-soft)' : '#fff', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem', cursor: importingCsv ? 'default' : 'pointer' }}>
            {importingCsv ? 'Importando…' : 'Escolher arquivo CSV'}
          </span>
        </label>
      </div>

      <form onSubmit={onFilterSubmit} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', margin: '1rem 0' }}>
        <input placeholder="Buscar nome, cidade, especialidade…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: '220px' }} />
        <select value={stage} onChange={(e) => setStage(e.target.value)}>
          <option value="">Todos os estágios</option>
          {Object.entries(STAGE_LABEL).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <input placeholder="Score mínimo" type="number" min={0} max={100} value={minScore} onChange={(e) => setMinScore(e.target.value)} style={{ width: '110px' }} />
        <button type="submit">Filtrar</button>
        <button type="button" onClick={() => setShowForm((v) => !v)} style={{ marginLeft: 'auto' }}>
          {showForm ? 'Cancelar' : '+ Adicionar profissional manualmente'}
        </button>
      </form>

      {showForm && (
        <form onSubmit={onCreate} className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
          <input required placeholder="Nome completo *" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
          <input placeholder="Cidade" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
          <input placeholder="Estado (UF)" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
          <input placeholder="CRP" value={formData.crp} onChange={(e) => setFormData({ ...formData, crp: e.target.value })} />
          <DropdownWithOther value={formData.specialties} onChange={(v) => setFormData({ ...formData, specialties: v })} options={ESPECIALIDADE_OPTIONS} placeholder="Especialidade" />
          <DropdownWithOther value={formData.approaches} onChange={(v) => setFormData({ ...formData, approaches: v })} options={ABORDAGEM_OPTIONS} placeholder="Abordagem" />
          <DropdownWithOther value={formData.audience} onChange={(v) => setFormData({ ...formData, audience: v })} options={PUBLICO_OPTIONS} placeholder="Público atendido" />
          <select value={formData.serviceMode} onChange={(e) => setFormData({ ...formData, serviceMode: e.target.value })}>
            <option value="">Modalidade</option>
            {MODALIDADE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <input placeholder="Site" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
          <input placeholder="Instagram (@usuario)" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} />
          <input placeholder="WhatsApp público" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} />
          <input placeholder="E-mail público" value={formData.publicEmail} onChange={(e) => setFormData({ ...formData, publicEmail: e.target.value })} />
          <input placeholder="Fonte (ex: busca manual, Instagram, indicação)" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} />
          <button type="submit" disabled={saving} style={{ gridColumn: '1 / -1' }}>
            {saving ? 'Salvando…' : 'Salvar e calcular score'}
          </button>
        </form>
      )}

      <table style={{ marginTop: '0.5rem' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade/UF</th>
            <th>Especialidade</th>
            <th>Contato</th>
            <th>Score</th>
            <th>Estágio</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => {
            const priority = priorityLabel(p.score);
            return (
              <tr key={p.id}>
                <td>{p.fullName}</td>
                <td>{[p.city, p.state].filter(Boolean).join('/') || '—'}</td>
                <td>{p.specialties ?? '—'}</td>
                <td style={{ fontSize: '0.8rem' }}>
                  {[p.whatsapp && 'WhatsApp', p.instagram && 'Instagram', p.publicEmail && 'E-mail'].filter(Boolean).join(', ') || '—'}
                </td>
                <td style={{ color: priority.color, fontWeight: 600 }}>{p.score ?? '—'} {priority.label}</td>
                <td>{STAGE_LABEL[p.stage] ?? p.stage}</td>
                <td>
                  <Link href={`/admin/prospeccao/${p.id}`} style={{ fontSize: '0.82rem' }}>Ver detalhes →</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {items.length === 0 && <p className="sub" style={{ marginTop: '1rem' }}>Nenhum profissional encontrado com esses filtros.</p>}
    </AdminShell>
  );
}
