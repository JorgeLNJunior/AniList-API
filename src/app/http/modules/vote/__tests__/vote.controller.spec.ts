import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { voteRepositoryMock } from '@mocks/repositories/vote.repository.mock'
import { voteServiceMock } from '@mocks/services/vote.service.mock'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { CreateVoteDto } from '../dto/create-vote.dto'
import { Vote } from '../entities/vote.entity'
import { VoteController } from '../vote.controller'
import { VoteService } from '../vote.service'
import { VoteBuilder } from './builder/vote.builder'

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
    afterEach(() => jest.clearAllMocks())

    test('should create a vote', async () => {
      const vote = new VoteBuilder().build()
      const dto: CreateVoteDto = {
        reviewUUID: vote.review.uuid,
      }
      const req = { user: vote.user }

      voteServiceMock.create.mockResolvedValue(vote)

      const response = await controller.create(dto, req)

      expect(response).toEqual({
        statusCode: 201,
        data: vote
      })
    })

    test('should call the service with correct params', async () => {
      const vote = new VoteBuilder().build()
      const dto: CreateVoteDto = {
        reviewUUID: vote.review.uuid,
      }
      const req = { user: vote.user }

      voteServiceMock.create.mockResolvedValue(vote)

      const response = await controller.create(dto, req)

      expect(response).toEqual({
        statusCode: 201,
        data: vote
      })
      expect(voteServiceMock.create).toBeCalledTimes(1)
      expect(voteServiceMock.create).toBeCalledWith(req.user.uuid, dto)
    })
  })

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of votes', async () => {
      const votes = [
        new VoteBuilder().build()
      ]

      voteServiceMock.find.mockResolvedValue({
        data: votes,
        total: 10,
        pageTotal: votes.length
      } as PaginationInterface<Vote>)

      const response = await controller.find({})

      expect(response).toEqual({
        statusCode: 200,
        data: votes,
        total: 10,
        pageTotal: votes.length
      })
    })

    test('should call the service with correct params', async () => {
      const votes = [
        new VoteBuilder().build()
      ]

      voteServiceMock.find.mockResolvedValue({
        data: votes,
        total: 10,
        pageTotal: votes.length
      } as PaginationInterface<Vote>)

      const response = await controller.find({})

      expect(response).toEqual({
        statusCode: 200,
        data: votes,
        total: 10,
        pageTotal: votes.length
      })
      expect(voteServiceMock.find).toBeCalledTimes(1)
      expect(voteServiceMock.find).toBeCalledWith({})
    })
  })

  describe('findOne', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a vote', async () => {
      const vote = new VoteBuilder().build()

      voteServiceMock.findOne.mockResolvedValue(vote)

      const response = await controller.findOne(vote.uuid)

      expect(response).toEqual({
        statusCode: 200,
        data: vote
      })
    })

    test('should call the repository with correct params', async () => {
      const vote = new VoteBuilder().build()

      voteServiceMock.findOne.mockResolvedValue(vote)

      const response = await controller.findOne(vote.uuid)

      expect(voteServiceMock.findOne).toBeCalledWith(vote.uuid)
      expect(voteServiceMock.findOne).toBeCalledTimes(1)
      expect(response).toEqual({
        statusCode: 200,
        data: vote
      })
    })
  })

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks())

    test('should delete a vote', async () => {
      const vote = new VoteBuilder().build()

      await controller.delete(vote.uuid)

      expect(voteServiceMock.delete).toBeCalledTimes(1)
      expect(voteServiceMock.delete).toBeCalledWith(vote.uuid)
    });
  });

})
