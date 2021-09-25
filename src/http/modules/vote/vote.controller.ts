import { BadRequestResponse } from '@http/shared/responses/badRequest.response'
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response'
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response'
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiTooManyRequestsResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { CreateVoteDto } from './dto/create-vote.dto'
import { UpdateVoteDto } from './dto/update-vote.dto'
import { CreateVoteResponse } from './responses/createVote.response'
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

  @Get()
  findAll () {
    return this.voteService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.voteService.findOne(+id)
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.voteService.update(+id, updateVoteDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.voteService.remove(+id)
  }
}
