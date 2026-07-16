import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  // bodyParser desligado no create() porque o webhook do Stripe precisa do
  // corpo cru (Buffer) para validar a assinatura — json parsing é registrado
  // manualmente abaixo, para todas as rotas exceto essa.
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Toda resposta carrega dado de um tenant específico (via Authorization, não
  // via URL) — sem isso, o navegador pode cachear a resposta por URL e servir
  // o dado de um tenant para outro que reusa a mesma máquina/perfil. `etag`
  // desligado porque também habilita cache condicional que contornaria o
  // no-store em alguns proxies.
  app.getHttpAdapter().getInstance().set('etag', false);
  app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.use('/billing/webhook', express.raw({ type: 'application/json' }));
  app.use(express.json());

  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3333);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Portal do Psi API rodando em http://localhost:${port}`);
  // eslint-disable-next-line no-console
  console.log(`PUBLIC_API_URL efetivamente lido pelo processo: ${config.get<string>('PUBLIC_API_URL', '(não definida — usando padrão http://localhost:3333)')}`);
}

bootstrap();
