'use client';

import { Fragment, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  AdminTestQuestionInput,
  AdminTestTemplate,
  createTestTemplate,
  deleteTestTemplate,
  getAdminToken,
  listAdminTestTemplates,
  setTestTemplateActive,
  UpsertTestTemplateInput,
} from '../../../lib/admin-api';

interface ScaleOptionDraft { value: string; label: string }
interface ScoreBandDraft { maxScore: string; label: string }
interface SubscaleDraft { key: string; label: string }
interface DerivedScoreDraft { key: string; label: string; formula: { subscale: string; weight: string }[] }

const emptyQuestion: AdminTestQuestionInput = { type: 'objetiva', prompt: '' };

export default function AdminTestsPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<AdminTestTemplate[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [instructions, setInstructions] = useState('');
  const [responseScale, setResponseScale] = useState<ScaleOptionDraft[]>([{ value: '0', label: '' }]);
  const [scoreBands, setScoreBands] = useState<ScoreBandDraft[]>([{ maxScore: '', label: '' }]);
  const [subscales, setSubscales] = useState<SubscaleDraft[]>([]);
  const [derivedScores, setDerivedScores] = useState<DerivedScoreDraft[]>([]);
  const [questions, setQuestions] = useState<AdminTestQuestionInput[]>([{ ...emptyQuestion }]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listAdminTestTemplates()
      .then(setTemplates)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  function resetForm() {
    setSlug('');
    setTitle('');
    setCategory('');
    setSource('');
    setDisclaimer('');
    setInstructions('');
    setResponseScale([{ value: '0', label: '' }]);
    setScoreBands([{ maxScore: '', label: '' }]);
    setSubscales([]);
    setDerivedScores([]);
    setQuestions([{ ...emptyQuestion }]);
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const hasObjective = questions.some((q) => q.type === 'objetiva');
      const payload: UpsertTestTemplateInput = {
        slug,
        title,
        category,
        source,
        disclaimer,
        instructions,
        questions: questions.filter((q) => q.prompt.trim()),
        responseScale: hasObjective
          ? responseScale.filter((o) => o.label.trim()).map((o) => ({ value: Number(o.value), label: o.label }))
          : undefined,
        scoreBands: hasObjective
          ? scoreBands.filter((b) => b.label.trim()).map((b) => ({ maxScore: Number(b.maxScore), label: b.label }))
          : undefined,
        subscales: subscales.filter((s) => s.key.trim() && s.label.trim()),
        derivedScores: derivedScores
          .filter((d) => d.key.trim() && d.label.trim())
          .map((d) => ({
            key: d.key,
            label: d.label,
            formula: d.formula.filter((f) => f.subscale.trim()).map((f) => ({ subscale: f.subscale, weight: Number(f.weight) || 1 })),
          }))
          .filter((d) => d.formula.length > 0),
      };
      const created = await createTestTemplate(payload);
      setTemplates((prev) => [...prev, created]);
      resetForm();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onToggleActive(t: AdminTestTemplate) {
    setError(null);
    try {
      const updated = await setTestTemplateActive(t.id, !t.active);
      setTemplates((prev) => prev.map((x) => (x.id === t.id ? updated : x)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deleteTestTemplate(id);
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function updateQuestion(index: number, patch: Partial<AdminTestQuestionInput>) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const byCategory = templates.reduce<Record<string, AdminTestTemplate[]>>((acc, t) => {
    (acc[t.category] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Testes e escalas</h2>
      <p className="sub">
        Catálogo compartilhado entre todas as clínicas — o psicólogo só disponibiliza pro paciente, nunca edita o
        conteúdo. Perguntas objetivas usam a escala de resposta abaixo; subjetivas são texto livre, sem pontuação.
      </p>

      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} style={{ marginTop: '1.2rem' }}>
          <h3 style={{ fontSize: '0.92rem' }}>{cat}</h3>
          <table>
            <thead><tr><th>Título</th><th>Perguntas</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              {items.map((t) => (
                <Fragment key={t.id}>
                  <tr>
                    <td>
                      <button
                        type="button"
                        onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: 0 }}
                      >
                        {t.title}
                      </button>
                    </td>
                    <td>{t.questions.length}</td>
                    <td>{t.active ? 'Ativo' : 'Inativo'}</td>
                    <td style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => onToggleActive(t)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                        {t.active ? 'Desativar' : 'Ativar'}
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                  {expandedId === t.id && (
                    <tr>
                      <td colSpan={4}>
                        <div className="callout-box">
                          <p style={{ margin: '0 0 0.4rem' }}><strong>Fonte:</strong> {t.source}</p>
                          <p style={{ margin: '0 0 0.4rem' }}><strong>Aviso:</strong> {t.disclaimer}</p>
                          <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
                            {t.questions.map((q) => (
                              <li key={q.id} style={{ fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                                ({q.type}) {q.prompt}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {templates.length === 0 && <p className="sub">Nenhum teste cadastrado ainda.</p>}

      <h3 style={{ fontSize: '0.95rem', marginTop: '1.6rem' }}>Cadastrar novo teste</h3>
      <form onSubmit={onCreate}>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <label style={{ flex: 1, minWidth: '160px' }}>
            Slug (identificador único)
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ex: escala-depressao-xyz" required />
          </label>
          <label style={{ flex: 1, minWidth: '160px' }}>
            Título
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label style={{ flex: 1, minWidth: '160px' }}>
            Categoria / subgrupo
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Ansiedade, Depressão, Carreira..." required />
          </label>
        </div>
        <label>
          Fonte / referência
          <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Autor, ano, publicação" required />
        </label>
        <label>
          Aviso ao psicólogo (disclaimer)
          <textarea value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} rows={2} required />
        </label>
        <label>
          Instruções ao paciente
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={2} required />
        </label>

        <h4 style={{ fontSize: '0.88rem', marginTop: '1rem' }}>Escala de resposta (perguntas objetivas)</h4>
        {responseScale.map((opt, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <input
              type="number"
              value={opt.value}
              onChange={(e) => setResponseScale((prev) => prev.map((o, idx) => (idx === i ? { ...o, value: e.target.value } : o)))}
              style={{ width: '80px' }}
              placeholder="valor"
            />
            <input
              value={opt.label}
              onChange={(e) => setResponseScale((prev) => prev.map((o, idx) => (idx === i ? { ...o, label: e.target.value } : o)))}
              placeholder="rótulo (ex: Nunca)"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={() => setResponseScale((prev) => prev.filter((_, idx) => idx !== i))} style={{ fontSize: '0.78rem' }}>
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setResponseScale((prev) => [...prev, { value: '', label: '' }])} style={{ fontSize: '0.82rem' }}>
          + Opção de resposta
        </button>

        <h4 style={{ fontSize: '0.88rem', marginTop: '1rem' }}>Faixas de pontuação (sugestão de resultado)</h4>
        {scoreBands.map((band, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <input
              type="number"
              value={band.maxScore}
              onChange={(e) => setScoreBands((prev) => prev.map((b, idx) => (idx === i ? { ...b, maxScore: e.target.value } : b)))}
              style={{ width: '100px' }}
              placeholder="até (pontos)"
            />
            <input
              value={band.label}
              onChange={(e) => setScoreBands((prev) => prev.map((b, idx) => (idx === i ? { ...b, label: e.target.value } : b)))}
              placeholder="rótulo (ex: Moderada)"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={() => setScoreBands((prev) => prev.filter((_, idx) => idx !== i))} style={{ fontSize: '0.78rem' }}>
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setScoreBands((prev) => [...prev, { maxScore: '', label: '' }])} style={{ fontSize: '0.82rem' }}>
          + Faixa de pontuação
        </button>

        <h4 style={{ fontSize: '0.88rem', marginTop: '1rem' }}>Subescalas (opcional — só para instrumentos com múltiplas dimensões, ex: YSQ, Seligman)</h4>
        <p className="sub" style={{ margin: '0 0 0.4rem' }}>
          Defina uma chave por subescala e associe cada pergunta a ela mais abaixo. O escore geral acima soma só as
          perguntas SEM subescala; cada subescala aqui soma só as perguntas marcadas com sua chave.
        </p>
        {subscales.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <input
              value={s.key}
              onChange={(e) => setSubscales((prev) => prev.map((x, idx) => (idx === i ? { ...x, key: e.target.value } : x)))}
              placeholder="chave (ex: IPm)"
              style={{ width: '140px' }}
            />
            <input
              value={s.label}
              onChange={(e) => setSubscales((prev) => prev.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)))}
              placeholder="rótulo (ex: Permanência - eventos negativos)"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={() => setSubscales((prev) => prev.filter((_, idx) => idx !== i))} style={{ fontSize: '0.78rem' }}>
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setSubscales((prev) => [...prev, { key: '', label: '' }])} style={{ fontSize: '0.82rem' }}>
          + Subescala
        </button>

        <h4 style={{ fontSize: '0.88rem', marginTop: '1rem' }}>Escores compostos (opcional — ex: Seligman "Total S − Total I")</h4>
        {derivedScores.map((d, i) => (
          <div key={i} style={{ marginBottom: '0.6rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <input
                value={d.key}
                onChange={(e) => setDerivedScores((prev) => prev.map((x, idx) => (idx === i ? { ...x, key: e.target.value } : x)))}
                placeholder="chave (ex: Final)"
                style={{ width: '140px' }}
              />
              <input
                value={d.label}
                onChange={(e) => setDerivedScores((prev) => prev.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)))}
                placeholder="rótulo (ex: Escore Final de Otimismo)"
                style={{ flex: 1 }}
              />
              <button type="button" onClick={() => setDerivedScores((prev) => prev.filter((_, idx) => idx !== i))} style={{ fontSize: '0.78rem' }}>
                Remover
              </button>
            </div>
            <p className="sub" style={{ margin: '0 0 0.3rem', fontSize: '0.76rem' }}>Fórmula: soma ponderada de subescalas (peso negativo subtrai)</p>
            {d.formula.map((f, fi) => (
              <div key={fi} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.3rem', paddingLeft: '0.6rem' }}>
                <input
                  value={f.subscale}
                  onChange={(e) => {
                    const subscale = e.target.value;
                    setDerivedScores((prev) => prev.map((x, idx) => (idx === i ? { ...x, formula: x.formula.map((ff, fidx) => (fidx === fi ? { ...ff, subscale } : ff)) } : x)));
                  }}
                  placeholder="chave da subescala"
                  style={{ width: '140px' }}
                />
                <input
                  type="number"
                  value={f.weight}
                  onChange={(e) => {
                    const weight = e.target.value;
                    setDerivedScores((prev) => prev.map((x, idx) => (idx === i ? { ...x, formula: x.formula.map((ff, fidx) => (fidx === fi ? { ...ff, weight } : ff)) } : x)));
                  }}
                  placeholder="peso (1 ou -1)"
                  style={{ width: '100px' }}
                />
                <button
                  type="button"
                  onClick={() => setDerivedScores((prev) => prev.map((x, idx) => (idx === i ? { ...x, formula: x.formula.filter((_, fidx) => fidx !== fi) } : x)))}
                  style={{ fontSize: '0.76rem' }}
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setDerivedScores((prev) => prev.map((x, idx) => (idx === i ? { ...x, formula: [...x.formula, { subscale: '', weight: '1' }] } : x)))}
              style={{ fontSize: '0.78rem', marginLeft: '0.6rem' }}
            >
              + Termo da fórmula
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setDerivedScores((prev) => [...prev, { key: '', label: '', formula: [{ subscale: '', weight: '1' }] }])}
          style={{ fontSize: '0.82rem' }}
        >
          + Escore composto
        </button>

        <h4 style={{ fontSize: '0.88rem', marginTop: '1rem' }}>Perguntas</h4>
        {questions.map((q, i) => (
          <div key={i} style={{ marginBottom: '0.7rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <select
                value={q.type}
                onChange={(e) => updateQuestion(i, { type: e.target.value as 'objetiva' | 'subjetiva' })}
                style={{ width: '120px' }}
              >
                <option value="objetiva">Objetiva</option>
                <option value="subjetiva">Subjetiva</option>
              </select>
              <textarea
                value={q.prompt}
                onChange={(e) => updateQuestion(i, { prompt: e.target.value })}
                placeholder="Texto da pergunta"
                rows={2}
                style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit' }}
              />
              {q.type === 'objetiva' && !q.options && (
                <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                  <input
                    type="checkbox"
                    checked={q.reverseScored ?? false}
                    onChange={(e) => updateQuestion(i, { reverseScored: e.target.checked })}
                    style={{ width: 'auto' }}
                  />
                  invertido
                </label>
              )}
              {q.type === 'objetiva' && subscales.length > 0 && (
                <select
                  value={q.subscale ?? ''}
                  onChange={(e) => updateQuestion(i, { subscale: e.target.value || undefined })}
                  style={{ width: '160px' }}
                >
                  <option value="">(escore geral)</option>
                  {subscales.filter((s) => s.key.trim()).map((s) => (
                    <option key={s.key} value={s.key}>{s.key}</option>
                  ))}
                </select>
              )}
              <button type="button" onClick={() => setQuestions((prev) => prev.filter((_, idx) => idx !== i))} style={{ fontSize: '0.78rem' }}>
                Remover
              </button>
            </div>

            {q.type === 'objetiva' && (
              <div style={{ marginTop: '0.4rem', paddingLeft: '0.3rem' }}>
                <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(q.options)}
                    onChange={(e) => updateQuestion(i, { options: e.target.checked ? [{ value: 0, label: '' }, { value: 1, label: '' }] : undefined })}
                    style={{ width: 'auto' }}
                  />
                  opções próprias desta pergunta (ex: HAD, Beck — cada item com frases diferentes)
                </label>
                {q.options && (
                  <div style={{ marginTop: '0.3rem' }}>
                    {q.options.map((opt, oi) => (
                      <div key={oi} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.3rem' }}>
                        <input
                          type="number"
                          value={opt.value}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            updateQuestion(i, { options: q.options!.map((o, idx) => (idx === oi ? { ...o, value } : o)) });
                          }}
                          style={{ width: '70px' }}
                          placeholder="valor"
                        />
                        <input
                          value={opt.label}
                          onChange={(e) => {
                            const label = e.target.value;
                            updateQuestion(i, { options: q.options!.map((o, idx) => (idx === oi ? { ...o, label } : o)) });
                          }}
                          placeholder="texto da opção"
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => updateQuestion(i, { options: q.options!.filter((_, idx) => idx !== oi) })}
                          style={{ fontSize: '0.76rem' }}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => updateQuestion(i, { options: [...q.options!, { value: q.options!.length, label: '' }] })}
                      style={{ fontSize: '0.78rem' }}
                    >
                      + Opção
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setQuestions((prev) => [...prev, { ...emptyQuestion }])} style={{ fontSize: '0.82rem' }}>
          + Pergunta
        </button>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Cadastrar teste</button>
        </div>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
