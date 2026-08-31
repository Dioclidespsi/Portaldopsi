'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPublicAvailability, PublicSlot, submitAuthenticatedBooking, submitPublicBooking } from '../../lib/api';
import { getPatientToken, savePatientToken } from '../../lib/patient-api';
import { siteFieldStyle, sitePrimaryButtonStyle } from '../../lib/site-ui';
import PasswordInput from '../../components/PasswordInput';

/** Cartão de dia e botão de horário usam a mesma largura — evita o horário parecer "mais largo" que a data acima dele. */
const CALENDAR_CARD_WIDTH = '64px';

const fieldStyle = siteFieldStyle();

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Dia local (fuso do navegador) do horário, não UTC cru — evita virar o dia errado perto da meia-noite. */
function dayKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function groupByDay(slots: PublicSlot[]): Map<string, PublicSlot[]> {
  const map = new Map<string, PublicSlot[]>();
  for (const slot of slots) {
    const key = dayKey(slot.startsAt);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(slot);
  }
  return map;
}

const DAYS_PER_WINDOW = 7;

/**
 * Semana travada em domingo-sábado (calendário de verdade), não uma janela
 * rolante a partir de "hoje" — a coluna de domingo é sempre a primeira,
 * independente de qual dia da semana for hoje.
 */
function buildWindowDays(weekOffset: number): { key: string; date: Date }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sunday = new Date(today);
  sunday.setDate(sunday.getDate() - sunday.getDay());
  sunday.setDate(sunday.getDate() + weekOffset * DAYS_PER_WINDOW);
  return Array.from({ length: DAYS_PER_WINDOW }, (_, i) => {
    const date = new Date(sunday);
    date.setDate(date.getDate() + i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return { key, date };
  });
}

export default function BookingWidget({ slug }: { slug: string }) {
  const [sessionPriceCents, setSessionPriceCents] = useState<number | null>(null);
  const [slots, setSlots] = useState<PublicSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<PublicSlot | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ paymentLink: string; holdExpiresAt: string; loggedIn: boolean } | null>(null);

  // Se já tem conta (qualquer clínica), pula o cadastro — só escolhe o horário.
  const patientToken = getPatientToken();

  function loadAvailability() {
    fetchPublicAvailability(slug)
      .then((data) => {
        setSessionPriceCents(data.sessionPriceCents);
        setSlots(data.slots);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function onConfirmLoggedIn(slot: PublicSlot) {
    setError(null);
    setSubmitting(true);
    try {
      const booking = await submitAuthenticatedBooking(slug, slot.id, patientToken!);
      setResult({ paymentLink: booking.paymentLink, holdExpiresAt: booking.holdExpiresAt, loggedIn: true });
    } catch (err) {
      setError((err as Error).message);
      setSelectedSlot(null);
      loadAvailability();
    } finally {
      setSubmitting(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setError(null);
    setSubmitting(true);
    try {
      const booking = await submitPublicBooking(slug, { slotId: selectedSlot.id, name, email, phone, cpfCnpj, password, termsAccepted });
      if (booking.accessToken) savePatientToken(booking.accessToken);
      setResult({ paymentLink: booking.paymentLink, holdExpiresAt: booking.holdExpiresAt, loggedIn: Boolean(booking.accessToken) });
    } catch (err) {
      setError((err as Error).message);
      setSelectedSlot(null);
      loadAvailability();
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || sessionPriceCents === null) return null;

  if (result) {
    return (
      <div style={{ background: 'var(--site-surface)', borderRadius: '8px', padding: '1.2rem', color: 'var(--site-ink)' }}>
        <p style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Quase lá!</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--site-ink-soft)', margin: '0 0 1rem' }}>
          Seu horário está reservado até {new Date(result.holdExpiresAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} —
          confirme o pagamento até lá ou o horário será liberado para outra pessoa.
          {result.loggedIn && ' Sua conta já está pronta — dá pra acompanhar essa sessão na sua área do paciente.'}
        </p>
        <a href={result.paymentLink} target="_blank" rel="noreferrer" style={sitePrimaryButtonStyle()}>
          Pagar agora
        </a>
      </div>
    );
  }

  if (selectedSlot && patientToken) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--site-ink-soft)', margin: 0 }}>
          Horário escolhido: <strong style={{ color: 'var(--site-ink)' }}>{new Date(selectedSlot.startsAt).toLocaleString('pt-BR')}</strong>{' '}
          <button type="button" onClick={() => setSelectedSlot(null)} style={{ background: 'none', border: 'none', color: 'var(--site-accent)', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>
            trocar
          </button>
        </p>
        <button
          type="button"
          disabled={submitting}
          onClick={() => onConfirmLoggedIn(selectedSlot)}
          style={sitePrimaryButtonStyle({ disabled: submitting })}
        >
          {submitting ? 'Reservando…' : 'Confirmar este horário'}
        </button>
        {error && <span style={{ color: '#a33', fontSize: '0.85rem' }}>{error}</span>}
      </div>
    );
  }

  if (selectedSlot) {
    return (
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--site-ink-soft)', margin: 0 }}>
          Horário escolhido: <strong style={{ color: 'var(--site-ink)' }}>{new Date(selectedSlot.startsAt).toLocaleString('pt-BR')}</strong>{' '}
          <button type="button" onClick={() => setSelectedSlot(null)} style={{ background: 'none', border: 'none', color: 'var(--site-accent)', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>
            trocar
          </button>
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--site-ink-soft)', margin: 0 }}>
          Esse cadastro vira seu login único no Portal do Psi — vale pra qualquer profissional que te atender por aqui.
        </p>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
          Nome completo
          <input value={name} onChange={(e) => setName(e.target.value)} required style={fieldStyle} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={fieldStyle} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
          Telefone (WhatsApp)
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required style={fieldStyle} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
          CPF <span style={{ fontWeight: 400 }}>(necessário para gerar o pagamento)</span>
          <input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required style={fieldStyle} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
          Crie uma senha <span style={{ fontWeight: 400 }}>(pra acompanhar suas sessões depois)</span>
          <PasswordInput
            name="new-password"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={fieldStyle}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
            style={{ width: 'auto' }}
          />
          Li e aceito o{' '}
          <Link href="/termos-paciente" target="_blank" style={{ color: 'var(--site-accent)' }}>
            Termo de Uso do Paciente
          </Link>
        </label>
        <button type="submit" disabled={submitting} style={sitePrimaryButtonStyle({ disabled: submitting })}>
          {submitting ? 'Reservando…' : 'Reservar este horário'}
        </button>
        {error && <span style={{ color: '#a33', fontSize: '0.85rem' }}>{error}</span>}
      </form>
    );
  }

  const byDay = groupByDay(slots);
  const windowDays = buildWindowDays(weekOffset);
  const maxRows = Math.max(0, ...windowDays.map((d) => byDay.get(d.key)?.length ?? 0));

  function goToWeek(direction: 1 | -1) {
    setWeekOffset((prev) => Math.max(0, prev + direction));
  }

  return (
    <div>
      <p style={{ fontSize: '0.98rem', color: 'var(--site-ink)', margin: '0 0 1rem' }}>
        Valor da sessão: <strong>{formatPrice(sessionPriceCents)}</strong>
      </p>
      {slots.length > 0 && (
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem',
            background: 'var(--site-accent-soft)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem',
          }}
        >
          <span style={{ fontSize: '0.9rem', color: 'var(--site-ink)' }}>
            Próximo horário disponível:{' '}
            <strong>
              {new Date(slots[0].startsAt).toLocaleString('pt-BR', {
                weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
              })}
            </strong>
          </span>
          <button type="button" onClick={() => setSelectedSlot(slots[0])} style={sitePrimaryButtonStyle()}>
            Reservar este horário
          </button>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <button
          type="button"
          onClick={() => goToWeek(-1)}
          disabled={weekOffset === 0}
          style={{
            fontSize: '0.8rem', padding: '0.35rem 0.7rem', borderRadius: '100px',
            cursor: weekOffset === 0 ? 'default' : 'pointer', opacity: weekOffset === 0 ? 0.4 : 1,
            border: '1px solid var(--site-line)', background: 'var(--site-surface)', color: 'var(--site-ink)',
          }}
        >
          ‹ Semana anterior
        </button>
        <button
          type="button"
          onClick={() => goToWeek(1)}
          style={{
            fontSize: '0.8rem', padding: '0.35rem 0.7rem', borderRadius: '100px', cursor: 'pointer',
            border: '1px solid var(--site-line)', background: 'var(--site-surface)', color: 'var(--site-ink)',
          }}
        >
          Próxima semana ›
        </button>
      </div>

      {/* Matriz de verdade (CSS Grid, colunas de largura fixa) — cada dia é uma coluna travada, os */}
      {/* horários daquele dia ficam empilhados exatamente nela, alinhamento garantido por construção. */}
      <div style={{ overflowX: 'auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${DAYS_PER_WINDOW}, ${CALENDAR_CARD_WIDTH})`,
            gap: '0.4rem 0.5rem',
            width: 'max-content',
          }}
        >
          {windowDays.map(({ key, date }) => {
            const hasSlots = (byDay.get(key)?.length ?? 0) > 0;
            return (
              <div
                key={key}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
                  padding: '0.5rem 0.2rem', borderRadius: '10px',
                  border: '1px solid var(--site-line)',
                  background: 'var(--site-surface)',
                  color: hasSlots ? 'var(--site-ink)' : 'var(--site-ink-soft)',
                }}
              >
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  {date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{date.toLocaleDateString('pt-BR', { day: '2-digit' })}</span>
                <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>{date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</span>
              </div>
            );
          })}

          {Array.from({ length: maxRows }, (_, row) =>
            windowDays.map(({ key }) => {
              const slot = (byDay.get(key) ?? [])[row];
              return slot ? (
                <button
                  key={`${key}-${row}`}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    fontSize: '0.85rem', padding: '0.5rem 0.2rem', borderRadius: '8px', textAlign: 'center',
                    border: '1px solid var(--site-line)', background: 'var(--site-surface)', color: 'var(--site-ink)', cursor: 'pointer',
                  }}
                >
                  {new Date(slot.startsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </button>
              ) : (
                <div key={`${key}-${row}`} />
              );
            }),
          )}
        </div>
      </div>
      {maxRows === 0 && (
        <p style={{ fontSize: '0.9rem', color: 'var(--site-ink-soft)', marginTop: '0.8rem' }}>
          Nenhum horário disponível nesta semana — use "Próxima semana" pra ver outras datas.
        </p>
      )}
    </div>
  );
}
