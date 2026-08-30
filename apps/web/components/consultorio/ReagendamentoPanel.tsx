'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import DaySlotPicker from '../DaySlotPicker';
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
  const [done, setDone] = useState<string | null>(null);

  // Só reinicializa o formulário quando o painel troca de agendamento de
  // verdade (outro id) — NÃO a cada vez que startsAt muda, senão o próprio
  // reagendamento bem-sucedido (que muda o startsAt do agendamento ativo)
  // apagava a mensagem de confirmação assim que ela aparecia.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const start = new Date(appointment.startsAt);
    setDate(toLocalDateInput(start));
    setTime(toLocalTimeInput(start));
    setError(null);
    setDone(null);
  }, [appointment.id]);

  const durationMinutes = Math.round((new Date(appointment.endsAt).getTime() - new Date(appointment.startsAt).getTime()) / 60000);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setDone(null);
    if (!date || !time) return;

    const newStartsAt = new Date(`${date}T${time}`);
    const newEndsAt = new Date(newStartsAt.getTime() + durationMinutes * 60 * 1000);

    setSaving(true);
    try {
      const updated = await rescheduleAppointment(appointment.id, {
        startsAt: newStartsAt.toISOString(),
        endsAt: newEndsAt.toISOString(),
      });
      onRescheduled(updated);
      setDone(new Date(updated.startsAt).toLocaleString('pt-BR'));
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
        {new Date(appointment.startsAt).toLocaleString('pt-BR')}. A duração da sessão ({durationMinutes} min) é
        mantida, só o horário muda.
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

      <DaySlotPicker
        date={date}
        durationMinutes={durationMinutes}
        excludeAppointmentId={appointment.id}
        selectedTime={time}
        onPick={setTime}
      />

      {done && (
        <p className="sub" style={{ marginTop: '0.6rem', color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckCircle2 size={16} /> Reagendado para {done}.
        </p>
      )}
      {error && <p style={{ marginTop: '0.6rem' }}><span className="error">Horário ocupado ou indisponível: {error}</span></p>}
    </div>
  );
}
