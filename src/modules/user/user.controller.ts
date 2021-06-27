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
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { UploadUserDto } from './dto/upload-user.dto';
import { ModifyPermissionGuard } from './guards/modifyPermission.guard';
import { UserQuery } from './query/user.query.interface';
import { DeleteUserResponse } from './responses/deleteUser.response';
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
  @UseGuards(AuthGuard('jwt'), new ModifyPermissionGuard())
  @Patch(':uuid')
  async update(
    @Body() updateuserDto: UpdateUserDto,
    @Param('uuid') uuid: string,
  ) {
    const user = await this.userService.update(uuid, updateuserDto);
    return new UpdateUserResponse(user).build();
  }

  @ApiOkResponse({ description: 'OK', type: DeleteUserResponse })
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
  @UseGuards(AuthGuard('jwt'), new ModifyPermissionGuard())
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.userService.delete(uuid);
    return new DeleteUserResponse().build();
  }

  @ApiOkResponse({ description: 'OK', type: UpdateUserResponse })
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadUserDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar', { limits: { fileSize: 1000000 } }))
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const { uuid } = req.user;
    const user = await this.userService.upload(uuid, file);
    return new UpdateUserResponse(user).build();
  }
}
