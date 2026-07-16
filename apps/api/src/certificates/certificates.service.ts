import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CERTIFICATE_OUTPUT_DIR, CERTIFICATE_TEMPLATE_UPLOAD_DIR } from './certificate-template-upload.config';
import { renderCertificateToFile } from './certificate-renderer';

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
    const tenantPrisma = this.prisma.forTenant(tenantId);
    const existing = await tenantPrisma.certificate.findUnique({
      where: { userId_courseSlug: { userId, courseSlug } },
    });
    if (existing) return existing;

    const created = await tenantPrisma.certificate.create({
      data: { tenantId, userId, courseSlug },
      include: { user: { select: { name: true } }, course: { select: { title: true } } },
    });

    const filePath = await this.tryRender(created.id, created.user!.name, created.course.title, created.issuedAt, created.verificationCode);
    if (filePath) {
      return tenantPrisma.certificate.update({ where: { id: created.id }, data: { filePath } });
    }
    return created;
  }

  /** Mesma lógica de issueIfNeeded, mas pro paciente que compra curso pelo portal (ver PatientCoursesService) — sem getRequestContext(), tenantId/patientId vêm explícitos do PatientRequestContext. */
  async issueIfNeededForPatient(tenantId: string, patientId: string, courseSlug: string) {
    const tenantPrisma = this.prisma.forTenant(tenantId);
    const existing = await tenantPrisma.certificate.findUnique({
      where: { patientId_courseSlug: { patientId, courseSlug } },
    });
    if (existing) return existing;

    const created = await tenantPrisma.certificate.create({
      data: { tenantId, patientId, courseSlug },
      include: { patient: { select: { name: true } }, course: { select: { title: true } } },
    });

    const filePath = await this.tryRender(created.id, created.patient!.name, created.course.title, created.issuedAt, created.verificationCode);
    if (filePath) {
      return tenantPrisma.certificate.update({ where: { id: created.id }, data: { filePath } });
    }
    return created;
  }

  /** Renderiza contra o CertificateTemplate vigente, se existir — senão o certificado fica sem imagem (só o registro). */
  private async tryRender(certificateId: string, name: string, courseTitle: string, issuedAt: Date, code: string): Promise<string | null> {
    const template = await this.prisma.certificateTemplate.findFirst();
    if (!template) return null;

    const filename = `${certificateId}.png`;
    await renderCertificateToFile(
      path.join(CERTIFICATE_TEMPLATE_UPLOAD_DIR, template.imagePath),
      template,
      { name, courseTitle, dateStr: issuedAt.toLocaleDateString('pt-BR'), code },
      path.join(CERTIFICATE_OUTPUT_DIR, filename),
    );
    return filename;
  }

  listMine() {
    const { tenantId, userId } = getRequestContext();
    return this.prisma.certificate.findMany({
      where: { tenantId, userId },
      orderBy: { issuedAt: 'desc' },
      include: { course: { select: { title: true } } },
    });
  }

  async getFilePath(id: string) {
    const { userId } = getRequestContext();
    const cert = await this.prisma.certificate.findUnique({ where: { id } });
    if (!cert || cert.userId !== userId) throw new NotFoundException('Certificado não encontrado.');
    if (!cert.filePath) throw new NotFoundException('Este certificado ainda não tem uma imagem gerada — nenhum modelo estava configurado quando ele foi emitido.');
    return path.join(CERTIFICATE_OUTPUT_DIR, cert.filePath);
  }

  listMineForPatient(patientId: string) {
    return this.prisma.certificate.findMany({
      where: { patientId },
      orderBy: { issuedAt: 'desc' },
      include: { course: { select: { title: true } } },
    });
  }

  async getFilePathForPatient(id: string, patientId: string) {
    const cert = await this.prisma.certificate.findUnique({ where: { id } });
    if (!cert || cert.patientId !== patientId) throw new NotFoundException('Certificado não encontrado.');
    if (!cert.filePath) throw new NotFoundException('Este certificado ainda não tem uma imagem gerada — nenhum modelo estava configurado quando ele foi emitido.');
    return path.join(CERTIFICATE_OUTPUT_DIR, cert.filePath);
  }

  /** `user`/`patient` são mutuamente exclusivos — certificado emitido pra um paciente (ver Fase 6 do app do paciente) não tem `user`. */
  async verify(code: string) {
    // certificates não tem RLS — acha o tenantId primeiro pra então ler
    // user/patient (que têm RLS, e patients não tem exceção '__system__')
    // com o escopo correto.
    const certRaw = await this.prisma.certificate.findUnique({ where: { verificationCode: code } });
    if (!certRaw) throw new NotFoundException('Certificado não encontrado — código inválido.');

    const cert = await this.prisma.forTenant(certRaw.tenantId).certificate.findUnique({
      where: { verificationCode: code },
      include: {
        user: { select: { name: true } },
        patient: { select: { name: true } },
        tenant: { select: { name: true } },
        course: { select: { title: true } },
      },
    });
    if (!cert) throw new NotFoundException('Certificado não encontrado — código inválido.');

    return {
      holderName: cert.user?.name ?? cert.patient?.name ?? '—',
      clinicName: cert.tenant.name,
      courseTitle: cert.course.title,
      issuedAt: cert.issuedAt,
      verificationCode: cert.verificationCode,
    };
  }
}
