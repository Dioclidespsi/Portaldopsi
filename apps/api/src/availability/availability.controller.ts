import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('availability')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class AvailabilityController {
  constructor(private readonly availability: AvailabilityService) {}

  @Post()
  create(@Body() dto: CreateSlotDto) {
    return this.availability.createSlot(dto);
  }

  @Get()
  list() {
    return this.availability.list();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availability.remove(id);
  }
}
