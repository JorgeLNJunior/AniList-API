import { UserList } from '@http/modules/userList/entities/userList.entity';
import { FindConditions, FindManyOptions } from 'typeorm'

import { AnimeListByUserQuery } from './animeListByUser.query.interface';

export class AnimeListByUserQueryBuilder {
  private query: AnimeListByUserQuery;

  constructor(query: AnimeListByUserQuery) {
    this.query = query
  }

  build(): FindManyOptions<UserList> {
    const findOptions: FindManyOptions<UserList> = {}
    const conditions: FindConditions<UserList> = {}

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
