import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { AdminTokenGuard } from './admin-token.guard';
import { RejectCrpDto } from './dto/reject-crp.dto';
import { CreateDocumentTemplateDto } from './dto/create-document-template.dto';
import { CreateLibraryMaterialDto } from './dto/create-library-material.dto';
import { UpsertCertificateTemplateDto } from './dto/upsert-certificate-template.dto';
import { UpsertTestTemplateDto } from './dto/upsert-test-template.dto';
import { SetTestTemplateActiveDto } from './dto/set-test-template-active.dto';
import { documentTemplateUploadOptions } from '../document-templates/document-template-upload.config';
import { libraryMaterialUploadOptions } from '../library/library-material-upload.config';
import { certificateTemplateUploadOptions } from '../certificates/certificate-template-upload.config';
import { bannerUploadOptions } from '../banners/banner-upload.config';
import { UpsertBannerDto } from './dto/upsert-banner.dto';

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

  @Get('supervisors/pending')
  listPendingSupervisors() {
    return this.admin.listPendingSupervisors();
  }

  @Post('supervisors/:userId/approve')
  approveSupervisor(@Param('userId') userId: string) {
    return this.admin.approveSupervisor(userId);
  }

  @Post('supervisors/:userId/reject')
  rejectSupervisor(@Param('userId') userId: string, @Body() dto: RejectCrpDto) {
    return this.admin.rejectSupervisor(userId, dto.reason);
  }

  @Get('community/reports')
  listCommunityReports() {
    return this.admin.listCommunityReports();
  }

  @Post('community/reports/:id/resolve')
  resolveCommunityReport(@Param('id') id: string) {
    return this.admin.resolveCommunityReport(id);
  }

  @Post('community/posts/:id/remove')
  removeCommunityPost(@Param('id') id: string, @Body() dto: RejectCrpDto) {
    return this.admin.removeCommunityPost(id, dto.reason);
  }

  @Post('community/replies/:id/remove')
  removeCommunityReply(@Param('id') id: string, @Body() dto: RejectCrpDto) {
    return this.admin.removeCommunityReply(id, dto.reason);
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

  @Get('library')
  listLibraryMaterials() {
    return this.admin.listLibraryMaterials();
  }

  @Post('library')
  @UseInterceptors(FileInterceptor('file', libraryMaterialUploadOptions))
  createLibraryMaterial(@Body() dto: CreateLibraryMaterialDto, @UploadedFile() file?: Express.Multer.File) {
    return this.admin.createLibraryMaterial(dto.category, dto.title, dto.description, file);
  }

  @Patch('library/:id/active')
  setLibraryMaterialActive(@Param('id') id: string, @Body() dto: SetTestTemplateActiveDto) {
    return this.admin.setLibraryMaterialActive(id, dto.active);
  }

  @Delete('library/:id')
  deleteLibraryMaterial(@Param('id') id: string) {
    return this.admin.deleteLibraryMaterial(id);
  }

  @Get('certificate-template')
  getCertificateTemplate() {
    return this.admin.getCertificateTemplate();
  }

  @Post('certificate-template')
  @UseInterceptors(FileInterceptor('file', certificateTemplateUploadOptions))
  upsertCertificateTemplate(@Body() dto: UpsertCertificateTemplateDto, @UploadedFile() file?: Express.Multer.File) {
    return this.admin.upsertCertificateTemplate(dto, file);
  }

  @Post('certificate-template/preview')
  async previewCertificateTemplate(@Body() dto: UpsertCertificateTemplateDto, @Res() res: Response) {
    const buffer = await this.admin.previewCertificateTemplate(dto);
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  }

  @Get('banners')
  listBanners() {
    return this.admin.listBanners();
  }

  @Post('banners/:position')
  @UseInterceptors(FileInterceptor('file', bannerUploadOptions))
  upsertBanner(@Param('position') position: string, @Body() dto: UpsertBannerDto, @UploadedFile() file?: Express.Multer.File) {
    return this.admin.upsertBanner(Number(position), dto, file);
  }

  @Delete('banners/:position')
  deleteBanner(@Param('position') position: string) {
    return this.admin.deleteBanner(Number(position));
  }

  @Get('tests')
  listTestTemplates() {
    return this.admin.listTestTemplates();
  }

  @Post('tests')
  createTestTemplate(@Body() dto: UpsertTestTemplateDto) {
    return this.admin.createTestTemplate(dto);
  }

  @Patch('tests/:id')
  updateTestTemplate(@Param('id') id: string, @Body() dto: UpsertTestTemplateDto) {
    return this.admin.updateTestTemplate(id, dto);
  }

  @Patch('tests/:id/active')
  setTestTemplateActive(@Param('id') id: string, @Body() dto: SetTestTemplateActiveDto) {
    return this.admin.setTestTemplateActive(id, dto.active);
  }

  @Delete('tests/:id')
  deleteTestTemplate(@Param('id') id: string) {
    return this.admin.deleteTestTemplate(id);
  }
}
