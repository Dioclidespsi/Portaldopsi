import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'node:path';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CertificatesService } from '../certificates/certificates.service';
import { AccessGateService } from '../common/access-gate.service';
import { COURSE_MATERIAL_UPLOAD_DIR } from './course-material-upload.config';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';

interface QuizOption {
  id: string;
  label: string;
}

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly certificates: CertificatesService,
    private readonly accessGate: AccessGateService,
  ) {}

  /**
   * Módulo gratuito libera pra qualquer autenticado (isca/lead-magnet). Fora
   * isso, quem acessa depende de `Course.audience` (ver enum CourseAudience):
   * ESTUDANTES é o modo clássico (matrícula paga via Marketplace/Loja, nunca
   * CLINICA); PROFISSIONAIS_GRATIS/PROFISSIONAIS_PAGO são exclusivos de
   * CLINICA e exigem o mesmo gate de AccessGateService usado no núcleo
   * clínico (CRP+assinatura+termos) — "grátis" aqui é "incluso na
   * assinatura", nunca "livre pra qualquer um"; PAGO exige o gate MAIS uma
   * CourseEnrollment (mesma compra que ESTUDANTE usa, ver MarketplaceService).
   */
  private async hasModuleAccess(courseSlug: string, moduleFree: boolean): Promise<boolean> {
    if (moduleFree) return true;
    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const [tenant, course] = await Promise.all([
      this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId } }),
      this.prisma.course.findUniqueOrThrow({ where: { slug: courseSlug }, select: { audience: true } }),
    ]);

    if (tenant.kind === 'ESTUDANTE') {
      if (course.audience !== 'ESTUDANTES') return false;
      // course_enrollments/users têm RLS forçado — precisa de forCurrentTenant(), o client
      // cru sempre volta zero linhas aqui (mesmo bug já visto em outras tabelas do projeto).
      const enrollment = await tenantPrisma.courseEnrollment.findFirst({
        where: { tenantId, courseSlug, patientId: null },
      });
      if (!enrollment) return false;
      // Item 4: mesmo com matrícula paga, estudante de psicologia só acessa o
      // conteúdo depois que studentVerificationStatus vira VERIFICADO (IA ou
      // aprovação manual do ADM) — ver MarketplaceService.purchase().
      const student = await tenantPrisma.user.findFirst({
        where: { tenantId },
        select: { studentVerificationStatus: true },
      });
      return student?.studentVerificationStatus === 'VERIFICADO';
    }

    // tenant.kind === 'CLINICA'
    if (course.audience === 'ESTUDANTES') return false;
    const { ok } = await this.accessGate.checkFullAccess();
    if (!ok) return false;
    if (course.audience === 'PROFISSIONAIS_GRATIS') return true;
    // PROFISSIONAIS_PAGO
    const enrollment = await tenantPrisma.courseEnrollment.findFirst({
      where: { tenantId, courseSlug, patientId: null },
    });
    return Boolean(enrollment);
  }

  async courseExists(courseSlug: string): Promise<boolean> {
    const count = await this.prisma.course.count({ where: { slug: courseSlug, active: true } });
    return count > 0;
  }

  async getCourseTitle(courseSlug: string): Promise<string> {
    const course = await this.prisma.course.findUnique({ where: { slug: courseSlug } });
    if (!course) throw new NotFoundException('Curso não encontrado.');
    return course.title;
  }

  async getCoursePriceCents(courseSlug: string): Promise<number | null> {
    const course = await this.prisma.course.findUnique({ where: { slug: courseSlug } });
    return course?.priceCents ?? null;
  }

  /** Vitrine pública do Marketplace — sem progresso/acesso de usuário. */
  async listPublicCatalog() {
    const courses = await this.prisma.course.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      include: { modules: { orderBy: { order: 'asc' }, include: { lessons: true } } },
    });
    return courses.map((course) => ({
      slug: course.slug,
      title: course.title,
      description: course.description,
      priceCents: course.priceCents,
      modules: course.modules.map((m) => ({ order: m.order, title: m.title, free: m.free, lessonCount: m.lessons.length })),
    }));
  }

  async listCatalog() {
    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const courses = await this.prisma.course.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: {
                materials: { select: { id: true, title: true } },
                quiz: { include: { questions: { select: { id: true } } } },
              },
            },
          },
        },
      },
    });

    const enrollments = await tenantPrisma.courseEnrollment.findMany({
      where: { tenantId, courseSlug: { in: courses.map((c) => c.slug) }, patientId: null },
      select: { courseSlug: true },
    });
    const enrolledSlugs = new Set(enrollments.map((e) => e.courseSlug));

    const lessonIds = courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => l.id)));
    const progress = await tenantPrisma.moduleProgress.findMany({ where: { userId, lessonId: { in: lessonIds } } });
    const completedLessonIds = new Set(progress.map((p) => p.lessonId));

    const quizIds = courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => l.quiz?.id).filter(Boolean))) as string[];
    const attempts = await tenantPrisma.courseQuizAttempt.findMany({ where: { userId, quizId: { in: quizIds } } });
    const bestScoreByQuiz = new Map<string, number>();
    const passedByQuiz = new Set<string>();
    for (const a of attempts) {
      bestScoreByQuiz.set(a.quizId, Math.max(bestScoreByQuiz.get(a.quizId) ?? 0, a.scorePercent));
      if (a.passed) passedByQuiz.add(a.quizId);
    }
    const attemptCountByQuiz = new Map<string, number>();
    for (const a of attempts) attemptCountByQuiz.set(a.quizId, (attemptCountByQuiz.get(a.quizId) ?? 0) + 1);

    const result = [];
    for (const course of courses) {
      const modules = [];
      for (const module of course.modules) {
        const moduleUnlocked = await this.hasModuleAccess(course.slug, module.free);
        let blockedBySequence = false;
        const lessons = [];
        for (const lesson of module.lessons) {
          const locked = !moduleUnlocked || (!lesson.isExtra && blockedBySequence);
          lessons.push({
            id: lesson.id,
            order: lesson.order,
            title: lesson.title,
            description: lesson.description,
            youtubeUrl: lesson.youtubeUrl,
            isExtra: lesson.isExtra,
            completed: completedLessonIds.has(lesson.id),
            locked,
            materials: lesson.materials,
            quiz: lesson.quiz
              ? {
                  id: lesson.quiz.id,
                  required: lesson.quiz.required,
                  passingScorePercent: lesson.quiz.passingScorePercent,
                  questionCount: lesson.quiz.questions.length,
                  bestScorePercent: bestScoreByQuiz.get(lesson.quiz.id) ?? null,
                  passed: passedByQuiz.has(lesson.quiz.id),
                  attemptCount: attemptCountByQuiz.get(lesson.quiz.id) ?? 0,
                }
              : null,
          });
          if (!lesson.isExtra && lesson.quiz?.required && !passedByQuiz.has(lesson.quiz.id)) {
            blockedBySequence = true;
          }
        }
        modules.push({ id: module.id, order: module.order, title: module.title, free: module.free, locked: !moduleUnlocked, lessons });
      }
      result.push({
        id: course.id,
        slug: course.slug,
        title: course.title,
        description: course.description,
        priceCents: course.priceCents,
        audience: course.audience,
        enrolled: enrolledSlugs.has(course.slug),
        modules,
      });
    }
    return result;
  }

  private async findLessonWithModule(lessonId: string) {
    const lesson = await this.prisma.courseLesson.findUnique({
      where: { id: lessonId },
      include: { module: { include: { course: true } } },
    });
    if (!lesson) throw new NotFoundException('Aula não encontrada.');
    return lesson;
  }

  private async assertLessonUnlocked(lessonId: string) {
    const lesson = await this.findLessonWithModule(lessonId);
    const { module } = lesson;
    const { course } = module;
    if (!(await this.hasModuleAccess(course.slug, module.free))) {
      throw new ForbiddenException('Sem acesso a este curso — ver Marketplace ou assinatura da plataforma.');
    }
    if (!lesson.isExtra) {
      const previousLessons = await this.prisma.courseLesson.findMany({
        where: { moduleId: module.id, isExtra: false, order: { lt: lesson.order } },
        include: { quiz: true },
        orderBy: { order: 'asc' },
      });
      const { userId } = getRequestContext();
      for (const prev of previousLessons) {
        if (!prev.quiz?.required) continue;
        const passed = await this.prisma.forCurrentTenant().courseQuizAttempt.findFirst({
          where: { userId, quizId: prev.quiz.id, passed: true },
        });
        if (!passed) {
          throw new ForbiddenException(`Conclua o quiz obrigatório da aula "${prev.title}" antes de continuar.`);
        }
      }
    }
    return lesson;
  }

  async completeLesson(lessonId: string) {
    const lesson = await this.assertLessonUnlocked(lessonId);
    const { tenantId, userId } = getRequestContext();

    await this.prisma.forCurrentTenant().moduleProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: { tenantId, userId, lessonId },
      update: {},
    });

    const courseSlug = lesson.module.course.slug;
    const requiredLessonIds = await this.prisma.courseLesson.findMany({
      where: { isExtra: false, module: { courseId: lesson.module.courseId } },
      select: { id: true },
    });
    const doneCount = await this.prisma.forCurrentTenant().moduleProgress.count({
      where: { userId, lessonId: { in: requiredLessonIds.map((l) => l.id) } },
    });
    if (doneCount >= requiredLessonIds.length) {
      await this.certificates.issueIfNeeded(courseSlug);
    }

    return { completed: true };
  }

  async getMaterialPath(materialId: string): Promise<{ absolutePath: string; filename: string }> {
    const material = await this.prisma.courseLessonMaterial.findUnique({
      where: { id: materialId },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });
    if (!material) throw new NotFoundException('Material não encontrado.');
    const { course, free } = material.lesson.module;
    if (!(await this.hasModuleAccess(course.slug, free))) {
      throw new ForbiddenException('Sem acesso a este curso — ver Marketplace ou assinatura da plataforma.');
    }
    return { absolutePath: path.join(COURSE_MATERIAL_UPLOAD_DIR, material.filePath), filename: material.title };
  }

  /** Nunca inclui correctOptionId — o front não pode saber a resposta certa antes de responder. */
  async getQuizForStudent(lessonId: string) {
    const lesson = await this.findLessonWithModule(lessonId);
    if (!(await this.hasModuleAccess(lesson.module.course.slug, lesson.module.free))) {
      throw new ForbiddenException('Sem acesso a este curso — ver Marketplace ou assinatura da plataforma.');
    }
    const quiz = await this.prisma.courseQuiz.findUnique({
      where: { lessonId },
      include: { questions: { orderBy: { order: 'asc' } } },
    });
    if (!quiz) throw new NotFoundException('Este aula não tem quiz.');

    const { userId } = getRequestContext();
    const attempts = await this.prisma.forCurrentTenant().courseQuizAttempt.findMany({
      where: { userId, quizId: quiz.id },
      orderBy: { createdAt: 'desc' },
      select: { id: true, scorePercent: true, passed: true, createdAt: true },
    });

    return {
      id: quiz.id,
      required: quiz.required,
      passingScorePercent: quiz.passingScorePercent,
      questions: quiz.questions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options as unknown as QuizOption[] })),
      attempts,
    };
  }

  async submitQuizAttempt(lessonId: string, dto: SubmitQuizAttemptDto) {
    const lesson = await this.findLessonWithModule(lessonId);
    if (!(await this.hasModuleAccess(lesson.module.course.slug, lesson.module.free))) {
      throw new ForbiddenException('Sem acesso a este curso — ver Marketplace ou assinatura da plataforma.');
    }
    const quiz = await this.prisma.courseQuiz.findUnique({ where: { lessonId }, include: { questions: true } });
    if (!quiz) throw new NotFoundException('Este aula não tem quiz.');

    let correctCount = 0;
    for (const q of quiz.questions) {
      if (dto.answers[q.id] === q.correctOptionId) correctCount += 1;
    }
    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePercent >= quiz.passingScorePercent;

    const { tenantId, userId } = getRequestContext();
    await this.prisma.forCurrentTenant().courseQuizAttempt.create({
      data: { tenantId, userId, quizId: quiz.id, answers: dto.answers, scorePercent, passed },
    });

    return { scorePercent, passed, correctCount, totalCount: quiz.questions.length };
  }
}
