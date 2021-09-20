import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class ReviewQuery {
  @ApiProperty({
    example: '6f693ea5-5739-4750-9e8c-0824f626198b',
    required: false
  })
  @IsOptional()
  uuid?: string;

  @ApiProperty({
    example: '6f693ea5-5739-4750-9e8c-0824f626198b',
    required: false
  })
  @IsOptional()
  animeUuid?: string;

  @ApiProperty({
    example: '6f693ea5-5739-4750-9e8c-0824f626198b',
    required: false
  })
  @IsOptional()
  userUuid?: string;

  @ApiProperty({
    example: 20,
    required: false
  })
  @IsOptional()
  take?: number;

  @ApiProperty({
    example: 5,
    required: false
  })
  @IsOptional()
  skip?: number;
}
