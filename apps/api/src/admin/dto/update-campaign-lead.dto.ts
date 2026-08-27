import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CampaignLeadStatus } from '@prisma/client';

export class UpdateCampaignLeadDto {
  @IsOptional()
  @IsEnum(CampaignLeadStatus)
  status?: CampaignLeadStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
