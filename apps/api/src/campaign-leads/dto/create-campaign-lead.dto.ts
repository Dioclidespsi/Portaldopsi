import { Equals, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateCampaignLeadDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  phone: string;

  /** Opt-in obrigatório — sem isso a captação não acontece (ver CampaignLeadsService.create). */
  @Equals(true, { message: 'É necessário aceitar ser contatado sobre o Programa Piloto.' })
  consent: boolean;
}
