'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '../../../components/DashboardShell';
import AppointmentRail, { PanelKey } from '../../../components/consultorio/AppointmentRail';
import TeleconsultaRoom from '../../../components/consultorio/TeleconsultaRoom';
import AnamnesePanel from '../../../components/consultorio/AnamnesePanel';
import ProntuarioPanel from '../../../components/consultorio/ProntuarioPanel';
import TestesPanel from '../../../components/consultorio/TestesPanel';
import DocumentosPanel from '../../../components/consultorio/DocumentosPanel';
import ReagendamentoPanel from '../../../components/consultorio/ReagendamentoPanel';
import { Appointment, listAppointments, updateAppointmentStatus } from '../../../lib/api';

const PANEL_TITLE: Record<PanelKey, string> = {
  prontuario: 'Prontuário',
  anamnese: 'Anamnese',
  testes: 'Testes',
  documentos: 'Documentos',
  reagendar: 'Reagendar',
};

function dayRange(date: Date) {
  const from = new Date(date);
  from.setHours(0, 0, 0, 0);
  const to = new Date(date);
  to.setHours(23, 59, 59, 999);
  return { from: from.toISOString(), to: to.toISOString() };
}

function sameDay(a: string, b: Date) {
  return new Date(a).toDateString() === b.toDateString();
}

export default function ConsultorioPage() {
  const router = useRouter();
  const [date, setDate] = useState(() => new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingAppointments(true);
    listAppointments(dayRange(date))
      .then((data) => setAppointments(data.sort((a, b) => a.startsAt.localeCompare(b.startsAt))))
      .catch(() => router.push('/login'))
      .finally(() => setLoadingAppointments(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function onSelectAppointment(a: Appointment) {
    setActiveAppointment(a);
    setActivePanel(null);
    setError(null);
  }

  function onSelectPanel(panel: PanelKey) {
    setActivePanel((prev) => (prev === panel ? null : panel));
  }

  function onRescheduled(updated: Appointment) {
    if (sameDay(updated.startsAt, date)) {
      setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)).sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
      setActiveAppointment(updated);
    } else {
      // Foi reagendado pra outro dia — sai da lista de hoje e limpa a seleção.
      setAppointments((prev) => prev.filter((a) => a.id !== updated.id));
      setActiveAppointment(null);
      setActivePanel(null);
    }
  }

  async function onEndSession() {
    if (!activeAppointment) return;
    setError(null);
    try {
      const updated = await updateAppointmentStatus(activeAppointment.id, 'concluido');
      setAppointments((prev) => prev.map((a) => (a.id === updated.id ? { ...a, ...updated } : a)));
      setActiveAppointment(null);
      setActivePanel(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const patientId = activeAppointment?.patientId;

  return (
    <DashboardShell title="Consultório" description="Tudo que você usa durante o atendimento, num só lugar: vídeo, prontuário, anamnese, testes, documentos e reagendamento.">
      {error && <p style={{ marginBottom: '0.6rem' }}><span className="error">{error}</span></p>}

      <div className="consultorio-shell">
        <AppointmentRail
          date={date}
          onDateChange={setDate}
          appointments={appointments}
          loading={loadingAppointments}
          activeAppointmentId={activeAppointment?.id ?? null}
          onSelectAppointment={onSelectAppointment}
          activePanel={activePanel}
          onSelectPanel={onSelectPanel}
        />

        <div className={`consultorio-video-wrap ${activePanel ? 'small' : ''}`}>
          {activeAppointment && (
            <div className="consultorio-video-header">
              <span style={{ fontSize: '0.88rem' }}>
                Atendendo: <strong>{activeAppointment.patient.name}</strong> —{' '}
                {new Date(activeAppointment.startsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button
                type="button"
                onClick={onEndSession}
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                Encerrar atendimento
              </button>
            </div>
          )}
          <div className="consultorio-video-body">
            {activeAppointment ? (
              <TeleconsultaRoom appointment={activeAppointment} small={Boolean(activePanel)} />
            ) : (
              <div className="consultorio-video-placeholder">
                <p className="sub">Selecione um atendimento à esquerda pra iniciar a videochamada.</p>
              </div>
            )}
          </div>
        </div>

        {activePanel && activeAppointment && patientId && (
          <div className="consultorio-panel">
            <h3 style={{ fontSize: '0.95rem', marginTop: 0 }}>{PANEL_TITLE[activePanel]}</h3>
            {activePanel === 'prontuario' && <ProntuarioPanel patientId={patientId} />}
            {activePanel === 'anamnese' && <AnamnesePanel patientId={patientId} />}
            {activePanel === 'testes' && <TestesPanel patientId={patientId} />}
            {activePanel === 'documentos' && <DocumentosPanel patientId={patientId} />}
            {activePanel === 'reagendar' && (
              <ReagendamentoPanel appointment={activeAppointment} onRescheduled={onRescheduled} />
            )}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
