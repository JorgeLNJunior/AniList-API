import { ApiProperty } from '@nestjs/swagger';

export class UploadUserDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;
}
