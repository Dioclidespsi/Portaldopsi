'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import CidAutocomplete from '../../../components/CidAutocomplete';
import Link from 'next/link';
import {
  createPsychDocumentDraft,
  deletePsychDocumentDraft,
  downloadPsychDocument,
  fetchMe,
  fetchOwnProfile,
  finalizePsychDocument,
  getOwnSignatureUrl,
  getPsychDocument,
  listPatients,
  listPsychDocumentCatalog,
  listPsychDocumentsForPatient,
  Me,
  Patient,
  Profile,
  PsychDocumentSummary,
  PsychDocumentTemplate,
  releasePsychDocument,
  updatePsychDocumentDraft,
  uploadSignature,
} from '../../../lib/api';

const STATUS_LABEL: Record<string, string> = {
  rascunho: 'Rascunho',
  finalizado: 'Finalizado',
};

export default function DocumentosPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [catalog, setCatalog] = useState<PsychDocumentTemplate[]>([]);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [uploadingSignature, setUploadingSignature] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [me, setMe] = useState<Me | null>(null);

  const [patientId, setPatientId] = useState('');
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
    Promise.all([listPatients(true), listPsychDocumentCatalog(), getOwnSignatureUrl(), fetchOwnProfile(), fetchMe()])
      .then(([p, c, sig, prof, meData]) => {
        setPatients(p);
        setCatalog(c);
        setSignatureUrl(sig);
        setProfile(prof);
        setMe(meData);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (!patientId) {
      setDocuments([]);
      return;
    }
    listPsychDocumentsForPatient(patientId).then(setDocuments).catch((err) => setError((err as Error).message));
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

  async function onUploadSignature(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!signatureFile) return;
    setUploadingSignature(true);
    try {
      await uploadSignature(signatureFile);
      const url = await getOwnSignatureUrl();
      setSignatureUrl(url);
      setSignatureFile(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploadingSignature(false);
    }
  }

  async function refreshDocuments() {
    if (patientId) setDocuments(await listPsychDocumentsForPatient(patientId));
  }

  async function onSaveDraft(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!patientId || !templateSlug) {
      setError('Escolha o paciente e o modelo de documento.');
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

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Documentos</h2>
      <p className="sub">
        Preencha laudo, relatório, atestado, declaração, encaminhamento ou parecer para um paciente específico. O
        PDF final leva sua assinatura/carimbo e só é entregue ao paciente quando você clicar em "Disponibilizar ao
        paciente" — gerar o documento não libera sozinho.
      </p>

      <div className="callout-box" style={{ marginTop: '1rem' }}>
        <strong>Identidade nos documentos</strong>
        <p className="sub" style={{ margin: '0.3rem 0 0.8rem' }}>
          Assinatura, carimbo, endereço e contato configurados aqui aparecem automaticamente em todo laudo,
          relatório, atestado, declaração, encaminhamento ou parecer que você gerar — não precisa preencher de
          novo em cada documento.
        </p>

        <div style={{ display: 'flex', gap: '1.6rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 260px', minWidth: '240px' }}>
            <p style={{ fontWeight: 600, fontSize: '0.88rem', margin: '0 0 0.4rem' }}>Assinatura e carimbo</p>
            <p className="sub" style={{ margin: '0 0 0.6rem' }}>
              Uma imagem (JPG/PNG/WEBP, de preferência com fundo transparente) com sua assinatura manuscrita e
              carimbo (nome e CRP) — enviada uma vez, aparece automaticamente no fechamento de todo documento
              gerado.
            </p>
            {signatureUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={signatureUrl} alt="Assinatura atual" style={{ maxHeight: '80px', display: 'block', marginBottom: '0.6rem' }} />
            )}
            <form onSubmit={onUploadSignature} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <label>
                {signatureUrl ? 'Trocar imagem' : 'Enviar imagem'}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setSignatureFile(e.target.files?.[0] ?? null)} />
              </label>
              <button type="submit" disabled={!signatureFile || uploadingSignature}>
                {uploadingSignature ? 'Enviando…' : 'Salvar assinatura'}
              </button>
            </form>
          </div>

          <div style={{ flex: '1 1 260px', minWidth: '240px' }}>
            <p style={{ fontWeight: 600, fontSize: '0.88rem', margin: '0 0 0.4rem' }}>Papel timbrado</p>
            <p className="sub" style={{ margin: '0 0 0.6rem' }}>
              Nome da clínica, endereço, telefone e e-mail aparecem em texto no cabeçalho e no rodapé de{' '}
              <strong>todas</strong> as páginas do documento. O CRP é sempre puxado automaticamente do seu cadastro
              verificado — não dá pra editar aqui, é assim que garantimos que é sempre o CRP que a gente conferiu.
              Veja como fica:
            </p>
            <div
              style={{
                background: 'var(--ground)',
                border: '1px dashed var(--line)',
                borderRadius: '6px',
                padding: '0.7rem 0.9rem',
                fontSize: '0.8rem',
                color: 'var(--ink-soft)',
                marginBottom: '0.6rem',
              }}
            >
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>{profile?.name || me?.name || 'Nome da clínica'}</p>
              <p style={{ margin: 0 }}>
                Psicólogo(a) responsável: {me?.name ?? 'Seu nome'}
                {me?.crpNumber ? ` — CRP ${me.crpNumber}` : ''}
              </p>
              {profile?.publicAddress && <p style={{ margin: 0 }}>{profile.publicAddress}</p>}
              {(profile?.publicPhone || profile?.publicEmail) && (
                <p style={{ margin: 0 }}>{[profile?.publicPhone, profile?.publicEmail].filter(Boolean).join(' · ')}</p>
              )}
              {!profile?.publicAddress && !profile?.publicPhone && !profile?.publicEmail && (
                <p style={{ margin: 0, fontStyle: 'italic' }}>
                  Endereço/telefone/e-mail ainda não cadastrados — é assim que vai aparecer nos seus documentos.
                </p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
              <Link href="/dashboard/conta" style={{ fontSize: '0.82rem' }}>
                Editar nome da clínica →
              </Link>
              <Link href="/dashboard/site" style={{ fontSize: '0.82rem' }}>
                Editar endereço/contato →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {error && <span className="error">{error}</span>}

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.4rem' }}>Novo documento</h3>
      <form onSubmit={onSaveDraft} style={{ marginTop: '0.6rem' }}>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <label style={{ minWidth: '220px' }}>
            Paciente
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
              <option value="">Selecione…</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name}{p.socialName && ` (${p.socialName})`}</option>
              ))}
            </select>
          </label>
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
              Este modelo exige aceite do paciente — revise os valores/condições antes de disponibilizar. O
              paciente verá um botão "Aceitar" em vez de só "Baixar".
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

      {patientId && (
        <>
          <h3 style={{ fontSize: '0.92rem', marginTop: '1.6rem' }}>Documentos deste paciente</h3>
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
        </>
      )}
    </div>
  );
}
