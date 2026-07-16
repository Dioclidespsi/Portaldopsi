'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CertificateRecord, CourseLessonView, CourseView, QuizForStudent } from '../../../lib/api';
import {
  downloadOwnCertificate,
  getOwnLessonQuiz,
  listOwnCertificates,
  listOwnCoursesWithProgress,
  markOwnLessonComplete,
  purchaseOwnCourse,
  submitOwnQuizAttempt,
} from '../../../lib/patient-api';

function centsToReais(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function toYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) return `https://www.youtube.com/embed${parsed.pathname}`;
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
    getOwnLessonQuiz(lessonId).then(setQuiz).catch((err) => setError((err as Error).message));
  }, [lessonId]);

  async function onSubmit() {
    setError(null);
    try {
      const res = await submitOwnQuizAttempt(lessonId, answers);
      setResult(res);
      const updated = await getOwnLessonQuiz(lessonId);
      setQuiz(updated);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (error) return <div className="callout-box" style={{ marginTop: '0.6rem' }}><span className="error">{error}</span></div>;
  if (!quiz) return <div className="callout-box" style={{ marginTop: '0.6rem' }}>Carregando quiz…</div>;

  const allAnswered = quiz.questions.every((q) => answers[q.id]);

  return (
    <div className="callout-box" style={{ marginTop: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <strong style={{ fontSize: '0.9rem' }}>Quiz {quiz.required ? `— nota mínima ${quiz.passingScorePercent}%` : '(opcional)'}</strong>
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
          <button type="button" onClick={() => setResult(null)} style={{ fontSize: '0.85rem' }}>Tentar de novo</button>
        </div>
      ) : (
        <>
          {quiz.questions.map((q, i) => (
            <div key={q.id} style={{ marginBottom: '0.8rem' }}>
              <p style={{ fontSize: '0.88rem', margin: '0 0 0.3rem' }}>{i + 1}. {q.prompt}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {q.options.map((opt) => (
                  <label key={opt.id} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <input type="radio" name={q.id} checked={answers[q.id] === opt.id} onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))} style={{ width: 'auto' }} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="button" onClick={onSubmit} disabled={!allAnswered}>Enviar respostas</button>
        </>
      )}
    </div>
  );
}

function LessonRow({ lesson, onComplete }: { lesson: CourseLessonView; onComplete: (id: string) => void }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const embedUrl = lesson.youtubeUrl ? toYoutubeEmbedUrl(lesson.youtubeUrl) : null;

  return (
    <div style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--line)', opacity: lesson.locked ? 0.55 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '0.88rem' }}>{lesson.completed ? '✓ ' : ''}{lesson.title}{lesson.isExtra && ' (extra)'}</span>
        {lesson.locked && <span className="sub" style={{ margin: 0 }}>bloqueado</span>}
      </div>
      {!lesson.locked && lesson.description && <p className="sub" style={{ margin: '0.3rem 0' }}>{lesson.description}</p>}
      {!lesson.locked && embedUrl && (
        <div style={{ margin: '0.6rem 0', aspectRatio: '16 / 9', maxWidth: '560px' }}>
          <iframe src={embedUrl} title={lesson.title} style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }} allowFullScreen />
        </div>
      )}
      {!lesson.locked && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem', alignItems: 'center' }}>
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

export default function PatientCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buyingSlug, setBuyingSlug] = useState<string | null>(null);
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);

  function load() {
    return Promise.all([listOwnCoursesWithProgress(), listOwnCertificates()])
      .then(([c, certs]) => {
        setCourses(c);
        setCertificates(certs);
      })
      .catch(() => router.push('/paciente/login'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function onComplete(lessonId: string) {
    setError(null);
    try {
      await markOwnLessonComplete(lessonId);
      load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onBuy(e: FormEvent, slug: string) {
    e.preventDefault();
    setError(null);
    setPaymentLink(null);
    try {
      const result = await purchaseOwnCourse(slug, cpfCnpj);
      setPaymentLink(result.paymentLink);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <div className="topbar">
        <h1>Cursos</h1>
        <Link href="/paciente">
          <button style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' }}>Voltar</button>
        </Link>
      </div>
      {error && <span className="error">{error}</span>}

      {courses.map((course) => {
        const locked = course.modules.some((m) => !m.free) && course.modules.every((m) => m.free || m.locked);
        return (
          <div key={course.id} style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.98rem', marginBottom: '0.2rem' }}>{course.title}</h3>
            <p className="sub" style={{ marginBottom: '0.6rem' }}>{course.description}</p>

            {locked && course.priceCents !== null && (
              <div className="callout-box" style={{ marginBottom: '0.8rem' }}>
                <p style={{ margin: '0 0 0.6rem' }}>
                  Valor: <strong>{centsToReais(course.priceCents)}</strong>
                </p>
                {buyingSlug === course.slug ? (
                  paymentLink ? (
                    <a href={paymentLink} target="_blank" rel="noreferrer"><button type="button">Pagar agora</button></a>
                  ) : (
                    <form onSubmit={(e) => onBuy(e, course.slug)} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                      <label>
                        CPF
                        <input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
                      </label>
                      <button type="submit">Comprar</button>
                    </form>
                  )
                ) : (
                  <button type="button" onClick={() => { setBuyingSlug(course.slug); setPaymentLink(null); }}>
                    Comprar curso
                  </button>
                )}
              </div>
            )}

            {course.modules.map((mod) => (
              <div key={mod.id} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '0.88rem' }}>Módulo {mod.order} — {mod.title}</strong>
                  {mod.free && <span className="chip-free">grátis</span>}
                </div>
                {mod.lessons.map((lesson) => (
                  <LessonRow key={lesson.id} lesson={lesson} onComplete={onComplete} />
                ))}
              </div>
            ))}
          </div>
        );
      })}
      {courses.length === 0 && <p className="sub">Nenhum curso disponível ainda.</p>}

      {certificates.length > 0 && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--line)', paddingTop: '1.2rem' }}>
          <h3 style={{ fontSize: '0.95rem' }}>Meus certificados</h3>
          {certificates.map((c) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontSize: '0.9rem' }}>{c.course.title} — {new Date(c.issuedAt).toLocaleDateString('pt-BR')}</span>
              <button
                type="button"
                onClick={() => downloadOwnCertificate(c.id, `certificado-${c.course.title}.png`)}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
              >
                Baixar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
