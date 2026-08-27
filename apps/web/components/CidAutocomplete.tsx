'use client';

import { useMemo, useState } from 'react';
import { CID10_CATALOG } from '../lib/cid10-catalog';

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\./g, '');
}

const MAX_SUGGESTIONS = 8;

/**
 * Campo de CID com sugestões em barra suspensa (item 8) — busca por código
 * ou descrição no catálogo curado (F00-F99 + Z relevantes, ver
 * lib/cid10-catalog.ts). Continua sendo um campo de texto livre: selecionar
 * uma sugestão preenche "código — descrição", mas digitar sem escolher nada
 * também é aceito (nunca trava o preenchimento em um valor do catálogo).
 */
export default function CidAutocomplete({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    const query = normalize(value);
    if (!query) return [];
    return CID10_CATALOG.filter(
      (entry) => normalize(entry.code).includes(query) || normalize(entry.label).includes(query),
    ).slice(0, MAX_SUGGESTIONS);
  }, [value]);

  function select(entry: { code: string; label: string }) {
    onChange(`${entry.code} — ${entry.label}`);
    setOpen(false);
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            zIndex: 20,
            top: '100%',
            left: 0,
            right: 0,
            margin: '2px 0 0',
            padding: '0.25rem 0',
            listStyle: 'none',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            maxHeight: '240px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((entry) => (
            <li key={entry.code}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(entry);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.4rem 0.7rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--ink)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                <strong>{entry.code}</strong>
                <span style={{ color: 'var(--ink-soft)' }}> — {entry.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
