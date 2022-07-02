import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class UserQuery {
  @ApiProperty({
    example: '6f693ea5-5739-4750-9e8c-0824f626198b',
    required: false
  })
  @IsOptional()
  uuid?: string

  @ApiProperty({ example: 'user', required: false })
  @IsOptional()
  name?: string

  @ApiProperty({ example: 'user@mail.com', required: false })
  @IsOptional()
  email?: string

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  take?: number

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  skip?: number
}
