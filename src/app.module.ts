import { Constants } from '@config/constants';
import { AuthModule } from '@modules/auth/auth.module';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';
import { BullModule } from '@nestjs/bull';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs';

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
  onApplicationBootstrap() {
    if (!existsSync('.temp')) {
      mkdirSync('.temp');
    }
    if (!existsSync('public')) {
      mkdirSync('public');
      mkdirSync('public/anime/cover', { recursive: true });
      mkdirSync('public/user/avatar', { recursive: true });
    }
  }
}
