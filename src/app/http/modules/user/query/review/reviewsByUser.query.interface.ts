import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ReviewsByUserQuery {
  @ApiProperty({ example: 'masterpiece', required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 'bfeb54eb-8785-4eca-a5fd-5ac742cfdaf4',
    required: false,
  })
  @IsOptional()
  animeUUID?: string;

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  take?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  skip?: number;
}
