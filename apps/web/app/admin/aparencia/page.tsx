'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import { getAdminToken, getPlatformSettings, updatePlatformSettings } from '../../../lib/admin-api';
import { SITE_PALETTES } from '../../../lib/site-palettes';

function centsToReaisInput(cents: number | null): string {
  return cents === null ? '' : (cents / 100).toFixed(2).replace('.', ',');
}

function reaisInputToCents(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.replace(',', '.');
  const reais = Number(normalized);
  return Number.isFinite(reais) ? Math.round(reais * 100) : null;
}

export default function AdminAparenciaPage() {
  const router = useRouter();
  const [colorPalette, setColorPalette] = useState('salvia');
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [yearlyPrice, setYearlyPrice] = useState('');
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
      .then((s) => {
        setColorPalette(s.colorPalette);
        setMonthlyPrice(centsToReaisInput(s.subscriptionMonthlyPriceCents));
        setYearlyPrice(centsToReaisInput(s.subscriptionYearlyPriceCents));
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      const updated = await updatePlatformSettings({
        colorPalette,
        subscriptionMonthlyPriceCents: reaisInputToCents(monthlyPrice),
        subscriptionYearlyPriceCents: reaisInputToCents(yearlyPrice),
      });
      setColorPalette(updated.colorPalette);
      setMonthlyPrice(centsToReaisInput(updated.subscriptionMonthlyPriceCents));
      setYearlyPrice(centsToReaisInput(updated.subscriptionYearlyPriceCents));
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
    <AdminShell title={"Aparência do site"} description={"Paleta de cores da plataforma em si (home pública, telas de login, loja de cursos) — diferente da paleta que cada psicólogo escolhe pra própria página em Site profissional."}>
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

        <h3 style={{ fontSize: '0.92rem', margin: '0.4rem 0 0', borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
          Preço da assinatura
        </h3>
        <p className="sub" style={{ margin: 0 }}>
          Deixe em branco pra usar o valor normal. Útil pra promoção relâmpago (ex: assinar por R$ 1,00 num teste) —
          é só apagar o valor depois pra voltar ao preço de sempre.
        </p>
        <label>
          Preço mensal (R$) — normal: R$ 150,00
          <input
            value={monthlyPrice}
            onChange={(e) => setMonthlyPrice(e.target.value)}
            placeholder="150,00"
            inputMode="decimal"
          />
        </label>
        <label>
          Preço anual (R$) — normal: R$ 1.500,00
          <input
            value={yearlyPrice}
            onChange={(e) => setYearlyPrice(e.target.value)}
            placeholder="1500,00"
            inputMode="decimal"
          />
        </label>

        <button type="submit" disabled={saving} style={{ alignSelf: 'flex-start' }}>
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
      </form>
      {saved && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Salvo — pode levar até um minuto pra refletir no site.</span>}
      {error && <span className="error">{error}</span>}
    </AdminShell>
  );
}
