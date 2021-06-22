import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterResponse } from './responses/register.response';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);

    return new RegisterResponse(user).build();
  }
}
