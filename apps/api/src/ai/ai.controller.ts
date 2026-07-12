import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AskDto } from './dto/ask.dto';
import { RewritePostDto } from './dto/rewrite-post.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { STAFF_ROLES } from '../common/roles';

@Controller('ai')
@UseGuards(RolesGuard)
@Roles(...STAFF_ROLES)
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post('prontuario/:patientId/summarize')
  async summarizeProntuario(@Param('patientId') patientId: string) {
    const summary = await this.ai.summarizeProntuario(patientId);
    return { summary };
  }

  @Post('marketing/rewrite')
  async rewrite(@Body() dto: RewritePostDto) {
    const suggestion = await this.ai.suggestCompliantRewrite(dto.content, dto.flagReasons);
    return { suggestion };
  }

  @Post('ask')
  async ask(@Body() dto: AskDto) {
    const answer = await this.ai.ask(dto.question);
    return { answer };
  }
}
