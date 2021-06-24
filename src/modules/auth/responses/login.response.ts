import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  constructor(token: string, status?: number) {
    this.token = token;
    this.status = status || 200;
  }

  @ApiProperty({ default: 200 })
  private status: number;

  @ApiProperty({
    example: 'eyJhbGcipXVCJ9.eyJ1dWl2MjQ2MzA0Njl9.d0OzbfzTMGYYL',
  })
  private token: string;

  build() {
    return {
      statusCode: this.status,
      token: this.token,
    };
  }
}
