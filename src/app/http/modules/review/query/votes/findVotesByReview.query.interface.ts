import { IsOptional } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FindVotesByReviewQuery {
  @ApiProperty({
    example: 20,
    required: false
  })
  @IsOptional()
  take?: number

  @ApiProperty({
    example: 5,
    required: false
  })
  @IsOptional()
  skip?: number
}
