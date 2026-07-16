'use client';

import { FormEvent, useEffect, useState } from 'react';
import { fetchPublicAvailability, PublicSlot, submitPublicBooking } from '../../../lib/api';

const fieldStyle: React.CSSProperties = {
  padding: '0.6rem 0.75rem',
  border: '1px solid var(--site-line)',
  borderRadius: '6px',
  fontFamily: 'inherit',
  fontSize: '0.92rem',
  background: 'var(--site-surface)',
  color: 'var(--site-ink)',
  width: '100%',
};

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function groupByDay(slots: PublicSlot[]): Map<string, PublicSlot[]> {
  const map = new Map<string, PublicSlot[]>();
  for (const slot of slots) {
    const day = new Date(slot.startsAt).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
    if (!map.has(day)) map.set(day, []);
    map.get(day)!.push(slot);
  }
  return map;
}

export default function BookingWidget({ slug }: { slug: string }) {
  const [sessionPriceCents, setSessionPriceCents] = useState<number | null>(null);
  const [slots, setSlots] = useState<PublicSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<PublicSlot | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ paymentLink: string; holdExpiresAt: string } | null>(null);

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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setError(null);
    setSubmitting(true);
    try {
      const booking = await submitPublicBooking(slug, { slotId: selectedSlot.id, name, email, phone, cpfCnpj });
      setResult(booking);
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
        </p>
        <a
          href={result.paymentLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block', fontSize: '0.92rem', fontWeight: 700, color: '#fff',
            background: 'var(--site-accent)', borderRadius: '8px', padding: '0.7rem 1.4rem', textDecoration: 'none',
          }}
        >
          Pagar agora
        </a>
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
        <button
          type="submit"
          disabled={submitting}
          style={{
            alignSelf: 'flex-start', fontSize: '0.92rem', fontWeight: 700, color: '#fff',
            background: 'var(--site-accent)', border: 'none', borderRadius: '8px',
            padding: '0.7rem 1.4rem', cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Reservando…' : 'Reservar este horário'}
        </button>
        {error && <span style={{ color: '#a33', fontSize: '0.85rem' }}>{error}</span>}
      </form>
    );
  }

  return (
    <div>
      <p style={{ fontSize: '0.98rem', color: 'var(--site-ink)', margin: '0 0 1rem' }}>
        Valor da sessão: <strong>{formatPrice(sessionPriceCents)}</strong>
      </p>
      {slots.length === 0 ? (
        <p style={{ fontSize: '0.9rem', color: 'var(--site-ink-soft)' }}>Nenhum horário disponível no momento.</p>
      ) : (
        Array.from(groupByDay(slots)).map(([day, daySlots]) => (
          <div key={day} style={{ marginBottom: '0.9rem' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--site-ink-soft)', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>{day}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {daySlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    fontSize: '0.85rem', padding: '0.45rem 0.8rem', borderRadius: '8px',
                    border: '1px solid var(--site-line)', background: 'var(--site-surface)', color: 'var(--site-ink)', cursor: 'pointer',
                  }}
                >
                  {new Date(slot.startsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
