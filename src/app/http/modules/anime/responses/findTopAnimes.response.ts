import { ApiProperty } from '@nestjs/swagger'

import { Anime } from '../entities/anime.entity'
import { findAnimeResponseExample } from './types/anime.response.type';

export class FindTopAnimesResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: findAnimeResponseExample
  })
  private data: Anime[];

  constructor(animes: Anime[], status?: number) {
    this.data = animes
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
