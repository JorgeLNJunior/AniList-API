import { PaginationInterface } from '@http/shared/pagination/pagination.interface';
import { ApiProperty } from '@nestjs/swagger'

import { UserAnimeList } from '../entities/userAnimeList.entity';
import { findUserAnimeListResponseExample } from './types/UserList.response.types'

export class FindUserAnimeListResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: findUserAnimeListResponseExample
  })
  private list: UserAnimeList[];

  @ApiProperty({
    example: 30
  })
  private total: number;

  @ApiProperty({
    example: 30
  })
  private pageTotal: number;

  constructor(result: PaginationInterface<UserAnimeList>, status?: number) {
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
