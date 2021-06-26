import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'user',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
