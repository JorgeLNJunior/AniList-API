import { Anime } from '@modules/anime/entities/anime.entity';
import { User } from '@modules/user/entities/user.entity';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvatarCompressConsumer } from './consumers/avatar.consumer';
import { CoverCompressConsumer } from './consumers/cover.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Anime, User]),
    BullModule.registerQueue(
      { name: 'cover-compression' },
      { name: 'avatar-compression' },
    ),
  ],
  providers: [CoverCompressConsumer, AvatarCompressConsumer],
  exports: [BullModule],
})
export class QueueModule {}
