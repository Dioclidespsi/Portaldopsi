import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { scanAllCourses } from './catalog/scan';
import { Course, CourseModule } from './catalog/types';
import { CertificatesService } from '../certificates/certificates.service';

export type FileType = 'deck' | 'avaliacao' | 'exercicios' | 'roteiro';
const FILE_TYPES: FileType[] = ['deck', 'avaliacao', 'exercicios', 'roteiro'];

@Injectable()
export class CoursesService {
  private readonly coursesRoot: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly certificates: CertificatesService,
  ) {
    // `||` de propósito, não `??`: COURSES_ROOT="" no .env é uma string vazia (não
    // undefined), e queria cair no default mesmo assim.
    this.coursesRoot = config.get<string>('COURSES_ROOT') || this.resolveDefaultCoursesRoot();
  }

  /**
   * Dois candidatos, nessa ordem: (1) layout de dev local — pastas de curso como
   * projetos-irmãos três níveis acima de apps/api (mesmo repositório do "C:\Claude
   * local"); (2) conteúdo empacotado em apps/api/course-content/, usado no deploy
   * (Render/Railway não têm as pastas-irmãs, só o que está dentro do repositório
   * git). Detecta pela presença real da pasta, não por variável de ambiente, pra
   * funcionar sem configuração extra nos dois ambientes.
   */
  private resolveDefaultCoursesRoot(): string {
    const siblingLayout = path.resolve(process.cwd(), '..', '..', '..');
    if (fs.existsSync(path.join(siblingLayout, 'Formacao-Neurociencia'))) {
      return siblingLayout;
    }
    return path.resolve(__dirname, '..', '..', 'course-content');
  }

  private getCatalog(): Course[] {
    return scanAllCourses(this.coursesRoot);
  }

  private findModule(courseSlug: string, moduleSlug: string): { course: Course; module: CourseModule } {
    const course = this.getCatalog().find((c) => c.slug === courseSlug);
    if (!course) throw new NotFoundException('Curso não encontrado.');
    for (const bloco of course.blocos) {
      const module = bloco.modules.find((m) => m.slug === moduleSlug);
      if (module) return { course, module };
    }
    throw new NotFoundException('Módulo não encontrado.');
  }

  /**
   * Bloco gratuito libera pra qualquer autenticado (isca/lead-magnet, ver
   * Bloco 2 da Escola de Marketing). Fora isso, CLINICA assume acesso incluso
   * na assinatura da plataforma (decisão ainda não confirmada, ver README) e
   * ESTUDANTE só acessa com CourseEnrollment — matrícula via Marketplace.
   */
  private async hasBlocoAccess(courseSlug: string, blocoFree: boolean): Promise<boolean> {
    if (blocoFree) return true;
    const { tenantId } = getRequestContext();
    const tenant = await this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId } });
    if (tenant.kind === 'CLINICA') return true;
    const enrollment = await this.prisma.courseEnrollment.findUnique({
      where: { tenantId_courseSlug: { tenantId, courseSlug } },
    });
    return Boolean(enrollment);
  }

  /** Preço admin-editável (CoursePrice) — nunca o `priceCents` estático do manifest, que fica sempre null. */
  private async priceMap(): Promise<Map<string, number>> {
    const prices = await this.prisma.coursePrice.findMany();
    return new Map(prices.map((p) => [p.courseSlug, p.priceCents]));
  }

  async getCoursePriceCents(courseSlug: string): Promise<number | null> {
    const price = await this.prisma.coursePrice.findUnique({ where: { courseSlug } });
    return price?.priceCents ?? null;
  }

  /** Vitrine pública do Marketplace — sem progresso/acesso de usuário, sem caminho de arquivo. */
  async listPublicCatalog() {
    const prices = await this.priceMap();
    return this.getCatalog().map((course) => ({
      slug: course.slug,
      title: course.title,
      description: course.description,
      priceCents: prices.get(course.slug) ?? null,
      blocos: course.blocos.map((b) => ({ number: b.number, title: b.title, free: b.free, moduleCount: b.modules.length })),
    }));
  }

  courseExists(courseSlug: string): boolean {
    return this.getCatalog().some((c) => c.slug === courseSlug);
  }

  getCourseTitle(courseSlug: string): string {
    const course = this.getCatalog().find((c) => c.slug === courseSlug);
    if (!course) throw new NotFoundException('Curso não encontrado.');
    return course.title;
  }

  /** Lista achatada de curso/módulo pro seletor do admin ao cadastrar vídeo — sem lock/progresso de usuário. */
  listModulesFlat() {
    return this.getCatalog().flatMap((course) =>
      course.blocos.flatMap((bloco) =>
        bloco.modules.map((m) => ({
          courseSlug: course.slug,
          courseTitle: course.title,
          moduleSlug: m.slug,
          moduleTitle: m.title,
        })),
      ),
    );
  }

  private async videoUrlMap(): Promise<Map<string, string>> {
    const videos = await this.prisma.courseModuleVideo.findMany();
    return new Map(videos.map((v) => [`${v.courseSlug}::${v.moduleSlug}`, v.youtubeUrl]));
  }

  async listCatalog() {
    const { userId } = getRequestContext();
    const progress = await this.prisma.forCurrentTenant().moduleProgress.findMany({ where: { userId } });
    const completedSlugs = new Set(progress.map((p) => `${p.courseSlug}::${p.moduleSlug}`));
    const videoUrls = await this.videoUrlMap();
    const prices = await this.priceMap();

    const catalog = this.getCatalog();
    const result = [];
    for (const course of catalog) {
      const blocos = [];
      for (const bloco of course.blocos) {
        const unlocked = await this.hasBlocoAccess(course.slug, bloco.free);
        blocos.push({
          number: bloco.number,
          title: bloco.title,
          free: bloco.free,
          bundleOnly: bloco.bundleOnly,
          modules: bloco.modules.map((m) => ({
            slug: m.slug,
            moduleNumber: m.moduleNumber,
            title: m.title,
            files: FILE_TYPES.filter((ft) => Boolean(m.files[ft])),
            completed: completedSlugs.has(`${course.slug}::${m.slug}`),
            locked: !unlocked,
            videoUrl: videoUrls.get(`${course.slug}::${m.slug}`) ?? null,
          })),
        });
      }
      result.push({ slug: course.slug, title: course.title, description: course.description, priceCents: prices.get(course.slug) ?? null, blocos });
    }
    return result;
  }

  async getFilePath(courseSlug: string, moduleSlug: string, fileType: FileType): Promise<{ absolutePath: string; filename: string }> {
    const { course, module } = this.findModule(courseSlug, moduleSlug);
    const bloco = course.blocos.find((b) => b.modules.includes(module))!;
    if (!(await this.hasBlocoAccess(courseSlug, bloco.free))) {
      throw new ForbiddenException('Sem acesso a este curso — ver Marketplace ou assinatura da plataforma.');
    }
    const absolutePath = module.files[fileType];
    if (!absolutePath) throw new NotFoundException('Arquivo não disponível para este módulo.');
    return { absolutePath, filename: path.basename(absolutePath) };
  }

  async markComplete(courseSlug: string, moduleSlug: string) {
    const { course, module } = this.findModule(courseSlug, moduleSlug);
    const bloco = course.blocos.find((b) => b.modules.includes(module))!;
    if (!(await this.hasBlocoAccess(courseSlug, bloco.free))) {
      throw new ForbiddenException('Sem acesso a este curso — ver Marketplace ou assinatura da plataforma.');
    }

    const { tenantId, userId } = getRequestContext();
    await this.prisma.forCurrentTenant().moduleProgress.upsert({
      where: { userId_courseSlug_moduleSlug: { userId, courseSlug, moduleSlug } },
      create: { tenantId, userId, courseSlug, moduleSlug },
      update: {},
    });

    const totalModules = course.blocos.reduce((sum, b) => sum + b.modules.length, 0);
    const doneCount = await this.prisma.forCurrentTenant().moduleProgress.count({ where: { userId, courseSlug } });
    if (doneCount >= totalModules) {
      await this.certificates.issueIfNeeded(courseSlug);
    }

    return { completed: true };
  }
}
