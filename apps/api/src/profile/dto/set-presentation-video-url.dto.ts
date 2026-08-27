import { IsUrl } from 'class-validator';

export class SetPresentationVideoUrlDto {
  @IsUrl({ require_protocol: true })
  url: string;
}
