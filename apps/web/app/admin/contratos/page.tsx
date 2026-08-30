'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import {
  AdminDocumentAcceptance,
  AdminDocumentTemplate,
  createDocumentTemplate,
  deleteDocumentTemplate,
  DocumentTemplateAudience,
  getAdminToken,
  listAdminDocumentTemplates,
  listDocumentAcceptances,
} from '../../../lib/admin-api';

const AUDIENCE_LABELS: Record<DocumentTemplateAudience, string> = {
  STAFF: 'Psicólogo/clínica',
  ESTUDANTE: 'Aluno (Loja)',
};

export default function AdminContratosPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<AdminDocumentTemplate[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiresAcceptance, setRequiresAcceptance] = useState(false);
  const [audience, setAudience] = useState<DocumentTemplateAudience>('STAFF');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [acceptanceView, setAcceptanceView] = useState<{ template: AdminDocumentTemplate; accepted: AdminDocumentAcceptance[]; totalTitulares: number } | null>(null);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listAdminDocumentTemplates()
      .then(setTemplates)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError('Selecione o arquivo do modelo de documento.');
      return;
    }
    try {
      const template = await createDocumentTemplate(title, description, requiresAcceptance, audience, file);
      setTemplates((prev) => [template, ...prev]);
      setTitle('');
      setDescription('');
      setRequiresAcceptance(false);
      setAudience('STAFF');
      setFile(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deleteDocumentTemplate(id);
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onViewAcceptances(id: string) {
    setError(null);
    try {
      const result = await listDocumentAcceptances(id);
      setAcceptanceView(result);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <AdminShell title={"Contratos"} description={"Modelos de documento/contrato — escolha o público certo: \"Psicólogo/clínica\" bloqueia o uso das ferramentas clínicas até aceitar (ver gate de acesso); \"Aluno (Loja)\" é exigido no momento da compra de um curso. Marque \"Exige aceite\" para termos que precisam de consentimento obrigatório."}>
      <table style={{ marginTop: '1rem' }}>
        <thead><tr><th>Título</th><th>Público</th><th>Descrição</th><th>Exige aceite?</th><th>Ação</th></tr></thead>
        <tbody>
          {templates.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{AUDIENCE_LABELS[t.audience]}</td>
              <td>{t.description}</td>
              <td>{t.requiresAcceptance ? 'Sim' : 'Não'}</td>
              <td style={{ display: 'flex', gap: '0.4rem' }}>
                {t.requiresAcceptance && (
                  <button onClick={() => onViewAcceptances(t.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                    Ver aceites
                  </button>
                )}
                <button onClick={() => onDelete(t.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {templates.length === 0 && <tr><td colSpan={5} style={{ color: 'var(--ink-soft)' }}>Nenhum modelo cadastrado ainda.</td></tr>}
        </tbody>
      </table>

      {acceptanceView && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>
            {acceptanceView.template.title} — {acceptanceView.accepted.length} de {acceptanceView.totalTitulares} psicólogo(s) titular(es) já aceitaram
          </p>
          {acceptanceView.accepted.map((a, i) => (
            <p key={i} className="sub" style={{ margin: '0.2rem 0' }}>
              {a.user.name} ({a.user.tenant.name}) — {new Date(a.acceptedAt).toLocaleString('pt-BR')}
            </p>
          ))}
          {acceptanceView.accepted.length === 0 && <p className="sub">Ninguém aceitou ainda.</p>}
        </div>
      )}

      <form onSubmit={onCreate} style={{ marginTop: '1.2rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label style={{ flex: 1 }}>
          Descrição
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Público
          <select value={audience} onChange={(e) => setAudience(e.target.value as DocumentTemplateAudience)}>
            {Object.entries(AUDIENCE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          Arquivo (PDF/DOC/DOCX/XLSX)
          <input
            type="file"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
          <input type="checkbox" checked={requiresAcceptance} onChange={(e) => setRequiresAcceptance(e.target.checked)} style={{ width: 'auto' }} />
          Exige aceite obrigatório
        </label>
        <button type="submit">Enviar modelo</button>
      </form>
      {error && <span className="error">{error}</span>}
    </AdminShell>
  );
}
