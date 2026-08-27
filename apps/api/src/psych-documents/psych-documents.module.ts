import { Module } from '@nestjs/common';
import { PsychDocumentsController } from './psych-documents.controller';
import { PsychDocumentsService } from './psych-documents.service';

@Module({
  controllers: [PsychDocumentsController],
  providers: [PsychDocumentsService],
  exports: [PsychDocumentsService],
})
export class PsychDocumentsModule {}
