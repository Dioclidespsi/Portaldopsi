'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  cancelOwnAppointment,
  clearPatientToken,
  confirmOwnAppointment,
  consentToTeleconsulta,
  fetchPatientMe,
  getTeleconsultaJoinLink,
  listMyClinics,
  listOwnAppointments,
  PatientAppointment,
  PatientClinic,
  PatientMe,
  registerPushToken,
} from '../../lib/patient-api';
import { onForegroundPush, requestPushToken } from '../../lib/firebase';

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  aguardando_pagamento: 'Aguardando pagamento',
  confirmado: 'Confirmado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
  falta: 'Faltou',
};

const CANCELABLE_STATUSES = ['agendado', 'aguardando_pagamento', 'confirmado'];

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function firstName(fullName: string): string {
  return fullName.trim().split(' ')[0];
}

function formatFriendlyDateTime(iso: string): string {
  const d = new Date(iso);
  const datePart = d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
  const timePart = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${datePart.charAt(0).toUpperCase()}${datePart.slice(1)} às ${timePart}`;
}

const QUICK_LINKS = [
  { href: '/paciente/testes', icon: '📝', label: 'Meus testes' },
  { href: '/paciente/dever-de-casa', icon: '🎯', label: 'Dever de casa' },
  { href: '/paciente/meditacao', icon: '🧘', label: 'Meditação' },
  { href: '/paciente/documentos', icon: '📄', label: 'Meus documentos' },
];

export default function PatientDashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<PatientMe | null>(null);
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [clinics, setClinics] = useState<PatientClinic[]>([]);
  const [showClinicPicker, setShowClinicPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [showPushBanner, setShowPushBanner] = useState(false);
  const [pushToast, setPushToast] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchPatientMe(), listOwnAppointments(), listMyClinics()])
      .then(([meData, appts, clinicsData]) => {
        setMe(meData);
        setAppointments(appts);
        setClinics(clinicsData);
      })
      .catch(() => router.push('/paciente/login'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') setShowPushBanner(true);
    onForegroundPush((title, body) => setPushToast(`${title} — ${body}`));
  }, []);

  async function onEnablePush() {
    const token = await requestPushToken();
    if (token) {
      await registerPushToken(token).catch(() => undefined);
      setShowPushBanner(false);
    } else {
      setShowPushBanner(false);
    }
  }

  async function onCancel(tenantId: string, id: string) {
    if (!window.confirm('Cancelar esta sessão?')) return;
    setError(null);
    try {
      await cancelOwnAppointment(tenantId, id);
      const appts = await listOwnAppointments();
      setAppointments(appts);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onConfirm(tenantId: string, id: string) {
    setError(null);
    try {
      const updated = await confirmOwnAppointment(tenantId, id);
      // Merge só os campos que a rota de confirmação realmente devolve — o retorno cru do
      // Appointment não inclui tenant/hasVideoRoom, e sobrescrever o objeto inteiro quebrava o
      // "Agendar novamente" (a.tenant.slug undefined) logo no próximo render.
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: updated.status } : a)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onConsent(tenantId: string, id: string) {
    setError(null);
    try {
      const updated = await consentToTeleconsulta(tenantId, id);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, consentAt: updated.consentAt, videoRoomUrl: updated.videoRoomUrl } : a)),
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onJoinTeleconsulta(tenantId: string, id: string) {
    setError(null);
    // Abre a aba já no clique (gesto do usuário) e só troca a URL depois —
    // esperar o fetch antes de window.open() arrisca cair no bloqueador de pop-up.
    const newTab = window.open('about:blank', '_blank');
    try {
      const { url } = await getTeleconsultaJoinLink(tenantId, id);
      if (newTab) newTab.location.href = url;
    } catch (err) {
      newTab?.close();
      setError((err as Error).message);
    }
  }

  function onLogout() {
    clearPatientToken();
    router.push('/paciente/login');
  }

  if (loading) return <div className="shell">Carregando…</div>;
  if (!me) return null;

  const now = Date.now();
  const upcoming = appointments
    .filter((a) => CANCELABLE_STATUSES.includes(a.status) && new Date(a.startsAt).getTime() > now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const nextAppointment = upcoming[0] ?? null;
  const otherAppointments = appointments.filter((a) => a.id !== nextAppointment?.id);

  function renderAppointmentActions(a: PatientAppointment) {
    return (
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        {a.status === 'agendado' && (
          <button onClick={() => onConfirm(a.tenant.slug, a.id)} style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem' }}>
            Confirmar presença
          </button>
        )}
        {a.videoRoomUrl ? (
          <button type="button" onClick={() => onJoinTeleconsulta(a.tenant.slug, a.id)} style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem' }}>
            Entrar na teleconsulta
          </button>
        ) : a.hasVideoRoom && a.consentAt === null ? (
          <button
            onClick={() => onConsent(a.tenant.slug, a.id)}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
          >
            Consentir com teleconsulta
          </button>
        ) : null}
        <Link href={`/${a.tenant.slug}#agendar`}>
          <button
            type="button"
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}
          >
            Agendar novamente
          </button>
        </Link>
        {CANCELABLE_STATUSES.includes(a.status) && (
          <button
            onClick={() => onCancel(a.tenant.slug, a.id)}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--crit)', border: '1px solid var(--crit)' }}
          >
            Cancelar
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="shell shell-wide">
      {pushToast && (
        <div className="patient-info-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.88rem' }}>{pushToast}</span>
          <button type="button" onClick={() => setPushToast(null)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
            Fechar
          </button>
        </div>
      )}
      {showPushBanner && (
        <div className="patient-info-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.88rem' }}>Ative as notificações pra receber lembretes de consulta e avisos de dever de casa.</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" onClick={onEnablePush} style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem' }}>Ativar</button>
            <button
              type="button"
              onClick={() => setShowPushBanner(false)}
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
            >
              Agora não
            </button>
          </div>
        </div>
      )}

      <div className="patient-hero">
        <h1>{greeting()}, {firstName(me.name)}!</h1>
        <p>Aqui você acompanha suas sessões e tudo relacionado ao seu acompanhamento — com qualquer profissional que atenda você pelo Portal do Psi.</p>
      </div>

      <div className="patient-quicklinks">
        {clinics.length === 0 && (
          <Link href="/profissionais" className="patient-quicklink" style={{ border: '1px solid var(--accent)' }}>
            <span className="patient-quicklink-icon">🔎</span>
            Buscar profissional
          </Link>
        )}
        {clinics.length === 1 && (
          <Link href={`/${clinics[0].slug}#agendar`} className="patient-quicklink" style={{ border: '1px solid var(--accent)' }}>
            <span className="patient-quicklink-icon">📅</span>
            Marcar consulta
          </Link>
        )}
        {clinics.length > 1 && (
          <button
            type="button"
            className="patient-quicklink"
            style={{ border: '1px solid var(--accent)' }}
            onClick={() => setShowClinicPicker((v) => !v)}
          >
            <span className="patient-quicklink-icon">📅</span>
            Marcar consulta
          </button>
        )}
        {QUICK_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="patient-quicklink">
            <span className="patient-quicklink-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
        <button type="button" className="patient-quicklink" onClick={onLogout} style={{ color: 'var(--ink-soft)' }}>
          <span className="patient-quicklink-icon">👋</span>
          Sair
        </button>
      </div>

      {showClinicPicker && clinics.length > 1 && (
        <div className="patient-info-card">
          <p className="sub" style={{ margin: '0 0 0.6rem' }}>Marcar consulta com qual clínica?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {clinics.map((c) => (
              <Link key={c.tenantId} href={`/${c.slug}#agendar`} style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {nextAppointment && (
        <div className="patient-next-session">
          <p className="sub" style={{ margin: '0 0 0.3rem' }}>Sua próxima sessão — {nextAppointment.tenant.name}</p>
          <p style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{formatFriendlyDateTime(nextAppointment.startsAt)}</p>
          <p className="sub" style={{ margin: '0.2rem 0 0' }}>{STATUS_LABEL[nextAppointment.status] ?? nextAppointment.status}</p>
          {renderAppointmentActions(nextAppointment)}
        </div>
      )}

      {otherAppointments.length > 0 && (
        <>
          <p className="patient-section-title">{nextAppointment ? 'Outras sessões' : 'Suas sessões'}</p>
          {otherAppointments.map((a) => (
            <div key={a.id} className="patient-session-card">
              <p style={{ fontSize: '0.95rem', margin: 0 }}>
                {a.tenant.name} · {new Date(a.startsAt).toLocaleString('pt-BR')} · {STATUS_LABEL[a.status] ?? a.status}
              </p>
              {renderAppointmentActions(a)}
            </div>
          ))}
        </>
      )}

      {appointments.length === 0 && (
        <div className="patient-empty-state">
          <p style={{ margin: 0 }}>Você ainda não tem nenhuma sessão marcada.</p>
        </div>
      )}
      {error && <span className="error">{error}</span>}

      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="https://portaldopsi.com.br" style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', textDecoration: 'none' }}>
          portaldopsi.com.br
        </a>
      </p>
    </div>
  );
}
