import { ApiProperty } from '@nestjs/swagger'

export class DeleteUserResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    default: 'the user has been deleted'
  })
  private message: string;

  constructor (message?: string, status?: number) {
    this.message = message || 'the user has been deleted'
    this.statusCode = status || 200
  }

  build () {
    return {
      statusCode: this.statusCode,
      message: this.message
    }
  }
}
