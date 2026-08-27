import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateProntuarioEntryDto } from './dto/create-prontuario-entry.dto';
import { EnablePortalDto } from './dto/enable-portal.dto';
import { UpdatePatientActiveDto } from './dto/update-patient-active.dto';
import { UpdatePrivateNoteDto } from './dto/update-private-note.dto';

const SALT_ROUNDS = 12;

/** Espelha o helper de patient-portal.service.ts — mesma regra, evita acoplar os dois módulos por um one-liner. */
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePatientDto) {
    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    if (dto.email) {
      const existing = await tenantPrisma.patient.findUnique({ where: { tenantId_email: { tenantId, email: dto.email } } });
      if (existing) throw new BadRequestException('Já existe um paciente com esse e-mail nesta clínica.');
    }

    return tenantPrisma.patient.create({
      data: {
        tenantId,
        name: dto.name,
        socialName: dto.socialName,
        email: dto.email,
        phone: dto.phone ? dto.phone.replace(/\D/g, '') : undefined,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        cpfCnpj: dto.cpfCnpj ? dto.cpfCnpj.replace(/\D/g, '') : undefined,
      },
    });
  }

  /**
   * Habilita o Aplicativo do Paciente pra este registro — exige e-mail
   * cadastrado. A conta (PatientAccount) é global: se o e-mail já tiver uma
   * (paciente já usa o portal em outra clínica), só LINKA o vínculo com esta
   * clínica e ignora a senha enviada (a conta já tem a dela — o paciente já
   * consegue logar normalmente). Só cria conta+senha nova se não existir.
   */
  async enablePortal(patientId: string, dto: EnablePortalDto) {
    const patient = await this.findOne(patientId);
    if (!patient.email) {
      throw new BadRequestException('Cadastre um e-mail para o paciente antes de ativar o portal.');
    }
    const email = normalizeEmail(patient.email);

    let account = await this.prisma.patientAccount.findUnique({ where: { email } });
    const linkedExistingAccount = Boolean(account);
    if (!account) {
      const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
      account = await this.prisma.patientAccount.create({
        data: {
          email,
          passwordHash,
          name: patient.name,
          phone: patient.phone,
          cpfCnpj: patient.cpfCnpj,
          birthDate: patient.birthDate,
        },
      });
    }

    const updated = await this.prisma.forCurrentTenant().patient.update({
      where: { id: patientId },
      data: { patientAccountId: account.id },
      select: { id: true, name: true, email: true, patientAccountId: true },
    });
    return { ...updated, linkedExistingAccount };
  }

  /**
   * Alternativa ao enablePortal() acima: em vez da equipe escolher a senha,
   * gera um token de uso único (48h) pro próprio paciente definir a senha
   * (ver PatientPortalService.activate). A equipe copia o link retornado e
   * manda pro paciente pelo canal que preferir (WhatsApp, SMS) — sem infra
   * de e-mail neste projeto.
   */
  async generateActivationLink(patientId: string) {
    const patient = await this.findOne(patientId);
    if (!patient.email) {
      throw new BadRequestException('Cadastre um e-mail para o paciente antes de gerar o link de ativação.');
    }
    const activationToken = randomBytes(24).toString('hex');
    const activationTokenExpiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
    await this.prisma.forCurrentTenant().patient.update({
      where: { id: patientId },
      data: { activationToken, activationTokenExpiresAt },
    });
    return { activationToken };
  }

  list(active?: boolean) {
    return this.prisma.forCurrentTenant().patient.findMany({
      where: active === undefined ? undefined : { active },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.forCurrentTenant().patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');
    return patient;
  }

  async setActive(id: string, dto: UpdatePatientActiveDto) {
    await this.findOne(id);
    return this.prisma.forCurrentTenant().patient.update({
      where: { id },
      data: { active: dto.active },
    });
  }

  /**
   * Anotação privada do psicólogo — rascunho pessoal entre sessões, sempre
   * sobrescrito (não é histórico). Nunca deve ser exposto ao paciente: não
   * existe (e não deve existir) nenhum endpoint em patient-portal que
   * selecione este campo.
   */
  async setPrivateNote(id: string, dto: UpdatePrivateNoteDto) {
    await this.findOne(id);
    return this.prisma.forCurrentTenant().patient.update({
      where: { id },
      data: { privateNote: dto.privateNote },
      select: { id: true, privateNote: true },
    });
  }

  /** Entradas de prontuário são append-only — ver comentário no schema.prisma. */
  async addProntuarioEntry(patientId: string, dto: CreateProntuarioEntryDto) {
    await this.findOne(patientId);
    const { tenantId, userId } = getRequestContext();
    return this.prisma.forCurrentTenant().prontuarioEntry.create({
      data: { tenantId, patientId, authorId: userId, content: dto.content },
      include: { author: { select: { name: true, role: true } } },
    });
  }

  async listProntuario(patientId: string) {
    await this.findOne(patientId);
    return this.prisma.forCurrentTenant().prontuarioEntry.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true, role: true } } },
    });
  }
}
