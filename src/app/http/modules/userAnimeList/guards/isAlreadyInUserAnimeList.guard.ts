import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserAnimeList } from '../entities/userAnimeList.entity';

export class IsAlreadyInUserAnimeListGuard implements CanActivate {
  constructor(
    @InjectRepository(UserAnimeList)
    private userAnimeListRepository: Repository<UserAnimeList>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userUUID = context.switchToHttp().getRequest().user.uuid;
    const animeUUID = context.switchToHttp().getRequest().body.animeUUID;

    const isAlreadyInUserList = await this.userAnimeListRepository.findOne({
      where: {
        user: { uuid: userUUID },
        anime: { uuid: animeUUID },
      },
    });
    if (isAlreadyInUserList)
      throw new BadRequestException(['this anime is already in your list']);
    return true;
  }
}
