import { BadRequestResponse } from '@http/shared/responses/badRequest.response'
import { ForbiddenResponse } from '@http/shared/responses/forbidden.response'
import { MessageResponse } from '@http/shared/responses/message.response'
import { NotFoundResponse } from '@http/shared/responses/notFound.response'
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response'
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { UpdateUserDto } from './dto/update-user.dto'
import { UploadUserDto } from './dto/upload-user.dto'
import { UserModifyPermissionGuard } from './guards/userModifyPermission.guard'
import { ReviewsByUserQuery } from './query/review/reviewsByUser.query.interface'
import { UserQuery } from './query/user.query.interface'
import { UserAnimeListByUserQuery } from './query/userAnimeListByUser.query.interface'
import { VotesByUserQuery } from './query/votes/votesByUser.query.interface'
import { DeleteUserResponse } from './responses/deleteUser.response'
import { FindOneUserResponse } from './responses/findOneUser.response'
import { FindUserAnimeListByUserResponse } from './responses/findUserAnimeListByUser.response'
import { FindUserReviewsByUserResponse } from './responses/findUserReviews.response'
import { FindUsersResponse } from './responses/findUsers.response'
import { FindUserVotesByUserResponse } from './responses/findUserVotes.response'
import { UpdateUserResponse } from './responses/updateUser.response'
import { UserService } from './user.service'

@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: UnauthorizedResponse
})
@ApiTooManyRequestsResponse({
  description: 'Too Many Requests',
  type: TooManyRequestsResponse
})
@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ description: 'OK', type: FindUsersResponse })
  @ApiOperation({ summary: 'Find users' })
  @Get()
  async find(@Query() query: UserQuery) {
    const users = await this.userService.find(query)
    return new FindUsersResponse(users).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindOneUserResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundResponse })
  @ApiOperation({ summary: 'Find an user' })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const user = await this.userService.findOne(uuid)
    return new FindOneUserResponse(user).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindUserAnimeListByUserResponse })
  @ApiOperation({ summary: 'Get user anime list' })
  @Get(':uuid/list')
  async getUserAnimeList(
    @Param('uuid') userUUID: string,
    @Query() query: UserAnimeListByUserQuery
  ) {
    const results = await this.userService.getUserAnimeList(userUUID, query)
    return new FindUserAnimeListByUserResponse(results).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindUserReviewsByUserResponse })
  @ApiOperation({ summary: 'Get user reviews' })
  @Get(':uuid/reviews')
  async getUserReviews(
    @Param('uuid') userUUID: string,
    @Query() query: ReviewsByUserQuery
  ) {
    const results = await this.userService.getUserReviews(userUUID, query)
    return new FindUserReviewsByUserResponse(results).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindUserVotesByUserResponse })
  @ApiOperation({ summary: 'Get user votes' })
  @Get(':uuid/votes')
  async getUserVotes(
    @Param('uuid') userUUID: string,
    @Query() query: VotesByUserQuery
  ) {
    const results = await this.userService.getUserVotes(userUUID, query)
    return new FindUserVotesByUserResponse(results).build()
  }

  @ApiOkResponse({ description: 'OK', type: UpdateUserResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenResponse
  })
  @ApiOperation({ summary: 'Update users' })
  @UseGuards(new UserModifyPermissionGuard())
  @Patch(':uuid')
  async update(
    @Body() updateuserDto: UpdateUserDto,
    @Param('uuid') uuid: string
  ) {
    const user = await this.userService.update(uuid, updateuserDto)
    return new UpdateUserResponse(user).build()
  }

  @ApiOkResponse({ description: 'OK', type: DeleteUserResponse })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenResponse
  })
  @ApiOperation({ summary: 'Delete users' })
  @UseGuards(new UserModifyPermissionGuard())
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.userService.delete(uuid)
    return new DeleteUserResponse().build()
  }

  @ApiOkResponse({ description: 'OK', type: MessageResponse })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenResponse
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadUserDto
  })
  @ApiOperation({ summary: 'Upload user avatar' })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('avatar', { limits: { fileSize: 3000000 }, dest: '.temp' })
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const { uuid } = req.user
    const message = await this.userService.upload(uuid, file.path)
    return { statusCode: 200, message: message }
  }
}
