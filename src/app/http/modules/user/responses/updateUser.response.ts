import { ApiProperty } from '@nestjs/swagger'

import { User } from '../entities/user.entity'
import { updateUserResponseExample } from './types/user.response.types';

export class UpdateUserResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: updateUserResponseExample
  })
  private data: User;

  constructor(user: User, status?: number) {
    this.data = user
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
