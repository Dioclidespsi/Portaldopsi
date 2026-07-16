'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  createSupervisionSession,
  createSupervisionTeleconsultaRoom,
  createTeamMember,
  fetchMe,
  listSupervisionMessages,
  listSupervisionSessions,
  listTeamMembers,
  Me,
  sendSupervisionMessage,
  SupervisionMessage,
  SupervisionSession,
  TeamMember,
  updateSupervisionSession,
} from '../../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
};

const SUPERVISOR_STATUS_LABEL: Record<string, string> = {
  PENDENTE: 'aguardando aprovação da plataforma',
  REJEITADO: 'não aprovado pela plataforma',
};

export default function SupervisaoPage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [sessions, setSessions] = useState<SupervisionSession[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [supervisorId, setSupervisorId] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [partnerId, setPartnerId] = useState('');
  const [messages, setMessages] = useState<SupervisionMessage[]>([]);
  const [messageText, setMessageText] = useState('');

  const allSupervisors = team.filter((t) => t.role === 'SUPERVISOR');
  const approvedSupervisors = allSupervisors.filter((t) => t.supervisorApprovalStatus === 'APROVADO');

  useEffect(() => {
    Promise.all([listSupervisionSessions(), listTeamMembers(), fetchMe()])
      .then(([s, t, m]) => {
        setSessions(s);
        setTeam(t);
        setMe(m);
        const firstApproved = t.find((x) => x.role === 'SUPERVISOR' && x.supervisorApprovalStatus === 'APROVADO');
        if (firstApproved) setSupervisorId(firstApproved.id);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const partners = me
    ? Array.from(
        new Map(
          sessions
            .filter((s) => s.supervisorId === me.id || s.superviseeId === me.id)
            .map((s) => {
              const isMeSupervisor = s.supervisorId === me.id;
              const id = isMeSupervisor ? s.superviseeId : s.supervisorId;
              const name = isMeSupervisor ? s.supervisee.name : s.supervisor.name;
              return [id, { id, name }] as const;
            }),
        ).values(),
      )
    : [];

  useEffect(() => {
    if (!partnerId && partners.length > 0) setPartnerId(partners[0].id);
  }, [partners, partnerId]);

  useEffect(() => {
    if (!partnerId) return;
    listSupervisionMessages(partnerId).then(setMessages);
  }, [partnerId]);

  async function onAddSupervisor(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const member = await createTeamMember({ name: newName, email: newEmail, password: newPassword, role: 'SUPERVISOR' });
      setTeam((prev) => [...prev, member]);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSchedule(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const session = await createSupervisionSession({ supervisorId, startsAt, endsAt });
      setSessions((prev) => [...prev, session].sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onStatusChange(id: string, status: string) {
    const updated = await updateSupervisionSession(id, { status });
    setSessions((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }

  async function onCreateRoom(id: string) {
    setError(null);
    try {
      const updated = await createSupervisionTeleconsultaRoom(id);
      setSessions((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSendMessage(e: FormEvent) {
    e.preventDefault();
    if (!partnerId || !messageText.trim()) return;
    setError(null);
    try {
      const message = await sendSupervisionMessage(partnerId, messageText);
      setMessages((prev) => [...prev, message]);
      setMessageText('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Supervisão</h2>
      <p className="sub">Agenda e registro de sessões entre você e um supervisor cadastrado nesta clínica.</p>

      <table>
        <thead><tr><th>Supervisor</th><th>Início</th><th>Fim</th><th>Status</th><th>Videochamada</th></tr></thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id}>
              <td>{s.supervisor.name}</td>
              <td>{new Date(s.startsAt).toLocaleString('pt-BR')}</td>
              <td>{new Date(s.endsAt).toLocaleString('pt-BR')}</td>
              <td>
                <select value={s.status} onChange={(e) => onStatusChange(s.id, e.target.value)}>
                  {Object.entries(STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </td>
              <td>
                {s.videoRoomUrl ? (
                  <a href={s.videoRoomUrl} target="_blank" rel="noreferrer">Entrar na chamada</a>
                ) : (
                  <button onClick={() => onCreateRoom(s.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                    Criar sala
                  </button>
                )}
              </td>
            </tr>
          ))}
          {sessions.length === 0 && (
            <tr><td colSpan={5} style={{ color: 'var(--ink-soft)' }}>Nenhuma sessão ainda.</td></tr>
          )}
        </tbody>
      </table>

      {allSupervisors.some((s) => s.supervisorApprovalStatus !== 'APROVADO') && (
        <p className="sub" style={{ marginTop: '0.8rem' }}>
          {allSupervisors
            .filter((s) => s.supervisorApprovalStatus !== 'APROVADO')
            .map((s) => `${s.name} (${SUPERVISOR_STATUS_LABEL[s.supervisorApprovalStatus ?? 'PENDENTE']})`)
            .join(', ')}
        </p>
      )}

      {approvedSupervisors.length === 0 ? (
        <>
          <p className="sub" style={{ marginTop: '1.2rem' }}>
            Nenhum supervisor aprovado pela plataforma ainda — adicione um (fica pendente até o admin autorizar).
          </p>
          <form onSubmit={onAddSupervisor} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <label>Nome<input value={newName} onChange={(e) => setNewName(e.target.value)} required /></label>
            <label>E-mail<input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required /></label>
            <label>Senha<input type="password" minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></label>
            <button type="submit">Adicionar supervisor</button>
          </form>
        </>
      ) : (
        <form onSubmit={onSchedule} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label>
            Supervisor
            <select value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)}>
              {approvedSupervisors.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label>Início<input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} required /></label>
          <label>Fim<input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} required /></label>
          <button type="submit">Agendar</button>
        </form>
      )}
      {error && <span className="error">{error}</span>}

      {partners.length > 0 && (
        <div style={{ marginTop: '1.6rem' }}>
          <h3 style={{ fontSize: '0.95rem' }}>Conversa</h3>
          <label style={{ maxWidth: '260px' }}>
            Com
            <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)}>
              {partners.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </label>

          <div style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '0.8rem', marginTop: '0.6rem', maxHeight: '260px', overflowY: 'auto' }}>
            {messages.length === 0 && <p className="sub" style={{ margin: 0 }}>Nenhuma mensagem ainda.</p>}
            {messages.map((m) => (
              <div key={m.id} style={{ marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.8rem' }}>{m.sender.id === me?.id ? 'Você' : m.sender.name}</strong>
                <span className="sub" style={{ fontSize: '0.72rem', marginLeft: '0.4rem' }}>
                  {new Date(m.createdAt).toLocaleString('pt-BR')}
                </span>
                <p style={{ margin: '0.1rem 0 0', fontSize: '0.88rem' }}>{m.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={onSendMessage} style={{ flexDirection: 'row', marginTop: '0.6rem', gap: '0.5rem' }}>
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Escreva uma mensagem"
              style={{ flex: 1 }}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
}
