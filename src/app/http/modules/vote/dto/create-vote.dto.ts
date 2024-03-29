import { IsNotEmpty, IsUUID } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateVoteDto {
  @ApiProperty({
    example: 'f590cfc9-66d7-4005-8505-e0c56b624e91'
  })
  @IsNotEmpty()
  @IsUUID()
  reviewUUID: string
}
