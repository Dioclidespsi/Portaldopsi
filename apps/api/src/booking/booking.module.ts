import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { AvailabilityModule } from '../availability/availability.module';
import { AsaasModule } from '../asaas/asaas.module';
import { AuthModule } from '../auth/auth.module';
import { TeleconsultaModule } from '../teleconsulta/teleconsulta.module';

@Module({
  imports: [AvailabilityModule, AsaasModule, AuthModule, TeleconsultaModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
