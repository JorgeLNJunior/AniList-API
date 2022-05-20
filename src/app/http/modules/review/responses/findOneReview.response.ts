import { ApiProperty } from '@nestjs/swagger';

import { Review } from '../entities/review.entity';
import { findOneReviewResponseExample } from './types/review.response.types';

export class FindOneReviewResponse {
  @ApiProperty({ default: 200 })
  private statusCode: number;

  @ApiProperty({
    example: findOneReviewResponseExample,
  })
  private data: Review;

  constructor(result: Review, status?: number) {
    this.statusCode = status || 200;
    this.data = result;
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data,
    };
  }
}
