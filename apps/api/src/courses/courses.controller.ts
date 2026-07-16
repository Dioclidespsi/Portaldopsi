import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CoursesService } from './courses.service';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('courses')
@UseGuards(RolesGuard)
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  @Get()
  listCatalog() {
    return this.courses.listCatalog();
  }

  @Post('lessons/:lessonId/complete')
  markComplete(@Param('lessonId') lessonId: string) {
    return this.courses.completeLesson(lessonId);
  }

  @Get('materials/:materialId/download')
  async downloadMaterial(@Param('materialId') materialId: string, @Res() res: Response) {
    const { absolutePath, filename } = await this.courses.getMaterialPath(materialId);
    res.download(absolutePath, filename);
  }

  @Get('lessons/:lessonId/quiz')
  getQuiz(@Param('lessonId') lessonId: string) {
    return this.courses.getQuizForStudent(lessonId);
  }

  @Post('lessons/:lessonId/quiz/attempts')
  submitQuizAttempt(@Param('lessonId') lessonId: string, @Body() dto: SubmitQuizAttemptDto) {
    return this.courses.submitQuizAttempt(lessonId, dto);
  }
}
