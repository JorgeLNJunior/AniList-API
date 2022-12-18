import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiProperty({
    example: 'user'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string
}
