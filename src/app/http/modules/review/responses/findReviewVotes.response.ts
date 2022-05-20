import { Vote } from '@http/modules/vote/entities/vote.entity';
import { PaginationInterface } from '@http/shared/pagination/pagination.interface';
import { ApiProperty } from '@nestjs/swagger';

import { findReviewVotesResponseExample } from './types/review.response.types';

export class FindReviewVotesResponse {
  @ApiProperty({ default: 200 })
  private statusCode: number;

  @ApiProperty({
    example: findReviewVotesResponseExample,
  })
  private data: Vote[];

  @ApiProperty({
    example: 20,
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80,
  })
  private readonly total: number;

  constructor(results: PaginationInterface<Vote>, status?: number) {
    this.statusCode = status || 200;
    this.data = results.data;
    this.pageTotal = results.pageTotal;
    this.total = results.total;
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      pageTotal: this.pageTotal,
      total: this.total,
    };
  }
}
