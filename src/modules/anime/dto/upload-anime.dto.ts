import { ApiProperty } from '@nestjs/swagger';

export class UploadAnimeDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  cover: any;
}
