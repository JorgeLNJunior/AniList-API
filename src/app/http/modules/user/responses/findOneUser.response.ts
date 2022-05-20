import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';
import { findOneUserResponseExample } from './types/user.response.types';

export class FindOneUserResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: findOneUserResponseExample,
  })
  private data: User;

  constructor(result: User, status?: number) {
    this.statusCode = status || 200;
    this.data = result;
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data,
    };
  }
}
