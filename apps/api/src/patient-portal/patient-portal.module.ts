import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PatientPortalController } from './patient-portal.controller';
import { PatientPortalService } from './patient-portal.service';
import { PatientAuthMiddleware } from './patient-auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { TeleconsultaModule } from '../teleconsulta/teleconsulta.module';

@Module({
  imports: [AuthModule, NotificationsModule, TeleconsultaModule],
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
      )
      .forRoutes('patient-portal/*');
  }
}
