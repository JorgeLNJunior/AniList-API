import { ApiProperty } from '@nestjs/swagger';

import { UserAnimeList } from '../entities/userAnimeList.entity';
import { findOneUserAnimeListResponseExample } from './types/UserList.response.types';

export class FindOneUserAnimeListResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: findOneUserAnimeListResponseExample,
  })
  private data: UserAnimeList;

  constructor(result: UserAnimeList, status?: number) {
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
