import { Vote } from '@http/modules/vote/entities/vote.entity'
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { ApiProperty } from '@nestjs/swagger'

import { findUserVotesResponseExample } from './types/user.response.types'

export class FindUserVotesByUserResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number

  @ApiProperty({
    example: findUserVotesResponseExample
  })
  private data: Vote[]

  @ApiProperty({
    example: 20
  })
  private readonly pageTotal: number

  @ApiProperty({
    example: 80
  })
  private readonly total: number

  constructor(results: PaginationInterface<Vote>, status?: number) {
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
