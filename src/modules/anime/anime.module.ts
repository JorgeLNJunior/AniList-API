import { JobModule } from '@modules/job/job.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { Anime } from './entities/anime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anime]), JobModule],
  controllers: [AnimeController],
  providers: [AnimeService],
  exports: [AnimeService],
})
export class AnimeModule {}
