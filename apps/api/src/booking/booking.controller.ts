import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

/** Rotas públicas (sem autenticação) — excluídas do AuthMiddleware em auth.module.ts. */
@Controller('public/tenants/:slug')
export class BookingController {
  constructor(private readonly booking: BookingService) {}

  @Get('availability')
  listSlots(@Param('slug') slug: string) {
    return this.booking.listPublicSlots(slug);
  }

  @Post('bookings')
  create(@Param('slug') slug: string, @Body() dto: CreateBookingDto) {
    return this.booking.createBooking(slug, dto);
  }
}
