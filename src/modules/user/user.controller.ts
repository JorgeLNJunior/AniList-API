import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TooManyRequestsResponse } from '@shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@shared/responses/unauthorized.response';

import { UserQuery } from './query/user.query.interface';
import { FindUsersResponse } from './responses/findUsers.response';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: 'OK', type: FindUsersResponse })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: UnauthorizedResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'Too Many Requests',
    type: TooManyRequestsResponse,
  })
  @ApiQuery({ type: UserQuery })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async find(@Query() query: UserQuery) {
    const users = await this.userService.find(query);
    return new FindUsersResponse(users).build();
  }
}
