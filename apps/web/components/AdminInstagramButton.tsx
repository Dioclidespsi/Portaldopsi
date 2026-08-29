'use client';

import { useState } from 'react';
import { buildInstagramDirectLink, buildInstagramProfileLink, renderTemplateText } from '../lib/contactChannels';
import { WhatsAppTemplate } from '../lib/whatsapp';

/**
 * A Meta não oferece pré-preenchimento de texto em DM do Instagram — por
 * isso este botão sempre mostra "Copiar mensagem" ao lado de "Abrir
 * Instagram": o admin copia, abre a conversa, cola manualmente. Ver
 * lib/contactChannels.ts.
 */
export default function AdminInstagramButton({ name, handle, templates }: { name: string; handle: string; templates: WhatsAppTemplate[] }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  function onOpen() {
    setMessage(renderTemplateText(templates[0].text, name));
    setCopied(false);
    setOpen(true);
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      // clipboard pode falhar sem permissão — o texto já fica selecionável na textarea.
    }
  }

  function onOpenInstagram() {
    window.open(buildInstagramDirectLink(handle), '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        style={{
          fontSize: '0.78rem', padding: '0.3rem 0.6rem',
          background: 'transparent', color: '#c13584', border: '1px solid #c13584',
        }}
      >
        Instagram
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
            <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: 'var(--ink)' }}>
              Instagram — {name}
            </p>
            <p className="sub" style={{ fontSize: '0.78rem', margin: '0 0 0.9rem' }}>
              O Instagram não permite abrir a conversa com o texto já preenchido — copie a mensagem e cole
              manualmente depois de abrir.
            </p>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '0.7rem' }}>
              Sugestão de texto
              <select
                onChange={(e) => { setMessage(renderTemplateText(templates[Number(e.target.value)].text, name)); setCopied(false); }}
                defaultValue={0}
              >
                {templates.map((t, i) => (
                  <option key={t.label} value={i}>{t.label}</option>
                ))}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              Texto (edite à vontade)
              <textarea
                value={message}
                onChange={(e) => { setMessage(e.target.value); setCopied(false); }}
                rows={5}
                style={{
                  padding: '0.6rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px',
                  fontFamily: 'inherit', fontSize: '0.9rem', background: 'var(--ground)', color: 'var(--ink)', resize: 'vertical',
                }}
              />
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onCopy}
                style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)' }}
              >
                {copied ? 'Copiado ✓' : 'Copiar mensagem'}
              </button>
              <button
                type="button"
                onClick={onOpenInstagram}
                style={{ background: '#c13584', color: '#fff', border: 'none' }}
              >
                Abrir Instagram →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
