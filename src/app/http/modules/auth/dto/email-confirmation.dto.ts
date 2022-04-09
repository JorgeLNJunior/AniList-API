import { ApiProperty } from '@nestjs/swagger'
import { IsJWT } from 'class-validator'

export class EmailConfirmationDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5.eyJ1dW' })
  @IsJWT()
  token: string;
}
