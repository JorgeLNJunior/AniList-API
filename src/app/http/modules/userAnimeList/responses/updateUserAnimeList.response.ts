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
  private list: UserAnimeList;

  constructor(list: UserAnimeList, status?: number) {
    this.list = list
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      list: this.list
    }
  }
}
