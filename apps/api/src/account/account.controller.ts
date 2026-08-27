import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AccountService } from './account.service';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateTenantNameDto } from './dto/update-tenant-name.dto';
import { UpdateWhatsAppTemplatesDto } from './dto/update-whatsapp-templates.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly account: AccountService) {}

  @Get()
  getOwn() {
    return this.account.getOwn();
  }

  @Patch('email')
  changeEmail(@Body() dto: ChangeEmailDto) {
    return this.account.changeEmail(dto);
  }

  @Patch('password')
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.account.changePassword(dto);
  }

  /** Nome da clínica é uma configuração de escopo do tenant — só o titular altera. */
  @Patch('tenant-name')
  @UseGuards(RolesGuard)
  @Roles(Role.PSICOLOGO_TITULAR)
  updateTenantName(@Body() dto: UpdateTenantNameDto) {
    return this.account.updateTenantName(dto);
  }

  @Get('whatsapp-templates')
  getWhatsAppTemplates() {
    return this.account.getWhatsAppTemplates();
  }

  /** Só o titular configura os modelos de mensagem — quem envia (qualquer membro da equipe) só lê. */
  @Patch('whatsapp-templates')
  @UseGuards(RolesGuard)
  @Roles(Role.PSICOLOGO_TITULAR)
  updateWhatsAppTemplates(@Body() dto: UpdateWhatsAppTemplatesDto) {
    return this.account.updateWhatsAppTemplates(dto);
  }
}
