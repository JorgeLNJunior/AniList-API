import { Constants } from '@config/constants';
import { AuthModule } from '@modules/auth/auth.module';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';
import { BullModule } from '@nestjs/bull';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs';
import * as Joi from 'joi';

import { AnimeModule } from './modules/anime/anime.module';
import { ReviewModule } from './modules/review/review.module';
import { QueueModule } from './shared/modules/queue/queue.module';
import { ChatModule } from './websocket/chat/chat.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AnimeModule,
    ReviewModule,
    HealthModule,
    QueueModule,
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validationSchema: Joi.object({
        ADMIN_EMAIL: Joi.string().email().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRES: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        MAIL_SERVICE: Joi.string().valid('fake', 'sendgrid').required(),
        SENDGRID_SENDER: Joi.string().email().optional(),
        SENDGRID_API_KEY: Joi.string().optional(),
        STORAGE: Joi.string().valid('local', 'cloudinary').required(),
        CLOUDINARY_NAME: Joi.string().optional(),
        CLOUDINARY_KEY: Joi.string().optional(),
        CLOUDINARY_SECRET: Joi.string().optional(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
        DB_MIGRATE: Joi.boolean().required(),
        PORT: Joi.number().optional(),
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => Constants.databaseConfig(),
    }),
    BullModule.forRootAsync({
      useFactory: () => ({ redis: Constants.redisConfig() }),
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);

  onApplicationBootstrap() {
    try {
      if (!existsSync('.temp')) {
        mkdirSync('.temp');
      }
      if (!existsSync('public')) {
        mkdirSync('public');
        mkdirSync('public/anime/cover', { recursive: true });
        mkdirSync('public/user/avatar', { recursive: true });
      }
    } catch (error) {
      this.logger.error('Error when creating files directories', error.message);
    }
  }
}
