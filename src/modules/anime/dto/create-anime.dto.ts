import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import { IsYoutubeUrl } from '../decorators/isYoutubeUrl.decorator';

export class CreateAnimeDto {
  @ApiProperty({
    example: 'Attack on titan',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
      creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  synopsis: string;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
  })
  @IsNotEmpty()
  @IsString()
  @IsYoutubeUrl()
  trailer: string;

  @ApiProperty({
    example: 75,
  })
  @IsNotEmpty()
  @IsNumber()
  episodes: number;
}
