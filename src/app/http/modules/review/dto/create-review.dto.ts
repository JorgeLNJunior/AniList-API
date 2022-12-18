import { IsValidAnimeUUID } from '@http/modules/anime/decorators/isValidAnimeUUID.decorator'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min
} from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateReviewDto {
  @ApiProperty({ example: 'naruto' })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({ example: 'Proin at pulvinar enim, eget vulputate sem...' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  description: string

  @ApiProperty({ example: 4, maxLength: 5, minLength: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number

  @ApiProperty({
    example: '1c12dd97-839e-4058-91f0-e75934b02d52',
    description: 'anime uuid'
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  @IsValidAnimeUUID()
  animeUUID: string
}
