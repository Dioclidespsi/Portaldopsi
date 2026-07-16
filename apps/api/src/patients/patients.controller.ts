import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateProntuarioEntryDto } from './dto/create-prontuario-entry.dto';
import { EnablePortalDto } from './dto/enable-portal.dto';
import { UpdatePatientActiveDto } from './dto/update-patient-active.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('patients')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class PatientsController {
  constructor(private readonly patients: PatientsService) {}

  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patients.create(dto);
  }

  @Get()
  list(@Query('active') active?: string) {
    return this.patients.list(active === undefined ? undefined : active === 'true');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patients.findOne(id);
  }

  @Post(':id/prontuario')
  addEntry(@Param('id') id: string, @Body() dto: CreateProntuarioEntryDto) {
    return this.patients.addProntuarioEntry(id, dto);
  }

  @Get(':id/prontuario')
  listProntuario(@Param('id') id: string) {
    return this.patients.listProntuario(id);
  }

  @Patch(':id/portal')
  enablePortal(@Param('id') id: string, @Body() dto: EnablePortalDto) {
    return this.patients.enablePortal(id, dto);
  }

  @Patch(':id/active')
  setActive(@Param('id') id: string, @Body() dto: UpdatePatientActiveDto) {
    return this.patients.setActive(id, dto);
  }
}
