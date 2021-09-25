import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Vote } from './entities/vote.entity'
import { VoteController } from './vote.controller'
import { VoteService } from './vote.service'

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
