import { ApiProperty } from '@nestjs/swagger'

export class RemoveFromUserAnimeListResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number

  @ApiProperty({
    default: 'the anime has been removed from your list'
  })
  private message: string

  constructor(message?: string, status?: number) {
    this.message = message || 'the anime has been removed from your list'
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      message: this.message
    }
  }
}
