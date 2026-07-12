'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import { CourseView, downloadCourseFile, listCourseCatalog, markModuleComplete } from '../../../lib/api';

const FILE_LABEL: Record<string, string> = {
  deck: 'Slides',
  avaliacao: 'Avaliação',
  exercicios: 'Exercícios',
  roteiro: 'Roteiro de aulas',
};

/** Aceita youtube.com/watch?v=, youtu.be/ e já-embed — sempre devolve a forma /embed/. */
function toYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) return url;
      const videoId = parsed.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export default function CursosPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listCourseCatalog()
      .then(setCourses)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onComplete(courseSlug: string, moduleSlug: string) {
    await markModuleComplete(courseSlug, moduleSlug);
    setCourses((prev) =>
      prev.map((c) =>
        c.slug !== courseSlug
          ? c
          : { ...c, blocos: c.blocos.map((b) => ({ ...b, modules: b.modules.map((m) => (m.slug === moduleSlug ? { ...m, completed: true } : m)) })) },
      ),
    );
  }

  async function onDownload(courseSlug: string, moduleSlug: string, fileType: string, title: string) {
    setError(null);
    try {
      await downloadCourseFile(courseSlug, moduleSlug, fileType, `${title} - ${FILE_LABEL[fileType]}`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Cursos</h2>
      <p className="sub">Reaproveita os módulos já produzidos em Formação em Neurociência e Escola de Marketing.</p>
      {error && <span className="error">{error}</span>}

      {courses.map((course) => (
        <div key={course.slug} style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.98rem', marginBottom: '0.2rem' }}>{course.title}</h3>
          <p className="sub" style={{ marginBottom: '0.8rem' }}>{course.description}</p>

          {course.blocos.map((bloco) => (
            <div key={bloco.number} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.88rem' }}>Bloco {bloco.number} — {bloco.title}</strong>
                {bloco.free && <span className="chip-free">grátis</span>}
              </div>

              {bloco.modules.length === 0 && (
                <p className="sub" style={{ fontSize: '0.82rem' }}>Nenhum módulo encontrado nesta pasta ainda.</p>
              )}

              {bloco.modules.map((mod) => (
                <div key={mod.slug} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--line)', opacity: mod.locked ? 0.55 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.88rem' }}>
                      {mod.completed ? '✓ ' : ''}{mod.moduleNumber} — {mod.title}
                    </span>
                    {mod.locked && <span className="sub" style={{ margin: 0 }}>bloqueado</span>}
                  </div>

                  {!mod.locked && mod.videoUrl && toYoutubeEmbedUrl(mod.videoUrl) && (
                    <div style={{ margin: '0.6rem 0', aspectRatio: '16 / 9', maxWidth: '560px' }}>
                      <iframe
                        src={toYoutubeEmbedUrl(mod.videoUrl)!}
                        title={mod.title}
                        style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {!mod.locked && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                      {mod.files.map((ft) => (
                        <button
                          key={ft}
                          type="button"
                          onClick={() => onDownload(course.slug, mod.slug, ft, mod.title)}
                          style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--line)', fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
                        >
                          {FILE_LABEL[ft] ?? ft}
                        </button>
                      ))}
                      {!mod.completed && (
                        <button
                          type="button"
                          onClick={() => onComplete(course.slug, mod.slug)}
                          style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
                        >
                          Marcar concluído
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
