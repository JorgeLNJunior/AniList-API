import { ApiProperty } from '@nestjs/swagger';

import { PaginationInterface } from '../../../shared/pagination/pagination.interface';
import { Anime } from '../entities/anime.entity';

export class FindAnimeResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: {
      results: [
        {
          uuid: '4f3ab4ae-7854-4720-9122-db5cad01f610',
          title: 'Attack on titan',
          synopsis: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
        creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
          cover: null,
          trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
          episodes: 75,
          rating: 4,
          reviews: 2,
          releaseDate: '2020-10-15',
          createdAt: '2021-09-16 14:38:09',
          updatedAt: null,
        },
      ],
      pageTotal: 10,
      total: 40,
    },
  })
  private animes: PaginationInterface<Anime>;

  constructor(animes: PaginationInterface<Anime>, status?: number) {
    this.animes = animes;
    this.statusCode = status || 200;
  }

  build() {
    return {
      statusCode: this.statusCode,
      ...this.animes,
    };
  }
}
