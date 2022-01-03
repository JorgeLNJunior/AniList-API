import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength
} from 'class-validator'

import { IsYoutubeUrl } from '../decorators/isYoutubeUrl.decorator'

export class CreateAnimeDto {
  @ApiProperty({
    example: 'Attack on titan'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
      creatures called titans, forcing humans to hide in fear behind enormous concentric walls`
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  synopsis: string;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ'
  })
  @IsNotEmpty()
  @IsString()
  @IsYoutubeUrl()
  trailer: string;

  @ApiProperty({
    example: 75
  })
  @IsNotEmpty()
  @IsNumber()
  episodes: number;

  @ApiProperty({
    example: '2020-10-15'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd'
  })
  releaseDate: string;

  @ApiProperty({
    example: 'fall 2020'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(spring|summer|fall|winter)[" "][0-9]{4}$/, {
    message: '$property must be formatted as "season year"'
  })
  season: string;
}
