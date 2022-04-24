import { ApiProperty } from '@nestjs/swagger'

import { UserList } from '../entities/userList.entity';
import { findUserListResponseExample } from './types/UserList.response.types'

export class FindUserListResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: findUserListResponseExample
  })
  private list: UserList[];

  constructor(list: UserList[], status?: number) {
    this.list = list
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      list: this.list
    }
  }
}
