import { ApiProperty } from '@nestjs/swagger'

export class BadRequestResponse {
  @ApiProperty({
    default: 400
  })
  statusCode: number;

  @ApiProperty({
    example: ['error message']
  })
  message: string[];

  @ApiProperty({
    default: 'Bad Request'
  })
  error: string;
}
