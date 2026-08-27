import { Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { SubmitCrpDto } from './dto/submit-crp.dto';
import { crpUploadOptions } from './crp-upload.config';
import { signatureUploadOptions } from './signature-upload.config';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { AccessGateService } from '../common/access-gate.service';

@Controller()
@UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private readonly users: UsersService,
    private readonly accessGate: AccessGateService,
  ) {}

  @Get('me')
  me() {
    return this.users.me();
  }

  /** Consumido pelo DashboardNav pra mostrar o banner de pendências (CRP/assinatura/termos) — ver ClinicalAccessGuard. */
  @Get('me/access-status')
  accessStatus() {
    return this.accessGate.checkFullAccess();
  }

  @Get('users')
  @Roles(Role.PSICOLOGO_TITULAR, Role.SECRETARIA)
  list() {
    return this.users.listForTenant();
  }

  @Post('users')
  @Roles(Role.PSICOLOGO_TITULAR)
  createTeamMember(@Body() dto: CreateTeamMemberDto) {
    return this.users.createTeamMember(dto);
  }

  @Post('users/me/crp')
  @Roles(Role.PSICOLOGO_TITULAR)
  @UseInterceptors(FileInterceptor('document', crpUploadOptions))
  submitCrp(@Body() dto: SubmitCrpDto, @UploadedFile() file?: Express.Multer.File) {
    return this.users.submitCrp(dto.crpNumber, file);
  }

  @Get('users/me/crp/document')
  @Roles(Role.PSICOLOGO_TITULAR)
  async downloadOwnCrpDocument(@Res() res: Response) {
    const filePath = await this.users.getOwnCrpDocumentPath();
    res.download(filePath);
  }

  @Post('users/me/signature')
  @Roles(Role.PSICOLOGO_TITULAR)
  @UseInterceptors(FileInterceptor('file', signatureUploadOptions))
  uploadSignature(@UploadedFile() file?: Express.Multer.File) {
    return this.users.uploadSignature(file);
  }

  @Get('users/me/signature')
  @Roles(Role.PSICOLOGO_TITULAR)
  async downloadOwnSignature(@Res() res: Response) {
    const filePath = await this.users.getOwnSignaturePath();
    res.sendFile(filePath);
  }
}
