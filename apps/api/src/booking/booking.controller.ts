import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

/**
 * Rotas públicas (sem autenticação) — excluídas do AuthMiddleware em
 * auth.module.ts. `bookings` aceita opcionalmente um Bearer de paciente já
 * logado (conta global) — ver BookingService.createBooking.
 */
@Controller('public/tenants/:slug')
export class BookingController {
  constructor(private readonly booking: BookingService) {}

  @Get('availability')
  listSlots(@Param('slug') slug: string) {
    return this.booking.listPublicSlots(slug);
  }

  @Post('bookings')
  create(@Param('slug') slug: string, @Body() dto: CreateBookingDto, @Headers('authorization') authHeader?: string) {
    return this.booking.createBooking(slug, dto, authHeader);
  }
}
