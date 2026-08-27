import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignLeadDto } from './dto/create-campaign-lead.dto';

/** Total de vagas do Programa Piloto — usado só pra calcular quantas restam (ver `countProgress`). */
const PILOT_TOTAL_SLOTS = 100;

/**
 * Interessados no Programa Piloto — nível de plataforma (sem tenantId),
 * propositalmente separado do CRM de pacientes (`Lead`, por-tenant). Sem
 * RLS (mesmo padrão de `PlatformSettings`/`DocumentTemplate`), client cru
 * já basta.
 */
@Injectable()
export class CampaignLeadsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Bloqueia reenvio pelo mesmo e-mail — evita duplicata acumulando na fila do admin (ver AdminService.deleteCampaignLead pra limpeza manual das que já existem). */
  async create(dto: CreateCampaignLeadDto) {
    const existing = await this.prisma.campaignLead.findFirst({
      where: { email: { equals: dto.email, mode: 'insensitive' } },
      select: { id: true },
    });
    if (existing) {
      throw new ConflictException('Você já está na nossa lista de interessados — entraremos em contato em breve.');
    }

    return this.prisma.campaignLead.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        consentedAt: new Date(),
      },
      select: { id: true },
    });
  }

  /**
   * "Vaga preenchida" = CONVERTIDO (virou tenant ativo de verdade), não
   * simplesmente quem preencheu o formulário — senão o contador na página
   * pública seria escassez artificial, não um número real.
   */
  async countProgress() {
    const converted = await this.prisma.campaignLead.count({ where: { status: 'CONVERTIDO' } });
    return { converted, remaining: Math.max(0, PILOT_TOTAL_SLOTS - converted) };
  }
}
