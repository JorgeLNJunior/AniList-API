import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

import { AnimeStatus } from "../types/animeStatus.enum";

export class UpdateUserListDto {
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
}
