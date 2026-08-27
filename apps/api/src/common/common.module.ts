import { Module } from '@nestjs/common';
import { AccessGateService } from './access-gate.service';

/** Serviços compartilhados sem módulo de domínio próprio — hoje só o gate de acesso clínico (usado pelo guard global e por CoursesService). */
@Module({
  providers: [AccessGateService],
  exports: [AccessGateService],
})
export class CommonModule {}
