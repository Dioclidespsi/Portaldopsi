import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SupervisionService } from './supervision.service';
import { CreateSupervisionSessionDto } from './dto/create-session.dto';
import { UpdateSupervisionSessionDto } from './dto/update-session.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('supervision-sessions')
@UseGuards(RolesGuard)
@Roles(Role.PSICOLOGO_TITULAR, Role.SUPERVISOR)
export class SupervisionController {
  constructor(private readonly supervision: SupervisionService) {}

  @Post()
  create(@Body() dto: CreateSupervisionSessionDto) {
    return this.supervision.create(dto);
  }

  @Get()
  list() {
    return this.supervision.list();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSupervisionSessionDto) {
    return this.supervision.update(id, dto);
  }
}
