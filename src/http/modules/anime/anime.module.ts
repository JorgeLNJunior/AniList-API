import { QueueModule } from '@http/shared/modules/queue/queue.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { Anime } from './entities/anime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anime]), QueueModule],
  controllers: [AnimeController],
  providers: [AnimeService],
  exports: [AnimeService],
})
export class AnimeModule {}
