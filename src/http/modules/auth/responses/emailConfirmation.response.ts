import { ApiProperty } from '@nestjs/swagger';

export class EmailConfirmationResponse {
  constructor(status?: number, message?: string) {
    this.status = status || 200;
    this.message = message || 'email confirmed';
  }

  @ApiProperty({ default: 'email confirmed' })
  private message: string;

  private status: number;

  build() {
    return { message: this.message };
  }
}
