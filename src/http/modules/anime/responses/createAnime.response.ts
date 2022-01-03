import { ApiProperty } from '@nestjs/swagger'

import { Anime } from '../entities/anime.entity'

export class CreateAnimeResponse {
  @ApiProperty({
    default: 201
  })
  private statusCode: number;

  @ApiProperty({
    example: {
      uuid: '4f3ab4ae-7854-4720-9122-db5cad01f610',
      title: 'Attack on titan',
      synopsis: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
      creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
      cover: null,
      trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
      episodes: 75,
      releaseDate: '2020-10-15',
      season: 'fall 2020',
      createdAt: '2021-09-16 14:38:09',
      updatedAt: null
    }
  })
  private anime: Anime;

  constructor (anime: Anime, status?: number) {
    this.anime = anime
    this.statusCode = status || 201
  }

  build () {
    return {
      statusCode: this.statusCode,
      anime: this.anime
    }
  }
}
