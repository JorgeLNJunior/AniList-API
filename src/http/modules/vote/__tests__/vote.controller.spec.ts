import { fakeUser, fakeVote } from '@mocks/fakes'
import { voteServiceMock } from '@mocks/vote.service.mock'
import { Test, TestingModule } from '@nestjs/testing'

import { CreateVoteDto } from '../dto/create-vote.dto'
import { VoteController } from '../vote.controller'
import { VoteService } from '../vote.service'

describe('VoteController', () => {
  let controller: VoteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteController,
        { provide: VoteService, useValue: voteServiceMock }
      ]
    }).compile()

    controller = module.get(VoteController)
  })

  afterEach(() => jest.clearAllMocks())

  describe('create', () => {
    test('should create a vote', async () => {
      const dto: CreateVoteDto = {
        reviewUuid: 'uuid'
      }
      const req = { user: fakeUser }
      const vote = await controller.create(dto, req)

      expect(vote).toEqual({
        statusCode: 201,
        vote: fakeVote
      })
      expect(voteServiceMock.create).toBeCalledTimes(1)
    })
  })
})
