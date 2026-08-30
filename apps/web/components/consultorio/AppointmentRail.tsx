'use client';

import { ChevronLeft, ChevronRight, ClipboardList, FileText, FolderOutput, NotebookPen, CalendarClock } from 'lucide-react';
import { Appointment } from '../../lib/api';

export type PanelKey = 'anamnese' | 'testes' | 'documentos' | 'reagendar' | 'prontuario';

const PANEL_ITEMS: { key: PanelKey; label: string; icon: typeof FileText }[] = [
  { key: 'prontuario', label: 'Prontuário', icon: NotebookPen },
  { key: 'anamnese', label: 'Anamnese', icon: ClipboardList },
  { key: 'testes', label: 'Testes', icon: FileText },
  { key: 'documentos', label: 'Documentos', icon: FolderOutput },
  { key: 'reagendar', label: 'Reagendar', icon: CalendarClock },
];

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  aguardando_pagamento: 'Aguard. pagamento',
  confirmado: 'Confirmado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
  falta: 'Faltou',
};

function formatDateLabel(date: Date) {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const label = date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
  return isToday ? `Hoje — ${label}` : label;
}

export default function AppointmentRail({
  date,
  onDateChange,
  appointments,
  loading,
  activeAppointmentId,
  onSelectAppointment,
  activePanel,
  onSelectPanel,
}: {
  date: Date;
  onDateChange: (d: Date) => void;
  appointments: Appointment[];
  loading: boolean;
  activeAppointmentId: string | null;
  onSelectAppointment: (a: Appointment) => void;
  activePanel: PanelKey | null;
  onSelectPanel: (p: PanelKey) => void;
}) {
  function shiftDay(delta: number) {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);
    onDateChange(next);
  }

  return (
    <div className="consultorio-rail">
      <div className="consultorio-rail-daynav">
        <button type="button" onClick={() => shiftDay(-1)} aria-label="Dia anterior">
          <ChevronLeft size={16} />
        </button>
        <span>{formatDateLabel(date)}</span>
        <button type="button" onClick={() => shiftDay(1)} aria-label="Próximo dia">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="consultorio-rail-list">
        {loading && <p className="sub" style={{ padding: '0.6rem' }}>Carregando…</p>}
        {!loading && appointments.length === 0 && (
          <p className="sub" style={{ padding: '0.6rem' }}>Nenhum atendimento neste dia.</p>
        )}
        {appointments.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`consultorio-rail-item ${a.id === activeAppointmentId ? 'active' : ''}`}
            onClick={() => onSelectAppointment(a)}
          >
            <strong>{new Date(a.startsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</strong>
            <span>{a.patient.name}</span>
            <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>{STATUS_LABEL[a.status] ?? a.status}</span>
          </button>
        ))}
      </div>

      <div className="consultorio-rail-panels">
        {PANEL_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={`consultorio-rail-panel-btn ${activePanel === key ? 'active' : ''}`}
            disabled={!activeAppointmentId}
            onClick={() => onSelectPanel(key)}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
