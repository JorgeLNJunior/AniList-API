import { ApiProperty } from '@nestjs/swagger';

import { Anime } from '../entities/anime.entity';

export class UpdateAnimeResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: {
      uuid: '4f3ab4ae-7854-4720-9122-db5cad01f610',
      title: 'Attack on titan',
      synopsis: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
      creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
      cover:
        'https://static.wikia.nocookie.net/shingekinokyojin/images/d/d8/Attack_on_Titan_Season_1.jpg/revision/latest?cb=20180601153334',
      trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
      episodes: 75,
      releaseDate: '2020-10-15',
    },
  })
  private anime: Anime;

  constructor(anime: Anime, status?: number) {
    this.anime = anime;
    this.statusCode = status || 200;
  }

  build() {
    return {
      statusCode: this.statusCode,
      anime: this.anime,
    };
  }
}
