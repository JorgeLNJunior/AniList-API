import { ApiProperty } from '@nestjs/swagger'

import { UserList } from '../entities/userList.entity';
import { updateUserListResponseExample } from './types/UserList.response.types';

export class UpdateUserListResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: updateUserListResponseExample
  })
  private list: UserList;

  constructor(list: UserList, status?: number) {
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
