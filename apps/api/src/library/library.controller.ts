import { Controller, Get, Param, Res } from '@nestjs/common';
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
}
