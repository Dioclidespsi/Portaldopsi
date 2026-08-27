import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminCoursesController } from './admin-courses.controller';
import { AdminCoursesService } from './admin-courses.service';
import { AdminProntuarioController } from './admin-prontuario.controller';
import { AdminProntuarioService } from './admin-prontuario.service';
import { AdminTokenGuard } from './admin-token.guard';
import { AdminRecoveryController } from './admin-recovery.controller';
import { AsaasModule } from '../asaas/asaas.module';
import { PlatformSettingsModule } from '../platform-settings/platform-settings.module';

@Module({
  imports: [
    AsaasModule,
    PlatformSettingsModule,
    /// Só pro endpoint de "esqueci o token" (ver AdminRecoveryController) — nunca aplicado globalmente.
    ThrottlerModule.forRoot([{ ttl: 60 * 60 * 1000, limit: 20 }]),
  ],
  controllers: [AdminController, AdminCoursesController, AdminProntuarioController, AdminRecoveryController],
  providers: [AdminService, AdminCoursesService, AdminProntuarioService, AdminTokenGuard],
})
export class AdminModule {}
