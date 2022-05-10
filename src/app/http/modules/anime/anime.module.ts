import { QueueModule } from '@modules/queue/queue.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Review } from '../review/entities/review.entity'
import { AnimeController } from './anime.controller'
import { AnimeService } from './anime.service'
import { Anime } from './entities/anime.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Anime, Review]), QueueModule],
  controllers: [AnimeController],
  providers: [AnimeService],
  exports: [AnimeService]
})
export class AnimeModule { }
