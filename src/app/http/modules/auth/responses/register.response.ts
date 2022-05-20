import { User } from '@http/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

import { registerResponseExample } from './types/auth.response.types';

export class RegisterResponse {
  @ApiProperty({ default: 201 })
  private status: number;

  @ApiProperty({ default: 'please confirm your email address' })
  private message: string;

  @ApiProperty({
    example: registerResponseExample,
  })
  private data: User;

  constructor(user: User, status?: number, message?: string) {
    this.data = user;
    this.status = status || 201;
    this.message = message || 'please confirm your email address';
  }

  build() {
    return {
      statusCode: this.status,
      data: this.data,
      message: this.message,
    };
  }
}
