import { ApiProperty } from '@nestjs/swagger'

export class DeleteVoteResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number

  @ApiProperty({
    default: 'the vote has been deleted'
  })
  private message: string

  constructor(message?: string, status?: number) {
    this.message = message || 'the vote has been deleted'
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      message: this.message
    }
  }
}
