'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  createSupervisionSession,
  createTeamMember,
  listSupervisionSessions,
  listTeamMembers,
  SupervisionSession,
  TeamMember,
  updateSupervisionSession,
} from '../../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
};

export default function SupervisaoPage() {
  const router = useRouter();
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

  const supervisors = team.filter((t) => t.role === 'SUPERVISOR');

  useEffect(() => {
    Promise.all([listSupervisionSessions(), listTeamMembers()])
      .then(([s, t]) => {
        setSessions(s);
        setTeam(t);
        const firstSupervisor = t.find((m) => m.role === 'SUPERVISOR');
        if (firstSupervisor) setSupervisorId(firstSupervisor.id);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onAddSupervisor(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const member = await createTeamMember({ name: newName, email: newEmail, password: newPassword, role: 'SUPERVISOR' });
      setTeam((prev) => [...prev, member]);
      setSupervisorId(member.id);
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

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Supervisão</h2>
      <p className="sub">Agenda e registro de sessões entre você e um supervisor cadastrado nesta clínica.</p>

      <table>
        <thead><tr><th>Supervisor</th><th>Início</th><th>Fim</th><th>Status</th></tr></thead>
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
            </tr>
          ))}
          {sessions.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhuma sessão ainda.</td></tr>
          )}
        </tbody>
      </table>

      {supervisors.length === 0 ? (
        <>
          <p className="sub" style={{ marginTop: '1.2rem' }}>Nenhum supervisor cadastrado ainda — adicione um para poder agendar.</p>
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
              {supervisors.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label>Início<input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} required /></label>
          <label>Fim<input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} required /></label>
          <button type="submit">Agendar</button>
        </form>
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
