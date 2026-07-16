import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PatientPortalController } from './patient-portal.controller';
import { PatientPortalService } from './patient-portal.service';
import { PatientCoursesService } from './patient-courses.service';
import { PatientAuthMiddleware } from './patient-auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { AvailabilityModule } from '../availability/availability.module';
import { BookingModule } from '../booking/booking.module';
import { CoursesModule } from '../courses/courses.module';
import { CertificatesModule } from '../certificates/certificates.module';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AuthModule, AvailabilityModule, BookingModule, CoursesModule, CertificatesModule, AsaasModule],
  controllers: [PatientPortalController],
  providers: [PatientPortalService, PatientCoursesService],
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
