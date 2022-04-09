import { Review } from '@http/modules/review/entities/review.entity'
import { User } from '@http/modules/user/entities/user.entity'
import { reviewRepositoryMock } from '@mocks/repositories/reviewRepository.mock'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { voteRepositoryMock } from '@mocks/repositories/vote.repository.mock'
import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { fakeUser, fakeVote } from '@src/__tests__/fakes'

import { CreateVoteDto } from '../dto/create-vote.dto'
import { Vote } from '../entities/vote.entity'
import { VoteQuery } from '../query/vote.query.interface'
import { VoteService } from '../vote.service'

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
      jest.spyOn(voteRepositoryMock, 'findOne').mockResolvedValue(undefined)

      const dto: CreateVoteDto = {
        reviewUuid: 'uuid'
      }
      const vote = await service.create('uuid', dto)

      expect(vote).toEqual(fakeVote)
      expect(voteRepositoryMock.findOne).toBeCalledTimes(1)
      expect(voteRepositoryMock.save).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(reviewRepositoryMock.findOne).toBeCalledTimes(1)
    })

    test('should throw a BadRequestException if user has already voted', async () => {
      jest.spyOn(voteRepositoryMock, 'findOne').mockResolvedValue(fakeVote)
      const dto: CreateVoteDto = {
        reviewUuid: 'uuid'
      }

      // eslint-disable-next-line jest/valid-expect
      expect(service.create('uuid', dto)).rejects.toThrow(new BadRequestException(['you have already voted']))
    })

    test('should throw a BadRequestException if user was not found', async () => {
      jest.spyOn(voteRepositoryMock, 'findOne').mockResolvedValue(fakeVote)
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined)
      const dto: CreateVoteDto = {
        reviewUuid: 'uuid'
      }

      // eslint-disable-next-line jest/valid-expect
      expect(service.create('uuid', dto)).rejects.toThrow(new BadRequestException(['user not found']))
    })

    test('should throw a BadRequestException if review was not found', async () => {
      jest.spyOn(voteRepositoryMock, 'findOne').mockResolvedValue(fakeVote)
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(fakeUser)
      jest.spyOn(reviewRepositoryMock, 'findOne').mockResolvedValue(undefined)
      const dto: CreateVoteDto = {
        reviewUuid: 'uuid'
      }

      // eslint-disable-next-line jest/valid-expect
      expect(service.create('uuid', dto)).rejects.toThrow(new BadRequestException(['review not found']))
    })
  })

  describe('find', () => {
    test('should return a list of votes', async () => {
      const votes = await service.find({})

      expect(votes).toEqual({
        results: [fakeVote],
        total: 10,
        pageTotal: 1
      })
      expect(voteRepositoryMock.find).toBeCalledTimes(1)
      expect(voteRepositoryMock.count).toBeCalledTimes(1)
    });

    test('should return a list of votes when query params are sent', async () => {
      const query: VoteQuery = {
        uuid: 'uuid',
        userUuid: 'uuid',
        reviewUuid: 'uuid',
        take: 10,
        skip: 5,
      }
      const vote = await service.find(query)

      expect(vote).toEqual({
        results: [fakeVote],
        total: 10,
        pageTotal: 1
      })
      expect(voteRepositoryMock.find).toBeCalledTimes(1)
      expect(voteRepositoryMock.count).toBeCalledTimes(1)
    })
  });

  describe('delete', () => {
    test('should delete a vote', async () => {
      await service.delete('uuid')
      expect(voteRepositoryMock.softDelete).toBeCalledTimes(1)
      expect(voteRepositoryMock.softDelete).toBeCalledWith('uuid')
    });
  });

})
