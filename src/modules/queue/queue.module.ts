import { Anime } from '@http/modules/anime/entities/anime.entity';
import { User } from '@http/modules/user/entities/user.entity';
import { MailService } from '@http/shared/services/mail/mail.service';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeStorage } from '@src/http/modules/anime/storage/anime.storage';
import { UserStorage } from '@src/http/modules/user/storage/user.storage';

import { AvatarCompressConsumer } from './consumers/avatar.consumer';
import { CoverCompressConsumer } from './consumers/cover.consumer';
import { EmailConsumer } from './consumers/email.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Anime, User]),
    BullModule.registerQueue(
      { name: 'cover-compression' },
      { name: 'avatar-compression' },
      { name: 'email' },
    ),
  ],
  providers: [
    CoverCompressConsumer,
    AvatarCompressConsumer,
    EmailConsumer,
    MailService,
    AnimeStorage,
    UserStorage,
  ],
  exports: [BullModule],
})
export class QueueModule {}
