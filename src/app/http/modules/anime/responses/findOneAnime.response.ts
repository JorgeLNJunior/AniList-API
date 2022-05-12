import { ApiProperty } from '@nestjs/swagger'

import { Anime } from '../entities/anime.entity';
import { findOneAnimeResponseExample } from './types/anime.response.type';

export class FindOneAnimeResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: findOneAnimeResponseExample
  })
  private data: Anime;

  constructor(anime: Anime, status?: number) {
    this.statusCode = status || 200
    this.data = anime
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
