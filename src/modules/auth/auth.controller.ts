import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestResponse } from '@shared/responses/badRequest.response';
import { TooManyRequestsResponse } from '@shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@shared/responses/unauthorized.response';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './responses/login.response';
import { RegisterResponse } from './responses/register.response';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: 'OK', type: RegisterResponse })
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

  @ApiOkResponse({ description: 'OK', type: LoginResponse })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: UnauthorizedResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'Too Many Requests',
    type: TooManyRequestsResponse,
  })
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req) {
    const token = await this.authService.login(req.user);
    return new LoginResponse(token).build();
  }
}
