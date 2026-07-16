'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { DirectoryResult, searchDirectory } from '../../lib/api';
import { ALL_SPECIALTIES } from '../../lib/specialty-options';

const SPECIALTY_OPTIONS = Array.from(ALL_SPECIALTIES).sort((a, b) => a.localeCompare(b, 'pt-BR'));

export default function ProfissionaisPage() {
  const [q, setQ] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [results, setResults] = useState<DirectoryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  function runSearch(params: { q?: string; specialty?: string }) {
    setLoading(true);
    searchDirectory(params)
      .then(setResults)
      .finally(() => {
        setLoading(false);
        setSearched(true);
      });
  }

  useEffect(() => {
    runSearch({});
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    runSearch({ q: q || undefined, specialty: specialty || undefined });
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ground)' }}>
      <header
        style={{
          background: 'var(--surface)', borderBottom: '1px solid var(--line)',
          padding: '0.9rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem',
        }}
      >
        <Link href="/" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', textDecoration: 'none' }}>
          Portal do Psi
        </Link>
        <Link href="/login" style={{ fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none' }}>
          Sou psicólogo(a) →
        </Link>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', margin: '0 0 0.5rem', color: 'var(--ink)' }}>Encontre um profissional</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.98rem', margin: '0 0 1.8rem' }}>
          Psicólogos e psicólogas que escolheram aparecer nesta busca pública.
        </p>

        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '2rem' }}
        >
          <label style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
            Nome
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome" style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--line)', borderRadius: '6px' }} />
          </label>
          <label style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
            Área de atuação
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--line)', borderRadius: '6px' }}>
              <option value="">Todas</option>
              {SPECIALTY_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <button
            type="submit"
            style={{
              fontSize: '0.92rem', fontWeight: 700, color: '#fff', background: 'var(--accent)',
              border: 'none', borderRadius: '8px', padding: '0.7rem 1.4rem', cursor: 'pointer',
            }}
          >
            Buscar
          </button>
        </form>

        {loading ? (
          <p style={{ color: 'var(--ink-soft)' }}>Carregando…</p>
        ) : results.length === 0 ? (
          <p style={{ color: 'var(--ink-soft)' }}>
            {searched ? 'Nenhum profissional encontrado com esses filtros.' : ''}
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem' }}>
            {results.map((p) => {
              const specialtyList = p.specialties ? p.specialties.split(',').map((s) => s.trim()).filter(Boolean) : [];
              return (
                <Link
                  key={p.slug}
                  href={`/p/${p.slug}`}
                  style={{
                    display: 'block', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px',
                    padding: '1.1rem', textDecoration: 'none', color: 'var(--ink)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.7rem' }}>
                    {p.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.photoUrl} alt={p.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--ground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--ink-soft)' }}>
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <strong style={{ fontSize: '0.98rem' }}>{p.name}</strong>
                  </div>
                  {specialtyList.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.6rem' }}>
                      {specialtyList.slice(0, 3).map((s) => (
                        <span key={s} style={{ fontSize: '0.72rem', fontWeight: 600, background: 'var(--warn-soft)', color: 'var(--ink-soft)', padding: '0.25rem 0.6rem', borderRadius: '100px' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.bio && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>
                      {p.bio.length > 120 ? `${p.bio.slice(0, 120)}…` : p.bio}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
