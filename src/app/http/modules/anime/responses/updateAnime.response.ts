import { ApiProperty } from '@nestjs/swagger';

import { Anime } from '../entities/anime.entity';
import { updateAnimeResponseExample } from './types/anime.response.type';

export class UpdateAnimeResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: updateAnimeResponseExample,
  })
  private data: Anime;

  constructor(anime: Anime, status?: number) {
    this.data = anime;
    this.statusCode = status || 200;
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data,
    };
  }
}
