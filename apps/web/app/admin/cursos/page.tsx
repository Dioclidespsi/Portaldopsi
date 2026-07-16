'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '../../../components/AdminNav';
import {
  AdminCourse,
  AdminCourseLesson,
  AdminCourseModule,
  AdminQuizOption,
  addCourseMaterial,
  createCourse,
  createCourseLesson,
  createCourseModule,
  deleteCourse,
  deleteCourseMaterial,
  deleteCourseQuiz,
  getAdminToken,
  listAdminCourses,
  updateCourse,
  upsertCourseQuiz,
} from '../../../lib/admin-api';

function centsToReais(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

interface QuizQuestionDraft {
  prompt: string;
  options: AdminQuizOption[];
  correctOptionId: string;
}

function emptyQuestion(): QuizQuestionDraft {
  return { prompt: '', options: [{ id: 'a', label: '' }, { id: 'b', label: '' }], correctOptionId: 'a' };
}

function QuizEditor({ lesson, onSaved, onDeleted }: { lesson: AdminCourseLesson; onSaved: (q: AdminCourseLesson['quiz']) => void; onDeleted: () => void }) {
  const [required, setRequired] = useState(lesson.quiz?.required ?? false);
  const [passingScorePercent, setPassingScorePercent] = useState(lesson.quiz?.passingScorePercent ?? 70);
  const [questions, setQuestions] = useState<QuizQuestionDraft[]>(
    lesson.quiz?.questions.map((q) => ({ prompt: q.prompt, options: q.options, correctOptionId: q.correctOptionId })) ?? [emptyQuestion()],
  );
  const [error, setError] = useState<string | null>(null);

  function updateQuestion(i: number, patch: Partial<QuizQuestionDraft>) {
    setQuestions((prev) => prev.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  }

  function updateOption(qIndex: number, optIndex: number, label: string) {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === qIndex ? { ...q, options: q.options.map((o, oi) => (oi === optIndex ? { ...o, label } : o)) } : q)),
    );
  }

  function addOption(qIndex: number) {
    setQuestions((prev) =>
      prev.map((q, idx) => {
        if (idx !== qIndex) return q;
        const nextId = String.fromCharCode(97 + q.options.length);
        return { ...q, options: [...q.options, { id: nextId, label: '' }] };
      }),
    );
  }

  async function onSave() {
    setError(null);
    try {
      const saved = await upsertCourseQuiz(lesson.id, {
        required,
        passingScorePercent,
        questions: questions.filter((q) => q.prompt.trim()),
      });
      onSaved(saved);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete() {
    setError(null);
    try {
      await deleteCourseQuiz(lesson.id);
      onDeleted();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="callout-box" style={{ marginTop: '0.6rem' }}>
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
          <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} style={{ width: 'auto' }} />
          Obrigatório antes da próxima aula
        </label>
        <label>
          Nota mínima (%)
          <input type="number" value={passingScorePercent} onChange={(e) => setPassingScorePercent(Number(e.target.value))} style={{ width: '80px' }} />
        </label>
      </div>

      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: '0.8rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--line)' }}>
          <textarea
            value={q.prompt}
            onChange={(e) => updateQuestion(i, { prompt: e.target.value })}
            placeholder={`Pergunta ${i + 1}`}
            rows={2}
            style={{ width: '100%', padding: '0.4rem', border: '1px solid var(--line)', borderRadius: '6px', fontFamily: 'inherit', marginBottom: '0.4rem' }}
          />
          {q.options.map((opt, oi) => (
            <div key={opt.id} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.3rem' }}>
              <input
                type="radio"
                name={`correct-${i}`}
                checked={q.correctOptionId === opt.id}
                onChange={() => updateQuestion(i, { correctOptionId: opt.id })}
                style={{ width: 'auto' }}
              />
              <input value={opt.label} onChange={(e) => updateOption(i, oi, e.target.value)} placeholder={`Opção ${opt.id.toUpperCase()}`} style={{ flex: 1 }} />
            </div>
          ))}
          <button type="button" onClick={() => addOption(i)} style={{ fontSize: '0.78rem' }}>+ Opção</button>
        </div>
      ))}
      <button type="button" onClick={() => setQuestions((prev) => [...prev, emptyQuestion()])} style={{ fontSize: '0.82rem', marginBottom: '0.6rem' }}>
        + Pergunta
      </button>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="button" onClick={onSave}>Salvar quiz</button>
        {lesson.quiz && (
          <button type="button" onClick={onDelete} style={{ background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}>
            Excluir quiz
          </button>
        )}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

function LessonEditor({ lesson, onChange }: { lesson: AdminCourseLesson; onChange: (lesson: AdminCourseLesson) => void }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onAddMaterial(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!materialFile) {
      setError('Selecione um arquivo.');
      return;
    }
    try {
      const material = await addCourseMaterial(lesson.id, materialTitle, materialFile);
      onChange({ ...lesson, materials: [...lesson.materials, material] });
      setMaterialTitle('');
      setMaterialFile(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDeleteMaterial(id: string) {
    setError(null);
    try {
      await deleteCourseMaterial(id);
      onChange({ ...lesson, materials: lesson.materials.filter((m) => m.id !== id) });
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div style={{ padding: '0.5rem 0 0.5rem 1rem', borderLeft: '2px solid var(--line)', marginBottom: '0.4rem' }}>
      <p style={{ fontSize: '0.86rem', margin: '0 0 0.3rem' }}>
        {lesson.order}. {lesson.title}{lesson.isExtra && ' (extra)'}
        {lesson.youtubeUrl && <span className="sub" style={{ marginLeft: '0.4rem' }}>🎬 vídeo anexado</span>}
      </p>
      {lesson.description && <p className="sub" style={{ margin: '0 0 0.3rem', fontSize: '0.8rem' }}>{lesson.description}</p>}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
        {lesson.materials.map((m) => (
          <span key={m.id} style={{ fontSize: '0.78rem', display: 'flex', gap: '0.3rem', alignItems: 'center', border: '1px solid var(--line)', borderRadius: '4px', padding: '0.2rem 0.4rem' }}>
            {m.title}
            <button type="button" onClick={() => onDeleteMaterial(m.id)} style={{ fontSize: '0.7rem', padding: '0.1rem 0.3rem' }}>x</button>
          </span>
        ))}
      </div>
      <form onSubmit={onAddMaterial} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.4rem' }}>
        <label>
          Material de apoio
          <input value={materialTitle} onChange={(e) => setMaterialTitle(e.target.value)} placeholder="Título do arquivo" required />
        </label>
        <input type="file" onChange={(e) => setMaterialFile(e.target.files?.[0] ?? null)} />
        <button type="submit" style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>Anexar</button>
      </form>
      <button type="button" onClick={() => setQuizOpen((v) => !v)} style={{ fontSize: '0.78rem', marginTop: '0.4rem' }}>
        {lesson.quiz ? 'Editar quiz' : 'Adicionar quiz'}
      </button>
      {quizOpen && (
        <QuizEditor
          lesson={lesson}
          onSaved={(quiz) => { onChange({ ...lesson, quiz }); setQuizOpen(false); }}
          onDeleted={() => { onChange({ ...lesson, quiz: null }); setQuizOpen(false); }}
        />
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

function ModuleEditor({ module, onChange }: { module: AdminCourseModule; onChange: (module: AdminCourseModule) => void }) {
  const [order, setOrder] = useState(String(module.lessons.length + 1));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isExtra, setIsExtra] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onAddLesson(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const lesson = await createCourseLesson(module.id, {
        order: Number(order),
        title,
        description: description || undefined,
        youtubeUrl: youtubeUrl || undefined,
        isExtra,
      });
      onChange({ ...module, lessons: [...module.lessons, lesson] });
      setTitle('');
      setDescription('');
      setYoutubeUrl('');
      setOrder(String(module.lessons.length + 2));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div style={{ padding: '0.5rem 0 0.5rem 1rem', borderLeft: '2px solid var(--line)', marginBottom: '0.6rem' }}>
      <p style={{ fontSize: '0.9rem', margin: '0 0 0.4rem' }}>
        Módulo {module.order} — {module.title} {module.free && <span className="chip-free">grátis</span>}
      </p>
      {module.lessons.map((lesson) => (
        <LessonEditor
          key={lesson.id}
          lesson={lesson}
          onChange={(updated) => onChange({ ...module, lessons: module.lessons.map((l) => (l.id === updated.id ? updated : l)) })}
        />
      ))}
      <form onSubmit={onAddLesson} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
        <label>
          Ordem
          <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} style={{ width: '70px' }} required />
        </label>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Nova aula
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título da aula" required />
        </label>
        <label style={{ flex: 1, minWidth: '220px' }}>
          Link do YouTube (opcional)
          <input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtu.be/..." />
        </label>
        <label style={{ flex: 1, minWidth: '220px' }}>
          Descrição (opcional)
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Resumo da aula" />
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.3rem' }}>
          <input type="checkbox" checked={isExtra} onChange={(e) => setIsExtra(e.target.checked)} style={{ width: 'auto' }} />
          Aula extra
        </label>
        <button type="submit" style={{ fontSize: '0.82rem' }}>+ Aula</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

function CourseEditor({ course, onChange }: { course: AdminCourse; onChange: (course: AdminCourse) => void }) {
  const [order, setOrder] = useState(String(course.modules.length + 1));
  const [title, setTitle] = useState('');
  const [free, setFree] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onAddModule(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const module = await createCourseModule(course.id, { order: Number(order), title, free });
      onChange({ ...course, modules: [...course.modules, { ...module, lessons: [] }] });
      setTitle('');
      setOrder(String(course.modules.length + 2));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div>
      {course.modules.map((module) => (
        <ModuleEditor
          key={module.id}
          module={module}
          onChange={(updated) => onChange({ ...course, modules: course.modules.map((m) => (m.id === updated.id ? updated : m)) })}
        />
      ))}
      <form onSubmit={onAddModule} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
        <label>
          Ordem
          <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} style={{ width: '70px' }} required />
        </label>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Novo módulo
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do módulo" required />
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.3rem' }}>
          <input type="checkbox" checked={free} onChange={(e) => setFree(e.target.checked)} style={{ width: 'auto' }} />
          Grátis (isca)
        </label>
        <button type="submit" style={{ fontSize: '0.82rem' }}>+ Módulo</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default function AdminCursosPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceReais, setPriceReais] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }
    listAdminCourses()
      .then(setCourses)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function onCreateCourse(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const priceCents = priceReais ? Math.round(parseFloat(priceReais.replace(',', '.')) * 100) : undefined;
      const course = await createCourse({ slug, title, description, priceCents });
      setCourses((prev) => [...prev, { ...course, modules: [] }]);
      setSlug('');
      setTitle('');
      setDescription('');
      setPriceReais('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onToggleActive(course: AdminCourse) {
    setError(null);
    try {
      const updated = await updateCourse(course.id, { active: !course.active });
      setCourses((prev) => prev.map((c) => (c.id === course.id ? { ...c, active: updated.active } : c)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onDelete(id: string) {
    setError(null);
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (loading) return <div className="shell">Carregando…</div>;

  return (
    <div className="shell shell-wide">
      <AdminNav />
      <h2 style={{ fontSize: '1.05rem' }}>Cursos</h2>
      <p className="sub">
        Cadastro no molde de plataforma comercial: curso → módulo → aula (+ aulas extras), vídeo do YouTube, material de
        apoio pra baixar e quiz objetivo por aula. Assinante da plataforma tem acesso incluso; quem compra avulso paga o preço aqui.
      </p>

      <table style={{ marginTop: '1rem' }}>
        <thead><tr><th>Título</th><th>Preço</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>
                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: 0 }}
                >
                  {c.title}
                </button>
              </td>
              <td>{c.priceCents !== null ? centsToReais(c.priceCents) : 'A definir'}</td>
              <td>{c.active ? 'Ativo' : 'Inativo'}</td>
              <td style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => onToggleActive(c)} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
                  {c.active ? 'Desativar' : 'Ativar'}
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', background: 'transparent', color: 'var(--ink-soft)', border: '1px solid var(--line)' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr><td colSpan={4} style={{ color: 'var(--ink-soft)' }}>Nenhum curso cadastrado ainda.</td></tr>
          )}
        </tbody>
      </table>

      {expandedId && (() => {
        const course = courses.find((c) => c.id === expandedId);
        if (!course) return null;
        return (
          <div className="callout-box" style={{ marginTop: '1rem' }}>
            <h3 style={{ fontSize: '0.92rem', marginTop: 0 }}>Módulos e aulas de "{course.title}"</h3>
            <CourseEditor course={course} onChange={(updated) => setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))} />
          </div>
        );
      })()}

      <h3 style={{ fontSize: '0.95rem', marginTop: '1.6rem' }}>Cadastrar novo curso</h3>
      <form onSubmit={onCreateCourse} style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label>
          Slug
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ex: formacao-neurociencia" required />
        </label>
        <label style={{ flex: 1, minWidth: '160px' }}>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label style={{ flex: 1, minWidth: '200px' }}>
          Descrição
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Preço (R$, opcional)
          <input value={priceReais} onChange={(e) => setPriceReais(e.target.value)} placeholder="497,00" />
        </label>
        <button type="submit">Cadastrar curso</button>
      </form>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
