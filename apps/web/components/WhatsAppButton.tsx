'use client';

import { useState } from 'react';
import { fetchWhatsAppTemplates } from '../lib/api';
import { buildWhatsAppLink, DEFAULT_WHATSAPP_TEMPLATES, renderWhatsAppTemplate, WhatsAppTemplate } from '../lib/whatsapp';

export default function WhatsAppButton({ name, phone }: { name: string; phone: string }) {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(DEFAULT_WHATSAPP_TEMPLATES);
  const [message, setMessage] = useState('');

  async function onOpen() {
    setOpen(true);
    let list = DEFAULT_WHATSAPP_TEMPLATES;
    try {
      const result = await fetchWhatsAppTemplates();
      if (result.templates && result.templates.length === 5) list = result.templates;
    } catch {
      // Sem templates customizados ainda (ou erro de rede) — segue com os padrões.
    }
    setTemplates(list);
    setMessage(renderWhatsAppTemplate(list[0].text, name));
  }

  function onSend() {
    window.open(buildWhatsAppLink(phone, message), '_blank', 'noopener,noreferrer');
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        style={{
          fontSize: '0.78rem', padding: '0.3rem 0.6rem',
          background: 'transparent', color: '#25a25a', border: '1px solid #25a25a',
        }}
      >
        WhatsApp
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
              Mensagem para {name}
            </p>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '0.7rem' }}>
              Sugestão de texto
              <select
                onChange={(e) => setMessage(renderWhatsAppTemplate(templates[Number(e.target.value)].text, name))}
                defaultValue={0}
              >
                {templates.map((t, i) => (
                  <option key={t.label} value={i}>{t.label}</option>
                ))}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              Texto (edite à vontade — dá pra editar de novo no WhatsApp antes de enviar)
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
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
                style={{ background: '#25a25a', color: '#fff', border: 'none' }}
              >
                Abrir no WhatsApp →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
