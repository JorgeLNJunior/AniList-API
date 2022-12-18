import { IsOptional } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class VotesByUserQuery {
  @ApiProperty({
    example: 'bfeb54eb-8785-4eca-a5fd-5ac742cfdaf4',
    required: false
  })
  @IsOptional()
  reviewUUID?: string

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  take?: number

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  skip?: number
}
