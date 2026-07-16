'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  assignTest,
  attachTestToProntuario,
  correctTestAssignment,
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

export default function TestesPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [catalog, setCatalog] = useState<TestTemplate[]>([]);
  const [patientId, setPatientId] = useState('');
  const [testTemplateId, setTestTemplateId] = useState('');
  const [assignments, setAssignments] = useState<TestAssignment[]>([]);

  const [correctingId, setCorrectingId] = useState<string | null>(null);
  const [finalScore, setFinalScore] = useState('');
  const [finalResultLabel, setFinalResultLabel] = useState('');
  const [communicationNote, setCommunicationNote] = useState('');

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

  async function onAttach(id: string) {
    setError(null);
    try {
      const updated = await attachTestToProntuario(id);
      setAssignments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  if (patients.length === 0) {
    return (
      <div className="shell shell-wide">
        <DashboardNav />
        <p className="sub">Cadastre um paciente ativo primeiro para disponibilizar um teste.</p>
      </div>
    );
  }

  const selectedTemplate = catalog.find((t) => t.id === testTemplateId);

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Aplicação de testes</h2>
      <p className="sub">
        Disponibilize um teste do catálogo pro paciente responder na área dele. Ele responde uma única vez — a
        correção e a decisão de como comunicar o resultado acontecem aqui, nunca automaticamente pro paciente.
      </p>

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
          {selectedTemplate && <div className="callout-box" style={{ marginBottom: '0.8rem' }}>{selectedTemplate.disclaimer}</div>}
          <button type="submit">Disponibilizar para o paciente</button>
        </form>
      )}

      <h3 style={{ fontSize: '0.95rem' }}>Histórico do paciente</h3>
      <table>
        <thead><tr><th>Teste</th><th>Situação</th><th>Disponibilizado em</th><th>Ações</th></tr></thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.testTemplate.title}</td>
              <td>{STATUS_LABEL[a.status]}</td>
              <td>{new Date(a.assignedAt).toLocaleDateString('pt-BR')}</td>
              <td>
                {a.status === 'respondido' && correctingId !== a.id && (
                  <button onClick={() => startCorrecting(a)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                    Corrigir
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

      {correctingId && (() => {
        const assignment = assignments.find((a) => a.id === correctingId);
        if (!assignment) return null;
        return (
          <div className="callout-box" style={{ marginTop: '1.2rem' }}>
            <h4 style={{ margin: '0 0 0.6rem', fontSize: '0.92rem' }}>Corrigir: {assignment.testTemplate.title}</h4>
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
    </div>
  );
}
