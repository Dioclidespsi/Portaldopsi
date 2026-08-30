'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Appointment, rescheduleAppointment } from '../../lib/api';

/** Formata um Date pros inputs nativos de data/hora, em horário local (não UTC). */
function toLocalDateInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function toLocalTimeInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Novo — não existia nenhuma forma de mudar data/hora de um agendamento já
 * criado (só cancelar). Mantém a mesma duração da sessão original, só desloca
 * o horário; o backend recusa se colidir com outro agendamento.
 */
export default function ReagendamentoPanel({
  appointment,
  onRescheduled,
}: {
  appointment: Appointment;
  onRescheduled: (updated: Appointment) => void;
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = new Date(appointment.startsAt);
    setDate(toLocalDateInput(start));
    setTime(toLocalTimeInput(start));
    setError(null);
    setDone(false);
  }, [appointment.id, appointment.startsAt]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setDone(false);
    if (!date || !time) return;

    const durationMs = new Date(appointment.endsAt).getTime() - new Date(appointment.startsAt).getTime();
    const newStartsAt = new Date(`${date}T${time}`);
    const newEndsAt = new Date(newStartsAt.getTime() + durationMs);

    setSaving(true);
    try {
      const updated = await rescheduleAppointment(appointment.id, {
        startsAt: newStartsAt.toISOString(),
        endsAt: newEndsAt.toISOString(),
      });
      onRescheduled(updated);
      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <p className="sub" style={{ marginTop: 0 }}>
        Atendimento com <strong>{appointment.patient.name}</strong> — horário atual:{' '}
        {new Date(appointment.startsAt).toLocaleString('pt-BR')}. A duração da sessão é mantida, só o horário muda.
      </p>
      <form onSubmit={onSubmit} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>
          Nova data
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Novo horário
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <button type="submit" disabled={saving}>{saving ? 'Reagendando…' : 'Reagendar'}</button>
      </form>
      {done && <p className="sub" style={{ marginTop: '0.6rem' }}>Reagendado com sucesso.</p>}
      {error && <p style={{ marginTop: '0.6rem' }}><span className="error">{error}</span></p>}
    </div>
  );
}
