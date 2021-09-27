import { Review } from '@http/modules/review/entities/review.entity'
import { User } from '@http/modules/user/entities/user.entity'
import { fakeUser, fakeVote } from '@mocks/fakes'
import { reviewRepositoryMock } from '@mocks/reviewRepository.mock'
import { userRepositoryMock } from '@mocks/user.repository.mock'
import { voteRepositoryMock } from '@mocks/vote.repository.mock'
import { BadRequestException } from '@nestjs/common'
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
})
