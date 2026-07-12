'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  Appointment,
  createAppointment,
  listAppointments,
  listPatients,
  Patient,
  updateAppointmentStatus,
} from '../../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  confirmado: 'Confirmado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
  falta: 'Faltou',
};

export default function AgendaPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listAppointments(), listPatients()])
      .then(([appointmentsData, patientsData]) => {
        setAppointments(appointmentsData);
        setPatients(patientsData);
        if (patientsData[0]) setPatientId(patientsData[0].id);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onSchedule(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const appointment = await createAppointment({ patientId, startsAt, endsAt });
      setAppointments((prev) => [...prev, appointment].sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onStatusChange(id: string, status: string) {
    const updated = await updateAppointmentStatus(id, status);
    setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Agenda</h2>

      <table>
        <thead>
          <tr><th>Paciente</th><th>Início</th><th>Fim</th><th>Status</th></tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.patient.name}</td>
              <td>{new Date(a.startsAt).toLocaleString('pt-BR')}</td>
              <td>{new Date(a.endsAt).toLocaleString('pt-BR')}</td>
              <td>
                <select value={a.status} onChange={(e) => onStatusChange(a.id, e.target.value)}>
                  {Object.entries(STATUS_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum agendamento ainda.</td></tr>
          )}
        </tbody>
      </table>

      {patients.length === 0 ? (
        <p className="sub" style={{ marginTop: '1.2rem' }}>Cadastre um paciente primeiro para poder agendar.</p>
      ) : (
        <form onSubmit={onSchedule} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label>
            Paciente
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
              {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </label>
          <label>
            Início
            <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} required />
          </label>
          <label>
            Fim
            <input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} required />
          </label>
          <button type="submit">Agendar</button>
        </form>
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
