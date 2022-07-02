import { Vote } from '@http/modules/vote/entities/vote.entity'
import { FindManyOptions, FindOptionsWhere } from 'typeorm'

import { VotesByUserQuery } from './votesByUser.query.interface'

export class VotesByUserQueryBuilder {
  private query: VotesByUserQuery

  constructor(query: VotesByUserQuery) {
    this.query = query
  }

  build(): FindManyOptions<Vote> {
    const findOptions: FindManyOptions<Vote> = {}
    const conditions: FindOptionsWhere<Vote> = {}

    if (this.query.reviewUUID)
      conditions.review = { uuid: this.query.reviewUUID }
    if (this.query.skip) findOptions.skip = this.query.skip
    if (this.query.take) {
      findOptions.take = this.query.take
    } else findOptions.take = 20

    findOptions.where = conditions

    return findOptions
  }
}
