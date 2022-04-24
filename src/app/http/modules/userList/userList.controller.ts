import { BadRequestResponse } from '@http/shared/responses/badRequest.response';
import { ForbiddenResponse } from '@http/shared/responses/forbidden.response';
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiTooManyRequestsResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AddToUserListDto } from './dto/addToUserList.dto';
import { UpdateUserListDto } from './dto/updateUserList.dto';
import { UserListModifyPermissionGuard } from './guards/userListModifyPermission.guard';
import { UserListQuery } from './query/userList.query.interface';
import { AddToUserListResponse } from './responses/addToUserList.response';
import { FindUserListResponse } from './responses/findUserList.response';
import { RemoveFromUserListResponse } from './responses/removeFromUserList.response';
import { UpdateUserListResponse } from './responses/updateUserList.response';
import { UserListService } from './userList.service';

@ApiBearerAuth()
@ApiTags('User List')
@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: UnauthorizedResponse
})
@ApiForbiddenResponse({
  description: 'Forbidden',
  type: ForbiddenResponse
})
@ApiTooManyRequestsResponse({
  description: 'Too Many Requests',
  type: TooManyRequestsResponse
})
@UseGuards(AuthGuard('jwt'))
@Controller('user-list')
export class UserListController {
  constructor(private readonly userListService: UserListService) { }

  @ApiCreatedResponse({ description: 'OK', type: AddToUserListResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'Add animes to user anime list' })
  @Post()
  async addToUserList(@Body() addToUserListDto: AddToUserListDto, @Req() req) {
    const list = await this.userListService.addToList(req.user.uuid, addToUserListDto);
    return new AddToUserListResponse(list).build()
  }

  @ApiCreatedResponse({ description: 'OK', type: FindUserListResponse })
  @ApiBadRequestResponse({
    description: 'Query validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'Find user anime lists' })
  @Get()
  async find(@Query() query: UserListQuery) {
    const list = await this.userListService.find(query);
    return new FindUserListResponse(list).build()
  }

  @ApiOkResponse({ description: 'OK', type: UpdateUserListResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'Update user anime list' })
  @UseGuards(UserListModifyPermissionGuard)
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateUserListDto: UpdateUserListDto) {
    const list = await this.userListService.update(uuid, updateUserListDto);
    return new UpdateUserListResponse(list).build()
  }

  @ApiOkResponse({ description: 'OK', type: RemoveFromUserListResponse })
  @UseGuards(UserListModifyPermissionGuard)
  @ApiOperation({ summary: 'Remove animes from user anime list' })
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.userListService.remove(uuid);
    return new RemoveFromUserListResponse()
  }
}
