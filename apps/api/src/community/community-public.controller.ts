import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommunityService } from './community.service';

/**
 * Separado do CommunityController de propósito — aquele tem
 * @UseGuards(RolesGuard)/@Roles(...STAFF_ROLES) na classe inteira, e esta
 * rota precisa ficar acessível sem login (a imagem é pra baixar/compartilhar
 * fora do app — ver auth.module.ts, excluída do AuthMiddleware).
 */
@Controller('public/community-images')
export class CommunityPublicController {
  constructor(private readonly community: CommunityService) {}

  @Get(':filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const absolutePath = this.community.getImagePath(filename);
    res.sendFile(absolutePath);
  }
}
