'use client';

import { useState } from 'react';
import { buildMailtoLink, renderTemplateText } from '../lib/contactChannels';

export default function AdminEmailButton({
  name,
  email,
  templates,
}: {
  name: string;
  email: string;
  templates: { label: string; subject: string; body: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  function onOpen() {
    setSubject(renderTemplateText(templates[0].subject, name));
    setBody(renderTemplateText(templates[0].body, name));
    setOpen(true);
  }

  function onSend() {
    window.open(buildMailtoLink(email, subject, body), '_blank');
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        style={{
          fontSize: '0.78rem', padding: '0.3rem 0.6rem',
          background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)',
        }}
      >
        E-mail
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px',
              maxWidth: '460px', width: '100%', padding: '1.3rem',
            }}
          >
            <p style={{ margin: '0 0 0.9rem', fontWeight: 700, color: 'var(--ink)' }}>
              E-mail para {name}
            </p>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '0.7rem' }}>
              Sugestão de texto
              <select
                onChange={(e) => {
                  const t = templates[Number(e.target.value)];
                  setSubject(renderTemplateText(t.subject, name));
                  setBody(renderTemplateText(t.body, name));
                }}
                defaultValue={0}
              >
                {templates.map((t, i) => (
                  <option key={t.label} value={i}>{t.label}</option>
                ))}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '0.7rem' }}>
              Assunto
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ padding: '0.5rem 0.6rem', border: '1px solid var(--line)', borderRadius: '6px', background: 'var(--ground)', color: 'var(--ink)' }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              Corpo do e-mail (edite à vontade — dá pra editar de novo no seu cliente de e-mail antes de enviar)
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                style={{
                  padding: '0.6rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px',
                  fontFamily: 'inherit', fontSize: '0.9rem', background: 'var(--ground)', color: 'var(--ink)', resize: 'vertical',
                }}
              />
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onSend}
                style={{ background: 'var(--accent)', color: '#fff', border: 'none' }}
              >
                Abrir no e-mail →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
