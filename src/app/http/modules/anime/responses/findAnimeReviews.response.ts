import { Review } from '@http/modules/review/entities/review.entity'
import { ApiProperty } from '@nestjs/swagger'

import { PaginationInterface } from '../../../shared/pagination/pagination.interface'
import { findReviewByAnimeResponseExample } from './types/anime.response.type'

export class FindReviewByAnimeResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number

  @ApiProperty({
    example: findReviewByAnimeResponseExample
  })
  private data: Review[]

  @ApiProperty({
    example: 20
  })
  private readonly pageTotal: number

  @ApiProperty({
    example: 80
  })
  private readonly total: number

  constructor(results: PaginationInterface<Review>, status?: number) {
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
