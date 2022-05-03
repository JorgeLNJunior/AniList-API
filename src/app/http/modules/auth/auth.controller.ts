import { RegisterDto } from '@http/modules/auth/dto/register.dto'
import { BadRequestResponse } from '@http/shared/responses/badRequest.response'
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response'
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response'
import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { IsEmailActiveGuard } from './guard/isEmailActive.guard'
import { EmailActivationResponse } from './responses/emailActivation.response'
import { LoginResponse } from './responses/login.response'
import { RegisterResponse } from './responses/register.response'

@ApiTags('Auth')
@ApiTooManyRequestsResponse({
  description: 'Too Many Requests',
  type: TooManyRequestsResponse
})
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiCreatedResponse({ description: 'OK', type: RegisterResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'User register' })
  @Post('register')
  async create(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto)

    return new RegisterResponse(user).build()
  }

  @ApiOkResponse({ description: 'OK', type: LoginResponse })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: UnauthorizedResponse
  })
  @ApiOperation({ summary: 'User auth token' })
  @UseGuards(AuthGuard('local'), IsEmailActiveGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Body() _dto: LoginDto, @Req() req) {
    const token = await this.authService.login(req.user)
    return new LoginResponse(token).build()
  }

  @ApiCreatedResponse({ description: 'OK', type: EmailActivationResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'User account activation' })
  @Post('activate/:token')
  async activate(@Param('token') token: string) {
    await this.authService.activateEmail(token)
    return new EmailActivationResponse().build()
  }
}
