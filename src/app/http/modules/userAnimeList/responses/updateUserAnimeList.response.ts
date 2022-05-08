import { ApiProperty } from '@nestjs/swagger'

import { UserAnimeList } from '../entities/userAnimeList.entity';
import { updateUserAnimeListResponseExample } from './types/UserList.response.types';

export class UpdateUserAnimeListResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: updateUserAnimeListResponseExample
  })
  private data: UserAnimeList;

  constructor(list: UserAnimeList, status?: number) {
    this.data = list
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
