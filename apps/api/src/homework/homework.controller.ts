import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('homework')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class HomeworkController {
  constructor(private readonly homework: HomeworkService) {}

  @Post()
  create(@Body() dto: CreateHomeworkDto) {
    return this.homework.create(dto);
  }

  @Get()
  list(@Query('patientId') patientId: string) {
    return this.homework.listByPatient(patientId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homework.remove(id);
  }
}
