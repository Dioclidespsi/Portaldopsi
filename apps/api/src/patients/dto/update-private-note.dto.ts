import { IsString } from 'class-validator';

export class UpdatePrivateNoteDto {
  @IsString()
  privateNote: string;
}
