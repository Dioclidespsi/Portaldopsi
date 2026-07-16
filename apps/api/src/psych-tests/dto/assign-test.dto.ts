import { IsString } from 'class-validator';

export class AssignTestDto {
  @IsString()
  patientId: string;

  @IsString()
  testTemplateId: string;
}
