import { Module } from '@nestjs/common';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';
import { CoursesModule } from '../courses/courses.module';
import { AuthModule } from '../auth/auth.module';
import { BillingModule } from '../billing/billing.module';
import { AsaasModule } from '../asaas/asaas.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [CoursesModule, AuthModule, BillingModule, AsaasModule, AiModule],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
})
export class MarketplaceModule {}
