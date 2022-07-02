import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Review } from '../review/entities/review.entity'
import { User } from '../user/entities/user.entity'
import { Vote } from './entities/vote.entity'
import { VoteController } from './vote.controller'
import { VoteService } from './vote.service'

@Module({
  imports: [TypeOrmModule.forFeature([Vote, User, Review])],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
