import { fakeUser, fakeVote } from '@mocks/fakes'
import { voteServiceMock } from '@mocks/vote.service.mock'
import { Test, TestingModule } from '@nestjs/testing'

import { CreateVoteDto } from '../dto/create-vote.dto'
import { VoteQuery } from '../query/vote.query.interface'
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

    test('should return a list of votes when query params are sent', async () => {
      const query: VoteQuery = {
        uuid: 'uuid',
        userUuid: 'uuid',
        reviewUuid: 'uuid',
        take: 10,
        skip: 5,
      }
      const vote = await controller.find(query)

      expect(vote).toEqual({
        statusCode: 200,
        votes: [fakeVote],
        total: 10,
        pageTotal: 1
      })
      expect(voteServiceMock.find).toBeCalledTimes(1)
    })
  })
})
