'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import { getAdminToken, getPlatformSettings, updatePlatformSettings } from '../../../lib/admin-api';
import { SITE_PALETTES } from '../../../lib/site-palettes';

export default function AdminAparenciaPage() {
  const router = useRouter();
  const [colorPalette, setColorPalette] = useState('salvia');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    getPlatformSettings()
      .then((s) => setColorPalette(s.colorPalette))
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      const updated = await updatePlatformSettings(colorPalette);
      setColorPalette(updated.colorPalette);
      setSaved(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const preview = SITE_PALETTES[colorPalette] ?? SITE_PALETTES.salvia;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Aparência do site</h2>
      <p className="sub">
        Paleta de cores da plataforma em si (home pública, telas de login, loja de cursos) — diferente da paleta que
        cada psicólogo escolhe pra própria página em Site profissional.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '420px' }}>
        <label>
          Paleta de cores
          <select value={colorPalette} onChange={(e) => setColorPalette(e.target.value)}>
            {Object.values(SITE_PALETTES).map((p) => (
              <option key={p.key} value={p.key}>{p.label} — {p.description}</option>
            ))}
          </select>
        </label>

        <div
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.7rem',
            borderRadius: '8px', border: '1px solid var(--line)', background: preview.ground, width: 'fit-content',
          }}
        >
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: preview.accent, display: 'inline-block' }} />
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: preview.accentSoft, display: 'inline-block' }} />
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: preview.surface, border: `1px solid ${preview.line}`, display: 'inline-block' }} />
          <span style={{ fontSize: '0.78rem', color: preview.ink }}>Pré-visualização</span>
        </div>

        <button type="submit" disabled={saving} style={{ alignSelf: 'flex-start' }}>
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
      </form>
      {saved && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Salvo — pode levar até um minuto pra refletir no site.</span>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
