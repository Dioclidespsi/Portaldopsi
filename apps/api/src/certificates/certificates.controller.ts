import { Controller, Get, Param } from '@nestjs/common';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificates: CertificatesService) {}

  @Get()
  listMine() {
    return this.certificates.listMine();
  }

  /** Pública — excluída do AuthMiddleware em auth.module.ts. */
  @Get('verify/:code')
  verify(@Param('code') code: string) {
    return this.certificates.verify(code);
  }
}
