import { ApiProperty } from '@nestjs/swagger';

import { PaginationInterface } from '../../../shared/pagination/pagination.interface';
import { Anime } from '../entities/anime.entity';
import { findAnimeResponseExample } from './types/anime.response.type';

export class FindAnimeResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: findAnimeResponseExample,
  })
  private data: Anime[];

  @ApiProperty({
    example: 20,
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80,
  })
  private readonly total: number;

  constructor(results: PaginationInterface<Anime>, status?: number) {
    this.statusCode = status || 200;
    this.data = results.data;
    this.total = results.total;
    this.pageTotal = results.pageTotal;
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      pageTotal: this.pageTotal,
      total: this.total,
    };
  }
}
