import { ApiProperty } from '@nestjs/swagger'

import { Vote } from '../entities/vote.entity'
import { createVoteResponseExample } from './types/vote.response.types'

export class CreateVoteResponse {
  @ApiProperty({
    default: 201
  })
  private statusCode: number

  @ApiProperty({
    example: createVoteResponseExample
  })
  private data: Vote

  constructor(vote: Vote, status?: number) {
    this.data = vote
    this.statusCode = status || 201
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
