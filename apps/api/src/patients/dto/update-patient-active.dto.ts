import { IsBoolean } from 'class-validator';

export class UpdatePatientActiveDto {
  @IsBoolean()
  active: boolean;
}
