import { ApiProperty } from '@nestjs/swagger'

export class MessageResponse {
  @ApiProperty({
    default: 200
  })
  statusCode: number

  @ApiProperty({
    example: 'Some message'
  })
  message: string
}
