import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min
} from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateReviewDto {
  @ApiProperty({ example: 'naruto' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({ example: 'Proin at pulvinar enim, eget vulputate sem...' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  description: string

  @ApiProperty({ example: 4, maxLength: 5, minLength: 1 })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number
}
