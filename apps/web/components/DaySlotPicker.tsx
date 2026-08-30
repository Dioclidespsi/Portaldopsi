'use client';

import { useEffect, useState } from 'react';
import { Appointment, listAppointments } from '../lib/api';

const DAY_START_HOUR = 7;
const DAY_END_HOUR = 20;
const SLOT_STEP_MINUTES = 30;

/**
 * Mostra os horários já ocupados naquele dia (a partir dos agendamentos reais,
 * não de um sistema separado de "disponibilidade" — esse é outro recurso, pra
 * auto-agendamento público, e nem todo profissional configura) e deixa clicar
 * num horário livre pra preencher a hora escolhida. Faixa fixa 07h-20h a cada
 * 30min — não é a "grade de horários de trabalho" do profissional, é só uma
 * visualização de "o que já está ocupado nesse dia" pra evitar digitar um
 * horário às cegas e esbarrar num conflito.
 */
export default function DaySlotPicker({
  date,
  durationMinutes,
  excludeAppointmentId,
  selectedTime,
  onPick,
}: {
  /** yyyy-mm-dd, horário local */
  date: string;
  durationMinutes: number;
  excludeAppointmentId?: string;
  selectedTime?: string;
  onPick: (time: string) => void;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    const from = new Date(`${date}T00:00:00`);
    const to = new Date(`${date}T23:59:59`);
    listAppointments({ from: from.toISOString(), to: to.toISOString() })
      .then((data) => setAppointments(data.filter((a) => a.id !== excludeAppointmentId && a.status !== 'cancelado')))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, [date, excludeAppointmentId]);

  if (!date) return null;
  if (loading) return <p className="sub" style={{ margin: '0.4rem 0' }}>Carregando horários do dia…</p>;

  const slots: { time: string; start: Date; busy: boolean }[] = [];
  for (let h = DAY_START_HOUR; h < DAY_END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_STEP_MINUTES) {
      const start = new Date(`${date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
      const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
      const busy = appointments.some((a) => new Date(a.startsAt) < end && new Date(a.endsAt) > start);
      slots.push({ time: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, start, busy });
    }
  }

  return (
    <div style={{ margin: '0.5rem 0' }}>
      <p className="sub" style={{ margin: '0 0 0.4rem' }}>
        Horários livres neste dia (riscado = já ocupado):
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {slots.map((s) => (
          <button
            key={s.time}
            type="button"
            disabled={s.busy}
            onClick={() => onPick(s.time)}
            style={{
              fontSize: '0.78rem',
              padding: '0.3rem 0.55rem',
              background: s.time === selectedTime ? 'var(--accent)' : 'transparent',
              color: s.time === selectedTime ? '#fff' : s.busy ? 'var(--ink-soft)' : 'var(--accent)',
              border: `1px solid ${s.busy ? 'var(--line)' : 'var(--accent)'}`,
              textDecoration: s.busy ? 'line-through' : 'none',
              opacity: s.busy ? 0.6 : 1,
            }}
          >
            {s.time}
          </button>
        ))}
      </div>
    </div>
  );
}
