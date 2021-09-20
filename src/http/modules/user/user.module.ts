import { BcryptService } from '@http/shared/services/bcrypt.service'
import { QueueModule } from '@modules/queue/queue.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IsUserAlreadyExistConstraint } from './decorators/isUserAlreadyExist.decorator'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), QueueModule],
  controllers: [UserController],
  providers: [UserService, BcryptService, IsUserAlreadyExistConstraint],
  exports: [UserService]
})
export class UserModule {}
