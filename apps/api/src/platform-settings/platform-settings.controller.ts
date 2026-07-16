import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { PlatformSettingsService } from './platform-settings.service';
import { UpdatePlatformSettingsDto } from './dto/update-platform-settings.dto';
import { AdminTokenGuard } from '../admin/admin-token.guard';

@Controller()
export class PlatformSettingsController {
  constructor(private readonly settings: PlatformSettingsService) {}

  /** Pública — excluída do AuthMiddleware em auth.module.ts. Consumida por app/layout.tsx pra pintar o site inteiro. */
  @Get('public/settings')
  getPublic() {
    return this.settings.get();
  }

  @Get('admin/settings')
  @UseGuards(AdminTokenGuard)
  getForAdmin() {
    return this.settings.get();
  }

  @Patch('admin/settings')
  @UseGuards(AdminTokenGuard)
  update(@Body() dto: UpdatePlatformSettingsDto) {
    return this.settings.update(dto.colorPalette);
  }
}
