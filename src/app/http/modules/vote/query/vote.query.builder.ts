import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { Vote } from '../entities/vote.entity';
import { VoteQuery } from './vote.query.interface';

export class VoteQueryBuilder {
  private query: VoteQuery;

  constructor(query: VoteQuery) {
    this.query = query;
  }

  build(): FindManyOptions<Vote> {
    const findOptions: FindManyOptions<Vote> = {};
    const conditions: FindOptionsWhere<Vote> = {};

    if (this.query.uuid) conditions.uuid = this.query.uuid;
    if (this.query.userUUID) conditions.user = { uuid: this.query.userUUID };
    if (this.query.reviewUUID)
      conditions.review = { uuid: this.query.reviewUUID };
    if (this.query.take) findOptions.take = this.query.take;
    if (this.query.skip) findOptions.skip = this.query.skip;

    findOptions.where = conditions;

    return findOptions;
  }
}
