import { ApiProperty } from '@nestjs/swagger'

import { UserAnimeList } from '../entities/userAnimeList.entity';
import { addToUserAnimeListResponseExample } from './types/UserList.response.types';

export class AddToUserAnimeListResponse {
  @ApiProperty({
    default: 201
  })
  private statusCode: number;

  @ApiProperty({
    example: addToUserAnimeListResponseExample
  })
  private list: UserAnimeList;

  constructor(list: UserAnimeList, status?: number) {
    this.list = list
    this.statusCode = status || 201
  }

  build() {
    return {
      statusCode: this.statusCode,
      list: this.list
    }
  }
}
