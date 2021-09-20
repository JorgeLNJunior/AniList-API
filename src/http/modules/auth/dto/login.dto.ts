import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    example: 'user@mail.com'
  })
  @IsOptional()
  email: string;

  @IsOptional()
  @ApiProperty({
    example: '2RKGXesY13'
  })
  password: string;
}
