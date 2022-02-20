import { ConsoleLogger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import * as express from 'express'
import helmet from 'helmet'
import { resolve } from 'path'

import { description, name, version } from '../package.json'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  app.use(helmet())
  app.use(express.static(resolve('public')))

  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true
    })
  )
  app.useLogger(new ConsoleLogger())

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addTag('Auth')
    .addTag('Users')
    .addTag('Animes')
    .addTag('Reviews')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
