import { Review } from '@http/modules/review/entities/review.entity';
import { FindConditions, FindManyOptions, Like } from 'typeorm'

import { ReviewsByUserQuery } from './reviewsByUser.query.interface';

export class ReviewsByUserQueryBuilder {
  private query: ReviewsByUserQuery;

  constructor(query: ReviewsByUserQuery) {
    this.query = query
  }

  build(): FindManyOptions<Review> {
    const findOptions: FindManyOptions<Review> = {}
    const conditions: FindConditions<Review> = {}

    if (this.query.title) conditions.title = Like(`%${this.query.title}%`)
    if (this.query.rating) conditions.rating = this.query.rating
    if (this.query.animeUUID) conditions.anime = { uuid: this.query.animeUUID }
    if (this.query.skip) findOptions.skip = this.query.skip
    if (this.query.take) {
      findOptions.take = this.query.take
    } else findOptions.take = 20

    findOptions.where = conditions

    return findOptions
  }
}
