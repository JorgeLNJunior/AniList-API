import { IsOptional } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ReviewsByAnimeQuery {
  @ApiProperty({
    example: 'awesome',
    required: false
  })
  @IsOptional()
  title?: string

  @ApiProperty({
    example: 200,
    required: false
  })
  @IsOptional()
  rating?: number

  @ApiProperty({
    example: 2,
    required: false
  })
  @IsOptional()
  take?: number

  @ApiProperty({
    example: 0,
    required: false
  })
  @IsOptional()
  skip?: number
}
