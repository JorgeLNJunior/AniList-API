import { ApiProperty } from '@nestjs/swagger'

import { PaginationInterface } from '../../../shared/pagination/pagination.interface'
import { Anime } from '../entities/anime.entity'

export class FindAnimeResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example:
       [
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
           season: 'fall 2020',
           genre: 'action',
           createdAt: '2021-09-16 14:38:09',
           updatedAt: null
         }
       ]
  })
  private animes: PaginationInterface<Anime>;

  @ApiProperty({
    example: 20
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80
  })
  private readonly total: number;

  constructor (animes: PaginationInterface<Anime>, status?: number) {
    this.animes = animes
    this.statusCode = status || 200
  }

  build () {
    return {
      statusCode: this.statusCode,
      animes: this.animes.results,
      pageTotal: this.animes.pageTotal,
      total: this.animes.total
    }
  }
}
