import { ApiProperty } from '@nestjs/swagger'

import { Review } from '../entities/review.entity'
import { updateReviewResponseExample } from './types/review.response.types';

export class UpdateReviewResponse {
  @ApiProperty({ default: 200 })
  private statusCode: number;

  @ApiProperty({
    example: updateReviewResponseExample
  })
  private data: Review;

  constructor(review: Review, status?: number) {
    this.data = review
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
