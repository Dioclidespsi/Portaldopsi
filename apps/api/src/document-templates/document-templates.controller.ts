import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { DocumentTemplatesService } from './document-templates.service';

@Controller('document-templates')
export class DocumentTemplatesController {
  constructor(private readonly templates: DocumentTemplatesService) {}

  @Get()
  list() {
    return this.templates.list();
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const { absolutePath, title } = await this.templates.getFilePath(id);
    res.download(absolutePath, `${title}${path.extname(absolutePath)}`);
  }
}
