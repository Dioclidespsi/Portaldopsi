'use client';

import { FormEvent, useState } from 'react';
import { submitPublicLead } from '../../lib/api';
import { siteFieldStyle, sitePrimaryButtonStyle } from '../../lib/site-ui';

const fieldStyle = siteFieldStyle();

export default function ContactForm({ slug }: { slug: string }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitPublicLead(slug, { name, contact, message: message || undefined });
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div style={{ background: 'var(--site-surface)', borderRadius: '8px', padding: '1rem 1.2rem', color: 'var(--site-ink)', fontSize: '0.92rem' }}>
        Mensagem enviada! O profissional vai entrar em contato com você diretamente.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
        Seu nome
        <input value={name} onChange={(e) => setName(e.target.value)} required style={fieldStyle} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
        Telefone ou e-mail
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Como o profissional pode te responder"
          required
          style={fieldStyle}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--site-ink-soft)' }}>
        Mensagem (opcional)
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} style={fieldStyle} />
      </label>
      <button type="submit" disabled={submitting} style={sitePrimaryButtonStyle({ disabled: submitting })}>
        {submitting ? 'Enviando…' : 'Enviar'}
      </button>
      {error && <span style={{ color: '#a33', fontSize: '0.85rem' }}>{error}</span>}
    </form>
  );
}
