import { FindConditions, FindManyOptions, Like } from 'typeorm'

import { Anime } from '../entities/anime.entity'
import { AnimeQuery } from './anime.query.interface'

export class AnimeQueryBuilder {
  private query: AnimeQuery;

  constructor (query: AnimeQuery) {
    this.query = query
  }

  build (): FindManyOptions<Anime> {
    const findOptions: FindManyOptions<Anime> = {}
    const conditions: FindConditions<Anime> = {}

    if (this.query.uuid) conditions.uuid = this.query.uuid
    if (this.query.genre) conditions.genre = this.query.genre
    if (this.query.title) conditions.title = Like(`%${this.query.title}%`)
    if (this.query.episodes) conditions.episodes = Number(this.query.episodes)
    if (this.query.skip) findOptions.skip = this.query.skip
    if (this.query.take) {
      findOptions.take = this.query.take
    } else findOptions.take = 20

    findOptions.where = conditions

    return findOptions
  }
}
