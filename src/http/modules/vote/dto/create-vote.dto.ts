import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateVoteDto {
  @IsNotEmpty()
  @IsUUID()
  reviewUuid: string;
}
