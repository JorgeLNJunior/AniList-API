import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { ApiProperty } from '@nestjs/swagger'

import { Vote } from '../entities/vote.entity';
import { findVoteResponseExample } from './types/vote.response.types';

export class FindVoteResponse {
  @ApiProperty({ default: 200 })
  private statusCode: number;

  @ApiProperty({
    example: findVoteResponseExample
  })
  private data: Vote[];

  @ApiProperty({
    example: 20
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80
  })
  private readonly total: number;

  constructor(results: PaginationInterface<Vote>, status?: number) {
    this.statusCode = status || 200
    this.data = results.data
    this.pageTotal = results.pageTotal
    this.total = results.total
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
