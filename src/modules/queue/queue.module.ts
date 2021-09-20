import { Anime } from '@http/modules/anime/entities/anime.entity'
import { User } from '@http/modules/user/entities/user.entity'
import { MailService } from '@http/shared/services/mail/mail.service'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnimeStorage } from '@src/http/modules/anime/storage/anime.storage'
import { UserStorage } from '@src/http/modules/user/storage/user.storage'
import { FakeMailService } from '@src/http/shared/services/mail/fakeMail.service'
import { SendgridMailService } from '@src/http/shared/services/mail/sendgridMail.service'

import { AvatarCompressConsumer } from './consumers/avatar.consumer'
import { CoverCompressConsumer } from './consumers/cover.consumer'
import { EmailConsumer } from './consumers/email.consumer'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Anime, User]),
    BullModule.registerQueueAsync(
      { name: 'cover-compression' },
      { name: 'avatar-compression' },
      { name: 'email' }
    )
  ],
  providers: [
    ConfigService,
    CoverCompressConsumer,
    AvatarCompressConsumer,
    EmailConsumer,
    MailService,
    FakeMailService,
    SendgridMailService,
    AnimeStorage,
    UserStorage
  ],
  exports: [BullModule]
})
export class QueueModule {}
