import { ApiProperty } from '@nestjs/swagger'

export class EmailActivationResponse {
  constructor(status?: number, message?: string) {
    this.status = status || 200
    this.message = message || 'email activated'
  }

  @ApiProperty({ default: 'email activated' })
  private message: string

  private status: number

  build() {
    return {
      statusCode: this.status,
      message: this.message
    }
  }
}
