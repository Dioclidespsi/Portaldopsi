'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  applyTestLive,
  assignTest,
  attachTestToProntuario,
  correctTestAssignment,
  deleteTestAssignment,
  listTestAssignments,
  listTestCatalog,
  TestAssignment,
  TestTemplate,
} from '../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  pendente: 'Aguardando o paciente responder',
  respondido: 'Respondido — aguardando correção',
  corrigido: 'Corrigido',
};

/** A pontuação sozinha diz pouco — mostra o que o paciente respondeu em cada pergunta, não só o total. */
function AnswersPanel({ assignment }: { assignment: TestAssignment }) {
  const questions = assignment.testTemplate.questions;
  if (!questions || questions.length === 0) {
    return <p className="sub">Este teste não tem perguntas cadastradas.</p>;
  }
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: '6px', overflow: 'hidden' }}>
      {questions.map((q, i) => {
        const raw = assignment.answers?.[q.id];
        let display: string;
        if (raw === undefined || raw === null || raw === '') {
          display = 'Não respondida';
        } else if (q.type === 'objetiva' && q.options) {
          const opt = q.options.find((o) => o.value === Number(raw));
          display = opt ? opt.label : String(raw);
        } else {
          display = String(raw);
        }
        return (
          <div
            key={q.id}
            style={{ padding: '0.5rem 0.7rem', borderBottom: i < questions.length - 1 ? '1px solid var(--line)' : 'none' }}
          >
            <p style={{ margin: '0 0 0.2rem', fontSize: '0.85rem', fontWeight: 600 }}>{i + 1}. {q.prompt}</p>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{display}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Adaptado de dashboard/testes/page.tsx — mesmo fluxo, sem o seletor de paciente (já vem fixo). */
export default function TestesPanel({ patientId }: { patientId: string }) {
  const [catalog, setCatalog] = useState<TestTemplate[]>([]);
  const [testTemplateId, setTestTemplateId] = useState('');
  const [assignments, setAssignments] = useState<TestAssignment[]>([]);

  const [correctingId, setCorrectingId] = useState<string | null>(null);
  const [viewingAnswersId, setViewingAnswersId] = useState<string | null>(null);
  const [finalScore, setFinalScore] = useState('');
  const [finalResultLabel, setFinalResultLabel] = useState('');
  const [communicationNote, setCommunicationNote] = useState('');

  const [applyingLiveId, setApplyingLiveId] = useState<string | null>(null);
  const [liveAnswers, setLiveAnswers] = useState<Record<string, number | string>>({});
  const [applyingLiveBusy, setApplyingLiveBusy] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setCorrectingId(null);
    setViewingAnswersId(null);
    setApplyingLiveId(null);
    Promise.all([listTestCatalog(), listTestAssignments(patientId)])
      .then(([catalogData, assignmentsData]) => {
        setCatalog(catalogData);
        setAssignments(assignmentsData);
        if (catalogData[0]) setTestTemplateId((prev) => prev || catalogData[0].id);
      })
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [patientId]);

  async function onAssign(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const assignment = await assignTest(patientId, testTemplateId);
      setAssignments((prev) => [assignment, ...prev]);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onAssignAndApplyLive() {
    setError(null);
    try {
      const assignment = await assignTest(patientId, testTemplateId);
      setAssignments((prev) => [assignment, ...prev]);
      startApplyingLive(assignment);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function startCorrecting(a: TestAssignment) {
    setCorrectingId(a.id);
    setFinalScore(a.suggestedScore?.toString() ?? '');
    setFinalResultLabel(a.suggestedResultLabel ?? '');
    setCommunicationNote('');
  }

  async function onSaveCorrection(id: string) {
    setError(null);
    try {
      const updated = await correctTestAssignment(id, {
        finalScore: finalScore ? Number(finalScore) : undefined,
        finalResultLabel: finalResultLabel || undefined,
        communicationNote: communicationNote || undefined,
      });
      setAssignments((prev) => prev.map((a) => (a.id === id ? updated : a)));
      setCorrectingId(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function startApplyingLive(a: TestAssignment) {
    setApplyingLiveId(a.id);
    setLiveAnswers({});
  }

  async function onSubmitLiveAnswers(id: string) {
    setError(null);
    setApplyingLiveBusy(true);
    try {
      const updated = await applyTestLive(id, liveAnswers);
      setAssignments((prev) => prev.map((a) => (a.id === id ? updated : a)));
      setApplyingLiveId(null);
      setLiveAnswers({});
      startCorrecting(updated);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setApplyingLiveBusy(false);
    }
  }

  async function onAttach(id: string) {
    setError(null);
    try {
      const updated = await attachTestToProntuario(id);
      setAssignments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDeleteAssignment(a: TestAssignment) {
    if (!window.confirm(`Excluir "${a.testTemplate.title}"? Essa ação não pode ser desfeita.`)) return;
    setError(null);
    try {
      await deleteTestAssignment(a.id);
      setAssignments((prev) => prev.filter((x) => x.id !== a.id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <p className="sub">Carregando…</p>;

  const selectedTemplate = catalog.find((t) => t.id === testTemplateId);

  return (
    <div>
      {catalog.length === 0 ? (
        <p className="sub">Nenhum teste cadastrado no catálogo ainda — peça pro administrador cadastrar em /admin/testes.</p>
      ) : (
        <form onSubmit={onAssign} style={{ marginBottom: '1.2rem' }}>
          <label style={{ maxWidth: '320px', marginBottom: '0.6rem' }}>
            Teste
            <select value={testTemplateId} onChange={(e) => setTestTemplateId(e.target.value)}>
              {catalog.map((t) => <option key={t.id} value={t.id}>{t.category} — {t.title}</option>)}
            </select>
          </label>
          {selectedTemplate && <div className="card" style={{ marginBottom: '0.8rem' }}>{selectedTemplate.disclaimer}</div>}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button type="submit">Disponibilizar para o paciente</button>
            <button
              type="button"
              onClick={onAssignAndApplyLive}
              style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
            >
              Aplicar agora (ao vivo)
            </button>
          </div>
        </form>
      )}

      <h4 style={{ fontSize: '0.9rem' }}>Histórico</h4>
      <table>
        <thead><tr><th>Teste</th><th>Situação</th><th>Ações</th></tr></thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.testTemplate.title}</td>
              <td>{STATUS_LABEL[a.status]}{a.appliedLiveByStaff && ' (ao vivo)'}</td>
              <td style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {a.status === 'pendente' && applyingLiveId !== a.id && (
                  <button
                    onClick={() => startApplyingLive(a)}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                  >
                    Aplicar ao vivo
                  </button>
                )}
                {a.status === 'pendente' && (
                  <button
                    onClick={() => onDeleteAssignment(a)}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--crit, #a33)', border: '1px solid var(--crit, #a33)' }}
                  >
                    Excluir
                  </button>
                )}
                {a.status === 'respondido' && correctingId !== a.id && (
                  <button onClick={() => startCorrecting(a)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                    Corrigir
                  </button>
                )}
                {a.status === 'corrigido' && (
                  <button
                    onClick={() => setViewingAnswersId(viewingAnswersId === a.id ? null : a.id)}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                  >
                    {viewingAnswersId === a.id ? 'Ocultar' : 'Ver respostas'}
                  </button>
                )}
                {a.status === 'corrigido' && !a.attachedToProntuario && (
                  <button onClick={() => onAttach(a.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                    Anexar ao prontuário
                  </button>
                )}
                {a.status === 'corrigido' && a.attachedToProntuario && (
                  <span className="sub" style={{ margin: 0 }}>Anexado</span>
                )}
              </td>
            </tr>
          ))}
          {assignments.length === 0 && (
            <tr><td colSpan={3} style={{ color: 'var(--ink-soft)' }}>Nenhum teste disponibilizado ainda.</td></tr>
          )}
        </tbody>
      </table>

      {viewingAnswersId && (() => {
        const assignment = assignments.find((a) => a.id === viewingAnswersId);
        if (!assignment) return null;
        return (
          <div className="card" style={{ marginTop: '1rem' }}>
            <h4 style={{ margin: '0 0 0.6rem', fontSize: '0.92rem' }}>Respostas: {assignment.testTemplate.title}</h4>
            {assignment.finalResultLabel && (
              <p className="sub" style={{ marginBottom: '0.6rem' }}>
                Resultado final: <strong>{assignment.finalScore ?? '—'} pontos{assignment.finalResultLabel ? ` — ${assignment.finalResultLabel}` : ''}</strong>
              </p>
            )}
            <AnswersPanel assignment={assignment} />
          </div>
        );
      })()}

      {applyingLiveId && (() => {
        const assignment = assignments.find((a) => a.id === applyingLiveId);
        if (!assignment) return null;
        const questions = assignment.testTemplate.questions;
        const allAnswered = questions.every((q) => {
          const value = liveAnswers[q.id];
          return q.type === 'objetiva' ? typeof value === 'number' : typeof value === 'string' && value.trim().length > 0;
        });
        return (
          <div className="card" style={{ marginTop: '1.2rem' }}>
            <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.92rem' }}>Aplicação ao vivo: {assignment.testTemplate.title}</h4>
            <p className="sub" style={{ margin: '0 0 0.8rem' }}>
              Leia cada pergunta em voz alta pro paciente e preencha a resposta dele aqui.
            </p>
            {questions.map((q) => (
              <div key={q.id} style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.92rem', margin: '0 0 0.4rem' }}>{q.prompt}</p>
                {q.type === 'objetiva' ? (
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {(q.options ?? assignment.testTemplate.responseScale ?? []).map((opt) => (
                      <label key={opt.value} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                        <input
                          type="radio"
                          name={`live-${q.id}`}
                          checked={liveAnswers[q.id] === opt.value}
                          onChange={() => setLiveAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                          style={{ width: 'auto' }}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={typeof liveAnswers[q.id] === 'string' ? (liveAnswers[q.id] as string) : ''}
                    onChange={(e) => setLiveAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    rows={3}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit' }}
                  />
                )}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem' }}>
              <button onClick={() => onSubmitLiveAnswers(assignment.id)} disabled={!allAnswered || applyingLiveBusy}>
                {applyingLiveBusy ? 'Enviando…' : 'Enviar respostas'}
              </button>
              <button
                onClick={() => { setApplyingLiveId(null); setLiveAnswers({}); }}
                disabled={applyingLiveBusy}
                style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        );
      })()}

      {correctingId && (() => {
        const assignment = assignments.find((a) => a.id === correctingId);
        if (!assignment) return null;
        return (
          <div className="card" style={{ marginTop: '1.2rem' }}>
            <h4 style={{ margin: '0 0 0.6rem', fontSize: '0.92rem' }}>Corrigir: {assignment.testTemplate.title}</h4>
            <div style={{ marginBottom: '0.8rem' }}>
              <AnswersPanel assignment={assignment} />
            </div>
            {assignment.suggestedScore !== null && assignment.suggestedScore !== undefined && (
              <p className="sub" style={{ marginBottom: '0.6rem' }}>
                Soma automática (sugestão, revise antes de confirmar):{' '}
                <strong>{assignment.suggestedScore} pontos{assignment.suggestedResultLabel ? ` — ${assignment.suggestedResultLabel}` : ''}</strong>
              </p>
            )}
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
              <label>
                Pontuação final
                <input type="number" value={finalScore} onChange={(e) => setFinalScore(e.target.value)} style={{ width: '100px' }} />
              </label>
              <label style={{ flex: 1, minWidth: '180px' }}>
                Resultado final
                <input value={finalResultLabel} onChange={(e) => setFinalResultLabel(e.target.value)} />
              </label>
            </div>
            <label>
              Como (ou se) você vai comunicar o resultado ao paciente
              <textarea
                value={communicationNote}
                onChange={(e) => setCommunicationNote(e.target.value)}
                rows={2}
                style={{ padding: '0.5rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', width: '100%' }}
              />
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem' }}>
              <button onClick={() => onSaveCorrection(assignment.id)}>Salvar correção</button>
              <button
                onClick={() => setCorrectingId(null)}
                style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        );
      })()}
      {error && <p style={{ marginTop: '0.6rem' }}><span className="error">{error}</span></p>}
    </div>
  );
}
