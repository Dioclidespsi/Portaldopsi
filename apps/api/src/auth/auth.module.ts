import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule,
    /// Só pros dois endpoints de "esqueci a senha" (ver auth.controller.ts) — nunca aplicado globalmente.
    ThrottlerModule.forRoot([{ ttl: 60 * 60 * 1000, limit: 20 }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN', '7d') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/verify-email', method: RequestMethod.POST },
        { path: 'auth/request-password-reset', method: RequestMethod.POST },
        { path: 'auth/reset-password', method: RequestMethod.POST },
        { path: 'billing/webhook', method: RequestMethod.POST },
        { path: 'asaas/webhook', method: RequestMethod.POST },
        { path: 'public/tenants/:slug', method: RequestMethod.GET },
        { path: 'public/tenants/:slug/leads', method: RequestMethod.POST },
        { path: 'public/campaign-leads', method: RequestMethod.POST },
        { path: 'public/campaign-leads/count', method: RequestMethod.GET },
        { path: 'public/tenants/:slug/availability', method: RequestMethod.GET },
        { path: 'public/tenants/:slug/bookings', method: RequestMethod.POST },
        { path: 'public/tenants/:slug/comments', method: RequestMethod.GET },
        { path: 'public/tenants/:slug/comments', method: RequestMethod.POST },
        { path: 'public/tenants/:slug/likes', method: RequestMethod.GET },
        { path: 'public/tenants/:slug/likes', method: RequestMethod.POST },
        { path: 'public/tenants/:slug/likes', method: RequestMethod.DELETE },
        { path: 'public/photos/:filename', method: RequestMethod.GET },
        { path: 'public/community-images/:filename', method: RequestMethod.GET },
        { path: 'public/tenants/:slug/presentation-video', method: RequestMethod.GET },
        { path: 'public/banners', method: RequestMethod.GET },
        { path: 'public/banner-images/:filename', method: RequestMethod.GET },
        { path: 'public/directory', method: RequestMethod.GET },
        { path: 'public/settings', method: RequestMethod.GET },
        // Token próprio de 10min (não é a sessão do usuário) — ver LibraryService.resolveViewToken.
        // Precisa ser pública porque o navegador (PDF) e o Office/Google Viewer (Word/PowerPoint)
        // buscam essa URL diretamente, sem conseguir mandar o Authorization Bearer.
        { path: 'library/:id/view', method: RequestMethod.GET },
        { path: 'certificates/verify/:code', method: RequestMethod.GET },
        { path: 'marketplace/courses', method: RequestMethod.GET },
        { path: 'marketplace/purchase', method: RequestMethod.POST },
        { path: 'patient-portal/:rest*', method: RequestMethod.ALL },
        { path: 'admin/:rest*', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
