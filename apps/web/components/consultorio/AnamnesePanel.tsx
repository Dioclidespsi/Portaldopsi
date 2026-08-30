'use client';

import { useEffect, useState } from 'react';
import { AnamneseTemplate, getAnamnese, getAnamneseCatalog, upsertAnamnese } from '../../lib/api';

/** Adaptado de dashboard/pacientes/[id]/page.tsx — mesma lógica, sem o resto da página em volta. */
export default function AnamnesePanel({ patientId }: { patientId: string }) {
  const [catalog, setCatalog] = useState<AnamneseTemplate[]>([]);
  const [slug, setSlug] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSavedAt(null);
    Promise.all([getAnamneseCatalog(), getAnamnese(patientId)])
      .then(([catalogData, anamnese]) => {
        setCatalog(catalogData);
        if (anamnese.entry) {
          setSlug(anamnese.entry.templateSlug);
          setFields(anamnese.entry.fields);
        } else {
          setSlug(anamnese.suggestedTemplateSlug ?? catalogData[0]?.slug ?? null);
          setFields({});
        }
      })
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [patientId]);

  function onChangeTemplate(newSlug: string) {
    setSlug(newSlug);
    setFields({});
  }

  function onChangeField(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function onSave() {
    if (!slug) return;
    setError(null);
    setSaving(true);
    try {
      await upsertAnamnese(patientId, slug, fields);
      setSavedAt(new Date());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="sub">Carregando…</p>;

  return (
    <div>
      <p className="sub" style={{ marginTop: 0 }}>
        Escolha o modelo pela faixa etária do paciente (já vem sugerido) e preencha com suas palavras — as
        perguntas em cada campo são só um guia. Diferente do prontuário, aqui você pode voltar e editar quando
        quiser.
      </p>
      <label style={{ maxWidth: '320px', marginBottom: '0.8rem' }}>
        Modelo
        <select value={slug ?? ''} onChange={(e) => onChangeTemplate(e.target.value)}>
          {catalog.map((t) => (
            <option key={t.slug} value={t.slug}>{t.title}</option>
          ))}
        </select>
      </label>
      {catalog
        .filter((t) => t.slug === slug)
        .map((template) => (
          <div key={template.slug} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {template.sections.map((section) => (
              <label key={section.key}>
                {section.label}
                <textarea
                  value={fields[section.key] ?? ''}
                  onChange={(e) => onChangeField(section.key, e.target.value)}
                  placeholder={section.placeholder}
                  rows={3}
                  style={{ padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.9rem' }}
                />
              </label>
            ))}
          </div>
        ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.8rem' }}>
        <button type="button" onClick={onSave} disabled={saving || !slug}>
          {saving ? 'Salvando…' : 'Salvar anamnese'}
        </button>
        {savedAt && <span className="sub" style={{ margin: 0 }}>Salvo às {savedAt.toLocaleTimeString('pt-BR')}</span>}
      </div>
      {error && <p style={{ marginTop: '0.6rem' }}><span className="error">{error}</span></p>}
    </div>
  );
}
