import { ApiProperty } from '@nestjs/swagger'

export class UnauthorizedResponse {
  @ApiProperty({
    default: 401
  })
  statusCode: number

  @ApiProperty({
    example: 'invalid credentials'
  })
  message: string

  @ApiProperty({
    default: 'Unauthorized'
  })
  error: string
}
