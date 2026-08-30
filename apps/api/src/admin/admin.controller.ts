import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { AdminTokenGuard } from './admin-token.guard';
import { RejectCrpDto } from './dto/reject-crp.dto';
import { CreateDocumentTemplateDto } from './dto/create-document-template.dto';
import { CreateLibraryMaterialDto } from './dto/create-library-material.dto';
import { CreateMeditationTrackDto } from './dto/create-meditation-track.dto';
import { UpsertCertificateTemplateDto } from './dto/upsert-certificate-template.dto';
import { UpsertTestTemplateDto } from './dto/upsert-test-template.dto';
import { SetTestTemplateActiveDto } from './dto/set-test-template-active.dto';
import { documentTemplateUploadOptions } from '../document-templates/document-template-upload.config';
import { libraryMaterialUploadOptions } from '../library/library-material-upload.config';
import { meditationUploadOptions } from '../meditation/meditation-upload.config';
import { communityImageUploadOptions } from '../community/community-image-upload.config';
import { CreateCommunityPostDto } from '../community/dto/create-post.dto';
import { certificateTemplateUploadOptions } from '../certificates/certificate-template-upload.config';
import { bannerUploadOptions } from '../banners/banner-upload.config';
import { UpsertBannerDto } from './dto/upsert-banner.dto';
import { UpdateCampaignLeadDto } from './dto/update-campaign-lead.dto';
import { GrantComplimentaryTrialDto } from './dto/grant-complimentary-trial.dto';

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

  @Get('users-overview')
  getUsersOverview() {
    return this.admin.getUsersOverview();
  }

  @Get('revenue-summary')
  getRevenueSummary() {
    return this.admin.getRevenueSummary();
  }

  @Get('campaign-leads')
  listCampaignLeads() {
    return this.admin.listCampaignLeads();
  }

  @Patch('campaign-leads/:id')
  updateCampaignLead(@Param('id') id: string, @Body() dto: UpdateCampaignLeadDto) {
    return this.admin.updateCampaignLead(id, dto);
  }

  @Post('campaign-leads/:id/grant-trial')
  grantComplimentaryTrial(@Param('id') id: string, @Body() dto: GrantComplimentaryTrialDto) {
    return this.admin.grantComplimentaryTrial(id, dto);
  }

  @Delete('campaign-leads/:id')
  deleteCampaignLead(@Param('id') id: string) {
    return this.admin.deleteCampaignLead(id);
  }

  @Get('campaign-leads/:id/activation')
  getCampaignLeadActivation(@Param('id') id: string) {
    return this.admin.getCampaignLeadActivation(id);
  }

  @Get('tenants/search')
  searchTenants(@Query('q') q: string) {
    return this.admin.searchTenants(q ?? '');
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

  @Get('student-verifications/pending')
  listPendingStudentVerifications() {
    return this.admin.listPendingStudentVerifications();
  }

  @Get('student-verifications/:userId/document')
  async downloadStudentDocument(@Param('userId') userId: string, @Res() res: Response) {
    const filePath = await this.admin.getStudentDocumentPath(userId);
    res.download(filePath);
  }

  @Post('student-verifications/:userId/approve')
  approveStudentVerification(@Param('userId') userId: string) {
    return this.admin.approveStudentVerification(userId);
  }

  @Post('student-verifications/:userId/reject')
  rejectStudentVerification(@Param('userId') userId: string, @Body() dto: RejectCrpDto) {
    return this.admin.rejectStudentVerification(userId, dto.reason);
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

  /** Todos os posts, não só os denunciados — pra poder remover qualquer post da plataforma. */
  @Get('community/posts')
  listAllCommunityPosts(@Query('search') search?: string, @Query('page') page?: string) {
    return this.admin.listAllCommunityPosts(search, page ? Number(page) : undefined);
  }

  /** Post "Portal do Psi" (não uma clínica) — datas comemorativas etc. */
  @Post('community/posts')
  createInstitutionalCommunityPost(@Body() dto: CreateCommunityPostDto) {
    return this.admin.createInstitutionalCommunityPost(dto);
  }

  @Post('community/posts/:id/image')
  @UseInterceptors(FileInterceptor('file', communityImageUploadOptions))
  uploadCommunityPostImage(@Param('id') id: string, @UploadedFile() file?: Express.Multer.File) {
    return this.admin.uploadCommunityPostImage(id, file);
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

  @Get('site-comments')
  listSiteComments() {
    return this.admin.listSiteComments();
  }

  @Post('site-comments/:id/block')
  blockSiteComment(@Param('id') id: string, @Body() dto: RejectCrpDto) {
    return this.admin.blockSiteComment(id, dto.reason);
  }

  @Post('site-comments/:id/unblock')
  unblockSiteComment(@Param('id') id: string) {
    return this.admin.unblockSiteComment(id);
  }

  @Get('presentation-videos/pending')
  listPendingPresentationVideos() {
    return this.admin.listPendingPresentationVideos();
  }

  @Post('presentation-videos/:tenantId/approve')
  approvePresentationVideo(@Param('tenantId') tenantId: string) {
    return this.admin.approvePresentationVideo(tenantId);
  }

  @Post('presentation-videos/:tenantId/reject')
  rejectPresentationVideo(@Param('tenantId') tenantId: string, @Body() dto: RejectCrpDto) {
    return this.admin.rejectPresentationVideo(tenantId, dto.reason);
  }

  @Get('document-templates')
  listDocumentTemplates() {
    return this.admin.listDocumentTemplates();
  }

  @Post('document-templates')
  @UseInterceptors(FileInterceptor('file', documentTemplateUploadOptions))
  createDocumentTemplate(@Body() dto: CreateDocumentTemplateDto, @UploadedFile() file?: Express.Multer.File) {
    return this.admin.createDocumentTemplate(dto.title, dto.description, dto.requiresAcceptance, dto.audience, file);
  }

  @Delete('document-templates/:id')
  deleteDocumentTemplate(@Param('id') id: string) {
    return this.admin.deleteDocumentTemplate(id);
  }

  @Get('document-templates/:id/acceptances')
  listDocumentAcceptances(@Param('id') id: string) {
    return this.admin.listDocumentAcceptances(id);
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

  @Get('meditation-tracks')
  listMeditationTracks() {
    return this.admin.listMeditationTracks();
  }

  @Post('meditation-tracks')
  @UseInterceptors(FileInterceptor('file', meditationUploadOptions))
  createMeditationTrack(@Body() dto: CreateMeditationTrackDto, @UploadedFile() file?: Express.Multer.File) {
    return this.admin.createMeditationTrack(dto, file);
  }

  @Patch('meditation-tracks/:id/active')
  setMeditationTrackActive(@Param('id') id: string, @Body() dto: SetTestTemplateActiveDto) {
    return this.admin.setMeditationTrackActive(id, dto.active);
  }

  @Delete('meditation-tracks/:id')
  deleteMeditationTrack(@Param('id') id: string) {
    return this.admin.deleteMeditationTrack(id);
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

  @Get('certificates')
  listIssuedCertificates() {
    return this.admin.listIssuedCertificates();
  }

  @Get('certificates/:id/download')
  async downloadIssuedCertificate(@Param('id') id: string, @Res() res: Response) {
    const filePath = await this.admin.getIssuedCertificateFilePath(id);
    res.sendFile(filePath);
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
