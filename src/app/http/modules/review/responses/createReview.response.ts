import { ApiProperty } from '@nestjs/swagger'

import { Review } from '../entities/review.entity'
import { createReviewResponseExample } from './types/review.response.types';

export class CreateReviewResponse {
  @ApiProperty({ default: 201 })
  private statusCode: number;

  @ApiProperty({
    example: createReviewResponseExample
  })
  private data: Review;

  constructor(review: Review, status?: number) {
    this.data = review
    this.statusCode = status || 201
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
