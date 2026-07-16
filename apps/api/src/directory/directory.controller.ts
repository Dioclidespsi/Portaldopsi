import { Controller, Get, Query } from '@nestjs/common';
import { DirectoryService } from './directory.service';

/** Pública — excluída do AuthMiddleware em auth.module.ts. */
@Controller('public/directory')
export class DirectoryController {
  constructor(private readonly directory: DirectoryService) {}

  @Get()
  search(@Query('q') q?: string, @Query('specialty') specialty?: string) {
    return this.directory.search(q, specialty);
  }
}
