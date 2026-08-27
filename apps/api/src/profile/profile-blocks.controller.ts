import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProfileBlocksService } from './profile-blocks.service';
import { CreateProfileBlockDto } from './dto/create-profile-block.dto';
import { UpdateProfileBlockDto } from './dto/update-profile-block.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('profile/blocks')
@UseGuards(RolesGuard)
@Roles(Role.PSICOLOGO_TITULAR)
export class ProfileBlocksController {
  constructor(private readonly blocks: ProfileBlocksService) {}

  @Get('catalog')
  listCatalog() {
    return this.blocks.listCatalog();
  }

  @Get()
  listOwn() {
    return this.blocks.listOwn();
  }

  @Post()
  create(@Body() dto: CreateProfileBlockDto) {
    return this.blocks.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfileBlockDto) {
    return this.blocks.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blocks.delete(id);
  }
}
