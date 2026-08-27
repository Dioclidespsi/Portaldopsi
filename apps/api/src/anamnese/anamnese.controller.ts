import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { AnamneseService } from './anamnese.service';
import { UpsertAnamneseDto } from './dto/upsert-anamnese.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('anamnese')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class AnamneseController {
  constructor(private readonly anamnese: AnamneseService) {}

  @Get('catalog')
  listCatalog() {
    return this.anamnese.listCatalog();
  }

  @Get()
  getForPatient(@Query('patientId') patientId: string) {
    return this.anamnese.getForPatient(patientId);
  }

  @Put()
  upsert(@Body() dto: UpsertAnamneseDto) {
    return this.anamnese.upsert(dto);
  }
}
