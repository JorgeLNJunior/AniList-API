import { Anime } from '@http/modules/anime/entities/anime.entity'
import { AnimeStorage } from '@http/modules/anime/storage/anime.storage'
import { User } from '@http/modules/user/entities/user.entity'
import { UserStorage } from '@http/modules/user/storage/user.storage'
import { FakeMailService } from '@http/shared/services/mail/fakeMail.service'
import { MailService } from '@http/shared/services/mail/mail.service'
import { SendgridMailService } from '@http/shared/services/mail/sendgridMail.service'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AvatarCompressionConsumer } from './consumers/avatar.consumer'
import { CoverCompressionConsumer } from './consumers/cover.consumer'
import { EmailActivationConsumer } from './consumers/email.consumer'
import { Jobs } from './consumers/types/jobs.enum'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Anime, User]),
    BullModule.registerQueueAsync(
      { name: Jobs.COVER_COMPRESSION },
      { name: Jobs.AVATAR_COMPRESSION },
      { name: Jobs.EMAIL_ACTIVATION }
    )
  ],
  providers: [
    ConfigService,
    CoverCompressionConsumer,
    AvatarCompressionConsumer,
    EmailActivationConsumer,
    MailService,
    FakeMailService,
    SendgridMailService,
    AnimeStorage,
    UserStorage
  ],
  exports: [BullModule]
})
export class QueueModule { }
