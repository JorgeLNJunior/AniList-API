import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { Review } from '../entities/review.entity';
import { ReviewQuery } from './review.query.interface';

export class ReviewQueryBuilder {
  private query: ReviewQuery;

  constructor(query: ReviewQuery) {
    this.query = query;
  }

  build(): FindManyOptions<Review> {
    const findOptions: FindManyOptions<Review> = {};
    const conditions: FindOptionsWhere<Review> = {};

    if (this.query.uuid) conditions.uuid = this.query.uuid;
    if (this.query.animeUUID) conditions.anime = { uuid: this.query.animeUUID };
    if (this.query.userUUID) conditions.user = { uuid: this.query.userUUID };
    if (this.query.take) {
      findOptions.take = this.query.take;
    } else findOptions.take = 20;
    if (this.query.skip) findOptions.skip = this.query.skip;

    findOptions.where = conditions;

    return findOptions;
  }
}
