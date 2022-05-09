import { BcryptService } from '@http/shared/services/bcrypt.service'
import { QueueModule } from '@modules/queue/queue.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Review } from '../review/entities/review.entity'
import { UserAnimeList } from '../userAnimeList/entities/userAnimeList.entity'
import { IsUserAlreadyExistConstraint } from './decorators/isUserAlreadyExist.decorator'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAnimeList,
      Review
    ]),
    QueueModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    BcryptService,
    IsUserAlreadyExistConstraint
  ],
  exports: [UserService]
})
export class UserModule { }
