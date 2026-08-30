'use client';

import { FormEvent, useEffect, useState } from 'react';
import CidAutocomplete from '../CidAutocomplete';
import {
  createPsychDocumentDraft,
  deletePsychDocumentDraft,
  downloadPsychDocument,
  finalizePsychDocument,
  getPsychDocument,
  listPsychDocumentCatalog,
  listPsychDocumentsForPatient,
  PsychDocumentSummary,
  PsychDocumentTemplate,
  releasePsychDocument,
  updatePsychDocumentDraft,
} from '../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  rascunho: 'Rascunho',
  finalizado: 'Finalizado',
};

/**
 * Adaptado de dashboard/documentos/page.tsx — sem seletor de paciente (já
 * vem fixo) e sem a seção de assinatura/carimbo/papel timbrado (isso é
 * configuração de conta, não de sessão — continua só em /dashboard/documentos).
 */
export default function DocumentosPanel({ patientId }: { patientId: string }) {
  const [catalog, setCatalog] = useState<PsychDocumentTemplate[]>([]);
  const [templateSlug, setTemplateSlug] = useState('');
  const [cid, setCid] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<PsychDocumentSummary[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const template = catalog.find((t) => t.slug === templateSlug) ?? null;

  useEffect(() => {
    setLoading(true);
    setEditingId(null);
    setTemplateSlug('');
    setFieldValues({});
    setCid('');
    Promise.all([listPsychDocumentCatalog(), listPsychDocumentsForPatient(patientId)])
      .then(([c, docs]) => {
        setCatalog(c);
        setDocuments(docs);
      })
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [patientId]);

  function selectTemplate(slug: string) {
    setTemplateSlug(slug);
    setEditingId(null);
    setCid('');
    const t = catalog.find((x) => x.slug === slug);
    const initial: Record<string, string> = {};
    t?.sections.forEach((s) => (initial[s.key] = s.defaultValue ?? ''));
    setFieldValues(initial);
  }

  async function refreshDocuments() {
    setDocuments(await listPsychDocumentsForPatient(patientId));
  }

  async function onSaveDraft(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!templateSlug) {
      setError('Escolha o modelo de documento.');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updatePsychDocumentDraft(editingId, { fields: fieldValues, cid: cid || undefined });
      } else {
        const created = await createPsychDocumentDraft({ patientId, templateSlug, fields: fieldValues, cid: cid || undefined });
        setEditingId(created.id);
      }
      await refreshDocuments();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function onEditDraft(doc: PsychDocumentSummary) {
    setError(null);
    try {
      const detail = await getPsychDocument(doc.id);
      setTemplateSlug(detail.templateSlug);
      const { __cid, ...rest } = detail.fields as Record<string, string>;
      setFieldValues(rest);
      setCid(__cid ?? '');
      setEditingId(detail.id);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onFinalize(id: string) {
    setError(null);
    try {
      await finalizePsychDocument(id);
      await refreshDocuments();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onRelease(id: string) {
    setError(null);
    if (!confirm('Disponibilizar este documento pro paciente baixar no aplicativo dele?')) return;
    try {
      await releasePsychDocument(id);
      await refreshDocuments();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deletePsychDocumentDraft(id);
      if (editingId === id) setEditingId(null);
      await refreshDocuments();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDownload(doc: PsychDocumentSummary) {
    setError(null);
    try {
      await downloadPsychDocument(doc.id, `${doc.templateSlug}-${doc.id}.pdf`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <p className="sub">Carregando…</p>;

  return (
    <div>
      <form onSubmit={onSaveDraft}>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <label style={{ minWidth: '220px' }}>
            Modelo de documento
            <select value={templateSlug} onChange={(e) => selectTemplate(e.target.value)} required>
              <option value="">Selecione…</option>
              {catalog.map((t) => (
                <option key={t.slug} value={t.slug}>{t.title}</option>
              ))}
            </select>
          </label>
          {template?.requiresPatientAcceptance && (
            <p className="sub" style={{ width: '100%', margin: 0 }}>
              Este modelo exige aceite do paciente — revise os valores/condições antes de disponibilizar.
            </p>
          )}
          {template?.includesCid && (
            <label>
              CID (referência, opcional)
              <CidAutocomplete value={cid} onChange={setCid} placeholder="digite o código ou a descrição — ex: F41.1" />
            </label>
          )}
        </div>

        {template?.sections.map((section) => (
          <label key={section.key} style={{ display: 'block', marginTop: '0.8rem' }}>
            {section.label}
            <textarea
              value={fieldValues[section.key] ?? ''}
              onChange={(e) => setFieldValues((prev) => ({ ...prev, [section.key]: e.target.value }))}
              rows={4}
              placeholder={section.placeholder}
              style={{ width: '100%', padding: '0.55rem 0.7rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.9rem' }}
            />
          </label>
        ))}

        {template && (
          <button type="submit" disabled={saving} style={{ marginTop: '0.8rem' }}>
            {saving ? 'Salvando…' : editingId ? 'Salvar alterações do rascunho' : 'Salvar rascunho'}
          </button>
        )}
      </form>

      <h4 style={{ fontSize: '0.9rem', marginTop: '1.4rem' }}>Documentos deste paciente</h4>
      <table>
        <thead><tr><th>Modelo</th><th>Status</th><th>Disponibilizado?</th><th></th></tr></thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.title}</td>
              <td>{STATUS_LABEL[doc.status] ?? doc.status}</td>
              <td>{doc.releasedToPatientAt ? 'Sim' : 'Não'}</td>
              <td style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {doc.status === 'rascunho' && (
                  <>
                    <button onClick={() => onEditDraft(doc)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>Editar</button>
                    <button onClick={() => onFinalize(doc.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>Finalizar e assinar</button>
                    <button
                      onClick={() => onDelete(doc.id)}
                      style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                    >
                      Excluir
                    </button>
                  </>
                )}
                {doc.status === 'finalizado' && (
                  <>
                    <button onClick={() => onDownload(doc)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>Baixar PDF</button>
                    {!doc.releasedToPatientAt && (
                      <button onClick={() => onRelease(doc.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                        Disponibilizar ao paciente
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
          {documents.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum documento criado ainda para este paciente.</td></tr>
          )}
        </tbody>
      </table>
      {error && <p style={{ marginTop: '0.6rem' }}><span className="error">{error}</span></p>}
    </div>
  );
}
