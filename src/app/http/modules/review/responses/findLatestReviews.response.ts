import { ApiProperty } from '@nestjs/swagger'

import { Review } from '../entities/review.entity'
import { findReviewResponseExample } from './types/review.response.types'

export class FindLatestReviewsResponse {
  @ApiProperty({ default: 200 })
  private statusCode: number

  @ApiProperty({
    example: findReviewResponseExample
  })
  private data: Review[]

  constructor(results: Review[], status?: number) {
    this.statusCode = status || 200
    this.data = results
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
