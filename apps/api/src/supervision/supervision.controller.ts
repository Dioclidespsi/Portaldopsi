import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SupervisionService } from './supervision.service';
import { CreateSupervisionSessionDto } from './dto/create-session.dto';
import { UpdateSupervisionSessionDto } from './dto/update-session.dto';
import { SendSupervisionMessageDto } from './dto/send-message.dto';
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

  @Post(':id/teleconsulta/room')
  createTeleconsultaRoom(@Param('id') id: string) {
    return this.supervision.createTeleconsultaRoom(id);
  }

  @Get('messages/:partnerId')
  listMessages(@Param('partnerId') partnerId: string) {
    return this.supervision.listMessages(partnerId);
  }

  @Post('messages/:partnerId')
  sendMessage(@Param('partnerId') partnerId: string, @Body() dto: SendSupervisionMessageDto) {
    return this.supervision.sendMessage(partnerId, dto.content);
  }
}
