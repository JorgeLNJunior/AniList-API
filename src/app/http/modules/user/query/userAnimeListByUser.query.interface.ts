import { AnimeStatus } from '@http/modules/userAnimeList/types/animeStatus.enum'
import { IsOptional } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserAnimeListByUserQuery {
  @ApiProperty({
    example: '6f693ea5-5739-4750-9e8c-0824f626198b',
    required: false
  })
  @IsOptional()
  uuid?: string

  @ApiProperty({
    example: '6f693ea5-5739-4750-9e8c-0824f626198b',
    required: false
  })
  @IsOptional()
  animeUUID?: string

  @ApiProperty({ example: AnimeStatus.COMPLETED, required: false })
  @IsOptional()
  status?: AnimeStatus

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  take?: number

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  skip?: number
}
