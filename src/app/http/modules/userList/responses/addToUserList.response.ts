import { ApiProperty } from '@nestjs/swagger'

import { UserList } from '../entities/userList.entity';
import { addToUserListResponseExample } from './types/UserList.response.types';

export class AddToUserListResponse {
  @ApiProperty({
    default: 201
  })
  private statusCode: number;

  @ApiProperty({
    example: addToUserListResponseExample
  })
  private list: UserList;

  constructor(list: UserList, status?: number) {
    this.list = list
    this.statusCode = status || 201
  }

  build() {
    return {
      statusCode: this.statusCode,
      list: this.list
    }
  }
}
