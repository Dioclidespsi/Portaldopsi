'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  CertificateTemplatePositions,
  getAdminToken,
  getCertificateTemplate,
  previewCertificateTemplate,
  upsertCertificateTemplate,
} from '../../../lib/admin-api';

const DEFAULT_POSITIONS: CertificateTemplatePositions = {
  nameX: 50, nameY: 45, nameFontSize: 48,
  courseX: 50, courseY: 58, courseFontSize: 28,
  dateX: 50, dateY: 70, dateFontSize: 18,
  codeX: 50, codeY: 92, codeFontSize: 12,
};

const FIELDS: { group: string; xKey: keyof CertificateTemplatePositions; yKey: keyof CertificateTemplatePositions; fontKey: keyof CertificateTemplatePositions }[] = [
  { group: 'Nome do aluno', xKey: 'nameX', yKey: 'nameY', fontKey: 'nameFontSize' },
  { group: 'Nome do curso', xKey: 'courseX', yKey: 'courseY', fontKey: 'courseFontSize' },
  { group: 'Data de emissão', xKey: 'dateX', yKey: 'dateY', fontKey: 'dateFontSize' },
  { group: 'Código de verificação', xKey: 'codeX', yKey: 'codeY', fontKey: 'codeFontSize' },
];

export default function AdminCertificatesPage() {
  const router = useRouter();
  const [hasTemplate, setHasTemplate] = useState(false);
  const [positions, setPositions] = useState<CertificateTemplatePositions>(DEFAULT_POSITIONS);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    getCertificateTemplate()
      .then((t) => {
        if (t) {
          setHasTemplate(true);
          setPositions(t);
        }
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  function updatePosition(key: keyof CertificateTemplatePositions, value: string) {
    setPositions((prev) => ({ ...prev, [key]: Number(value) }));
  }

  async function onPreview() {
    setError(null);
    try {
      const url = await previewCertificateTemplate(positions);
      setPreviewUrl(url);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!hasTemplate && !file) {
      setError('Envie a imagem do modelo de certificado.');
      return;
    }
    setSaving(true);
    try {
      const updated = await upsertCertificateTemplate(positions, file ?? undefined);
      setPositions(updated);
      setHasTemplate(true);
      setFile(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Modelo de certificado</h2>
      <p className="sub">
        Envie a imagem de fundo do certificado (um modelo único, usado para todos os cursos) e ajuste onde nome do
        aluno, curso, data e código de verificação aparecem. O preenchimento e a emissão são automáticos assim que o
        aluno conclui um curso — certificados já emitidos não são refeitos se você mudar o modelo depois.
      </p>

      <form onSubmit={onSave}>
        <label style={{ maxWidth: '360px' }}>
          {hasTemplate ? 'Substituir imagem do modelo (opcional)' : 'Imagem do modelo'}
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        {file && <p className="sub" style={{ margin: '0.3rem 0 0' }}>Salve para ver a pré-visualização com a nova imagem.</p>}

        {FIELDS.map((f) => (
          <div key={f.group} style={{ marginTop: '1rem' }}>
            <h4 style={{ fontSize: '0.86rem', margin: '0 0 0.4rem' }}>{f.group}</h4>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <label style={{ width: '110px' }}>
                Posição X (%)
                <input type="number" min={0} max={100} value={positions[f.xKey]} onChange={(e) => updatePosition(f.xKey, e.target.value)} />
              </label>
              <label style={{ width: '110px' }}>
                Posição Y (%)
                <input type="number" min={0} max={100} value={positions[f.yKey]} onChange={(e) => updatePosition(f.yKey, e.target.value)} />
              </label>
              <label style={{ width: '110px' }}>
                Tamanho da fonte
                <input type="number" min={1} value={positions[f.fontKey]} onChange={(e) => updatePosition(f.fontKey, e.target.value)} />
              </label>
            </div>
          </div>
        ))}

        <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.6rem' }}>
          <button type="button" onClick={onPreview} disabled={!hasTemplate} style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink-soft)' }}>
            Visualizar
          </button>
          <button type="submit" disabled={saving}>{saving ? 'Salvando…' : 'Salvar modelo'}</button>
        </div>
      </form>
      {error && <span className="error">{error}</span>}

      {previewUrl && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '0.92rem' }}>Pré-visualização (com dados de exemplo)</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Pré-visualização do certificado" style={{ maxWidth: '100%', border: '1px solid var(--line)', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
}
