'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardNav from '../../../../components/DashboardNav';
import {
  addProntuarioEntry,
  Appointment,
  createHomework,
  createTeleconsultaRoom,
  deleteHomework,
  enablePatientPortal,
  fetchOwnProfile,
  generatePatientActivationLink,
  getPatient,
  Homework,
  listHomeworkForPatient,
  listPatientAppointments,
  listProntuario,
  PatientDetail,
  ProntuarioEntry,
  summarizeProntuarioWithAi,
} from '../../../../lib/api';

/**
 * Web Speech API — nativa do navegador, sem serviço externo, sem chave de API.
 * Só Chrome/Edge implementam (Firefox e Safari não têm suporte confiável), por
 * isso o botão de ditado só aparece quando `webkitSpeechRecognition` existe.
 * O áudio é processado pelo próprio navegador (Google, no caso do Chrome) —
 * nunca passa pelo nosso backend nem é armazenado por nós.
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

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [entries, setEntries] = useState<ProntuarioEntry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [portalPassword, setPortalPassword] = useState('');
  const [tenantSlug, setTenantSlug] = useState('');
  const [activationLink, setActivationLink] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState(false);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [homeworkTitle, setHomeworkTitle] = useState('');
  const [homeworkInstructions, setHomeworkInstructions] = useState('');
  const [homeworkDueDate, setHomeworkDueDate] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dictating, setDictating] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    Promise.all([
      getPatient(params.id),
      listProntuario(params.id),
      listPatientAppointments(params.id),
      fetchOwnProfile(),
      listHomeworkForPatient(params.id),
    ])
      .then(([p, e, a, profile, hw]) => {
        setPatient(p);
        setEntries(e);
        setAppointments(a);
        setTenantSlug(profile.slug);
        setHomeworks(hw);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [params.id, router]);

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
      const entry = await addProntuarioEntry(params.id, newEntry);
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
      const { summary } = await summarizeProntuarioWithAi(params.id);
      setSummary(summary);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSummarizing(false);
    }
  }

  async function onEnablePortal(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const updated = await enablePatientPortal(params.id, portalPassword);
      setPatient((prev) => (prev ? { ...prev, portalEnabled: updated.portalEnabled } : prev));
      setPortalPassword('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onGenerateActivationLink() {
    setError(null);
    setGeneratingLink(true);
    try {
      const { activationToken } = await generatePatientActivationLink(params.id);
      const url = `${window.location.origin}/paciente/ativar?slug=${encodeURIComponent(tenantSlug)}&token=${activationToken}`;
      setActivationLink(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGeneratingLink(false);
    }
  }

  async function onAssignHomework(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const hw = await createHomework({
        patientId: params.id,
        title: homeworkTitle,
        instructions: homeworkInstructions,
        dueDate: homeworkDueDate || undefined,
      });
      setHomeworks((prev) => [hw, ...prev]);
      setHomeworkTitle('');
      setHomeworkInstructions('');
      setHomeworkDueDate('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDeleteHomework(id: string) {
    setError(null);
    try {
      await deleteHomework(id);
      setHomeworks((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onCreateRoom(appointmentId: string) {
    setError(null);
    try {
      const updated = await createTeleconsultaRoom(appointmentId);
      setAppointments((prev) => prev.map((a) => (a.id === appointmentId ? { ...a, ...updated } : a)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!patient) return null;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>{patient.name}{patient.socialName && ` (${patient.socialName})`}</h2>
      <p className="sub">{patient.email ?? '—'} · {patient.phone ?? '—'}</p>
      {error && <span className="error">{error}</span>}

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.2rem' }}>Prontuário</h3>
      <button onClick={onSummarize} disabled={summarizing} style={{ marginBottom: '0.6rem' }}>
        {summarizing ? 'Resumindo…' : 'Resumir com IA'}
      </button>
      {summary && <div className="callout-box" style={{ marginBottom: '0.8rem' }}>{summary}</div>}

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

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Agenda</h3>
      <table>
        <thead><tr><th>Início</th><th>Status</th><th>Teleconsulta</th></tr></thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{new Date(a.startsAt).toLocaleString('pt-BR')}</td>
              <td>{a.status}</td>
              <td>
                {a.videoRoomUrl ? (
                  <a href={a.videoRoomUrl} target="_blank">Sala criada</a>
                ) : (
                  <button onClick={() => onCreateRoom(a.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                    Criar sala
                  </button>
                )}
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr><td colSpan={3} style={{ color: 'var(--ink-soft)' }}>Nenhum agendamento ainda.</td></tr>
          )}
        </tbody>
      </table>

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Dever de casa</h3>
      <table>
        <thead><tr><th>Título</th><th>Status</th><th>Prazo</th><th>Resposta do paciente</th><th></th></tr></thead>
        <tbody>
          {homeworks.map((h) => (
            <tr key={h.id}>
              <td>{h.title}</td>
              <td>{h.status === 'concluido' ? 'Concluído' : 'Pendente'}</td>
              <td>{h.dueDate ? new Date(h.dueDate).toLocaleDateString('pt-BR') : '—'}</td>
              <td className="sub" style={{ margin: 0 }}>{h.patientNote ?? '—'}</td>
              <td>
                <button
                  onClick={() => onDeleteHomework(h.id)}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {homeworks.length === 0 && (
            <tr><td colSpan={5} style={{ color: 'var(--ink-soft)' }}>Nenhum dever de casa atribuído ainda.</td></tr>
          )}
        </tbody>
      </table>
      <form onSubmit={onAssignHomework} style={{ marginTop: '0.8rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ minWidth: '160px' }}>
          Título
          <input value={homeworkTitle} onChange={(e) => setHomeworkTitle(e.target.value)} required />
        </label>
        <label style={{ flex: 1, minWidth: '220px' }}>
          Instruções
          <input value={homeworkInstructions} onChange={(e) => setHomeworkInstructions(e.target.value)} required />
        </label>
        <label>
          Prazo (opcional)
          <input type="date" value={homeworkDueDate} onChange={(e) => setHomeworkDueDate(e.target.value)} />
        </label>
        <button type="submit">Atribuir</button>
      </form>

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Aplicativo do paciente</h3>
      {patient.portalEnabled ? (
        <p className="sub">Portal ativado — o paciente já pode entrar com o e-mail cadastrado.</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
            <button type="button" onClick={onGenerateActivationLink} disabled={!patient.email || generatingLink}>
              {generatingLink ? 'Gerando…' : 'Gerar link de ativação'}
            </button>
            {!patient.email && <span className="sub" style={{ margin: 0 }}>Cadastre um e-mail primeiro.</span>}
          </div>
          {activationLink && (
            <div className="callout-box" style={{ marginBottom: '1rem' }}>
              <p style={{ margin: '0 0 0.4rem' }}>
                Envie este link pro paciente (WhatsApp, SMS) — ele mesmo define a senha. Válido por 48h:
              </p>
              <input readOnly value={activationLink} onFocus={(e) => e.target.select()} style={{ fontSize: '0.8rem' }} />
            </div>
          )}
          <p className="sub" style={{ margin: '0 0 0.5rem' }}>Ou defina a senha você mesmo:</p>
          <form onSubmit={onEnablePortal} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <label>
              Senha inicial
              <input type="password" minLength={8} value={portalPassword} onChange={(e) => setPortalPassword(e.target.value)} required />
            </label>
            <button type="submit" disabled={!patient.email}>Ativar portal</button>
          </form>
        </>
      )}
    </div>
  );
}
