'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  listPatients,
  listTestCatalog,
  listTestResponses,
  Patient,
  submitTestResponse,
  TestDefinition,
  TestResponseRecord,
} from '../../../lib/api';

export default function TestesPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [catalog, setCatalog] = useState<TestDefinition[]>([]);
  const [patientId, setPatientId] = useState('');
  const [testSlug, setTestSlug] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<TestResponseRecord[]>([]);
  const [result, setResult] = useState<TestResponseRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listPatients(), listTestCatalog()])
      .then(([patientsData, catalogData]) => {
        setPatients(patientsData);
        setCatalog(catalogData);
        if (patientsData[0]) setPatientId(patientsData[0].id);
        if (catalogData[0]) setTestSlug(catalogData[0].slug);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (!patientId) return;
    listTestResponses(patientId).then(setHistory);
    setAnswers({});
    setResult(null);
  }, [patientId]);

  const test = catalog.find((t) => t.slug === testSlug);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const response = await submitTestResponse(testSlug, patientId, answers);
      setResult(response);
      setHistory((prev) => [response, ...prev]);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  if (patients.length === 0) {
    return (
      <div className="shell shell-wide">
        <DashboardNav />
        <p className="sub">Cadastre um paciente primeiro para aplicar uma escala.</p>
      </div>
    );
  }

  const allAnswered = test ? test.items.every((item) => answers[item.id] !== undefined) : false;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Aplicação de testes</h2>
      <p className="sub">Escalas de domínio público — sem depender de licenciar catálogo fechado.</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <label style={{ flex: 1 }}>
          Paciente
          <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
            {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        <label style={{ flex: 1 }}>
          Escala
          <select value={testSlug} onChange={(e) => { setTestSlug(e.target.value); setAnswers({}); setResult(null); }}>
            {catalog.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
          </select>
        </label>
      </div>

      {test && (
        <>
          <div className="callout-box">{test.disclaimer}</div>
          <p style={{ fontSize: '0.9rem', margin: '1rem 0 0.5rem' }}>{test.instructions}</p>

          <form onSubmit={onSubmit}>
            {test.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '0.9rem' }}>
                <p style={{ fontSize: '0.9rem', margin: '0 0 0.4rem', color: 'var(--ink)' }}>{item.text}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {test.responseScale.map((opt) => (
                    <label key={opt.value} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                      <input
                        type="radio"
                        name={item.id}
                        checked={answers[item.id] === opt.value}
                        onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: opt.value }))}
                        style={{ width: 'auto' }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" disabled={!allAnswered}>Calcular resultado</button>
          </form>
        </>
      )}

      {result && (
        <div className="callout-box" style={{ marginTop: '1rem' }}>
          <strong>Resultado: {result.score} pontos — {result.resultLabel}</strong>
          <p style={{ margin: '0.3rem 0 0' }}>Revise antes de registrar no Prontuário — não é diagnóstico automático.</p>
        </div>
      )}
      {error && <span className="error">{error}</span>}

      <h3 style={{ fontSize: '0.95rem', marginTop: '1.5rem' }}>Histórico do paciente</h3>
      <table>
        <thead><tr><th>Escala</th><th>Pontuação</th><th>Resultado</th><th>Data</th></tr></thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id}>
              <td>{catalog.find((t) => t.slug === h.testSlug)?.title ?? h.testSlug}</td>
              <td style={{ fontVariantNumeric: 'tabular-nums' }}>{h.score}</td>
              <td>{h.resultLabel}</td>
              <td>{new Date(h.createdAt).toLocaleDateString('pt-BR')}</td>
            </tr>
          ))}
          {history.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhuma escala aplicada ainda.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
