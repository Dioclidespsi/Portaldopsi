import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('appointments')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class AppointmentsController {
  constructor(private readonly appointments: AppointmentsService) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointments.create(dto);
  }

  @Get()
  list(@Query('from') from?: string, @Query('to') to?: string, @Query('patientId') patientId?: string) {
    return this.appointments.list(from, to, patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointments.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateAppointmentStatusDto) {
    return this.appointments.updateStatus(id, dto.status, dto.cancelReason);
  }
}
