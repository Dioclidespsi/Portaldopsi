import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PatientPortalController } from './patient-portal.controller';
import { PatientPortalService } from './patient-portal.service';
import { PatientAuthMiddleware } from './patient-auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { AvailabilityModule } from '../availability/availability.module';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [AuthModule, AvailabilityModule, BookingModule],
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
