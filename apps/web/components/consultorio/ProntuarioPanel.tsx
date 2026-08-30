'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { addProntuarioEntry, listProntuario, ProntuarioEntry, summarizeProntuarioWithAi } from '../../lib/api';

/**
 * Web Speech API — nativa do navegador, sem serviço externo, sem chave de API.
 * Só Chrome/Edge implementam de forma confiável, por isso o botão de ditado
 * só aparece quando `webkitSpeechRecognition` existe. O áudio é processado
 * pelo próprio navegador — nunca passa pelo nosso backend.
 */
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

/** Adaptado de dashboard/pacientes/[id]/page.tsx — mesma lógica (incl. ditado por voz), sem o resto da página. */
export default function ProntuarioPanel({ patientId }: { patientId: string }) {
  const [entries, setEntries] = useState<ProntuarioEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dictating, setDictating] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    setLoading(true);
    setSummary(null);
    listProntuario(patientId)
      .then(setEntries)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [patientId]);

  useEffect(() => {
    setSpeechSupported(Boolean((window as any).webkitSpeechRecognition || (window as any).SpeechRecognition));
  }, []);

  function startDictation() {
    const SpeechRecognitionCtor = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition: SpeechRecognitionLike = new SpeechRecognitionCtor();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalText += event.results[i][0].transcript;
      }
      if (finalText) {
        setNewEntry((prev) => (prev ? `${prev} ${finalText.trim()}` : finalText.trim()));
      }
    };
    recognition.onerror = () => setDictating(false);
    recognition.onend = () => setDictating(false);

    recognitionRef.current = recognition;
    recognition.start();
    setDictating(true);
  }

  function stopDictation() {
    recognitionRef.current?.stop();
    setDictating(false);
  }

  async function onAddEntry(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const entry = await addProntuarioEntry(patientId, newEntry);
      setEntries((prev) => [entry, ...prev]);
      setNewEntry('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSummarize() {
    setError(null);
    setSummarizing(true);
    try {
      const { summary } = await summarizeProntuarioWithAi(patientId);
      setSummary(summary);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSummarizing(false);
    }
  }

  if (loading) return <p className="sub">Carregando…</p>;

  return (
    <div>
      <button onClick={onSummarize} disabled={summarizing} style={{ marginBottom: '0.6rem' }}>
        {summarizing ? 'Resumindo…' : 'Resumir com IA'}
      </button>
      {summary && <div className="card" style={{ marginBottom: '0.8rem' }}>{summary}</div>}

      {entries.map((e) => (
        <div key={e.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontSize: '0.88rem', margin: '0 0 0.2rem' }}>{e.content}</p>
          <span className="sub" style={{ margin: 0 }}>{e.author.name} · {new Date(e.createdAt).toLocaleString('pt-BR')}</span>
        </div>
      ))}
      {entries.length === 0 && <p className="sub">Nenhuma entrada ainda.</p>}

      <form onSubmit={onAddEntry} style={{ marginTop: '0.8rem' }}>
        <label>
          Nova entrada
          <textarea
            value={newEntry}
            onChange={(ev) => setNewEntry(ev.target.value)}
            rows={3}
            style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
            required
          />
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button type="submit">Adicionar entrada</button>
          {speechSupported && (
            <button
              type="button"
              onClick={dictating ? stopDictation : startDictation}
              style={{
                background: dictating ? 'var(--accent)' : 'transparent',
                color: dictating ? '#fff' : 'var(--accent)',
                border: '1px solid var(--accent)',
                fontSize: '0.82rem',
                padding: '0.35rem 0.7rem',
              }}
            >
              {dictating ? '⏹ Parar ditado' : '🎤 Ditar'}
            </button>
          )}
        </div>
        {speechSupported && (
          <p className="sub" style={{ marginTop: '0.3rem' }}>
            O texto ditado aparece acima pra você revisar e editar antes de salvar — sua fala é processada pelo
            navegador, nunca é gravada nem enviada ao nosso servidor.
          </p>
        )}
        {!speechSupported && (
          <p className="sub" style={{ marginTop: '0.3rem' }}>Ditado por voz disponível no Chrome/Edge.</p>
        )}
      </form>
      {error && <p style={{ marginTop: '0.6rem' }}><span className="error">{error}</span></p>}
    </div>
  );
}
