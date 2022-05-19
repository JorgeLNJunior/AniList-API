import { BadRequestResponse } from '@http/shared/responses/badRequest.response';
import { ForbiddenResponse } from '@http/shared/responses/forbidden.response';
import { NotFoundResponse } from '@http/shared/responses/notFound.response';
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiTooManyRequestsResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AddToUserAnimeListDto } from './dto/addToUserAnimeList.dto';
import { UpdateUserAnimeListDto } from './dto/updateUserAnimeList.dto';
import { IsAlreadyInUserAnimeListGuard } from './guards/isAlreadyInUserAnimeList.guard';
import { UserAnimeListModifyPermissionGuard } from './guards/userAnimeListModifyPermission.guard';
import { UserAnimeListQuery } from './query/userAnimeList.query.interface';
import { AddToUserAnimeListResponse } from './responses/addToUserAnimeList.response';
import { FindOneUserAnimeListResponse } from './responses/findOneUserAnimeList.response';
import { FindUserAnimeListResponse } from './responses/findUserAnimeList.response';
import { RemoveFromUserAnimeListResponse } from './responses/removeFromUserAnimeList.response';
import { UpdateUserAnimeListResponse } from './responses/updateUserAnimeList.response';
import { UserAnimeListService } from './userAnimeList.service';

@ApiBearerAuth()
@ApiTags('User Anime List')
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
@Controller('lists')
export class UserAnimeListController {
  constructor(private readonly userAnimeListService: UserAnimeListService) { }

  @ApiCreatedResponse({ description: 'OK', type: AddToUserAnimeListResponse })
  @ApiOperation({ summary: 'Add animes to user anime list' })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @UseGuards(IsAlreadyInUserAnimeListGuard) // this validation can't be done at DTO layer
  @Post()
  async addToUserList(@Req() req, @Body() dto: AddToUserAnimeListDto) {
    const list = await this.userAnimeListService.addToList(req.user.uuid, dto);
    return new AddToUserAnimeListResponse(list).build()
  }

  @ApiCreatedResponse({ description: 'OK', type: FindUserAnimeListResponse })
  @ApiOperation({ summary: 'Find user anime list' })
  @Get()
  async find(@Query() query: UserAnimeListQuery) {
    const list = await this.userAnimeListService.find(query);
    return new FindUserAnimeListResponse(list).build()
  }

  @ApiCreatedResponse({ description: 'OK', type: FindOneUserAnimeListResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundResponse })
  @ApiOperation({ summary: 'Find user anime list' })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const list = await this.userAnimeListService.findOne(uuid);
    return new FindOneUserAnimeListResponse(list).build()
  }

  @ApiOkResponse({ description: 'OK', type: UpdateUserAnimeListResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'Update user anime list' })
  @UseGuards(UserAnimeListModifyPermissionGuard)
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() dto: UpdateUserAnimeListDto) {
    const list = await this.userAnimeListService.update(uuid, dto);
    return new UpdateUserAnimeListResponse(list).build()
  }

  @ApiOkResponse({ description: 'OK', type: RemoveFromUserAnimeListResponse })
  @UseGuards(UserAnimeListModifyPermissionGuard)
  @ApiOperation({ summary: 'Remove animes from user anime list' })
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.userAnimeListService.remove(uuid);
    return new RemoveFromUserAnimeListResponse().build()
  }
}
