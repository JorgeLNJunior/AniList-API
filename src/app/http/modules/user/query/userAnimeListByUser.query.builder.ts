import { UserAnimeList } from '@http/modules/userAnimeList/entities/userAnimeList.entity';
import { FindConditions, FindManyOptions } from 'typeorm'

import { UserAnimeListByUserQuery } from './userAnimeListByUser.query.interface';

export class UserAnimeListByUserQueryBuilder {
  private query: UserAnimeListByUserQuery;

  constructor(query: UserAnimeListByUserQuery) {
    this.query = query
  }

  build(): FindManyOptions<UserAnimeList> {
    const findOptions: FindManyOptions<UserAnimeList> = {}
    const conditions: FindConditions<UserAnimeList> = {}

    if (this.query.uuid) conditions.uuid = this.query.uuid
    if (this.query.status) conditions.status = this.query.status
    if (this.query.animeUUID) conditions.anime = { uuid: this.query.animeUUID }
    if (this.query.skip) findOptions.skip = this.query.skip
    if (this.query.take) {
      findOptions.take = this.query.take
    } else findOptions.take = 20

    findOptions.where = conditions

    return findOptions
  }
}
