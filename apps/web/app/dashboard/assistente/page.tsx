'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import DashboardNav from '../../../components/DashboardNav';
import { AiChatTurn, AiUsage, askAiAssistant, getAiUsage } from '../../../lib/api';

export default function AssistentePage() {
  const [messages, setMessages] = useState<AiChatTurn[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<AiUsage | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAiUsage().then(setUsage).catch(() => undefined);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function onAsk(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const history = messages;
    const nextMessages: AiChatTurn[] = [...messages, { role: 'user', content: question }];
    setMessages(nextMessages);
    setQuestion('');
    try {
      const { answer } = await askAiAssistant(question, history);
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
      getAiUsage().then(setUsage).catch(() => undefined);
    } catch (err) {
      setError((err as Error).message);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  const limitReached = usage ? usage.used >= usage.limit : false;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Assistente IA</h2>
      <p className="sub">
        Dúvidas gerais de uso da plataforma, organização de agenda e gestão de clínica — sem acesso
        a dado de paciente. Este chat lembra as mensagens anteriores da conversa atual.
      </p>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Link
          href="/dashboard"
          style={{ flex: 1, minWidth: '220px', textDecoration: 'none', color: 'inherit' }}
        >
          <div className="callout-box" style={{ background: 'var(--surface)', borderLeft: '3px solid var(--accent)' }}>
            <strong style={{ fontSize: '0.85rem' }}>Resumir prontuário de um paciente</strong>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem' }}>Disponível na página de cada paciente, com acesso ao histórico clínico.</p>
          </div>
        </Link>
        <Link
          href="/dashboard/crm"
          style={{ flex: 1, minWidth: '220px', textDecoration: 'none', color: 'inherit' }}
        >
          <div className="callout-box" style={{ background: 'var(--surface)', borderLeft: '3px solid var(--accent)' }}>
            <strong style={{ fontSize: '0.85rem' }}>Sugerir mensagem para um lead</strong>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem' }}>Disponível no CRM, ao lado de cada lead do funil.</p>
          </div>
        </Link>
      </div>

      {usage && (
        <p className="sub" style={{ fontSize: '0.78rem' }}>
          {usage.used}/{usage.limit} chamadas de IA usadas hoje por esta clínica (soma as três funções acima).
        </p>
      )}

      <div
        style={{
          border: '1px solid var(--line)', borderRadius: '8px', padding: '0.8rem',
          minHeight: '200px', maxHeight: '420px', overflowY: 'auto', marginBottom: '0.8rem',
          background: 'var(--surface)',
        }}
      >
        {messages.length === 0 && <p className="sub" style={{ margin: 0 }}>Faça uma pergunta para começar.</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '0.5rem' }}>
            <div
              style={{
                maxWidth: '80%', padding: '0.5rem 0.7rem', borderRadius: '10px', fontSize: '0.88rem', whiteSpace: 'pre-wrap',
                background: m.role === 'user' ? 'var(--accent)' : 'var(--ground)',
                color: m.role === 'user' ? '#fff' : 'var(--ink)',
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && <p className="sub" style={{ margin: 0 }}>Pensando…</p>}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onAsk} style={{ flexDirection: 'row', gap: '0.5rem' }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          placeholder={limitReached ? 'Limite diário atingido' : 'Escreva sua pergunta…'}
          disabled={limitReached}
          style={{ flex: 1, padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
          required
        />
        <button type="submit" disabled={loading || limitReached}>{loading ? '…' : 'Perguntar'}</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
