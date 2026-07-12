import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { EnrollDto } from './dto/enroll.dto';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplace: MarketplaceService) {}

  /** Pública — excluída do AuthMiddleware em auth.module.ts. Vitrine para quem ainda não tem conta. */
  @Get('courses')
  listCourses() {
    return this.marketplace.listCourses();
  }

  /** Pública (excluída do AuthMiddleware) — cria a conta ESTUDANTE e inicia o pagamento avulso. */
  @Post('purchase')
  purchase(@Body() dto: PurchaseDto) {
    return this.marketplace.purchase(dto);
  }

  /** Protegida — tenant já existente (CLINICA ou ESTUDANTE) comprando mais um curso avulso. */
  @Post('enroll')
  enroll(@Body() dto: EnrollDto) {
    return this.marketplace.enroll(dto);
  }
}
