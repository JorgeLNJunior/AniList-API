import { PaginationInterface } from '@http/shared/pagination/pagination.interface';
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

  @ApiProperty({
    example: 30
  })
  private total: number;

  @ApiProperty({
    example: 30
  })
  private pageTotal: number;

  constructor(result: PaginationInterface<UserList>, status?: number) {
    this.statusCode = status || 200
    this.list = result.results
    this.total = result.total
    this.pageTotal = result.pageTotal
  }

  build() {
    return {
      statusCode: this.statusCode,
      list: this.list,
      pageTotal: this.pageTotal,
      total: this.total
    }
  }
}
