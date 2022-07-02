import { ApiProperty } from '@nestjs/swagger'

import { UserAnimeList } from '../entities/userAnimeList.entity'
import { addToUserAnimeListResponseExample } from './types/UserList.response.types'

export class AddToUserAnimeListResponse {
  @ApiProperty({
    default: 201
  })
  private statusCode: number

  @ApiProperty({
    example: addToUserAnimeListResponseExample
  })
  private data: UserAnimeList

  constructor(list: UserAnimeList, status?: number) {
    this.data = list
    this.statusCode = status || 201
  }

  build() {
    return {
      statusCode: this.statusCode,
      data: this.data
    }
  }
}
