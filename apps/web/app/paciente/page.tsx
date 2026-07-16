'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  bookOwnAppointment,
  cancelOwnAppointment,
  clearPatientToken,
  confirmOwnAppointment,
  consentToTeleconsulta,
  fetchPatientMe,
  listOwnAppointments,
  listOwnAvailability,
  PatientAppointment,
  PatientMe,
  PatientSlot,
} from '../../lib/patient-api';

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  aguardando_pagamento: 'Aguardando pagamento',
  confirmado: 'Confirmado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
  falta: 'Faltou',
};

const CANCELABLE_STATUSES = ['agendado', 'aguardando_pagamento', 'confirmado'];

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function PatientDashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<PatientMe | null>(null);
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [showBooking, setShowBooking] = useState(false);
  const [sessionPriceCents, setSessionPriceCents] = useState<number | null>(null);
  const [slots, setSlots] = useState<PatientSlot[]>([]);
  const [booking, setBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ paymentLink: string; holdExpiresAt: string } | null>(null);

  useEffect(() => {
    Promise.all([fetchPatientMe(), listOwnAppointments()])
      .then(([meData, appts]) => {
        setMe(meData);
        setAppointments(appts);
      })
      .catch(() => router.push('/paciente/login'))
      .finally(() => setLoading(false));
  }, [router]);

  function onOpenBooking() {
    setShowBooking(true);
    setBookingResult(null);
    listOwnAvailability()
      .then((data) => {
        setSessionPriceCents(data.sessionPriceCents);
        setSlots(data.slots);
      })
      .catch((err) => setError((err as Error).message));
  }

  async function onBookSlot(slotId: string) {
    setError(null);
    setBooking(true);
    try {
      const result = await bookOwnAppointment(slotId);
      setBookingResult(result);
      const appts = await listOwnAppointments();
      setAppointments(appts);
    } catch (err) {
      setError((err as Error).message);
      onOpenBooking();
    } finally {
      setBooking(false);
    }
  }

  async function onCancel(id: string) {
    if (!window.confirm('Cancelar esta sessão?')) return;
    setError(null);
    try {
      await cancelOwnAppointment(id);
      const appts = await listOwnAppointments();
      setAppointments(appts);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onConfirm(id: string) {
    setError(null);
    try {
      const updated = await confirmOwnAppointment(id);
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onConsent(id: string) {
    setError(null);
    try {
      const updated = await consentToTeleconsulta(id);
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function onLogout() {
    clearPatientToken();
    router.push('/paciente/login');
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!me) return null;

  return (
    <div className="shell shell-wide">
      <div className="topbar">
        <div>
          <h1>Olá, {me.name}</h1>
          <p className="sub">Suas sessões</p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={onOpenBooking} style={{ fontSize: '0.9rem' }}>Agendar nova sessão</button>
          <Link href="/paciente/testes">
            <button style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>Meus testes</button>
          </Link>
          <button onClick={onLogout} style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
            Sair
          </button>
        </div>
      </div>

      {showBooking && (
        <div className="callout-box" style={{ marginBottom: '1.2rem' }}>
          {bookingResult ? (
            <>
              <p style={{ margin: '0 0 0.5rem' }}>
                Reservado até {new Date(bookingResult.holdExpiresAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} —
                confirme o pagamento até lá ou o horário será liberado.
              </p>
              <a href={bookingResult.paymentLink} target="_blank" rel="noreferrer">
                <button type="button">Pagar agora</button>
              </a>
            </>
          ) : (
            <>
              <p style={{ margin: '0 0 0.6rem' }}>
                {sessionPriceCents !== null ? `Valor da sessão: ${formatPrice(sessionPriceCents)}` : 'Carregando horários…'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {slots.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    disabled={booking}
                    onClick={() => onBookSlot(s.id)}
                    style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                  >
                    {new Date(s.startsAt).toLocaleString('pt-BR')}
                  </button>
                ))}
                {sessionPriceCents !== null && slots.length === 0 && <span className="sub" style={{ margin: 0 }}>Nenhum horário disponível no momento.</span>}
              </div>
            </>
          )}
          <button
            type="button"
            onClick={() => setShowBooking(false)}
            style={{ marginTop: '0.7rem', fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
          >
            Fechar
          </button>
        </div>
      )}

      {appointments.map((a) => (
        <div key={a.id} style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontSize: '0.95rem', margin: '0 0 0.3rem' }}>
            {new Date(a.startsAt).toLocaleString('pt-BR')} · {STATUS_LABEL[a.status] ?? a.status}
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {a.status === 'agendado' && (
              <button onClick={() => onConfirm(a.id)} style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem' }}>
                Confirmar presença
              </button>
            )}
            {a.videoRoomUrl ? (
              <a href={a.videoRoomUrl} target="_blank">
                <button type="button" style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem' }}>Entrar na teleconsulta</button>
              </a>
            ) : a.hasVideoRoom && a.consentAt === null ? (
              <button
                onClick={() => onConsent(a.id)}
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
              >
                Consentir com teleconsulta
              </button>
            ) : null}
            {CANCELABLE_STATUSES.includes(a.status) && (
              <button
                onClick={() => onCancel(a.id)}
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--crit)', border: '1px solid var(--crit)' }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      ))}
      {appointments.length === 0 && <p className="sub">Nenhuma sessão agendada ainda.</p>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
