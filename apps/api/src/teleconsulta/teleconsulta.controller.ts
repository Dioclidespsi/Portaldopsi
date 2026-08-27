import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TeleconsultaService } from './teleconsulta.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('appointments/:id/teleconsulta')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class TeleconsultaController {
  constructor(private readonly teleconsulta: TeleconsultaService) {}

  @Post('room')
  createRoom(@Param('id') id: string) {
    return this.teleconsulta.createRoom(id);
  }

  @Post('join-link')
  getJoinLink(@Param('id') id: string) {
    return this.teleconsulta.getStaffJoinLink(id);
  }

  /** Link com papel de paciente (não moderador) — pra equipe enviar manualmente como alternativa. */
  @Post('patient-join-link')
  getPatientJoinLink(@Param('id') id: string) {
    return this.teleconsulta.getPatientJoinLink(id);
  }
}
