'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getOwnTest, PatientTestToAnswer, submitOwnTest } from '../../../../lib/patient-api';

export default function AnswerTestPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [test, setTest] = useState<PatientTestToAnswer | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwnTest(params.id)
      .then(setTest)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await submitOwnTest(params.id, answers);
      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  if (error && !test) {
    return (
      <div className="shell shell-wide">
        <p className="error">{error}</p>
        <button onClick={() => router.push('/paciente/testes')}>Voltar</button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="shell shell-wide">
        <div className="callout-box">
          <p style={{ margin: 0 }}>Respostas enviadas. Seu psicólogo vai revisar e conversar com você sobre o resultado.</p>
        </div>
        <button onClick={() => router.push('/paciente/testes')} style={{ marginTop: '1rem' }}>Voltar</button>
      </div>
    );
  }

  if (!test) return null;

  const allAnswered = test.testTemplate.questions.every((q) => {
    const value = answers[q.id];
    return q.type === 'objetiva' ? typeof value === 'number' : typeof value === 'string' && value.trim().length > 0;
  });

  return (
    <div className="shell shell-wide">
      <h1 style={{ fontSize: '1.1rem' }}>{test.testTemplate.title}</h1>
      <div className="callout-box" style={{ marginBottom: '1rem' }}>{test.testTemplate.disclaimer}</div>
      <p className="sub">{test.testTemplate.instructions}</p>

      <form onSubmit={onSubmit}>
        {test.testTemplate.questions.map((q) => (
          <div key={q.id} style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.92rem', margin: '0 0 0.4rem' }}>{q.prompt}</p>
            {q.type === 'objetiva' ? (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {(q.options ?? test.testTemplate.responseScale ?? []).map((opt) => (
                  <label key={opt.value} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === opt.value}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                      style={{ width: 'auto' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                value={typeof answers[q.id] === 'string' ? (answers[q.id] as string) : ''}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                rows={3}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit' }}
              />
            )}
          </div>
        ))}
        <button type="submit" disabled={!allAnswered}>Enviar respostas</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
