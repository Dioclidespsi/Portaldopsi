import { IsBoolean } from 'class-validator';

export class SetTestTemplateActiveDto {
  @IsBoolean()
  active: boolean;
}
