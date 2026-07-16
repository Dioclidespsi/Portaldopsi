import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { CRP_UPLOAD_DIR } from './crp-upload.config';
import { CrpStatus, Role } from '@prisma/client';

const SALT_ROUNDS = 12;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createTeamMember(dto: CreateTeamMemberDto) {
    const { tenantId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const existing = await tenantPrisma.user.findUnique({ where: { tenantId_email: { tenantId, email: dto.email } } });
    if (existing) throw new ConflictException('Já existe um usuário com esse e-mail nesta clínica.');

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    return tenantPrisma.user.create({
      data: {
        tenantId,
        name: dto.name,
        email: dto.email,
        passwordHash,
        role: dto.role,
        // Ativar como supervisor exige aprovação do admin da plataforma (CRP já é
        // verificado no cadastro do assinante — checar de novo aqui seria redundante).
        supervisorApprovalStatus: dto.role === Role.SUPERVISOR ? 'PENDENTE' : undefined,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true, supervisorApprovalStatus: true },
    });
  }

  async me() {
    const { userId } = getRequestContext();
    const user = await this.prisma.forCurrentTenant().user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        tenantId: true,
        createdAt: true,
        crpNumber: true,
        crpStatus: true,
        crpRejectionReason: true,
        supervisorApprovalStatus: true,
        supervisorRejectionReason: true,
      },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  async listForTenant() {
    return this.prisma.forCurrentTenant().user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true, supervisorApprovalStatus: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  /** Reenviar sobrescreve o documento anterior e volta o status pra EM_ANALISE — nunca mistura estado de uma tentativa anterior. */
  async submitCrp(crpNumber: string, file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('Envie o documento do CRP (PDF, JPG ou PNG).');
    const { userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();

    const current = await tenantPrisma.user.findUnique({ where: { id: userId }, select: { crpDocumentPath: true } });
    if (current?.crpDocumentPath) {
      fs.unlink(path.join(CRP_UPLOAD_DIR, current.crpDocumentPath), () => undefined);
    }

    return tenantPrisma.user.update({
      where: { id: userId },
      data: { crpNumber, crpDocumentPath: file.filename, crpStatus: CrpStatus.EM_ANALISE, crpRejectionReason: null },
      select: { id: true, crpNumber: true, crpStatus: true },
    });
  }

  async getOwnCrpDocumentPath() {
    const { userId } = getRequestContext();
    const user = await this.prisma.forCurrentTenant().user.findUnique({
      where: { id: userId },
      select: { crpDocumentPath: true },
    });
    if (!user?.crpDocumentPath) throw new NotFoundException('Nenhum documento enviado ainda.');
    return path.join(CRP_UPLOAD_DIR, user.crpDocumentPath);
  }
}
