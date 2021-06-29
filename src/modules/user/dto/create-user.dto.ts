import { IsUserAlreadyExist } from '@modules/user/decorators/isUserAlreadyExist.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsUserAlreadyExist()
  email: string;

  @ApiProperty({
    example: 'rbaRDzJwbd',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}