import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength
} from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { IsYoutubeUrl } from '../decorators/isYoutubeUrl.decorator'

export class UpdateAnimeDto {
  @ApiProperty({
    example: 'Attack on titan'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string

  @ApiProperty({
    example: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
      creatures called titans, forcing humans to hide in fear behind enormous concentric walls`
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  synopsis?: string

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsYoutubeUrl()
  trailer?: string

  @ApiProperty({
    example: 75
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  episodes?: number

  @ApiProperty({
    example: '2020-10-15'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd'
  })
  releaseDate?: string

  @ApiProperty({
    example: 'fall 2020'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(spring|summer|fall|winter)[" "][0-9]{4}$/, {
    message: '$property must be formatted as "season year"'
  })
  season?: string

  @ApiProperty({
    example: 'action'
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  genre?: string
}
