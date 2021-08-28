import { Anime } from '@modules/anime/entities/anime.entity';
import { User } from '@modules/user/entities/user.entity';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from '@shared/services/mail/mail.service';

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
  ],
  exports: [BullModule],
})
export class QueueModule {}
