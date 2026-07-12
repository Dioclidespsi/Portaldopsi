import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { AdminTokenGuard } from './admin-token.guard';
import { RejectCrpDto } from './dto/reject-crp.dto';
import { UpsertOfferDto } from './dto/upsert-offer.dto';
import { UpsertCourseVideoDto } from './dto/upsert-course-video.dto';
import { CreateDocumentTemplateDto } from './dto/create-document-template.dto';
import { UpsertCoursePriceDto } from './dto/upsert-course-price.dto';
import { documentTemplateUploadOptions } from '../document-templates/document-template-upload.config';

@Controller('admin')
@UseGuards(AdminTokenGuard)
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  /** Usado pelo frontend só para validar o token antes de guardá-lo no localStorage. */
  @Get('ping')
  ping() {
    return { ok: true };
  }

  @Get('crp/pending')
  listPendingCrp() {
    return this.admin.listPendingCrp();
  }

  @Get('crp/:userId/document')
  async downloadCrpDocument(@Param('userId') userId: string, @Res() res: Response) {
    const filePath = await this.admin.getCrpDocumentPath(userId);
    res.download(filePath);
  }

  @Post('crp/:userId/approve')
  approveCrp(@Param('userId') userId: string) {
    return this.admin.approveCrp(userId);
  }

  @Post('crp/:userId/reject')
  rejectCrp(@Param('userId') userId: string, @Body() dto: RejectCrpDto) {
    return this.admin.rejectCrp(userId, dto.reason);
  }

  @Get('offers')
  listOffers() {
    return this.admin.listOffers();
  }

  @Post('offers')
  createOffer(@Body() dto: UpsertOfferDto) {
    return this.admin.createOffer(dto);
  }

  @Patch('offers/:id')
  updateOffer(@Param('id') id: string, @Body() dto: Partial<UpsertOfferDto>) {
    return this.admin.updateOffer(id, dto);
  }

  @Delete('offers/:id')
  deleteOffer(@Param('id') id: string) {
    return this.admin.deleteOffer(id);
  }

  @Get('course-modules')
  listCourseModules() {
    return this.admin.listCourseModules();
  }

  @Get('course-videos')
  listCourseVideos() {
    return this.admin.listCourseVideos();
  }

  @Post('course-videos')
  upsertCourseVideo(@Body() dto: UpsertCourseVideoDto) {
    return this.admin.upsertCourseVideo(dto);
  }

  @Delete('course-videos/:id')
  deleteCourseVideo(@Param('id') id: string) {
    return this.admin.deleteCourseVideo(id);
  }

  @Get('document-templates')
  listDocumentTemplates() {
    return this.admin.listDocumentTemplates();
  }

  @Post('document-templates')
  @UseInterceptors(FileInterceptor('file', documentTemplateUploadOptions))
  createDocumentTemplate(@Body() dto: CreateDocumentTemplateDto, @UploadedFile() file?: Express.Multer.File) {
    return this.admin.createDocumentTemplate(dto.title, dto.description, file);
  }

  @Delete('document-templates/:id')
  deleteDocumentTemplate(@Param('id') id: string) {
    return this.admin.deleteDocumentTemplate(id);
  }

  @Get('course-prices')
  listCoursePrices() {
    return this.admin.listCoursePrices();
  }

  @Post('course-prices')
  upsertCoursePrice(@Body() dto: UpsertCoursePriceDto) {
    return this.admin.upsertCoursePrice(dto);
  }

  @Delete('course-prices/:courseSlug')
  deleteCoursePrice(@Param('courseSlug') courseSlug: string) {
    return this.admin.deleteCoursePrice(courseSlug);
  }
}
