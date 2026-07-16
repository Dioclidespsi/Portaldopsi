'use client';

import { useMemo, useState } from 'react';
import { Appointment } from '../lib/api';

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  aguardando_pagamento: 'Aguardando pagamento',
  confirmado: 'Confirmado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
  falta: 'Faltou',
};

const STATUS_COLOR: Record<string, string> = {
  agendado: '#3b82f6',
  aguardando_pagamento: '#d97706',
  confirmado: '#10b981',
  concluido: '#6b7280',
  cancelado: '#ef4444',
  falta: '#f59e0b',
};

const START_HOUR = 7;
const END_HOUR = 21;
const HOUR_HEIGHT = 52;

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // semana começa na segunda
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface Props {
  appointments: Appointment[];
  onStatusSelect: (id: string, status: string) => void;
}

export default function AgendaCalendar({ appointments, onStatusSelect }: Props) {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [selected, setSelected] = useState<Appointment | null>(null);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const hours = useMemo(() => Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i), []);
  const totalMinutes = (END_HOUR - START_HOUR) * 60;

  const byDay = useMemo(() => {
    const map = new Map<number, Appointment[]>();
    days.forEach((_, i) => map.set(i, []));
    for (const a of appointments) {
      const start = new Date(a.startsAt);
      const dayIndex = days.findIndex((d) => sameDay(d, start));
      if (dayIndex >= 0) map.get(dayIndex)!.push(a);
    }
    return map;
  }, [appointments, days]);

  function blockStyle(a: Appointment) {
    const start = new Date(a.startsAt);
    const end = new Date(a.endsAt);
    const startMinutes = Math.max(0, (start.getHours() - START_HOUR) * 60 + start.getMinutes());
    const endMinutes = Math.min(totalMinutes, (end.getHours() - START_HOUR) * 60 + end.getMinutes());
    const top = (startMinutes / totalMinutes) * 100;
    const height = Math.max(3, ((endMinutes - startMinutes) / totalMinutes) * 100);
    return { top: `${top}%`, height: `${height}%`, background: STATUS_COLOR[a.status] ?? '#3b82f6' };
  }

  const today = new Date();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
        <button type="button" onClick={() => setWeekStart((d) => addDays(d, -7))} style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
          ← Semana anterior
        </button>
        <button type="button" onClick={() => setWeekStart(startOfWeek(new Date()))} style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
          Hoje
        </button>
        <button type="button" onClick={() => setWeekStart((d) => addDays(d, 7))} style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
          Próxima semana →
        </button>
        <span className="sub" style={{ margin: 0 }}>
          {days[0].toLocaleDateString('pt-BR')} – {days[6].toLocaleDateString('pt-BR')}
        </span>
      </div>

      <div className="table-scroll">
      <div style={{ display: 'grid', gridTemplateColumns: '52px repeat(7, minmax(90px, 1fr))', minWidth: '680px', border: '1px solid var(--line)', borderRadius: '6px', overflow: 'hidden' }}>
        <div />
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              padding: '0.4rem',
              textAlign: 'center',
              fontSize: '0.78rem',
              fontWeight: sameDay(d, today) ? 700 : 400,
              color: sameDay(d, today) ? 'var(--accent)' : 'var(--ink-soft)',
              borderLeft: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {d.toLocaleDateString('pt-BR', { weekday: 'short' })} {d.getDate()}
          </div>
        ))}

        <div style={{ gridColumn: 1, gridRow: 2 }}>
          {hours.map((h) => (
            <div key={h} style={{ height: HOUR_HEIGHT, fontSize: '0.7rem', color: 'var(--ink-soft)', textAlign: 'right', paddingRight: '0.3rem', transform: 'translateY(-0.5em)' }}>
              {h}:00
            </div>
          ))}
        </div>

        {days.map((_, dayIndex) => (
          <div
            key={dayIndex}
            style={{
              gridColumn: dayIndex + 2,
              gridRow: 2,
              position: 'relative',
              borderLeft: '1px solid var(--line)',
              height: hours.length * HOUR_HEIGHT,
            }}
          >
            {hours.map((h, i) => (
              <div key={h} style={{ position: 'absolute', top: i * HOUR_HEIGHT, left: 0, right: 0, height: HOUR_HEIGHT, borderBottom: '1px solid var(--line)' }} />
            ))}
            {(byDay.get(dayIndex) ?? []).map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setSelected(a)}
                style={{
                  position: 'absolute',
                  left: '2%',
                  width: '96%',
                  ...blockStyle(a),
                  color: '#fff',
                  fontSize: '0.7rem',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.15rem 0.3rem',
                  overflow: 'hidden',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
                title={`${a.patient.name} · ${STATUS_LABEL[a.status]}`}
              >
                {a.patient.name}
              </button>
            ))}
          </div>
        ))}
      </div>
      </div>

      {selected && (
        <div className="callout-box" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.7rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <strong>{selected.patient.name}</strong>
          <span className="sub" style={{ margin: 0 }}>
            {new Date(selected.startsAt).toLocaleString('pt-BR')} – {new Date(selected.endsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <select
            value={selected.status}
            onChange={(e) => {
              onStatusSelect(selected.id, e.target.value);
              setSelected(null);
            }}
          >
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSelected(null)}
            style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
