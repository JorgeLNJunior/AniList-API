import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidAnimeUUIDConstraint } from '../anime/decorators/isValidAnimeUUID.decorator';
import { Anime } from '../anime/entities/anime.entity';
import { User } from '../user/entities/user.entity';
import { UserList } from './entities/userList.entity';
import { UserListController } from './userList.controller';
import { UserListService } from './userList.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserList, Anime, User])
  ],
  controllers: [UserListController],
  providers: [
    UserListService,
    IsValidAnimeUUIDConstraint
  ]
})
export class UserListModule { }
