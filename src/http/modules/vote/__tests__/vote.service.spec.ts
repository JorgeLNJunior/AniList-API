import { fakeVote } from '@mocks/fakes'
import { voteRepositoryMock } from '@mocks/vote.repository.mock'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { CreateVoteDto } from '../dto/create-vote.dto'
import { Vote } from '../entities/vote.entity'
import { VoteService } from '../vote.service'

describe('VoteService', () => {
  let service: VoteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteService,
        { provide: getRepositoryToken(Vote), useValue: voteRepositoryMock }
      ]
    }).compile()

    service = module.get(VoteService)
  })

  describe('create', () => {
    test('should create a vote', async () => {
      const dto: CreateVoteDto = {
        reviewUuid: 'uuid'
      }
      const vote = await service.create('uuid', dto)

      expect(vote).toEqual(fakeVote)
    })
  })
})
