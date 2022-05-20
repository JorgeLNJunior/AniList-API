import { ApiProperty } from '@nestjs/swagger';

import { Anime } from '../entities/anime.entity';
import { createAnimeResponseExample } from './types/anime.response.type';

export class CreateAnimeResponse {
  @ApiProperty({
    default: 201,
  })
  private statusCode: number;

  @ApiProperty({
    example: createAnimeResponseExample,
  })
  private data: Anime;

  constructor(anime: Anime, status?: number) {
    this.data = anime;
    this.statusCode = status || 201;
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data,
    };
  }
}
