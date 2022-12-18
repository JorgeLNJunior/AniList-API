import { IsIn, IsNotEmpty, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { AnimeStatus } from '../types/animeStatus.enum'

export class UpdateUserAnimeListDto {
  @ApiProperty({
    example: 'plan_to_watch',
    enum: AnimeStatus
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(AnimeStatus), {
    message:
      'invalid anime status, allowed values: "watching", "dropped", "completed" and "plan_to_watch"'
  })
  status: AnimeStatus
}
