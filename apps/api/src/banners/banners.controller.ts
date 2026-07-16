import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { BannersService } from './banners.service';

/** Rotas públicas (sem autenticação) — excluídas do AuthMiddleware em auth.module.ts. Escrita fica só no admin (ver admin.controller.ts). */
@Controller()
export class BannersController {
  constructor(private readonly banners: BannersService) {}

  @Get('public/banners')
  listActive() {
    return this.banners.listActive();
  }

  @Get('public/banner-images/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const absolutePath = this.banners.getImagePath(filename);
    res.sendFile(absolutePath);
  }
}
