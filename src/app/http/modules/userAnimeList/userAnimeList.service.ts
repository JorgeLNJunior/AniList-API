import { PaginationInterface } from '@http/shared/pagination/pagination.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddToUserAnimeListDto } from './dto/addToUserAnimeList.dto';
import { UpdateUserAnimeListDto } from './dto/updateUserAnimeList.dto';
import { UserAnimeList } from './entities/userAnimeList.entity';
import { UserAnimeListQueryBuilder } from './query/userAnimeList.query.builder';
import { UserAnimeListQuery } from './query/userAnimeList.query.interface';

@Injectable()
export class UserAnimeListService {
  constructor(
    @InjectRepository(UserAnimeList) private userAnimeListRepository: Repository<UserAnimeList>
  ) { }

  async addToList(userUUID: string, dto: AddToUserAnimeListDto) {
    const review = this.userAnimeListRepository.create({
      user: { uuid: userUUID },
      anime: { uuid: dto.animeUUID },
      status: dto.status
    });

    return this.userAnimeListRepository.save(review)
  }

  async find(query: UserAnimeListQuery): Promise<PaginationInterface<UserAnimeList>> {
    const findOptions = new UserAnimeListQueryBuilder(query).build()

    const total = await this.userAnimeListRepository.count({
      where: findOptions.where
    })
    const list = await this.userAnimeListRepository.find({
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['anime', 'user']
      },
      ...findOptions
    })

    return {
      data: list,
      pageTotal: list.length,
      total: total
    }
  }

  async update(uuid: string, dto: UpdateUserAnimeListDto) {
    await this.userAnimeListRepository.update(uuid, dto)
    return this.userAnimeListRepository.findOne(uuid, {
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['anime', 'user']
      },
    })
  }

  async remove(uuid: string) {
    await this.userAnimeListRepository.softDelete(uuid);
  }
}
