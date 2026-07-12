import { Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { BillingService } from './billing.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CreatePlatformSubscriptionDto } from '../asaas/dto/create-platform-subscription.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billing: BillingService) {}

  @Get('plans')
  listPlans() {
    return this.billing.listPlans();
  }

  @Get('subscription')
  getSubscription() {
    return this.billing.getSubscription();
  }

  @Post('checkout')
  createCheckout(@Body() dto: CreateCheckoutDto) {
    return this.billing.createCheckoutSession(dto.plan, dto.successUrl, dto.cancelUrl);
  }

  @Post('checkout-asaas')
  createAsaasCheckout(@Body() dto: CreatePlatformSubscriptionDto) {
    return this.billing.createAsaasSubscription(dto);
  }

  /**
   * Rota pública (excluída do AuthMiddleware em auth.module.ts) — autenticada
   * pela assinatura do Stripe, não por JWT. `req.body` chega como Buffer cru
   * porque main.ts registra `express.raw` só para este path, antes do
   * `express.json` global — necessário para validar a assinatura.
   */
  @Post('webhook')
  webhook(@Req() req: Request, @Headers('stripe-signature') signature: string) {
    return this.billing.handleWebhook(req.body as unknown as Buffer, signature);
  }
}
