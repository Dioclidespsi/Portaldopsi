import { Module } from '@nestjs/common';
import { PsychTestsController } from './psych-tests.controller';
import { PsychTestsService } from './psych-tests.service';

@Module({
  controllers: [PsychTestsController],
  providers: [PsychTestsService],
})
export class PsychTestsModule {}
