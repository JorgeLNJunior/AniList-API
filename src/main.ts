import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as express from 'express';
import helmet from 'helmet';
import { resolve } from 'path';

import { description, name, version } from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(helmet());
  app.use(express.static(resolve('public')));

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );
  app.useLogger(new ConsoleLogger());

  const config = new DocumentBuilder()
    // capitalize (anilist-api to AniList API)
    .setTitle(
      name
        .replaceAll('a', 'A')
        .replaceAll('l', 'L')
        .replaceAll('api', 'API')
        .replaceAll('-', ' '),
    )
    .setDescription(description)
    .setVersion(version)
    .addTag('Auth')
    .addTag('Users')
    .addTag('User Anime List')
    .addTag('Animes')
    .addTag('Reviews')
    .addTag('Votes')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'AniList API Docs',
  });

  app.enableShutdownHooks();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
