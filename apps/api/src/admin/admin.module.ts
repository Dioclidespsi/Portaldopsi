import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminCoursesController } from './admin-courses.controller';
import { AdminCoursesService } from './admin-courses.service';
import { AdminProntuarioController } from './admin-prontuario.controller';
import { AdminProntuarioService } from './admin-prontuario.service';
import { AdminTokenGuard } from './admin-token.guard';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AsaasModule],
  controllers: [AdminController, AdminCoursesController, AdminProntuarioController],
  providers: [AdminService, AdminCoursesService, AdminProntuarioService, AdminTokenGuard],
})
export class AdminModule {}
