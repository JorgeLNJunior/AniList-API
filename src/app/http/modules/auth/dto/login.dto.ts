import { IsOptional } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    example: 'user@mail.com'
  })
  @IsOptional()
  email: string

  @IsOptional()
  @ApiProperty({
    example: '2RKGXesY13'
  })
  password: string
}
