import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class WhatsAppTemplateItemDto {
  @IsString()
  label: string;

  /** Pode conter o placeholder literal "{nome}" — substituído no frontend, ver lib/whatsapp.ts. */
  @IsString()
  text: string;
}

export class UpdateWhatsAppTemplatesDto {
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => WhatsAppTemplateItemDto)
  templates: WhatsAppTemplateItemDto[];
}
