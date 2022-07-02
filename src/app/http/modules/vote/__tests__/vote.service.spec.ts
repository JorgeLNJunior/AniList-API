import { Review } from '@http/modules/review/entities/review.entity'
import { User } from '@http/modules/user/entities/user.entity'
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { reviewRepositoryMock } from '@mocks/repositories/reviewRepository.mock'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { voteRepositoryMock } from '@mocks/repositories/vote.repository.mock'
import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { CreateVoteDto } from '../dto/create-vote.dto'
import { Vote } from '../entities/vote.entity'
import { VoteQuery } from '../query/vote.query.interface'
import { VoteService } from '../vote.service'
import { VoteBuilder } from './builder/vote.builder'

describe('VoteService', () => {
  let service: VoteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteService,
        { provide: getRepositoryToken(Vote), useValue: voteRepositoryMock },
        { provide: getRepositoryToken(User), useValue: userRepositoryMock },
        { provide: getRepositoryToken(Review), useValue: reviewRepositoryMock }
      ]
    }).compile()

    service = module.get(VoteService)
  })
  afterEach(() => jest.clearAllMocks())

  describe('create', () => {
    afterEach(() => jest.clearAllMocks())

    test('should create a vote', async () => {
      const vote = new VoteBuilder().build()
      const dto: CreateVoteDto = {
        reviewUUID: vote.review.uuid
      }

      voteRepositoryMock.findOne.mockResolvedValue(undefined)
      voteRepositoryMock.save.mockResolvedValue(vote)
      userRepositoryMock.findOne.mockResolvedValue(vote.user)
      reviewRepositoryMock.findOne.mockResolvedValue(vote.review)

      const result = await service.create(vote.user.uuid, dto)

      expect(result).toEqual(vote)
      expect(voteRepositoryMock.findOne).toBeCalledTimes(1)
      expect(voteRepositoryMock.save).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(reviewRepositoryMock.findOne).toBeCalledTimes(1)
    })

    test('should throw a BadRequestException if user has already voted', async () => {
      const vote = new VoteBuilder().build()
      const dto: CreateVoteDto = {
        reviewUUID: vote.review.uuid
      }

      voteRepositoryMock.findOne.mockResolvedValue(vote)
      userRepositoryMock.findOne.mockResolvedValue(vote.user)
      reviewRepositoryMock.findOne.mockResolvedValue(vote.review)

      await expect(service.create(vote.user.uuid, dto)).rejects.toThrow(
        new BadRequestException(['you have already voted'])
      )
    })

    test('should throw a BadRequestException if the user was not found', async () => {
      const vote = new VoteBuilder().build()
      const dto: CreateVoteDto = {
        reviewUUID: vote.review.uuid
      }

      userRepositoryMock.findOne.mockResolvedValue(undefined)
      reviewRepositoryMock.findOne.mockResolvedValue(vote.review)

      await expect(service.create(vote.user.uuid, dto)).rejects.toThrow(
        new BadRequestException(['user not found'])
      )
    })

    test('should throw a BadRequestException if review was not found', async () => {
      const vote = new VoteBuilder().build()
      const dto: CreateVoteDto = {
        reviewUUID: vote.review.uuid
      }

      reviewRepositoryMock.findOne.mockResolvedValue(undefined)

      await expect(service.create(vote.user.uuid, dto)).rejects.toThrow(
        new BadRequestException(['review not found'])
      )
    })
  })

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of votes', async () => {
      const votes = [new VoteBuilder().build()]

      voteRepositoryMock.count.mockResolvedValue(10)
      voteRepositoryMock.find.mockResolvedValue(votes)

      const results = await service.find({})

      expect(results).toEqual({
        data: votes,
        total: 10,
        pageTotal: votes.length
      } as PaginationInterface<Vote>)
      expect(voteRepositoryMock.find).toBeCalledTimes(1)
      expect(voteRepositoryMock.count).toBeCalledTimes(1)
    })

    test('should return a list of votes when it receives query params', async () => {
      const votes = [new VoteBuilder().build()]
      const query: VoteQuery = {
        uuid: votes[0].uuid,
        userUUID: votes[0].user.uuid,
        reviewUUID: votes[0].review.uuid,
        take: 10,
        skip: 5
      }

      voteRepositoryMock.count.mockResolvedValue(10)
      voteRepositoryMock.find.mockResolvedValue(votes)

      const results = await service.find(query)

      expect(results).toEqual({
        data: votes,
        total: 10,
        pageTotal: votes.length
      } as PaginationInterface<Vote>)
      expect(voteRepositoryMock.find).toBeCalledTimes(1)
      expect(voteRepositoryMock.count).toBeCalledTimes(1)
    })
  })

  describe('findOne', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a vote', async () => {
      const vote = new VoteBuilder().build()

      voteRepositoryMock.findOne.mockResolvedValue(vote)

      const results = await service.findOne(vote.uuid)

      expect(results).toEqual(vote)
    })

    test('should call the repository with correct params', async () => {
      const vote = new VoteBuilder().build()

      voteRepositoryMock.findOne.mockResolvedValue(vote)

      const results = await service.findOne(vote.uuid)

      expect(results).toEqual(vote)
      expect(voteRepositoryMock.findOne).toBeCalledWith({
        where: { uuid: vote.uuid },
        loadRelationIds: {
          disableMixedMap: true,
          relations: ['user', 'review']
        }
      })
      expect(voteRepositoryMock.findOne).toBeCalledTimes(1)
    })
  })

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks())

    test('should delete a vote', async () => {
      const vote = new VoteBuilder().build()

      await service.delete(vote.uuid)

      expect(voteRepositoryMock.softDelete).toBeCalledTimes(1)
      expect(voteRepositoryMock.softDelete).toBeCalledWith(vote.uuid)
    })
  })
})
