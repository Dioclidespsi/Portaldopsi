'use client';

import { FormEvent, useState } from 'react';
import DashboardNav from '../../../components/DashboardNav';
import { askAiAssistant } from '../../../lib/api';

export default function AssistentePage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onAsk(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { answer } = await askAiAssistant(question);
      setAnswer(answer);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Assistente IA</h2>
      <p className="sub">
        Dúvidas gerais de uso da plataforma, organização de agenda e gestão de clínica — sem acesso
        a dado de paciente.
      </p>

      <form onSubmit={onAsk}>
        <label>
          Pergunta
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
            required
          />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Perguntando…' : 'Perguntar'}</button>
      </form>

      {answer && <div className="callout-box" style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{answer}</div>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
