import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestResponse } from '@shared/responses/badRequest.response';
import { ForbiddenResponse } from '@shared/responses/forbidden.response';
import { TooManyRequestsResponse } from '@shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@shared/responses/unauthorized.response';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserQuery } from './query/user.query.interface';
import { FindUsersResponse } from './responses/findUsers.response';
import { UpdateUserResponse } from './responses/updateUser.response';
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

  @ApiOkResponse({ description: 'OK', type: UpdateUserResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: UnauthorizedResponse,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'Too Many Requests',
    type: TooManyRequestsResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:uuid')
  async update(
    @Body() updateuserDto: UpdateUserDto,
    @Param('uuid') uuid: string,
    @Req() req,
  ) {
    if (req.user.uuid !== uuid) throw new ForbiddenException();
    const user = await this.userService.update(uuid, updateuserDto);
    return new UpdateUserResponse(user).build();
  }
}
