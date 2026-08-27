import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { renderProntuarioPdf } from './prontuario-pdf-renderer';

/**
 * Acesso do console administrativo ao prontuário de qualquer paciente, de
 * qualquer tenant — exigência do CRP (Resolução 06/2019): a plataforma
 * precisa conseguir fornecer o prontuário se o psicólogo sair da
 * plataforma, cometer alguma irregularidade, ou o paciente pedir a
 * qualquer tempo. `patients`/`prontuario_entries` têm RLS forçado, então
 * as consultas aqui usam `PrismaService.forSystem()`, nunca o client cru
 * (mesmo padrão de AdminService — ver rls.sql).
 */
@Injectable()
export class AdminProntuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async listPatientsByTenantSlug(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug }, select: { id: true, name: true, slug: true } });
    if (!tenant) throw new NotFoundException('Clínica não encontrada.');

    const patients = await this.prisma.forSystem().patient.findMany({
      where: { tenantId: tenant.id },
      select: { id: true, name: true, socialName: true, email: true, active: true },
      orderBy: { name: 'asc' },
    });
    return { tenant, patients };
  }

  private async getPatientForAdmin(patientId: string) {
    const patient = await this.prisma.forSystem().patient.findUnique({
      where: { id: patientId },
      // Select explícito: nunca inclui privateNote aqui (rascunho pessoal do
      // psicólogo, não faz parte do prontuário oficial).
      select: {
        id: true,
        name: true,
        socialName: true,
        cpfCnpj: true,
        birthDate: true,
        email: true,
        tenant: { select: { name: true, slug: true } },
      },
    });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');
    return patient;
  }

  private getProntuarioEntries(patientId: string) {
    return this.prisma.forSystem().prontuarioEntry.findMany({
      where: { patientId },
      orderBy: { createdAt: 'asc' },
      select: { content: true, createdAt: true, author: { select: { name: true, role: true } } },
    });
  }

  async getPatientProntuario(patientId: string) {
    const [patient, entries] = await Promise.all([
      this.getPatientForAdmin(patientId),
      this.getProntuarioEntries(patientId),
    ]);
    return { patient, entries };
  }

  async generateProntuarioPdf(patientId: string) {
    const [patient, entries] = await Promise.all([
      this.getPatientForAdmin(patientId),
      this.getProntuarioEntries(patientId),
    ]);
    const buffer = await renderProntuarioPdf(patient, entries);
    return { buffer, patientName: patient.name };
  }
}
