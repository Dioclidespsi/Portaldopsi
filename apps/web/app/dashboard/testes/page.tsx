'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '../../../components/DashboardShell';
import {
  applyTestLive,
  assignTest,
  attachTestToProntuario,
  correctTestAssignment,
  deleteTestAssignment,
  listPatients,
  listTestAssignments,
  listTestCatalog,
  Patient,
  TestAssignment,
  TestTemplate,
} from '../../../lib/api';

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

export default function TestesPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [catalog, setCatalog] = useState<TestTemplate[]>([]);
  const [patientId, setPatientId] = useState('');
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
    Promise.all([listPatients(true), listTestCatalog()])
      .then(([patientsData, catalogData]) => {
        setPatients(patientsData);
        setCatalog(catalogData);
        if (patientsData[0]) setPatientId(patientsData[0].id);
        if (catalogData[0]) setTestTemplateId(catalogData[0].id);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (!patientId) return;
    listTestAssignments(patientId).then(setAssignments);
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

  /**
   * Atalho de um clique só — antes, pra aplicar ao vivo era preciso primeiro
   * "Disponibilizar para o paciente" (criar a aplicação) e só depois achar
   * o botão "Aplicar ao vivo" na tabela de histórico. Aqui cria e já abre o
   * formulário de aplicação ao vivo na mesma ação.
   */
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
      // Quem aplicou foi o próprio profissional (leu e digitou as respostas
      // na hora) — não faz sentido pedir mais um clique separado só pra ver
      // o resultado sugerido: abre a correção na hora, com a pontuação já
      // calculada visível, em vez de voltar pra tabela.
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

  if (loading) return <div className="shell">Carregando…</div>;

  if (patients.length === 0) {
    return (
      <DashboardShell title="Aplicação de testes">
        <p className="sub">Cadastre um paciente ativo primeiro para disponibilizar um teste.</p>
      </DashboardShell>
    );
  }

  const selectedTemplate = catalog.find((t) => t.id === testTemplateId);

  return (
    <DashboardShell
      title="Aplicação de testes"
      description="Disponibilize um teste do catálogo pro paciente responder na área dele. Ele responde uma única vez — a correção e a decisão de como comunicar o resultado acontecem aqui, nunca automaticamente pro paciente."
    >

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Paciente
          <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
            {patients.map((p) => <option key={p.id} value={p.id}>{p.name}{p.socialName && ` (${p.socialName})`}</option>)}
          </select>
        </label>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Teste
          <select value={testTemplateId} onChange={(e) => setTestTemplateId(e.target.value)}>
            {catalog.map((t) => <option key={t.id} value={t.id}>{t.category} — {t.title}</option>)}
          </select>
        </label>
      </div>

      {catalog.length === 0 ? (
        <p className="sub">Nenhum teste cadastrado no catálogo ainda — peça pro administrador cadastrar em /admin/testes.</p>
      ) : (
        <form onSubmit={onAssign} style={{ marginBottom: '1.5rem' }}>
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
          <p className="sub" style={{ margin: '0.5rem 0 0' }}>
            "Disponibilizar" deixa o teste esperando o paciente responder sozinho na área dele. "Aplicar agora"
            é pra quando você está lendo as perguntas em voz alta na sessão — abre o formulário na hora, sem
            precisar disponibilizar antes.
          </p>
        </form>
      )}

      <h3 style={{ fontSize: '0.95rem' }}>Histórico do paciente</h3>
      <table>
        <thead><tr><th>Teste</th><th>Situação</th><th>Disponibilizado em</th><th>Ações</th></tr></thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.testTemplate.title}</td>
              <td>{STATUS_LABEL[a.status]}{a.appliedLiveByStaff && ' (aplicado ao vivo)'}</td>
              <td>{new Date(a.assignedAt).toLocaleDateString('pt-BR')}</td>
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
                    {viewingAnswersId === a.id ? 'Ocultar respostas' : 'Ver respostas'}
                  </button>
                )}
                {a.status === 'corrigido' && !a.attachedToProntuario && (
                  <button onClick={() => onAttach(a.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                    Anexar ao prontuário
                  </button>
                )}
                {a.status === 'corrigido' && a.attachedToProntuario && (
                  <span className="sub" style={{ margin: 0 }}>Anexado ao prontuário</span>
                )}
              </td>
            </tr>
          ))}
          {assignments.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum teste disponibilizado ainda.</td></tr>
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
              Leia cada pergunta em voz alta pro paciente e preencha a resposta dele aqui. Ao enviar, o teste segue
              pro mesmo fluxo de correção de sempre.
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
            <p className="sub" style={{ margin: '0 0 0.4rem' }}>
              Respostas do paciente — a pontuação sozinha não substitui a leitura de cada resposta:
            </p>
            <div style={{ marginBottom: '0.8rem' }}>
              <AnswersPanel assignment={assignment} />
            </div>
            {assignment.suggestedScore !== null && assignment.suggestedScore !== undefined && (
              <p className="sub" style={{ marginBottom: '0.6rem' }}>
                Soma automática das respostas objetivas (sugestão, revise antes de confirmar):{' '}
                <strong>{assignment.suggestedScore} pontos{assignment.suggestedResultLabel ? ` — ${assignment.suggestedResultLabel}` : ''}</strong>
              </p>
            )}
            {assignment.suggestedSubscaleScores && assignment.suggestedSubscaleScores.length > 0 && (
              <div style={{ marginBottom: '0.6rem' }}>
                <p className="sub" style={{ margin: '0 0 0.3rem' }}>Escores por subescala (sugestão automática — o cálculo final é sempre manual):</p>
                <table style={{ fontSize: '0.82rem' }}>
                  <thead><tr><th>Subescala</th><th>Pontos</th><th>Faixa sugerida</th></tr></thead>
                  <tbody>
                    {assignment.suggestedSubscaleScores.map((s) => (
                      <tr key={s.key}><td>{s.label}</td><td>{s.score}</td><td>{s.resultLabel ?? '—'}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {assignment.suggestedDerivedScores && assignment.suggestedDerivedScores.length > 0 && (
              <div style={{ marginBottom: '0.6rem' }}>
                <p className="sub" style={{ margin: '0 0 0.3rem' }}>Escores compostos:</p>
                <table style={{ fontSize: '0.82rem' }}>
                  <thead><tr><th>Composto</th><th>Pontos</th><th>Faixa sugerida</th></tr></thead>
                  <tbody>
                    {assignment.suggestedDerivedScores.map((s) => (
                      <tr key={s.key}><td>{s.label}</td><td>{s.score}</td><td>{s.resultLabel ?? '—'}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                placeholder="Ex: vou conversar na próxima sessão presencial. Isso nunca é mostrado ao paciente pelo sistema."
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
      {error && <span className="error">{error}</span>}
    </DashboardShell>
  );
}
