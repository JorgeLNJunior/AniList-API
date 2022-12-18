import { IsOptional } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AnimeQuery {
  @ApiProperty({
    example: '6f693ea5-5739-4750-9e8c-0824f626198b',
    required: false
  })
  @IsOptional()
  uuid?: string

  @ApiProperty({
    example: 'Naruto',
    required: false
  })
  @IsOptional()
  title?: string

  @ApiProperty({
    example: 200,
    required: false
  })
  @IsOptional()
  episodes?: number

  @ApiProperty({
    example: 'action',
    required: false
  })
  @IsOptional()
  genre?: string

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
