'use client';

import { Fragment, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  AdminMeditationTrack,
  createMeditationTrack,
  deleteMeditationTrack,
  getAdminToken,
  listAdminMeditationTracks,
  setMeditationTrackActive,
} from '../../../lib/admin-api';

export default function AdminMeditationPage() {
  const router = useRouter();
  const [tracks, setTracks] = useState<AdminMeditationTrack[]>([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationSeconds, setDurationSeconds] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listAdminMeditationTracks()
      .then(setTracks)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError('Selecione o arquivo de áudio.');
      return;
    }
    try {
      const track = await createMeditationTrack(category, title, description, durationSeconds, file);
      setTracks((prev) => [...prev, track]);
      setTitle('');
      setDescription('');
      setDurationSeconds('');
      setFile(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onToggleActive(t: AdminMeditationTrack) {
    setError(null);
    try {
      const updated = await setMeditationTrackActive(t.id, !t.active);
      setTracks((prev) => prev.map((x) => (x.id === t.id ? updated : x)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deleteMeditationTrack(id);
      setTracks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  const byCategory = tracks.reduce<Record<string, AdminMeditationTrack[]>>((acc, t) => {
    (acc[t.category] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Trilhas de meditação</h2>
      <p className="sub">Áudios guiados disponíveis pra qualquer paciente, no aplicativo do paciente.</p>

      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} style={{ marginTop: '1.2rem' }}>
          <h3 style={{ fontSize: '0.92rem' }}>{cat}</h3>
          <table>
            <thead><tr><th>Título</th><th>Descrição</th><th>Duração</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              {items.map((t) => (
                <Fragment key={t.id}>
                  <tr>
                    <td>{t.title}</td>
                    <td>{t.description ?? '—'}</td>
                    <td>{t.durationSeconds ? `${Math.round(t.durationSeconds / 60)} min` : '—'}</td>
                    <td>{t.active ? 'Ativo' : 'Inativo'}</td>
                    <td style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => onToggleActive(t)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                        {t.active ? 'Desativar' : 'Ativar'}
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
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
      {tracks.length === 0 && <p className="sub">Nenhuma trilha cadastrada ainda.</p>}

      <h3 style={{ fontSize: '0.95rem', marginTop: '1.6rem' }}>Enviar nova trilha</h3>
      <form onSubmit={onCreate} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.7rem' }}>
        <label style={{ minWidth: '160px' }}>
          Categoria
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="ex: Sono, Ansiedade, Respiração" required />
        </label>
        <label style={{ minWidth: '160px' }}>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Descrição (opcional)
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Duração em segundos (opcional)
          <input type="number" min={1} value={durationSeconds} onChange={(e) => setDurationSeconds(e.target.value)} />
        </label>
        <label>
          Áudio
          <input type="file" accept="audio/mpeg,audio/mp4,audio/wav,audio/ogg" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
        </label>
        <button type="submit">Enviar trilha</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
