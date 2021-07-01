import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { IsYoutubeUrl } from '../decorators/isYoutubeUrl.decorator';

export class UpdateAnimeDto {
  @ApiProperty({
    example: 'Attack on titan',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
      creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  synopsis: string;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsYoutubeUrl()
  trailer: string;

  @ApiProperty({
    example: 75,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  episodes: number;
}
