import { Module } from '@nestjs/common';
import { TeleconsultaController } from './teleconsulta.controller';
import { TeleconsultaService } from './teleconsulta.service';

@Module({
  controllers: [TeleconsultaController],
  providers: [TeleconsultaService],
  exports: [TeleconsultaService],
})
export class TeleconsultaModule {}
