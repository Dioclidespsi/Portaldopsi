import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminCoursesController } from './admin-courses.controller';
import { AdminCoursesService } from './admin-courses.service';
import { AdminTokenGuard } from './admin-token.guard';

@Module({
  controllers: [AdminController, AdminCoursesController],
  providers: [AdminService, AdminCoursesService, AdminTokenGuard],
})
export class AdminModule {}
