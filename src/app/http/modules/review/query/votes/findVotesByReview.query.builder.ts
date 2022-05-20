import { Vote } from '@http/modules/vote/entities/vote.entity';
import { FindManyOptions } from 'typeorm';

import { FindVotesByReviewQuery } from './findVotesByReview.query.interface';

export class FindVotesByReviewQueryBuilder {
  private query: FindVotesByReviewQuery;

  constructor(query: FindVotesByReviewQuery) {
    this.query = query;
  }

  build(): FindManyOptions<Vote> {
    const findOptions: FindManyOptions<Vote> = {};

    if (this.query.take) {
      findOptions.take = this.query.take;
    } else findOptions.take = 20;
    if (this.query.skip) findOptions.skip = this.query.skip;

    return findOptions;
  }
}
