import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CertificatesModule } from '../certificates/certificates.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CertificatesModule, CommonModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
