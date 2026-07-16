import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminCoursesService } from './admin-courses.service';
import { AdminTokenGuard } from './admin-token.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { CreateCourseLessonDto } from './dto/create-course-lesson.dto';
import { AddCourseMaterialDto } from './dto/add-course-material.dto';
import { UpsertCourseQuizDto } from './dto/upsert-course-quiz.dto';
import { courseMaterialUploadOptions } from '../courses/course-material-upload.config';

@Controller('admin/courses')
@UseGuards(AdminTokenGuard)
export class AdminCoursesController {
  constructor(private readonly adminCourses: AdminCoursesService) {}

  @Get()
  listCourses() {
    return this.adminCourses.listCourses();
  }

  @Post()
  createCourse(@Body() dto: CreateCourseDto) {
    return this.adminCourses.createCourse(dto);
  }

  @Patch(':id')
  updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.adminCourses.updateCourse(id, dto);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.adminCourses.deleteCourse(id);
  }

  @Post(':courseId/modules')
  createModule(@Param('courseId') courseId: string, @Body() dto: CreateCourseModuleDto) {
    return this.adminCourses.createModule(courseId, dto);
  }

  @Patch('modules/:id')
  updateModule(@Param('id') id: string, @Body() dto: Partial<CreateCourseModuleDto>) {
    return this.adminCourses.updateModule(id, dto);
  }

  @Delete('modules/:id')
  deleteModule(@Param('id') id: string) {
    return this.adminCourses.deleteModule(id);
  }

  @Post('modules/:moduleId/lessons')
  createLesson(@Param('moduleId') moduleId: string, @Body() dto: CreateCourseLessonDto) {
    return this.adminCourses.createLesson(moduleId, dto);
  }

  @Patch('lessons/:id')
  updateLesson(@Param('id') id: string, @Body() dto: Partial<CreateCourseLessonDto>) {
    return this.adminCourses.updateLesson(id, dto);
  }

  @Delete('lessons/:id')
  deleteLesson(@Param('id') id: string) {
    return this.adminCourses.deleteLesson(id);
  }

  @Post('lessons/:lessonId/materials')
  @UseInterceptors(FileInterceptor('file', courseMaterialUploadOptions))
  addMaterial(
    @Param('lessonId') lessonId: string,
    @Body() dto: AddCourseMaterialDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.adminCourses.addMaterial(lessonId, dto.title, file);
  }

  @Delete('materials/:id')
  deleteMaterial(@Param('id') id: string) {
    return this.adminCourses.deleteMaterial(id);
  }

  @Post('lessons/:lessonId/quiz')
  upsertQuiz(@Param('lessonId') lessonId: string, @Body() dto: UpsertCourseQuizDto) {
    return this.adminCourses.upsertQuiz(lessonId, dto);
  }

  @Delete('lessons/:lessonId/quiz')
  deleteQuiz(@Param('lessonId') lessonId: string) {
    return this.adminCourses.deleteQuiz(lessonId);
  }
}
