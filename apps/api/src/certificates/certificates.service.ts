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
    const existing = await this.prisma.certificate.findUnique({
      where: { userId_courseSlug: { userId, courseSlug } },
    });
    if (existing) return existing;

    const created = await this.prisma.certificate.create({
      data: { tenantId, userId, courseSlug },
      include: { user: { select: { name: true } }, course: { select: { title: true } } },
    });

    const filePath = await this.tryRender(created.id, created.user!.name, created.course.title, created.issuedAt, created.verificationCode);
    if (filePath) {
      return this.prisma.certificate.update({ where: { id: created.id }, data: { filePath } });
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

  /** `user`/`patient` são mutuamente exclusivos — certificado emitido pra um paciente (ver Fase 6 do app do paciente) não tem `user`. */
  async verify(code: string) {
    const cert = await this.prisma.certificate.findUnique({
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
