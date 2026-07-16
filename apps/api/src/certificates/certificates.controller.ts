import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificates: CertificatesService) {}

  @Get()
  listMine() {
    return this.certificates.listMine();
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const absolutePath = await this.certificates.getFilePath(id);
    res.download(absolutePath, 'certificado.png');
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Get('verify/:code')
  verify(@Param('code') code: string) {
    return this.certificates.verify(code);
  }
}
