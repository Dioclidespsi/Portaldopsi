import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
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
        { path: 'billing/webhook', method: RequestMethod.POST },
        { path: 'asaas/webhook', method: RequestMethod.POST },
        { path: 'public/tenants/:slug', method: RequestMethod.GET },
        { path: 'certificates/verify/:code', method: RequestMethod.GET },
        { path: 'marketplace/courses', method: RequestMethod.GET },
        { path: 'marketplace/purchase', method: RequestMethod.POST },
        { path: 'patient-portal/:rest*', method: RequestMethod.ALL },
        { path: 'admin/:rest*', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
