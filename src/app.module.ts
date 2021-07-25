import { Constants } from '@config/constants';
import { AuthModule } from '@modules/auth/auth.module';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimeModule } from './modules/anime/anime.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AnimeModule,
    ReviewModule,
    HealthModule,
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
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
