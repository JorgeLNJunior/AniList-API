import { IsValidAnimeUUID } from "@http/modules/anime/decorators/isValidAnimeUUID.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString, IsUUID } from "class-validator";

import { AnimeStatus } from "../types/animeStatus.enum";

export class AddToUserAnimeListDto {
  @ApiProperty({
    example: 'plan_to_watch',
    enum: AnimeStatus
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(
    Object.values(AnimeStatus),
    {
      message: 'invalid anime status, allowed values: "watching", "dropped", "completed" and "plan_to_watch"'
    }
  )
  status: AnimeStatus;

  @ApiProperty({
    example: '157be479-be2f-4600-9c87-f3fdd6697741'
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @IsValidAnimeUUID()
  animeUUID: string;
}
