import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentSource } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getPatientContext } from '../common/patient-context';
import { CoursesService } from '../courses/courses.service';
import { CertificatesService } from '../certificates/certificates.service';
import { AsaasService } from '../asaas/asaas.service';
import { SubmitQuizAttemptDto } from '../courses/dto/submit-quiz-attempt.dto';

interface QuizOption {
  id: string;
  label: string;
}

/**
 * Espelha CoursesService, mas escopado por paciente (getPatientContext) em
 * vez de getRequestContext() — os dois nunca se misturam (ver
 * patient-auth.middleware.ts). CourseEnrollment/ModuleProgress/
 * CourseQuizAttempt/Certificate suportam patientId como ator alternativo ao
 * userId desde a Fase 2b (unificação de identidade paciente/aluno).
 */
@Injectable()
export class PatientCoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courses: CoursesService,
    private readonly certificates: CertificatesService,
    private readonly asaas: AsaasService,
  ) {}

  /** Vitrine — mesmo catálogo público do Marketplace, sem depender de ator nenhum. */
  listCatalog() {
    return this.courses.listPublicCatalog();
  }

  private async hasModuleAccess(tenantId: string, courseSlug: string, moduleFree: boolean, patientId: string): Promise<boolean> {
    if (moduleFree) return true;
    const enrollment = await this.prisma.forTenant(tenantId).courseEnrollment.findFirst({ where: { patientId, courseSlug } });
    return Boolean(enrollment);
  }

  /** Catálogo com progresso/bloqueio, igual CoursesService.listCatalog() mas pro paciente logado. */
  async listCatalogWithProgress() {
    const { tenantId, patientId } = getPatientContext();
    const tenantPrisma = this.prisma.forTenant(tenantId);

    const coursesData = await this.prisma.course.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: { materials: { select: { id: true, title: true } }, quiz: { include: { questions: { select: { id: true } } } } },
            },
          },
        },
      },
    });

    const lessonIds = coursesData.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => l.id)));
    const progress = await tenantPrisma.moduleProgress.findMany({ where: { patientId, lessonId: { in: lessonIds } } });
    const completedLessonIds = new Set(progress.map((p) => p.lessonId));

    const quizIds = coursesData.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => l.quiz?.id).filter(Boolean))) as string[];
    const attempts = await tenantPrisma.courseQuizAttempt.findMany({ where: { patientId, quizId: { in: quizIds } } });
    const bestScoreByQuiz = new Map<string, number>();
    const passedByQuiz = new Set<string>();
    const attemptCountByQuiz = new Map<string, number>();
    for (const a of attempts) {
      bestScoreByQuiz.set(a.quizId, Math.max(bestScoreByQuiz.get(a.quizId) ?? 0, a.scorePercent));
      if (a.passed) passedByQuiz.add(a.quizId);
      attemptCountByQuiz.set(a.quizId, (attemptCountByQuiz.get(a.quizId) ?? 0) + 1);
    }

    const result = [];
    for (const course of coursesData) {
      const modules = [];
      for (const module of course.modules) {
        const moduleUnlocked = await this.hasModuleAccess(tenantId, course.slug, module.free, patientId);
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
          if (!lesson.isExtra && lesson.quiz?.required && !passedByQuiz.has(lesson.quiz.id)) blockedBySequence = true;
        }
        modules.push({ id: module.id, order: module.order, title: module.title, free: module.free, locked: !moduleUnlocked, lessons });
      }
      result.push({ id: course.id, slug: course.slug, title: course.title, description: course.description, priceCents: course.priceCents, modules });
    }
    return result;
  }

  /**
   * Cobrança avulsa via Asaas (sem split, vai pra plataforma — mesmo dono do
   * conteúdo do curso, não o psicólogo). `externalReference` ganha um 4º
   * segmento (patientId) que o webhook (AsaasService.handleWebhook) usa pra
   * saber que essa matrícula é de um paciente, não de uma conta ESTUDANTE.
   */
  async purchaseCourse(courseSlug: string, cpfCnpj: string) {
    const { tenantId, patientId } = getPatientContext();
    if (!(await this.courses.courseExists(courseSlug))) throw new NotFoundException('Curso não encontrado.');
    const priceCents = await this.courses.getCoursePriceCents(courseSlug);
    if (priceCents === null) throw new BadRequestException('Este curso ainda não tem preço configurado.');

    const existing = await this.prisma.forTenant(tenantId).courseEnrollment.findFirst({ where: { patientId, courseSlug } });
    if (existing) throw new BadRequestException('Você já tem acesso a este curso.');

    const patient = await this.prisma.forTenant(tenantId).patient.findUniqueOrThrow({ where: { id: patientId } });
    const courseTitle = await this.courses.getCourseTitle(courseSlug);

    return this.asaas.createOneTimePayment({
      name: patient.name,
      email: patient.email ?? undefined,
      cpfCnpj: cpfCnpj.replace(/\D/g, ''),
      valueCents: priceCents,
      description: `Curso: ${courseTitle}`,
      externalReference: `enrollment:${tenantId}:${courseSlug}:${patientId}`,
    });
  }

  private async findLessonWithModule(lessonId: string) {
    const lesson = await this.prisma.courseLesson.findUnique({ where: { id: lessonId }, include: { module: { include: { course: true } } } });
    if (!lesson) throw new NotFoundException('Aula não encontrada.');
    return lesson;
  }

  private async assertLessonUnlocked(tenantId: string, lessonId: string, patientId: string) {
    const lesson = await this.findLessonWithModule(lessonId);
    const { module } = lesson;
    if (!(await this.hasModuleAccess(tenantId, module.course.slug, module.free, patientId))) {
      throw new ForbiddenException('Sem acesso a este curso — compre no catálogo primeiro.');
    }
    if (!lesson.isExtra) {
      const previousLessons = await this.prisma.courseLesson.findMany({
        where: { moduleId: module.id, isExtra: false, order: { lt: lesson.order } },
        include: { quiz: true },
        orderBy: { order: 'asc' },
      });
      for (const prev of previousLessons) {
        if (!prev.quiz?.required) continue;
        const passed = await this.prisma.forTenant(tenantId).courseQuizAttempt.findFirst({ where: { patientId, quizId: prev.quiz.id, passed: true } });
        if (!passed) throw new ForbiddenException(`Conclua o quiz obrigatório da aula "${prev.title}" antes de continuar.`);
      }
    }
    return lesson;
  }

  async completeLesson(lessonId: string) {
    const { tenantId, patientId } = getPatientContext();
    const lesson = await this.assertLessonUnlocked(tenantId, lessonId, patientId);
    const tenantPrisma = this.prisma.forTenant(tenantId);

    await tenantPrisma.moduleProgress.upsert({
      where: { patientId_lessonId: { patientId, lessonId } },
      create: { tenantId, patientId, lessonId },
      update: {},
    });

    const courseSlug = lesson.module.course.slug;
    const requiredLessonIds = await this.prisma.courseLesson.findMany({
      where: { isExtra: false, module: { courseId: lesson.module.courseId } },
      select: { id: true },
    });
    const doneCount = await tenantPrisma.moduleProgress.count({ where: { patientId, lessonId: { in: requiredLessonIds.map((l) => l.id) } } });
    if (doneCount >= requiredLessonIds.length) {
      await this.certificates.issueIfNeededForPatient(tenantId, patientId, courseSlug);
    }

    return { completed: true };
  }

  async getQuiz(lessonId: string) {
    const { tenantId, patientId } = getPatientContext();
    const lesson = await this.findLessonWithModule(lessonId);
    if (!(await this.hasModuleAccess(tenantId, lesson.module.course.slug, lesson.module.free, patientId))) {
      throw new ForbiddenException('Sem acesso a este curso — compre no catálogo primeiro.');
    }
    const quiz = await this.prisma.courseQuiz.findUnique({ where: { lessonId }, include: { questions: { orderBy: { order: 'asc' } } } });
    if (!quiz) throw new NotFoundException('Esta aula não tem quiz.');

    const attempts = await this.prisma.forTenant(tenantId).courseQuizAttempt.findMany({
      where: { patientId, quizId: quiz.id },
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
    const { tenantId, patientId } = getPatientContext();
    const lesson = await this.findLessonWithModule(lessonId);
    if (!(await this.hasModuleAccess(tenantId, lesson.module.course.slug, lesson.module.free, patientId))) {
      throw new ForbiddenException('Sem acesso a este curso — compre no catálogo primeiro.');
    }
    const quiz = await this.prisma.courseQuiz.findUnique({ where: { lessonId }, include: { questions: true } });
    if (!quiz) throw new NotFoundException('Esta aula não tem quiz.');

    let correctCount = 0;
    for (const q of quiz.questions) {
      if (dto.answers[q.id] === q.correctOptionId) correctCount += 1;
    }
    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePercent >= quiz.passingScorePercent;

    await this.prisma.forTenant(tenantId).courseQuizAttempt.create({
      data: { tenantId, patientId, quizId: quiz.id, answers: dto.answers, scorePercent, passed },
    });

    return { scorePercent, passed, correctCount, totalCount: quiz.questions.length };
  }

  listCertificates() {
    const { patientId } = getPatientContext();
    return this.certificates.listMineForPatient(patientId);
  }

  getCertificateFilePath(id: string) {
    const { patientId } = getPatientContext();
    return this.certificates.getFilePathForPatient(id, patientId);
  }
}
