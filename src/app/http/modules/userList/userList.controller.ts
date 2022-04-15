import { BadRequestResponse } from '@http/shared/responses/badRequest.response';
import { ForbiddenResponse } from '@http/shared/responses/forbidden.response';
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiTooManyRequestsResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AddToUserListDto } from './dto/addToUserList.dto';
import { UpdateUserListDto } from './dto/updateUserList.dto';
import { AddToUserListResponse } from './responses/addToUserList.response';
import { UpdateUserListResponse } from './responses/updateUserList.response';
import { UserListService } from './userList.service';

@ApiBearerAuth()
@ApiTags('User Lists')
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
@Controller('user-lists')
export class UserListController {
  constructor(private readonly userListService: UserListService) { }

  @ApiCreatedResponse({ description: 'OK', type: AddToUserListResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @Post()
  async addToUserList(@Body() addToUserListDto: AddToUserListDto, @Req() req) {
    const list = await this.userListService.addToList(req.user.uuid, addToUserListDto);
    return new AddToUserListResponse(list).build()
  }

  @Get()
  findAll() {
    return this.userListService.findAll();
  }

  @ApiCreatedResponse({ description: 'OK', type: UpdateUserListResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateUserListDto: UpdateUserListDto) {
    const list = await this.userListService.update(uuid, updateUserListDto);
    return new UpdateUserListResponse(list).build()
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userListService.remove(+id);
  }
}
