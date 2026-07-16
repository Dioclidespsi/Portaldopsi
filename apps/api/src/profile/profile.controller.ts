import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreatePublicLeadDto } from './dto/create-public-lead.dto';
import { profilePhotoUploadOptions } from './profile-photo-upload.config';
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

  @Post('profile/photo')
  @UseGuards(RolesGuard)
  @Roles(Role.PSICOLOGO_TITULAR)
  @UseInterceptors(FileInterceptor('file', profilePhotoUploadOptions))
  uploadPhoto(@UploadedFile() file?: Express.Multer.File) {
    return this.profile.uploadPhoto(file);
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Get('public/tenants/:slug')
  getPublic(@Param('slug') slug: string) {
    return this.profile.getPublic(slug);
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. Formulário de contato da página pública. */
  @Post('public/tenants/:slug/leads')
  createPublicLead(@Param('slug') slug: string, @Body() dto: CreatePublicLeadDto) {
    return this.profile.createPublicLead(slug, dto);
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. Serve a foto de perfil sem autenticação (aparece em /p/{slug}). */
  @Get('public/photos/:filename')
  async getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    const absolutePath = this.profile.getPhotoPath(filename);
    res.sendFile(absolutePath);
  }
}
