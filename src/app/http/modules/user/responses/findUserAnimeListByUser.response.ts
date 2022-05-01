import { UserList } from '@http/modules/userList/entities/userList.entity';
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { ApiProperty } from '@nestjs/swagger'

import { findUserAnimeListByUserResponseExample } from './types/user.response.types';

export class FindUserAnimeListByUserResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: findUserAnimeListByUserResponseExample
  })
  private userAnimeList: UserList[];

  @ApiProperty({
    example: 20
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80
  })
  private readonly total: number;

  constructor(results: PaginationInterface<UserList>, status?: number) {
    this.userAnimeList = results.results
    this.total = results.total
    this.pageTotal = results.pageTotal
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      list: this.userAnimeList,
      pageTotal: this.pageTotal,
      total: this.total
    }
  }
}
