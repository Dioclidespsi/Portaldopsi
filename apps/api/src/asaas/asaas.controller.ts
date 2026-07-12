import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { CreatePayoutAccountDto } from './dto/create-payout-account.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('asaas')
export class AsaasController {
  constructor(private readonly asaas: AsaasService) {}

  @Post('payout-account')
  @UseGuards(RolesGuard)
  @Roles(...STAFF_ROLES)
  createPayoutAccount(@Body() dto: CreatePayoutAccountDto) {
    return this.asaas.createPayoutAccount(dto);
  }

  /** Rota pública (excluída do AuthMiddleware em auth.module.ts) — autenticada pelo token do Asaas, não por JWT. */
  @Post('webhook')
  webhook(@Body() body: { payment?: { id: string; subscription?: string; status: string } }, @Headers('asaas-access-token') token?: string) {
    return this.asaas.handleWebhook(token, body);
  }
}
