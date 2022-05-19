import { ApiProperty } from '@nestjs/swagger'

export class NotFoundResponse {
  @ApiProperty({
    default: 400
  })
  statusCode: number;

  @ApiProperty({
    example: 'resource x not found'
  })
  message: string;

  @ApiProperty({
    default: 'Not Found'
  })
  error: string;
}
