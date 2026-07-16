'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '../../../components/DashboardNav';
import {
  CourseLessonView,
  CourseView,
  downloadCourseMaterial,
  getLessonQuiz,
  listCourseCatalog,
  markLessonComplete,
  QuizForStudent,
  submitQuizAttempt,
} from '../../../lib/api';

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

function QuizPanel({ lessonId, onClose }: { lessonId: string; onClose: () => void }) {
  const [quiz, setQuiz] = useState<QuizForStudent | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ scorePercent: number; passed: boolean; correctCount: number; totalCount: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLessonQuiz(lessonId).then(setQuiz).catch((err) => setError((err as Error).message));
  }, [lessonId]);

  async function onSubmit() {
    setError(null);
    try {
      const res = await submitQuizAttempt(lessonId, answers);
      setResult(res);
      const updated = await getLessonQuiz(lessonId);
      setQuiz(updated);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function onRetry() {
    setResult(null);
    setAnswers({});
  }

  if (error) return <div className="callout-box" style={{ marginTop: '0.6rem' }}><span className="error">{error}</span></div>;
  if (!quiz) return <div className="callout-box" style={{ marginTop: '0.6rem' }}>Carregando quiz…</div>;

  const allAnswered = quiz.questions.every((q) => answers[q.id]);

  return (
    <div className="callout-box" style={{ marginTop: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <strong style={{ fontSize: '0.9rem' }}>
          Quiz {quiz.required ? `— nota mínima ${quiz.passingScorePercent}%` : '(opcional)'}
        </strong>
        <button type="button" onClick={onClose} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
          Fechar
        </button>
      </div>

      {result ? (
        <div>
          <p style={{ margin: '0 0 0.6rem', fontSize: '0.95rem' }}>
            Nota: <strong>{result.scorePercent}%</strong> ({result.correctCount}/{result.totalCount} corretas) —{' '}
            {result.passed ? '✓ aprovado' : 'não atingiu a nota mínima'}
          </p>
          <button type="button" onClick={onRetry} style={{ fontSize: '0.85rem' }}>Tentar de novo</button>
        </div>
      ) : (
        <>
          {quiz.questions.map((q, i) => (
            <div key={q.id} style={{ marginBottom: '0.8rem' }}>
              <p style={{ fontSize: '0.88rem', margin: '0 0 0.3rem' }}>{i + 1}. {q.prompt}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {q.options.map((opt) => (
                  <label key={opt.id} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === opt.id}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                      style={{ width: 'auto' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="button" onClick={onSubmit} disabled={!allAnswered}>Enviar respostas</button>
        </>
      )}

      {quiz.attempts.length > 0 && (
        <div style={{ marginTop: '0.8rem' }}>
          <p className="sub" style={{ marginBottom: '0.3rem' }}>Tentativas anteriores:</p>
          {quiz.attempts.map((a) => (
            <p key={a.id} className="sub" style={{ margin: 0 }}>
              {new Date(a.createdAt).toLocaleString('pt-BR')} — {a.scorePercent}% {a.passed ? '(aprovado)' : ''}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function LessonRow({ lesson, onComplete, onDownload }: {
  lesson: CourseLessonView;
  onComplete: (lessonId: string) => void;
  onDownload: (materialId: string, title: string) => void;
}) {
  const [quizOpen, setQuizOpen] = useState(false);
  const embedUrl = lesson.youtubeUrl ? toYoutubeEmbedUrl(lesson.youtubeUrl) : null;

  return (
    <div style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--line)', opacity: lesson.locked ? 0.55 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '0.88rem' }}>
          {lesson.completed ? '✓ ' : ''}{lesson.title}{lesson.isExtra && ' (extra)'}
        </span>
        {lesson.locked && <span className="sub" style={{ margin: 0 }}>bloqueado</span>}
      </div>

      {!lesson.locked && lesson.description && <p className="sub" style={{ margin: '0.3rem 0' }}>{lesson.description}</p>}

      {!lesson.locked && embedUrl && (
        <div style={{ margin: '0.6rem 0', aspectRatio: '16 / 9', maxWidth: '560px' }}>
          <iframe
            src={embedUrl}
            title={lesson.title}
            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {!lesson.locked && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem', alignItems: 'center' }}>
          {lesson.materials.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onDownload(m.id, m.title)}
              style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--line)', fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
            >
              {m.title}
            </button>
          ))}
          {lesson.quiz && (
            <button type="button" onClick={() => setQuizOpen((v) => !v)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
              {lesson.quiz.attemptCount > 0 ? `Quiz — melhor nota ${lesson.quiz.bestScorePercent}%` : 'Fazer quiz'}
            </button>
          )}
          {!lesson.completed && (
            <button type="button" onClick={() => onComplete(lesson.id)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
              Marcar concluído
            </button>
          )}
        </div>
      )}

      {quizOpen && !lesson.locked && <QuizPanel lessonId={lesson.id} onClose={() => setQuizOpen(false)} />}
    </div>
  );
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

  async function onComplete(lessonId: string) {
    setError(null);
    try {
      await markLessonComplete(lessonId);
      setCourses((prev) =>
        prev.map((c) => ({
          ...c,
          modules: c.modules.map((m) => ({
            ...m,
            lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, completed: true } : l)),
          })),
        })),
      );
      // Recarrega pra refletir aulas que dependiam desta pra desbloquear.
      listCourseCatalog().then(setCourses);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDownload(materialId: string, title: string) {
    setError(null);
    try {
      await downloadCourseMaterial(materialId, title);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <DashboardNav />
      <h2 style={{ fontSize: '1.05rem' }}>Cursos</h2>
      {error && <span className="error">{error}</span>}

      {courses.map((course) => (
        <div key={course.id} style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.98rem', marginBottom: '0.2rem' }}>{course.title}</h3>
          <p className="sub" style={{ marginBottom: '0.8rem' }}>{course.description}</p>

          {course.modules.map((mod) => (
            <div key={mod.id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.88rem' }}>Módulo {mod.order} — {mod.title}</strong>
                {mod.free && <span className="chip-free">grátis</span>}
              </div>

              {mod.lessons.length === 0 && (
                <p className="sub" style={{ fontSize: '0.82rem' }}>Nenhuma aula cadastrada ainda.</p>
              )}

              {mod.lessons.map((lesson) => (
                <LessonRow key={lesson.id} lesson={lesson} onComplete={onComplete} onDownload={onDownload} />
              ))}
            </div>
          ))}
        </div>
      ))}
      {courses.length === 0 && <p className="sub">Nenhum curso disponível ainda.</p>}
    </div>
  );
}
