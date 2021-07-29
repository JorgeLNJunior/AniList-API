import { ApiProperty } from '@nestjs/swagger';

import { Anime } from '../entities/anime.entity';

export class FindAnimeResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: [
      {
        uuid: '4f3ab4ae-7854-4720-9122-db5cad01f610',
        title: 'Attack on titan',
        synopsis: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
      creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
        cover: null,
        trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
        episodes: 75,
        rating: 4,
      },
    ],
  })
  private animes: Anime[];

  constructor(animes: Anime[], status?: number) {
    this.animes = animes;
    this.statusCode = status || 200;
  }

  build() {
    return {
      statusCode: this.statusCode,
      animes: this.animes,
    };
  }
}
