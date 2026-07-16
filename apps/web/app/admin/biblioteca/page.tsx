'use client';

import { Fragment, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  AdminLibraryMaterial,
  createLibraryMaterial,
  deleteLibraryMaterial,
  getAdminToken,
  listAdminLibraryMaterials,
  setLibraryMaterialActive,
} from '../../../lib/admin-api';

export default function AdminLibraryPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<AdminLibraryMaterial[]>([]);
  const [category, setCategory] = useState('');
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
    listAdminLibraryMaterials()
      .then(setMaterials)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError('Selecione o arquivo do material.');
      return;
    }
    try {
      const material = await createLibraryMaterial(category, title, description, file);
      setMaterials((prev) => [...prev, material]);
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onToggleActive(m: AdminLibraryMaterial) {
    setError(null);
    try {
      const updated = await setLibraryMaterialActive(m.id, !m.active);
      setMaterials((prev) => prev.map((x) => (x.id === m.id ? updated : x)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deleteLibraryMaterial(id);
      setMaterials((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const byCategory = materials.reduce<Record<string, AdminLibraryMaterial[]>>((acc, m) => {
    (acc[m.category] ??= []).push(m);
    return acc;
  }, {});

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Biblioteca de materiais</h2>
      <p className="sub">
        Apostilas, planilhas, artigos e outros arquivos organizados por categoria — disponíveis para download por
        qualquer assinante (clínica).
      </p>

      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} style={{ marginTop: '1.2rem' }}>
          <h3 style={{ fontSize: '0.92rem' }}>{cat}</h3>
          <table>
            <thead><tr><th>Título</th><th>Descrição</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              {items.map((m) => (
                <Fragment key={m.id}>
                  <tr>
                    <td>{m.title}</td>
                    <td>{m.description ?? '—'}</td>
                    <td>{m.active ? 'Ativo' : 'Inativo'}</td>
                    <td style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => onToggleActive(m)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                        {m.active ? 'Desativar' : 'Ativar'}
                      </button>
                      <button
                        onClick={() => onDelete(m.id)}
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {materials.length === 0 && <p className="sub">Nenhum material cadastrado ainda.</p>}

      <h3 style={{ fontSize: '0.95rem', marginTop: '1.6rem' }}>Enviar novo material</h3>
      <form onSubmit={onCreate} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.7rem' }}>
        <label style={{ minWidth: '160px' }}>
          Categoria
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="ex: Apostilas, Planilhas, Áudios" required />
        </label>
        <label style={{ minWidth: '160px' }}>
          Nome do material
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Descrição (opcional)
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Arquivo
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
        </label>
        <button type="submit">Enviar material</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
