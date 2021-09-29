import { fakeUser, fakeVote } from '@mocks/fakes'
import { voteRepositoryMock } from '@mocks/vote.repository.mock'
import { voteServiceMock } from '@mocks/vote.service.mock'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { CreateVoteDto } from '../dto/create-vote.dto'
import { Vote } from '../entities/vote.entity'
import { VoteController } from '../vote.controller'
import { VoteService } from '../vote.service'

describe('VoteController', () => {
  let controller: VoteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteController,
        { provide: VoteService, useValue: voteServiceMock },
        { provide: getRepositoryToken(Vote), useValue: voteRepositoryMock }
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

  describe('find', () => {
    test('should return a list of votes', async () => {
      const vote = await controller.find({})

      expect(vote).toEqual({
        statusCode: 200,
        votes: [fakeVote],
        total: 10,
        pageTotal: 1
      })
      expect(voteServiceMock.find).toBeCalledTimes(1)
    })
  })

  describe('delete', () => {
    test('should delete a vote', async () => {
      await controller.delete('uuid')
      expect(voteServiceMock.delete).toBeCalledTimes(1)
      expect(voteServiceMock.delete).toBeCalledWith('uuid')
    });
  });

})
