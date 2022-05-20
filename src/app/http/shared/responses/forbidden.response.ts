import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponse {
  @ApiProperty({
    default: 403,
  })
  statusCode: number;

  @ApiProperty({
    example: 'forbidden',
  })
  message: string;

  @ApiProperty({
    default: 'Forbidden',
  })
  error: string;
}
