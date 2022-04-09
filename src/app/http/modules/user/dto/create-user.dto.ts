import { IsUserAlreadyExist } from '@http/modules/user/decorators/isUserAlreadyExist.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

import { IsNotForbiddenName } from '../decorators/isNotForbiddenName.decorator'

export class CreateUserDto {
  @ApiProperty({
    example: 'user'
  })
  @IsNotEmpty()
  @IsString()
  @IsNotForbiddenName()
  name: string;

  @ApiProperty({
    example: 'user@mail.com'
  })
  @IsNotEmpty()
  @IsEmail()
  @IsUserAlreadyExist()
  email: string;

  @ApiProperty({
    example: 'rbaRDzJwbd'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
