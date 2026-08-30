'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardShell from '../../../../components/DashboardShell';
import WhatsAppButton from '../../../../components/WhatsAppButton';
import {
  addProntuarioEntry,
  AnamneseTemplate,
  Appointment,
  createHomework,
  createTeleconsultaRoom,
  getTeleconsultaJoinLink,
  getTeleconsultaPatientJoinLink,
  deleteHomework,
  enablePatientPortal,
  generatePatientActivationLink,
  getAnamnese,
  getAnamneseCatalog,
  getPatient,
  Homework,
  listHomeworkForPatient,
  listPatientAppointments,
  listProntuario,
  PatientDetail,
  ProntuarioEntry,
  setPatientPrivateNote,
  summarizeProntuarioWithAi,
  upsertAnamnese,
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
  const [portalMessage, setPortalMessage] = useState<string | null>(null);
  const [activationLink, setActivationLink] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState(false);
  const [patientJoinLinks, setPatientJoinLinks] = useState<Record<string, string>>({});
  const [generatingPatientLinkFor, setGeneratingPatientLinkFor] = useState<string | null>(null);
  const [copiedLinkFor, setCopiedLinkFor] = useState<string | null>(null);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [homeworkTitle, setHomeworkTitle] = useState('');
  const [homeworkInstructions, setHomeworkInstructions] = useState('');
  const [homeworkDueDate, setHomeworkDueDate] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);
  const [privateNote, setPrivateNoteValue] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [noteSavedAt, setNoteSavedAt] = useState<Date | null>(null);
  const [anamneseCatalog, setAnamneseCatalog] = useState<AnamneseTemplate[]>([]);
  const [anamneseSlug, setAnamneseSlug] = useState<string | null>(null);
  const [anamneseFields, setAnamneseFields] = useState<Record<string, string>>({});
  const [savingAnamnese, setSavingAnamnese] = useState(false);
  const [anamneseSavedAt, setAnamneseSavedAt] = useState<Date | null>(null);
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
      listHomeworkForPatient(params.id),
      getAnamneseCatalog(),
      getAnamnese(params.id),
    ])
      .then(([p, e, a, hw, catalog, anamnese]) => {
        setPatient(p);
        setEntries(e);
        setAppointments(a);
        setHomeworks(hw);
        setPrivateNoteValue(p.privateNote ?? '');
        setAnamneseCatalog(catalog);
        if (anamnese.entry) {
          setAnamneseSlug(anamnese.entry.templateSlug);
          setAnamneseFields(anamnese.entry.fields);
        } else {
          setAnamneseSlug(anamnese.suggestedTemplateSlug ?? catalog[0]?.slug ?? null);
        }
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

  async function onSavePrivateNote() {
    setError(null);
    setSavingNote(true);
    try {
      await setPatientPrivateNote(params.id, privateNote);
      setNoteSavedAt(new Date());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSavingNote(false);
    }
  }

  function onChangeAnamneseTemplate(slug: string) {
    setAnamneseSlug(slug);
    setAnamneseFields({});
  }

  function onChangeAnamneseField(key: string, value: string) {
    setAnamneseFields((prev) => ({ ...prev, [key]: value }));
  }

  async function onSaveAnamnese() {
    if (!anamneseSlug) return;
    setError(null);
    setSavingAnamnese(true);
    try {
      await upsertAnamnese(params.id, anamneseSlug, anamneseFields);
      setAnamneseSavedAt(new Date());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSavingAnamnese(false);
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
      setPatient((prev) => (prev ? { ...prev, patientAccountId: updated.patientAccountId } : prev));
      setPortalPassword('');
      setPortalMessage(
        updated.linkedExistingAccount
          ? 'Este e-mail já tinha conta em outra clínica — só vinculamos aqui. O paciente continua usando a senha que já tinha.'
          : 'Portal ativado com a nova senha.',
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onGenerateActivationLink() {
    setError(null);
    setGeneratingLink(true);
    try {
      const { activationToken } = await generatePatientActivationLink(params.id);
      const url = `${window.location.origin}/paciente/ativar?token=${activationToken}`;
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

  async function onJoinRoom(appointmentId: string) {
    setError(null);
    // Abre a aba já no clique (gesto do usuário) e só troca a URL depois —
    // esperar o fetch antes de window.open() arrisca cair no bloqueador de pop-up.
    const newTab = window.open('about:blank', '_blank');
    try {
      const { url } = await getTeleconsultaJoinLink(appointmentId);
      if (newTab) newTab.location.href = url;
    } catch (err) {
      newTab?.close();
      setError((err as Error).message);
    }
  }

  /**
   * Link com papel de paciente pronto pra copiar e mandar por WhatsApp/e-mail — alternativa manual
   * pro caso do fluxo automático dentro do app do paciente falhar (rede, navegador do próprio
   * paciente, etc). Nunca usar o link de "Entrar na sala" (esse é o do profissional, com papel de
   * moderador) pra isso.
   */
  async function onGeneratePatientLink(appointmentId: string) {
    setError(null);
    setGeneratingPatientLinkFor(appointmentId);
    try {
      const { url } = await getTeleconsultaPatientJoinLink(appointmentId);
      setPatientJoinLinks((prev) => ({ ...prev, [appointmentId]: url }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGeneratingPatientLinkFor(null);
    }
  }

  async function onCopyPatientLink(appointmentId: string) {
    const url = patientJoinLinks[appointmentId];
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopiedLinkFor(appointmentId);
    setTimeout(() => setCopiedLinkFor((prev) => (prev === appointmentId ? null : prev)), 1600);
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!patient) return null;

  const patientTitle = `${patient.name}${patient.socialName ? ` (${patient.socialName})` : ''}`;
  const patientDescription = `${patient.email ?? '—'} · ${patient.phone ?? '—'}`;

  return (
    <DashboardShell title={patientTitle} description={patientDescription}>
      {patient.phone && (
        <div style={{ marginBottom: '0.6rem' }}>
          <WhatsAppButton name={patient.socialName || patient.name} phone={patient.phone} />
        </div>
      )}
      {error && <span className="error">{error}</span>}

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.2rem' }}>🔒 Anotações privadas (só você vê)</h3>
      <p className="sub" style={{ marginTop: 0 }}>
        Rascunho pessoal seu — nunca aparece pro paciente, em nenhum PDF ou tela. Use pra se guiar entre sessões.
        Diferente do prontuário abaixo, este campo pode ser editado e sobrescrito quando quiser.
      </p>
      <textarea
        value={privateNote}
        onChange={(e) => setPrivateNoteValue(e.target.value)}
        rows={4}
        placeholder="Ex: retomar o tema do conflito com o irmão na próxima sessão…"
        style={{
          width: '100%', padding: '0.55rem 0.7rem', border: '1px dashed var(--line)', borderRadius: '6px',
          fontFamily: 'inherit', fontSize: '0.9rem', background: 'var(--surface)',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.4rem', marginBottom: '1.4rem' }}>
        <button type="button" onClick={onSavePrivateNote} disabled={savingNote}>
          {savingNote ? 'Salvando…' : 'Salvar anotação privada'}
        </button>
        {noteSavedAt && (
          <span className="sub" style={{ margin: 0 }}>Salvo às {noteSavedAt.toLocaleTimeString('pt-BR')}</span>
        )}
      </div>

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

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Anamnese</h3>
      <p className="sub" style={{ marginTop: 0 }}>
        Escolha o modelo pela faixa etária do paciente (já vem sugerido pela idade cadastrada) e preencha com suas
        palavras — as perguntas em cada campo são só um guia. Diferente do prontuário, aqui você pode voltar e editar
        quando quiser.
      </p>
      <label style={{ maxWidth: '320px', marginBottom: '0.8rem' }}>
        Modelo
        <select value={anamneseSlug ?? ''} onChange={(e) => onChangeAnamneseTemplate(e.target.value)}>
          {anamneseCatalog.map((t) => (
            <option key={t.slug} value={t.slug}>{t.title}</option>
          ))}
        </select>
      </label>
      {anamneseCatalog
        .filter((t) => t.slug === anamneseSlug)
        .map((template) => (
          <div key={template.slug} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {template.sections.map((section) => (
              <label key={section.key}>
                {section.label}
                <textarea
                  value={anamneseFields[section.key] ?? ''}
                  onChange={(e) => onChangeAnamneseField(section.key, e.target.value)}
                  placeholder={section.placeholder}
                  rows={3}
                  style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.9rem' }}
                />
              </label>
            ))}
          </div>
        ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.6rem', marginBottom: '1.4rem' }}>
        <button type="button" onClick={onSaveAnamnese} disabled={savingAnamnese || !anamneseSlug}>
          {savingAnamnese ? 'Salvando…' : 'Salvar anamnese'}
        </button>
        {anamneseSavedAt && (
          <span className="sub" style={{ margin: 0 }}>Salvo às {anamneseSavedAt.toLocaleTimeString('pt-BR')}</span>
        )}
      </div>

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Agenda</h3>
      <p className="sub">
        "Gerar link p/ enviar" cria um link de entrada para o paciente (não use o link de "Entrar na sala", que é
        seu e dá controle de moderador) — útil como alternativa por WhatsApp se o paciente tiver dificuldade pelo
        app.
      </p>
      <table>
        <thead><tr><th>Início</th><th>Status</th><th>Teleconsulta</th></tr></thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{new Date(a.startsAt).toLocaleString('pt-BR')}</td>
              <td>{a.status}</td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {a.videoRoomUrl ? (
                      <button onClick={() => onJoinRoom(a.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                        Entrar na sala
                      </button>
                    ) : (
                      <button onClick={() => onCreateRoom(a.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                        Criar sala
                      </button>
                    )}
                    {a.videoRoomUrl && (
                      <button
                        onClick={() => onGeneratePatientLink(a.id)}
                        disabled={generatingPatientLinkFor === a.id}
                        style={{
                          fontSize: '0.78rem', padding: '0.3rem 0.6rem',
                          background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)',
                        }}
                      >
                        {generatingPatientLinkFor === a.id ? 'Gerando…' : 'Gerar link p/ enviar'}
                      </button>
                    )}
                  </div>
                  {patientJoinLinks[a.id] && (
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <input
                        readOnly
                        value={patientJoinLinks[a.id]}
                        onFocus={(e) => e.target.select()}
                        style={{ fontSize: '0.75rem', width: '220px' }}
                      />
                      <button
                        type="button"
                        onClick={() => onCopyPatientLink(a.id)}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                      >
                        {copiedLinkFor === a.id ? 'Copiado ✓' : 'Copiar'}
                      </button>
                    </div>
                  )}
                </div>
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
      {portalMessage && <div className="callout-box" style={{ marginBottom: '1rem' }}>{portalMessage}</div>}
      {patient.patientAccountId ? (
        <p className="sub">Portal ativado — o paciente já pode entrar com o e-mail cadastrado.</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
            <button type="button" onClick={onGenerateActivationLink} disabled={!patient.email || generatingLink}>
              {generatingLink ? 'Gerando…' : 'Gerar link de ativação'}
            </button>
            {!patient.email && <span className="sub" style={{ margin: 0 }}>Cadastre um e-mail primeiro.</span>}
          </div>
          <p className="sub" style={{ margin: '0 0 0.8rem' }}>
            Se o paciente já usa o portal em outra clínica, qualquer um dos dois caminhos abaixo só confirma o vínculo — a senha
            que ele já tem continua valendo.
          </p>
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
    </DashboardShell>
  );
}
