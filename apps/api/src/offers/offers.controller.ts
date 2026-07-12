import { Controller, Get } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offers: OffersService) {}

  @Get()
  listActive() {
    return this.offers.listActive();
  }
}
