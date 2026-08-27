import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PatientPortalController } from './patient-portal.controller';
import { PatientPortalService } from './patient-portal.service';
import { PatientAuthMiddleware } from './patient-auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { TeleconsultaModule } from '../teleconsulta/teleconsulta.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    AuthModule,
    NotificationsModule,
    TeleconsultaModule,
    EmailModule,
    /// Só pros dois endpoints de "esqueci a senha" (ver patient-portal.controller.ts) — nunca aplicado globalmente.
    ThrottlerModule.forRoot([{ ttl: 60 * 60 * 1000, limit: 20 }]),
  ],
  controllers: [PatientPortalController],
  providers: [PatientPortalService],
})
export class PatientPortalModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PatientAuthMiddleware)
      .exclude(
        { path: 'patient-portal/login', method: RequestMethod.POST },
        { path: 'patient-portal/activate', method: RequestMethod.POST },
        { path: 'patient-portal/request-password-reset', method: RequestMethod.POST },
        { path: 'patient-portal/reset-password', method: RequestMethod.POST },
      )
      .forRoutes('patient-portal/*');
  }
}
