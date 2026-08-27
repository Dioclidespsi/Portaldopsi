import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MarketplaceService } from './marketplace.service';
import { EnrollDto } from './dto/enroll.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { studentDocumentUploadOptions } from '../users/student-document-upload.config';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplace: MarketplaceService) {}

  /** Pública — excluída do AuthMiddleware em auth.module.ts. Vitrine para quem ainda não tem conta. */
  @Get('courses')
  listCourses() {
    return this.marketplace.listCourses();
  }

  /**
   * Pública (excluída do AuthMiddleware) — cria a conta ESTUDANTE, inicia o
   * pagamento avulso E recebe a declaração de matrícula (item 4) —
   * multipart/form-data por causa do arquivo, não JSON como antes.
   */
  @Post('purchase')
  @UseInterceptors(FileInterceptor('document', studentDocumentUploadOptions))
  purchase(@Body() dto: PurchaseDto, @UploadedFile() document?: Express.Multer.File) {
    return this.marketplace.purchase(dto, document);
  }

  /** Protegida — tenant já existente (CLINICA ou ESTUDANTE) comprando mais um curso avulso. */
  @Post('enroll')
  enroll(@Body() dto: EnrollDto) {
    return this.marketplace.enroll(dto);
  }
}
