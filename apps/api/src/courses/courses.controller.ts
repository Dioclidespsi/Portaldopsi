import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CoursesService, FileType } from './courses.service';
import { RolesGuard } from '../auth/roles.guard';

@Controller('courses')
@UseGuards(RolesGuard)
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  @Get()
  listCatalog() {
    return this.courses.listCatalog();
  }

  @Post(':courseSlug/modules/:moduleSlug/complete')
  markComplete(@Param('courseSlug') courseSlug: string, @Param('moduleSlug') moduleSlug: string) {
    return this.courses.markComplete(courseSlug, moduleSlug);
  }

  @Get(':courseSlug/modules/:moduleSlug/files/:fileType')
  async downloadFile(
    @Param('courseSlug') courseSlug: string,
    @Param('moduleSlug') moduleSlug: string,
    @Param('fileType') fileType: FileType,
    @Res() res: Response,
  ) {
    const { absolutePath, filename } = await this.courses.getFilePath(courseSlug, moduleSlug, fileType);
    res.download(absolutePath, filename);
  }
}
