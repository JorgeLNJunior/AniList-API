import { FindConditions, FindManyOptions } from 'typeorm';

import { Review } from '../entities/review.entity';
import { ReviewQuery } from './review.query.interface';

export class ReviewQueryBuilder {
  private query: ReviewQuery;

  constructor(query: ReviewQuery) {
    this.query = query;
  }

  build(): FindManyOptions<Review> {
    const findOptions: FindManyOptions<Review> = {};
    const conditions: FindConditions<Review> = {};

    if (this.query.uuid) conditions.uuid = this.query.uuid;
    if (this.query.take) {
      findOptions.take = this.query.take;
    } else findOptions.take = 20;
    if (this.query.skip) findOptions.skip = this.query.skip;

    findOptions.where = conditions;

    return findOptions;
  }
}
