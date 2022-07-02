import { ApiProperty } from '@nestjs/swagger'

export class TooManyRequestsResponse {
  @ApiProperty({
    default: 429
  })
  statusCode: number

  @ApiProperty({
    default: 'ThrottlerException: Too Many Requests'
  })
  message: string
}
