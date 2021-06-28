import { FindConditions, FindManyOptions, Like } from 'typeorm';

import { User } from '../entities/user.entity';
import { UserQuery } from './user.query.interface';

export class UserQueryBuilder {
  private query: UserQuery;

  constructor(query: UserQuery) {
    this.query = query;
  }

  build(): FindManyOptions<User> {
    const findOptions: FindManyOptions<User> = {};
    const conditions: FindConditions<User> = {};

    if (this.query.uuid) conditions.uuid = this.query.uuid;
    if (this.query.name) conditions.name = Like(`%${this.query.name}%`);
    if (this.query.email) conditions.email = this.query.email;
    if (this.query.take) {
      findOptions.take = this.query.take;
    } else findOptions.take = 20;
    if (this.query.skip) findOptions.skip = this.query.skip;

    findOptions.where = conditions;

    return findOptions;
  }
}
