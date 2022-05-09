import { Review } from '@http/modules/review/entities/review.entity';
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { ApiProperty } from '@nestjs/swagger'

import { findUserReviewsResponseExample } from './types/user.response.types';

export class FindUserReviewsByUserResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: findUserReviewsResponseExample
  })
  private data: Review[];

  @ApiProperty({
    example: 20
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80
  })
  private readonly total: number;

  constructor(results: PaginationInterface<Review>, status?: number) {
    this.data = results.data
    this.total = results.total
    this.pageTotal = results.pageTotal
    this.statusCode = status || 200
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
