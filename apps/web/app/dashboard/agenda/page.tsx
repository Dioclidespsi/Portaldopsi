'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '../../../components/DashboardShell';
import AgendaCalendar from '../../../components/AgendaCalendar';
import {
  Appointment,
  AvailabilitySlot,
  CreateSlotBlockResult,
  createAppointment,
  createAvailabilitySlotBlock,
  deleteAvailabilitySlot,
  fetchOwnProfile,
  listAppointments,
  listAvailability,
  listPatients,
  Patient,
  Profile,
  updateAppointmentStatus,
  updateProfile,
} from '../../../lib/api';

const WEEKDAYS = [
  { value: 1, label: 'Seg' },
  { value: 2, label: 'Ter' },
  { value: 3, label: 'Qua' },
  { value: 4, label: 'Qui' },
  { value: 5, label: 'Sex' },
  { value: 6, label: 'Sáb' },
  { value: 0, label: 'Dom' },
];

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  aguardando_pagamento: 'Aguardando pagamento',
  confirmado: 'Confirmado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
  falta: 'Faltou',
};

const DURATIONS = [30, 40, 45, 50, 60];

const PERIODS = {
  agendados: 'Agendados (próximos)',
  semana: 'Última semana',
  mes: 'Último mês',
  tresmeses: 'Últimos 3 meses',
  ano: 'Último ano',
} as const;
type Period = keyof typeof PERIODS;

function periodRange(period: Period): { from?: string; to?: string } {
  const now = new Date();
  if (period === 'agendados') return { from: now.toISOString() };
  const days = { semana: 7, mes: 30, tresmeses: 90, ano: 365 }[period as Exclude<Period, 'agendados'>];
  const from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return { from: from.toISOString(), to: now.toISOString() };
}

export default function AgendaPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [duration, setDuration] = useState(50);
  const [durationIsCustom, setDurationIsCustom] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | keyof typeof STATUS_LABEL>('todos');
  const [period, setPeriod] = useState<Period>('agendados');
  const [view, setView] = useState<'lista' | 'calendario'>('lista');
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [cancelReasonDraft, setCancelReasonDraft] = useState('');
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [priceReais, setPriceReais] = useState('');
  const [bookingEnabled, setBookingEnabled] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [blockFromDate, setBlockFromDate] = useState('');
  const [blockToDate, setBlockToDate] = useState('');
  const [blockDays, setBlockDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [blockStartTime, setBlockStartTime] = useState('08:00');
  const [blockEndTime, setBlockEndTime] = useState('18:00');
  const [blockDuration, setBlockDuration] = useState(50);
  const [blockDurationIsCustom, setBlockDurationIsCustom] = useState(false);
  const [blockInterval, setBlockInterval] = useState(0);
  const [blockSubmitting, setBlockSubmitting] = useState(false);
  const [blockResult, setBlockResult] = useState<CreateSlotBlockResult | null>(null);

  async function loadAppointments(p: Period) {
    const data = await listAppointments(periodRange(p));
    setAppointments(data.sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
  }

  async function loadAvailability() {
    const data = await listAvailability();
    setSlots(data.sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
  }

  useEffect(() => {
    Promise.all([loadAppointments(period), listPatients(true), fetchOwnProfile(), listAvailability()])
      .then(([, patientsData, profileData, slotsData]) => {
        setPatients(patientsData);
        setProfile(profileData);
        setPriceReais(profileData.sessionPriceCents ? (profileData.sessionPriceCents / 100).toFixed(2) : '');
        setBookingEnabled(profileData.bookingEnabled);
        setSlots(slotsData.sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (loading) return;
    loadAppointments(period).catch((err) => setError((err as Error).message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  useEffect(() => {
    if (patients[0] && !patientId) setPatientId(patients[0].id);
  }, [patients, patientId]);

  async function onSchedule(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const endsAt = new Date(new Date(startsAt).getTime() + duration * 60 * 1000).toISOString();
      const appointment = await createAppointment({ patientId, startsAt: new Date(startsAt).toISOString(), endsAt });
      setAppointments((prev) => [...prev, appointment].sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
      setStartsAt('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSaveBookingSettings(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSavingSettings(true);
    try {
      const cents = priceReais ? Math.round(Number(priceReais.replace(',', '.')) * 100) : undefined;
      const updated = await updateProfile({ sessionPriceCents: cents, bookingEnabled });
      setProfile(updated);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSavingSettings(false);
    }
  }

  function toggleBlockDay(day: number) {
    setBlockDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()));
  }

  async function onReleaseBlock(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBlockResult(null);
    if (blockDays.length === 0) {
      setError('Selecione ao menos um dia da semana.');
      return;
    }
    setBlockSubmitting(true);
    try {
      const result = await createAvailabilitySlotBlock({
        fromDate: blockFromDate,
        toDate: blockToDate,
        daysOfWeek: blockDays,
        startTime: blockStartTime,
        endTime: blockEndTime,
        durationMinutes: blockDuration,
        intervalMinutes: blockInterval || undefined,
      });
      setBlockResult(result);
      await loadAvailability();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBlockSubmitting(false);
    }
  }

  async function onRemoveSlot(id: string) {
    setError(null);
    try {
      await deleteAvailabilitySlot(id);
      setSlots((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError((err as Error).message);
      loadAvailability().catch(() => undefined);
    }
  }

  async function applyStatusChange(id: string, status: string, cancelReason?: string) {
    setError(null);
    try {
      const updated = await updateAppointmentStatus(id, status, cancelReason);
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function onStatusSelect(id: string, status: string) {
    if (status === 'cancelado' || status === 'falta') {
      setCancelingId(id);
      setPendingStatus(status);
      setCancelReasonDraft('');
      return;
    }
    applyStatusChange(id, status);
  }

  async function onConfirmCancel() {
    if (!cancelingId || !pendingStatus) return;
    await applyStatusChange(cancelingId, pendingStatus, cancelReasonDraft || undefined);
    setCancelingId(null);
    setPendingStatus(null);
    setCancelReasonDraft('');
  }

  const visibleAppointments = useMemo(() => {
    return appointments.filter((a) => {
      if (statusFilter !== 'todos' && a.status !== statusFilter) return false;
      if (search.trim() && !a.patient.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
      return true;
    });
  }, [appointments, statusFilter, search]);

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <DashboardShell title="Agenda">
      <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={() => setView('lista')}
            style={{
              fontSize: '0.82rem',
              padding: '0.35rem 0.7rem',
              background: view === 'lista' ? 'var(--accent)' : 'transparent',
              color: view === 'lista' ? '#fff' : 'var(--accent)',
              border: '1px solid var(--accent)',
            }}
          >
            Lista
          </button>
          <button
            type="button"
            onClick={() => setView('calendario')}
            style={{
              fontSize: '0.82rem',
              padding: '0.35rem 0.7rem',
              background: view === 'calendario' ? 'var(--accent)' : 'transparent',
              color: view === 'calendario' ? '#fff' : 'var(--accent)',
              border: '1px solid var(--accent)',
            }}
          >
            Calendário
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-end', flexWrap: 'wrap', margin: '0.8rem 0' }}>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Buscar paciente
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nome do paciente" />
        </label>
        <label>
          Status
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}>
            <option value="todos">Todos</option>
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          Período
          <select value={period} onChange={(e) => setPeriod(e.target.value as Period)}>
            {Object.entries(PERIODS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      {view === 'calendario' ? (
        <AgendaCalendar appointments={visibleAppointments} onStatusSelect={onStatusSelect} />
      ) : (
        <table>
          <thead>
            <tr><th>Paciente</th><th>Início</th><th>Fim</th><th>Status</th><th>Motivo</th></tr>
          </thead>
          <tbody>
            {visibleAppointments.map((a) => (
              <tr key={a.id}>
                <td>{a.patient.name}</td>
                <td>{new Date(a.startsAt).toLocaleString('pt-BR')}</td>
                <td>{new Date(a.endsAt).toLocaleString('pt-BR')}</td>
                <td>
                  <select value={a.status} onChange={(e) => onStatusSelect(a.id, e.target.value)}>
                    {Object.entries(STATUS_LABEL).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  {cancelingId === a.id && (
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', alignItems: 'center' }}>
                      <input
                        value={cancelReasonDraft}
                        onChange={(e) => setCancelReasonDraft(e.target.value)}
                        placeholder="Motivo (opcional)"
                        style={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}
                      />
                      <button type="button" onClick={onConfirmCancel} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCancelingId(null); setPendingStatus(null); }}
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </td>
                <td className="sub" style={{ margin: 0 }}>{a.cancelReason ?? '—'}</td>
              </tr>
            ))}
            {visibleAppointments.length === 0 && (
              <tr><td colSpan={5} style={{ color: 'var(--ink-soft)' }}>Nenhum agendamento encontrado.</td></tr>
            )}
          </tbody>
        </table>
      )}

      {patients.length === 0 ? (
        <p className="sub" style={{ marginTop: '1.2rem' }}>Cadastre um paciente ativo primeiro para poder agendar.</p>
      ) : (
        <form onSubmit={onSchedule} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label>
            Paciente
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
              {patients.map((p) => <option key={p.id} value={p.id}>{p.name}{p.socialName && ` (${p.socialName})`}</option>)}
            </select>
          </label>
          <label>
            Início
            <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} required />
          </label>
          <label>
            Duração
            <select
              value={durationIsCustom ? 'custom' : duration}
              onChange={(e) => {
                if (e.target.value === 'custom') { setDurationIsCustom(true); return; }
                setDurationIsCustom(false);
                setDuration(Number(e.target.value));
              }}
            >
              {DURATIONS.map((d) => <option key={d} value={d}>{d} min</option>)}
              <option value="custom">Personalizado…</option>
            </select>
          </label>
          {durationIsCustom && (
            <label>
              Minutos
              <input
                type="number"
                min={5}
                step={5}
                value={duration}
                onChange={(e) => setDuration(Math.max(5, Number(e.target.value)))}
                style={{ width: '90px' }}
              />
            </label>
          )}
          <button type="submit">Agendar</button>
        </form>
      )}
      {error && <span className="error">{error}</span>}

      <h3 style={{ fontSize: '0.95rem', margin: '1.6rem 0 0.8rem', borderTop: '1px solid var(--line)', paddingTop: '1.2rem' }}>
        Agendamento público
      </h3>
      <p className="sub">
        Libere horários aqui pra eles aparecerem no seu site profissional. O visitante escolhe um horário e paga —
        se o pagamento não for confirmado em 15 minutos, o horário volta a ficar disponível automaticamente.
      </p>
      {profile && !profile.payoutAccountId && (
        <p className="sub" style={{ color: 'var(--accent)' }}>
          Você ainda não tem uma sub-conta de recebimento (Asaas) configurada — sem ela, o agendamento público não
          consegue gerar cobrança. Configure em Financeiro antes de ativar.
        </p>
      )}

      <form onSubmit={onSaveBookingSettings} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-end', flexWrap: 'wrap', margin: '0.8rem 0' }}>
        <label>
          Valor da sessão (R$)
          <input
            value={priceReais}
            onChange={(e) => setPriceReais(e.target.value)}
            placeholder="150,00"
            inputMode="decimal"
          />
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={bookingEnabled}
            onChange={(e) => setBookingEnabled(e.target.checked)}
            style={{ width: 'auto' }}
          />
          Permitir agendamento público
        </label>
        <button type="submit" disabled={savingSettings}>{savingSettings ? 'Salvando…' : 'Salvar'}</button>
      </form>

      <form onSubmit={onReleaseBlock} style={{ margin: '0.8rem 0' }}>
        <p className="sub" style={{ margin: '0 0 0.5rem' }}>
          Libere um bloco de horários de uma vez — escolha o período, os dias da semana e a faixa de hora.
        </p>
        <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label>
            De
            <input type="date" value={blockFromDate} onChange={(e) => setBlockFromDate(e.target.value)} required />
          </label>
          <label>
            Até
            <input type="date" value={blockToDate} onChange={(e) => setBlockToDate(e.target.value)} required />
          </label>
          <label>
            Hora inicial
            <input type="time" value={blockStartTime} onChange={(e) => setBlockStartTime(e.target.value)} required />
          </label>
          <label>
            Hora final
            <input type="time" value={blockEndTime} onChange={(e) => setBlockEndTime(e.target.value)} required />
          </label>
          <label>
            Duração da sessão
            <select
              value={blockDurationIsCustom ? 'custom' : blockDuration}
              onChange={(e) => {
                if (e.target.value === 'custom') { setBlockDurationIsCustom(true); return; }
                setBlockDurationIsCustom(false);
                setBlockDuration(Number(e.target.value));
              }}
            >
              {DURATIONS.map((d) => <option key={d} value={d}>{d} min</option>)}
              <option value="custom">Personalizado…</option>
            </select>
          </label>
          {blockDurationIsCustom && (
            <label>
              Minutos
              <input
                type="number"
                min={5}
                step={5}
                value={blockDuration}
                onChange={(e) => setBlockDuration(Math.max(5, Number(e.target.value)))}
                style={{ width: '90px' }}
              />
            </label>
          )}
          <label>
            Intervalo entre sessões (min)
            <input
              type="number"
              min={0}
              value={blockInterval}
              onChange={(e) => setBlockInterval(Math.max(0, Number(e.target.value)))}
              style={{ width: '90px' }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', margin: '0.7rem 0' }}>
          {WEEKDAYS.map((d) => (
            <label key={d.value} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={blockDays.includes(d.value)}
                onChange={() => toggleBlockDay(d.value)}
                style={{ width: 'auto' }}
              />
              {d.label}
            </label>
          ))}
        </div>
        <button type="submit" disabled={blockSubmitting}>{blockSubmitting ? 'Liberando…' : 'Liberar horários'}</button>
        {blockResult && (
          <p className="sub" style={{ marginTop: '0.6rem' }}>
            {blockResult.created} horário{blockResult.created === 1 ? '' : 's'} liberado{blockResult.created === 1 ? '' : 's'}
            {blockResult.skippedConflict > 0 &&
              ` · ${blockResult.skippedConflict} pulado${blockResult.skippedConflict === 1 ? '' : 's'} por já haver horário/agendamento no intervalo`}
            {blockResult.skippedPast > 0 &&
              ` · ${blockResult.skippedPast} pulado${blockResult.skippedPast === 1 ? '' : 's'} por já estar no passado`}
            .
          </p>
        )}
      </form>

      <table>
        <thead>
          <tr><th>Início</th><th>Fim</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {slots.map((s) => (
            <tr key={s.id}>
              <td>{new Date(s.startsAt).toLocaleString('pt-BR')}</td>
              <td>{new Date(s.endsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
              <td>
                {s.status === 'disponivel' && 'Disponível'}
                {s.status === 'reservado' && s.heldUntil && `Aguardando pagamento até ${new Date(s.heldUntil).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
                {s.status === 'confirmado' && 'Confirmado'}
              </td>
              <td>
                {s.status === 'disponivel' && (
                  <button
                    type="button"
                    onClick={() => onRemoveSlot(s.id)}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                  >
                    Remover
                  </button>
                )}
              </td>
            </tr>
          ))}
          {slots.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum horário liberado ainda.</td></tr>
          )}
        </tbody>
      </table>
    </DashboardShell>
  );
}
