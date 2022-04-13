import { BadRequestResponse } from '@http/shared/responses/badRequest.response'
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response'
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { CreateVoteDto } from './dto/create-vote.dto'
import { VoteModifyPermissionGuard } from './guards/voteModifyPermission.guard'
import { VoteQuery } from './query/vote.query.interface'
import { CreateVoteResponse } from './responses/createVote.response'
import { DeleteVoteResponse } from './responses/deleteVote.response'
import { FindVoteResponse } from './responses/findVote.response'
import { VoteService } from './vote.service'

@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: UnauthorizedResponse
})
@ApiTooManyRequestsResponse({
  description: 'Too Many Requests',
  type: TooManyRequestsResponse
})
@ApiBearerAuth()
@ApiTags('Votes')
@UseGuards(AuthGuard('jwt'))
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) { }

  @ApiCreatedResponse({ description: 'OK', type: CreateVoteDto })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @Post()
  async create(@Body() createVoteDto: CreateVoteDto, @Req() req) {
    const vote = await this.voteService.create(req.user.uuid, createVoteDto)
    return new CreateVoteResponse(vote).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindVoteResponse })
  @Get()
  async find(@Query() query: VoteQuery) {
    const results = await this.voteService.find(query)
    return new FindVoteResponse(results).build()
  }

  @ApiOkResponse({ description: 'OK', type: DeleteVoteResponse })
  @ApiBadRequestResponse({
    description: 'Validation Error',
    type: BadRequestResponse
  })
  @UseGuards(VoteModifyPermissionGuard)
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.voteService.delete(uuid)
    return new DeleteVoteResponse().build()
  }
}
