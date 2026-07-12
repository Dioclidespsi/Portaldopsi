import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller()
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}

  @Get('profile')
  @UseGuards(RolesGuard)
  @Roles(Role.PSICOLOGO_TITULAR)
  getOwn() {
    return this.profile.getOwn();
  }

  @Patch('profile')
  @UseGuards(RolesGuard)
  @Roles(Role.PSICOLOGO_TITULAR)
  updateOwn(@Body() dto: UpdateProfileDto) {
    return this.profile.updateOwn(dto);
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Get('public/tenants/:slug')
  getPublic(@Param('slug') slug: string) {
    return this.profile.getPublic(slug);
  }
}
