import { BadRequestResponse } from '@http/shared/responses/badRequest.response'
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response'
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response'
import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags, ApiTooManyRequestsResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { CreateVoteDto } from './dto/create-vote.dto'
import { VoteQuery } from './query/vote.query.interface'
import { CreateVoteResponse } from './responses/createVote.response'
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
  constructor (private readonly voteService: VoteService) {}

  @ApiCreatedResponse({ description: 'OK', type: CreateVoteDto })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @Post()
  async create (@Body() createVoteDto: CreateVoteDto, @Req() req) {
    const vote = await this.voteService.create(req.user.uuid, createVoteDto)
    return new CreateVoteResponse(vote).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindVoteResponse })
  @ApiQuery({ type: VoteQuery })
  @Get()
  async find (@Query() query: VoteQuery) {
    const results = await this.voteService.find(query)
    return new FindVoteResponse(results).build()
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.voteService.remove(+id)
  }
}
