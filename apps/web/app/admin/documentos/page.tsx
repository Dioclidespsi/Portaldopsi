'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  AdminDocumentTemplate,
  createDocumentTemplate,
  deleteDocumentTemplate,
  getAdminToken,
  listAdminDocumentTemplates,
} from '../../../lib/admin-api';

export default function AdminDocumentTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<AdminDocumentTemplate[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      const template = await createDocumentTemplate(title, description, file);
      setTemplates((prev) => [template, ...prev]);
      setTitle('');
      setDescription('');
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

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Documentos</h2>
      <p className="sub">Modelos de documento incluídos gratuitamente na assinatura de cada psicólogo (CLINICA).</p>

      <table style={{ marginTop: '1rem' }}>
        <thead><tr><th>Título</th><th>Descrição</th><th>Ação</th></tr></thead>
        <tbody>
          {templates.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>
                <button onClick={() => onDelete(t.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {templates.length === 0 && <tr><td colSpan={3} style={{ color: 'var(--ink-soft)' }}>Nenhum modelo cadastrado ainda.</td></tr>}
        </tbody>
      </table>

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
          Arquivo (PDF/DOC/DOCX/XLSX)
          <input
            type="file"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
        </label>
        <button type="submit">Enviar modelo</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
