import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { ApiProperty } from '@nestjs/swagger'

import { UserAnimeList } from '../entities/userAnimeList.entity'
import { findUserAnimeListResponseExample } from './types/UserList.response.types'

export class FindUserAnimeListResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number

  @ApiProperty({
    example: findUserAnimeListResponseExample
  })
  private data: UserAnimeList[]

  @ApiProperty({
    example: 30
  })
  private total: number

  @ApiProperty({
    example: 30
  })
  private pageTotal: number

  constructor(results: PaginationInterface<UserAnimeList>, status?: number) {
    this.statusCode = status || 200
    this.data = results.data
    this.total = results.total
    this.pageTotal = results.pageTotal
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      pageTotal: this.pageTotal,
      total: this.total
    }
  }
}
