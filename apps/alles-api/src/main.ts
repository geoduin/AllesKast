/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'dotenv';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { HttpFilter } from './app/Controllers/filters/http.filter';
import { FallbackFilter } from './app/Controllers/filters/Fallback';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(
    new FallbackFilter(),
   new HttpFilter());
  const port = process.env['PORT'] || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
