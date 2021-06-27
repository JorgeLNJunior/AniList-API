import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateAnimeDto {
  @ApiProperty({
    example: 'Attack on titan',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
      creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
  })
  @IsString()
  @MaxLength(1000)
  synopsis: string;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
  })
  @IsString()
  trailer: string;

  @ApiProperty({
    example: 75,
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  episodes: number;
}
