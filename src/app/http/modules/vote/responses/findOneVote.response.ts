import { ApiProperty } from '@nestjs/swagger';

import { Vote } from '../entities/vote.entity';
import { findOneVoteResponseExample } from './types/vote.response.types';

export class FindOneVoteResponse {
  @ApiProperty({ default: 200 })
  private statusCode: number;

  @ApiProperty({
    example: findOneVoteResponseExample,
  })
  private data: Vote;

  constructor(result: Vote, status?: number) {
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
