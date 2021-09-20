import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Anime } from '../anime/entities/anime.entity'
import { User } from '../user/entities/user.entity'
import { Review } from './entities/review.entity'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Anime])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
