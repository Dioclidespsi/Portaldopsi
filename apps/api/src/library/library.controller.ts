import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly library: LibraryService) {}

  @Get()
  list() {
    return this.library.list();
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const { absolutePath, title } = await this.library.getFilePath(id);
    res.download(absolutePath, `${title}${path.extname(absolutePath)}`);
  }

  /** Autenticado (mesma proteção padrão do resto do módulo) — devolve a URL de visualização já com o token embutido. */
  @Get(':id/view-link')
  async viewLink(@Param('id') id: string) {
    const token = await this.library.createViewToken(id);
    return { url: `${this.library.getPublicApiUrl()}/library/${id}/view?token=${token}` };
  }

  /**
   * PÚBLICA de propósito (ver exclude em auth.module.ts) — quem abre é o
   * navegador direto (PDF) ou o Office/Google Viewer (Word/PowerPoint),
   * nenhum dos dois manda o Bearer do usuário. A segurança vem do token de
   * 10 minutos assinado em view-link, não de sessão.
   */
  @Get(':id/view')
  async view(@Param('id') id: string, @Query('token') token: string, @Res() res: Response) {
    const { absolutePath, mimeType, title } = await this.library.resolveViewToken(id, token);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${title}${path.extname(absolutePath)}"`);
    res.sendFile(absolutePath);
  }
}
