'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  clearPatientToken,
  confirmOwnAppointment,
  consentToTeleconsulta,
  fetchPatientMe,
  listOwnAppointments,
  PatientAppointment,
  PatientMe,
} from '../../lib/patient-api';

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  confirmado: 'Confirmado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
  falta: 'Faltou',
};

export default function PatientDashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<PatientMe | null>(null);
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchPatientMe(), listOwnAppointments()])
      .then(([meData, appts]) => {
        setMe(meData);
        setAppointments(appts);
      })
      .catch(() => router.push('/paciente/login'))
      .finally(() => setLoading(false));
  }, [router]);

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
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <Link href="/paciente/testes">
            <button style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>Meus testes</button>
          </Link>
          <button onClick={onLogout} style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
            Sair
          </button>
        </div>
      </div>

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
          </div>
        </div>
      ))}
      {appointments.length === 0 && <p className="sub">Nenhuma sessão agendada ainda.</p>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
