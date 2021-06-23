import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { BadRequestResponse } from '@shared/responses/badRequest.response';
import { TooManyRequestsResponse } from '@shared/responses/tooManyRequests.response';

import { AuthService } from './auth.service';
import { RegisterResponse } from './responses/register.response';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ description: 'OK', type: RegisterResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'Too Many Requests',
    type: TooManyRequestsResponse,
  })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);

    return new RegisterResponse(user).build();
  }
}
