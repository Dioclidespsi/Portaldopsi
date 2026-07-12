import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { COURSE_MANIFESTS } from '../courses/catalog/manifest';

/**
 * `certificates` não tem RLS (ver schema.prisma) — verificação pública por
 * código não deve depender de tenant no contexto. Por isso todo método aqui
 * filtra tenantId/userId manualmente, nunca via forCurrentTenant().
 */
@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService) {}

  async issueIfNeeded(courseSlug: string) {
    const { tenantId, userId } = getRequestContext();
    const existing = await this.prisma.certificate.findUnique({
      where: { userId_courseSlug: { userId, courseSlug } },
    });
    if (existing) return existing;
    return this.prisma.certificate.create({ data: { tenantId, userId, courseSlug } });
  }

  listMine() {
    const { tenantId, userId } = getRequestContext();
    return this.prisma.certificate.findMany({ where: { tenantId, userId }, orderBy: { issuedAt: 'desc' } });
  }

  async verify(code: string) {
    const cert = await this.prisma.certificate.findUnique({
      where: { verificationCode: code },
      include: { user: { select: { name: true } }, tenant: { select: { name: true } } },
    });
    if (!cert) throw new NotFoundException('Certificado não encontrado — código inválido.');

    const course = COURSE_MANIFESTS.find((c) => c.slug === cert.courseSlug);
    return {
      holderName: cert.user.name,
      clinicName: cert.tenant.name,
      courseTitle: course?.title ?? cert.courseSlug,
      issuedAt: cert.issuedAt,
      verificationCode: cert.verificationCode,
    };
  }
}
