import { FindConditions, FindManyOptions } from 'typeorm'

import { UserList } from '../entities/userList.entity';
import { UserListQuery } from './userList.query.interface';

export class UserListQueryBuilder {
  private query: UserListQuery;

  constructor(query: UserListQuery) {
    this.query = query
  }

  build(): FindManyOptions<UserList> {
    const findOptions: FindManyOptions<UserList> = {}
    const conditions: FindConditions<UserList> = {}

    if (this.query.uuid) conditions.uuid = this.query.uuid
    if (this.query.skip) findOptions.skip = this.query.skip
    if (this.query.take) {
      findOptions.take = this.query.take
    } else findOptions.take = 20

    findOptions.where = conditions

    return findOptions
  }
}
