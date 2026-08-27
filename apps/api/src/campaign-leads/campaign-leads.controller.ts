import { Body, Controller, Get, Post } from '@nestjs/common';
import { CampaignLeadsService } from './campaign-leads.service';
import { CreateCampaignLeadDto } from './dto/create-campaign-lead.dto';

@Controller()
export class CampaignLeadsController {
  constructor(private readonly campaignLeads: CampaignLeadsService) {}

  /** Pública — excluída do AuthMiddleware em auth.module.ts. Formulário da página /programa-piloto. */
  @Post('public/campaign-leads')
  create(@Body() dto: CreateCampaignLeadDto) {
    return this.campaignLeads.create(dto);
  }

  /** Pública — contador de vagas restantes mostrado em /programa-piloto. */
  @Get('public/campaign-leads/count')
  countProgress() {
    return this.campaignLeads.countProgress();
  }
}
