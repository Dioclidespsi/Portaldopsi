import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { getRequestContext } from '../common/tenant-context';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateTenantNameDto } from './dto/update-tenant-name.dto';
import { UpdateWhatsAppTemplatesDto } from './dto/update-whatsapp-templates.dto';

const SALT_ROUNDS = 12;

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async getOwn() {
    const { tenantId, userId } = getRequestContext();
    const [user, tenant] = await Promise.all([
      this.prisma.forCurrentTenant().user.findUniqueOrThrow({ where: { id: userId }, select: { name: true, email: true } }),
      this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId }, select: { name: true } }),
    ]);
    return { name: user.name, email: user.email, tenantName: tenant.name };
  }

  async changeEmail(dto: ChangeEmailDto) {
    const { tenantId, userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const user = await tenantPrisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (!(await bcrypt.compare(dto.currentPassword, user.passwordHash))) {
      throw new UnauthorizedException('Senha atual incorreta.');
    }

    const existing = await tenantPrisma.user.findUnique({ where: { tenantId_email: { tenantId, email: dto.newEmail } } });
    if (existing && existing.id !== userId) {
      throw new ConflictException('Já existe um usuário com esse e-mail nesta clínica.');
    }

    return tenantPrisma.user.update({ where: { id: userId }, data: { email: dto.newEmail }, select: { id: true, email: true } });
  }

  async changePassword(dto: ChangePasswordDto) {
    const { userId } = getRequestContext();
    const tenantPrisma = this.prisma.forCurrentTenant();
    const user = await tenantPrisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (!(await bcrypt.compare(dto.currentPassword, user.passwordHash))) {
      throw new UnauthorizedException('Senha atual incorreta.');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);
    await tenantPrisma.user.update({ where: { id: userId }, data: { passwordHash } });
    return { ok: true };
  }

  /** `tenants` não tem RLS — o isolamento vem inteiramente do tenantId do contexto autenticado. */
  updateTenantName(dto: UpdateTenantNameDto) {
    const { tenantId } = getRequestContext();
    return this.prisma.tenant.update({ where: { id: tenantId }, data: { name: dto.name }, select: { id: true, name: true } });
  }

  /** Lido por qualquer usuário autenticado do tenant (secretária inclusive) — quem usa o botão de WhatsApp, não só o titular. */
  async getWhatsAppTemplates() {
    const { tenantId } = getRequestContext();
    const tenant = await this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId }, select: { whatsappTemplates: true } });
    return { templates: tenant.whatsappTemplates as { label: string; text: string }[] | null };
  }

  /** Só o titular configura os modelos — mesma regra de updateTenantName. */
  async updateWhatsAppTemplates(dto: UpdateWhatsAppTemplatesDto) {
    const { tenantId } = getRequestContext();
    // Prisma exige um objeto JSON simples (InputJsonValue) — a instância de classe do
    // DTO (com prototype próprio) não bate com esse tipo, por isso o map pra objeto literal.
    const plainTemplates = dto.templates.map((t) => ({ label: t.label, text: t.text }));
    const tenant = await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { whatsappTemplates: plainTemplates },
      select: { whatsappTemplates: true },
    });
    return { templates: tenant.whatsappTemplates as { label: string; text: string }[] | null };
  }
}
