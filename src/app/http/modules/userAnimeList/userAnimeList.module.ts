import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidAnimeUUIDConstraint } from '../anime/decorators/isValidAnimeUUID.decorator';
import { Anime } from '../anime/entities/anime.entity';
import { User } from '../user/entities/user.entity';
import { UserAnimeList } from './entities/userAnimeList.entity';
import { IsAlreadyInUserAnimeListGuard } from './guards/isAlreadyInUserAnimeList.guard';
import { UserAnimeListController } from './userAnimeList.controller';
import { UserAnimeListService } from './userAnimeList.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAnimeList, Anime, User])
  ],
  controllers: [UserAnimeListController],
  providers: [
    UserAnimeListService,
    IsValidAnimeUUIDConstraint,
    IsAlreadyInUserAnimeListGuard
  ]
})
export class UserAnimeListModule { }
