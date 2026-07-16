import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { COURSE_MATERIAL_UPLOAD_DIR } from '../courses/course-material-upload.config';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { CreateCourseLessonDto } from './dto/create-course-lesson.dto';
import { UpsertCourseQuizDto } from './dto/upsert-course-quiz.dto';

const LESSON_INCLUDE = { materials: true, quiz: { include: { questions: { orderBy: { order: 'asc' as const } } } } };

/** CRUD do catálogo de cursos pro admin da plataforma — cadastro manual, no molde curso/módulo/aula/aula extra. */
@Injectable()
export class AdminCoursesService {
  constructor(private readonly prisma: PrismaService) {}

  listCourses() {
    return this.prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: { lessons: { orderBy: { order: 'asc' }, include: LESSON_INCLUDE } },
        },
      },
    });
  }

  async createCourse(dto: CreateCourseDto) {
    const existing = await this.prisma.course.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new BadRequestException('Já existe um curso com esse slug.');
    return this.prisma.course.create({ data: dto });
  }

  async updateCourse(id: string, dto: UpdateCourseDto) {
    await this.findCourse(id);
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async deleteCourse(id: string) {
    const course = await this.findCourse(id);
    const enrollments = await this.prisma.courseEnrollment.count({ where: { courseSlug: course.slug } });
    if (enrollments > 0) {
      throw new BadRequestException('Este curso já tem matrículas — desative em vez de excluir.');
    }
    // Certificate.course não tem onDelete: Cascade de propósito (autenticidade de diploma emitido
    // não deve sumir se o curso for excluído do catálogo) — sem este check, a FK derruba um 500 cru.
    const certificates = await this.prisma.certificate.count({ where: { courseSlug: course.slug } });
    if (certificates > 0) {
      throw new BadRequestException('Este curso já tem certificados emitidos — desative em vez de excluir.');
    }
    await this.prisma.course.delete({ where: { id } });
    return { deleted: true };
  }

  private async findCourse(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Curso não encontrado.');
    return course;
  }

  async createModule(courseId: string, dto: CreateCourseModuleDto) {
    await this.findCourse(courseId);
    return this.prisma.courseModule.create({
      data: { courseId, order: dto.order, title: dto.title, free: dto.free ?? false },
    });
  }

  async updateModule(id: string, dto: Partial<CreateCourseModuleDto>) {
    await this.findModule(id);
    return this.prisma.courseModule.update({ where: { id }, data: dto });
  }

  async deleteModule(id: string) {
    await this.findModule(id);
    await this.prisma.courseModule.delete({ where: { id } });
    return { deleted: true };
  }

  private async findModule(id: string) {
    const module = await this.prisma.courseModule.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Módulo não encontrado.');
    return module;
  }

  async createLesson(moduleId: string, dto: CreateCourseLessonDto) {
    await this.findModule(moduleId);
    return this.prisma.courseLesson.create({
      data: {
        moduleId,
        order: dto.order,
        title: dto.title,
        description: dto.description,
        youtubeUrl: dto.youtubeUrl,
        isExtra: dto.isExtra ?? false,
      },
      include: LESSON_INCLUDE,
    });
  }

  async updateLesson(id: string, dto: Partial<CreateCourseLessonDto>) {
    await this.findLesson(id);
    return this.prisma.courseLesson.update({ where: { id }, data: dto, include: LESSON_INCLUDE });
  }

  async deleteLesson(id: string) {
    await this.findLesson(id);
    await this.prisma.courseLesson.delete({ where: { id } });
    return { deleted: true };
  }

  private async findLesson(id: string) {
    const lesson = await this.prisma.courseLesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Aula não encontrada.');
    return lesson;
  }

  async addMaterial(lessonId: string, title: string, file?: Express.Multer.File) {
    await this.findLesson(lessonId);
    if (!file) throw new BadRequestException('Envie o arquivo do material de apoio.');
    return this.prisma.courseLessonMaterial.create({ data: { lessonId, title, filePath: file.filename } });
  }

  async deleteMaterial(id: string) {
    const material = await this.prisma.courseLessonMaterial.findUnique({ where: { id } });
    if (!material) throw new NotFoundException('Material não encontrado.');
    fs.unlink(path.join(COURSE_MATERIAL_UPLOAD_DIR, material.filePath), () => undefined);
    await this.prisma.courseLessonMaterial.delete({ where: { id } });
    return { deleted: true };
  }

  async upsertQuiz(lessonId: string, dto: UpsertCourseQuizDto) {
    await this.findLesson(lessonId);
    const options = dto.questions.map((q) => q.options as unknown as Prisma.InputJsonValue);
    const existing = await this.prisma.courseQuiz.findUnique({ where: { lessonId } });

    if (existing) {
      await this.prisma.courseQuizQuestion.deleteMany({ where: { quizId: existing.id } });
      return this.prisma.courseQuiz.update({
        where: { id: existing.id },
        data: {
          required: dto.required,
          passingScorePercent: dto.passingScorePercent,
          questions: {
            create: dto.questions.map((q, i) => ({
              order: i + 1,
              prompt: q.prompt,
              options: options[i],
              correctOptionId: q.correctOptionId,
            })),
          },
        },
        include: { questions: { orderBy: { order: 'asc' } } },
      });
    }

    return this.prisma.courseQuiz.create({
      data: {
        lessonId,
        required: dto.required,
        passingScorePercent: dto.passingScorePercent,
        questions: {
          create: dto.questions.map((q, i) => ({
            order: i + 1,
            prompt: q.prompt,
            options: options[i],
            correctOptionId: q.correctOptionId,
          })),
        },
      },
      include: { questions: { orderBy: { order: 'asc' } } },
    });
  }

  async deleteQuiz(lessonId: string) {
    const quiz = await this.prisma.courseQuiz.findUnique({ where: { lessonId } });
    if (!quiz) throw new NotFoundException('Quiz não encontrado.');
    await this.prisma.courseQuiz.delete({ where: { id: quiz.id } });
    return { deleted: true };
  }
}
