import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerModule as Throttler,
} from '@nestjs/throttler';

@Module({
  imports: [
    Throttler.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class ThrottlerModule {}
