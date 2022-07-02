import { FindManyOptions, FindOptionsWhere } from 'typeorm'

import { UserAnimeList } from '../entities/userAnimeList.entity'
import { UserAnimeListQuery } from './userAnimeList.query.interface'

export class UserAnimeListQueryBuilder {
  private query: UserAnimeListQuery

  constructor(query: UserAnimeListQuery) {
    this.query = query
  }

  build(): FindManyOptions<UserAnimeList> {
    const findOptions: FindManyOptions<UserAnimeList> = {}
    const conditions: FindOptionsWhere<UserAnimeList> = {}

    if (this.query.uuid) conditions.uuid = this.query.uuid
    if (this.query.skip) findOptions.skip = this.query.skip
    if (this.query.take) {
      findOptions.take = this.query.take
    } else findOptions.take = 20

    findOptions.where = conditions

    return findOptions
  }
}
