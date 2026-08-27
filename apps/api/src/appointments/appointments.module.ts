import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TeleconsultaModule } from '../teleconsulta/teleconsulta.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TeleconsultaModule, EmailModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
