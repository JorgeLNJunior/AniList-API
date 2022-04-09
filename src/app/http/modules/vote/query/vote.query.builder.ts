import { FindConditions, FindManyOptions } from 'typeorm'

import { Vote } from '../entities/vote.entity';
import { VoteQuery } from './vote.query.interface';

export class VoteQueryBuilder {
  private query: VoteQuery;

  constructor (query: VoteQuery) {
    this.query = query
  }

  build (): FindManyOptions<Vote> {
    const findOptions: FindManyOptions<Vote> = {}
    const conditions: FindConditions<Vote> = {}

    if (this.query.uuid) conditions.uuid = this.query.uuid
    if (this.query.userUuid) conditions.user = { uuid: this.query.userUuid }
    if (this.query.reviewUuid) conditions.review = { uuid: this.query.reviewUuid }
    if (this.query.take) findOptions.take = this.query.take
    if (this.query.skip) findOptions.skip = this.query.skip

    findOptions.where = conditions

    return findOptions
  }
}
