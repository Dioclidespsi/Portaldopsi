'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  CourseModuleOption,
  CoursePrice,
  CourseVideo,
  deleteCourseVideo,
  deleteCoursePrice,
  getAdminToken,
  listCourseModules,
  listCoursePrices,
  listCourseVideos,
  upsertCoursePrice,
  upsertCourseVideo,
} from '../../../lib/admin-api';

function centsToReais(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function AdminCursosPage() {
  const router = useRouter();
  const [modules, setModules] = useState<CourseModuleOption[]>([]);
  const [videos, setVideos] = useState<CourseVideo[]>([]);
  const [prices, setPrices] = useState<CoursePrice[]>([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [priceReais, setPriceReais] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const courseSlugs = Array.from(new Set(modules.map((m) => m.courseSlug))).map((slug) => ({
    slug,
    title: modules.find((m) => m.courseSlug === slug)!.courseTitle,
  }));

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    Promise.all([listCourseModules(), listCourseVideos(), listCoursePrices()])
      .then(([m, v, p]) => {
        setModules(m);
        setVideos(v);
        setPrices(p);
        if (m[0]) setSelectedModule(`${m[0].courseSlug}::${m[0].moduleSlug}`);
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onAddVideo(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const [courseSlug, moduleSlug] = selectedModule.split('::');
    try {
      const video = await upsertCourseVideo({ courseSlug, moduleSlug, youtubeUrl });
      setVideos((prev) => [...prev.filter((v) => !(v.courseSlug === courseSlug && v.moduleSlug === moduleSlug)), video]);
      setYoutubeUrl('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDeleteVideo(id: string) {
    setError(null);
    try {
      await deleteCourseVideo(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSetPrice(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const priceCents = Math.round(parseFloat(priceReais.replace(',', '.')) * 100);
      const price = await upsertCoursePrice({ courseSlug: selectedCourse, priceCents });
      setPrices((prev) => [...prev.filter((p) => p.courseSlug !== selectedCourse), price]);
      setPriceReais('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDeletePrice(courseSlug: string) {
    setError(null);
    try {
      await deleteCoursePrice(courseSlug);
      setPrices((prev) => prev.filter((p) => p.courseSlug !== courseSlug));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Cursos</h2>

      <h3 style={{ fontSize: '0.92rem', marginTop: '0.6rem' }}>Preço avulso (Marketplace)</h3>
      <p className="sub">Sem preço, o curso não pode ser comprado avulso — o Marketplace recusa com mensagem clara.</p>
      <table style={{ marginTop: '0.6rem' }}>
        <thead><tr><th>Curso</th><th>Preço</th><th>Ação</th></tr></thead>
        <tbody>
          {prices.map((p) => (
            <tr key={p.courseSlug}>
              <td>{courseSlugs.find((c) => c.slug === p.courseSlug)?.title ?? p.courseSlug}</td>
              <td>{centsToReais(p.priceCents)}</td>
              <td>
                <button onClick={() => onDeletePrice(p.courseSlug)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
          {prices.length === 0 && <tr><td colSpan={3} style={{ color: 'var(--ink-soft)' }}>Nenhum preço definido ainda.</td></tr>}
        </tbody>
      </table>
      <form onSubmit={onSetPrice} style={{ marginTop: '0.8rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>
          Curso
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
            <option value="" disabled>Selecione…</option>
            {courseSlugs.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
          </select>
        </label>
        <label>
          Preço (R$)
          <input value={priceReais} onChange={(e) => setPriceReais(e.target.value)} placeholder="497,00" required />
        </label>
        <button type="submit">Salvar preço</button>
      </form>

      <h3 style={{ fontSize: '0.92rem', marginTop: '1.5rem' }}>Vídeos das aulas (YouTube não-listado)</h3>
      <table style={{ marginTop: '0.6rem' }}>
        <thead><tr><th>Curso</th><th>Módulo</th><th>Link</th><th>Ação</th></tr></thead>
        <tbody>
          {videos.map((v) => (
            <tr key={v.id}>
              <td>{modules.find((m) => m.courseSlug === v.courseSlug)?.courseTitle ?? v.courseSlug}</td>
              <td>{modules.find((m) => m.moduleSlug === v.moduleSlug)?.moduleTitle ?? v.moduleSlug}</td>
              <td><a href={v.youtubeUrl} target="_blank" rel="noreferrer">abrir</a></td>
              <td>
                <button onClick={() => onDeleteVideo(v.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
          {videos.length === 0 && <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum vídeo cadastrado ainda.</td></tr>}
        </tbody>
      </table>
      <form onSubmit={onAddVideo} style={{ marginTop: '0.8rem', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>
          Módulo
          <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)} required>
            {modules.map((m) => (
              <option key={`${m.courseSlug}::${m.moduleSlug}`} value={`${m.courseSlug}::${m.moduleSlug}`}>
                {m.courseTitle} — {m.moduleTitle}
              </option>
            ))}
          </select>
        </label>
        <label>
          Link do YouTube
          <input type="url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtu.be/..." required />
        </label>
        <button type="submit">Salvar vídeo</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
