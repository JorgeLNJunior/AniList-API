import { AnimeModule } from '@modules/anime/anime.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Review } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UserModule, AnimeModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
