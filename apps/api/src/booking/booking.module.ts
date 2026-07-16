import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { AvailabilityModule } from '../availability/availability.module';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AvailabilityModule, AsaasModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
