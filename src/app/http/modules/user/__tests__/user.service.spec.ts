import { ReviewBuilder } from '@http/modules/review/__tests__/builder/review.builder'
import { Review } from '@http/modules/review/entities/review.entity'
import { UserAnimeListBuilder } from '@http/modules/userAnimeList/__tests__/builders/userAnimeList.builder'
import { UserAnimeList } from '@http/modules/userAnimeList/entities/userAnimeList.entity'
import { VoteBuilder } from '@http/modules/vote/__tests__/builder/vote.builder'
import { Vote } from '@http/modules/vote/entities/vote.entity'
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { BcryptService } from '@http/shared/services/bcrypt.service'
import { avatarQueueMock } from '@mocks/avatar.queue.mock'
import { reviewRepositoryMock } from '@mocks/repositories/reviewRepository.mock'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { userAnimeListRepositoryMock } from '@mocks/repositories/userList.repository.mock'
import { voteRepositoryMock } from '@mocks/repositories/vote.repository.mock'
import { Jobs } from '@modules/queue/types/jobs.enum'
import { getQueueToken } from '@nestjs/bull'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { fakeUser } from '@src/__tests__/fakes'

import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'
import { ReviewsByUserQueryBuilder } from '../query/review/reviewsByUser.query.builder'
import { ReviewsByUserQuery } from '../query/review/reviewsByUser.query.interface'
import { UserQueryBuilder } from '../query/user.query.builder'
import { UserQuery } from '../query/user.query.interface'
import { UserAnimeListByUserQueryBuilder } from '../query/userAnimeListByUser.query.builder'
import { UserAnimeListByUserQuery } from '../query/userAnimeListByUser.query.interface'
import { VotesByUserQueryBuilder } from '../query/votes/votesByUser.query.builder'
import { VotesByUserQuery } from '../query/votes/votesByUser.query.interface'
import { UserService } from '../user.service'
import { UserBuilder } from './builders/user.builder'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        BcryptService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('')
          }
        },
        {
          provide: getQueueToken(Jobs.AVATAR_COMPRESSION),
          useValue: avatarQueueMock
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock
        },
        {
          provide: getRepositoryToken(UserAnimeList),
          useValue: userAnimeListRepositoryMock
        },
        {
          provide: getRepositoryToken(Review),
          useValue: reviewRepositoryMock
        },
        {
          provide: getRepositoryToken(Vote),
          useValue: voteRepositoryMock
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  afterEach(() => jest.clearAllMocks())

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of users', async () => {
      const users = [new UserBuilder().build()]

      userRepositoryMock.find.mockResolvedValue(users)

      const results = await service.find({})

      expect(results).toEqual({
        data: users,
        pageTotal: users.length,
        total: 10
      } as PaginationInterface<User>)
    })

    test('should return a list of users when a query is sent', async () => {
      const users = [new UserBuilder().build()]
      const query: UserQuery = {
        uuid: users[0].uuid,
        name: users[0].name,
        email: users[0].email,
        skip: 1,
        take: 5
      }

      userRepositoryMock.find.mockResolvedValue(users)

      const results = await service.find(query)

      expect(results).toEqual({
        data: users,
        pageTotal: users.length,
        total: 10
      } as PaginationInterface<User>)
      expect(userRepositoryMock.find).toBeCalledTimes(1)
    })

    test('should call the repository with correct params', async () => {
      const users = [new UserBuilder().build()]
      const query: UserQuery = {
        uuid: users[0].uuid,
        name: users[0].name,
        email: users[0].email,
        skip: 1,
        take: 5
      }
      const findOptions = new UserQueryBuilder(query).build()

      const findSpy = jest
        .spyOn(userRepositoryMock, 'find')
        .mockResolvedValue(users)
      const countSpy = jest
        .spyOn(userRepositoryMock, 'count')
        .mockResolvedValue(10)

      const results = await service.find(query)

      expect(countSpy).toBeCalledWith({
        where: findOptions.where
      })
      expect(countSpy).toBeCalledTimes(1)
      expect(findSpy).toBeCalledWith(findOptions)
      expect(findSpy).toBeCalledTimes(1)
      expect(results).toEqual({
        data: users,
        pageTotal: users.length,
        total: 10
      } as PaginationInterface<User>)
    })
  })

  describe('findOne', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return an user', async () => {
      const user = new UserBuilder().build()

      userRepositoryMock.findOne.mockResolvedValue(user)

      const results = await service.findOne(user.uuid)

      expect(results).toEqual(user)
    })

    test('should call the repository with correct params', async () => {
      const user = new UserBuilder().build()

      userRepositoryMock.findOne.mockResolvedValue(user)

      const result = await service.findOne(user.uuid)

      expect(userRepositoryMock.findOne).toBeCalledWith({
        where: { uuid: user.uuid }
      })
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(result).toEqual(user)
    })

    test('should throw an NotFoundException if the user was not found', async () => {
      const user = new UserBuilder().build()

      userRepositoryMock.findOne.mockResolvedValue(undefined)

      await expect(service.findOne(user.uuid)).rejects.toThrow(
        new NotFoundException(`Resource /users/${user.uuid} not found`)
      )
    })
  })

  describe('update', () => {
    afterEach(() => jest.clearAllMocks())

    test('should update a user', async () => {
      const user = new UserBuilder().build()
      const dto: UpdateUserDto = {
        name: user.name
      }

      userRepositoryMock.findOne.mockResolvedValue(user)

      const result = await service.update(user.uuid, dto)

      expect(result).toEqual(user)
    })

    test('should call the repository with correct params', async () => {
      const user = new UserBuilder().build()
      const dto: UpdateUserDto = {
        name: user.name
      }

      userRepositoryMock.findOne.mockResolvedValue(user)

      const result = await service.update(user.uuid, dto)

      expect(result).toEqual(user)
      expect(userRepositoryMock.update).toBeCalledTimes(1)
      expect(userRepositoryMock.update).toBeCalledWith(user.uuid, dto)
      expect(userRepositoryMock.findOne).toBeCalledTimes(2)
      expect(userRepositoryMock.findOne).toBeCalledWith({
        where: { uuid: user.uuid }
      })
    })

    test('should throw a BadRequestException if the user was not found', async () => {
      const user = new UserBuilder().build()
      const dto: UpdateUserDto = {
        name: user.name
      }

      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined)

      await expect(service.update(user.uuid, dto)).rejects.toThrow(
        new BadRequestException(['user not found'])
      )
      expect(userRepositoryMock.update).toBeCalledTimes(0)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({
        where: { uuid: user.uuid }
      })
    })
  })

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks())

    test('should delete a user', async () => {
      const user = new UserBuilder().build()

      await service.delete(user.uuid)

      expect(userRepositoryMock.softDelete).toBeCalledTimes(1)
      expect(userRepositoryMock.softDelete).toBeCalledWith(user.uuid)
    })
  })

  describe('upload', () => {
    afterEach(() => jest.clearAllMocks())

    test('should add the image to avatar queue', async () => {
      const user = new UserBuilder().build()

      await service.upload(user.uuid, 'path')

      expect(avatarQueueMock.add).toBeCalledTimes(1)
      expect(avatarQueueMock.add).toBeCalledWith({
        userUUID: user.uuid,
        path: 'path'
      })
    })

    test('should return a message', async () => {
      const user = new UserBuilder().build()

      const message = await service.upload(user.uuid, 'path')
      expect(message).toBe('the image will be available soon')
    })
  })

  describe('onApplicationBootstrap', () => {
    afterEach(() => jest.clearAllMocks())

    test('should create an admin user', async () => {
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined)

      await service.onApplicationBootstrap()

      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({
        where: { name: 'admin' }
      })
      expect(userRepositoryMock.save).toBeCalledTimes(1)
    })

    test('should not create an admin user if it already exists', async () => {
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(fakeUser)
      await service.onApplicationBootstrap()

      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({
        where: { name: 'admin' }
      })
      expect(userRepositoryMock.save).toBeCalledTimes(0)
    })
  })

  describe('getUserAnimeList', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return an user anime list', async () => {
      const user = new UserBuilder().build()
      const userAnimeList = [new UserAnimeListBuilder().build()]

      userAnimeListRepositoryMock.find.mockResolvedValue(userAnimeList)
      userAnimeListRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserAnimeList(user.uuid, {})

      expect(results).toEqual({
        data: userAnimeList,
        pageTotal: userAnimeList.length,
        total: 10
      } as PaginationInterface<UserAnimeList>)
    })

    test('should return an user anime list when it receives query params', async () => {
      const user = new UserBuilder().build()
      const userAnimeList = [new UserAnimeListBuilder().build()]
      const query: UserAnimeListByUserQuery = {
        animeUUID: userAnimeList[0].anime.uuid,
        status: userAnimeList[0].status,
        uuid: 'uuid',
        take: 10,
        skip: 5
      }

      userAnimeListRepositoryMock.find.mockResolvedValue(userAnimeList)
      userAnimeListRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserAnimeList(user.uuid, query)

      expect(results).toEqual({
        data: userAnimeList,
        pageTotal: userAnimeList.length,
        total: 10
      } as PaginationInterface<UserAnimeList>)
    })

    test('should call the repository with correct params', async () => {
      const user = new UserBuilder().build()
      const userAnimeList = [new UserAnimeListBuilder().build()]
      const query: UserAnimeListByUserQuery = {
        animeUUID: userAnimeList[0].anime.uuid,
        status: userAnimeList[0].status,
        uuid: 'uuid',
        take: 10,
        skip: 5
      }
      const findOptions = new UserAnimeListByUserQueryBuilder(query).build()

      userAnimeListRepositoryMock.find.mockResolvedValue(userAnimeList)
      userAnimeListRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserAnimeList(user.uuid, query)

      expect(results).toEqual({
        data: userAnimeList,
        pageTotal: userAnimeList.length,
        total: 10
      } as PaginationInterface<UserAnimeList>)
      expect(userAnimeListRepositoryMock.find).toBeCalledTimes(1)
      expect(userAnimeListRepositoryMock.find).toBeCalledWith({
        where: {
          user: { uuid: user.uuid }
        },
        ...findOptions,
        loadRelationIds: {
          disableMixedMap: true,
          relations: ['anime']
        }
      })
      expect(userAnimeListRepositoryMock.count).toBeCalledTimes(1)
      expect(userAnimeListRepositoryMock.count).toBeCalledWith({
        where: {
          user: { uuid: user.uuid }
        },
        ...findOptions
      })
    })
  })

  describe('getUserReviews', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return an list of reviews', async () => {
      const user = new UserBuilder().build()
      const reviews = [new ReviewBuilder().build()]

      reviewRepositoryMock.find.mockResolvedValue(reviews)
      reviewRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserReviews(user.uuid, {})

      expect(results).toEqual({
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      } as PaginationInterface<Review>)
    })

    test('should return a list of reviews when it receives query params', async () => {
      const user = new UserBuilder().build()
      const reviews = [new ReviewBuilder().build()]
      const query: ReviewsByUserQuery = {
        animeUUID: reviews[0].anime.uuid,
        title: reviews[0].title,
        rating: reviews[0].rating,
        take: 10,
        skip: 5
      }

      reviewRepositoryMock.find.mockResolvedValue(reviews)
      reviewRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserReviews(user.uuid, query)

      expect(results).toEqual({
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      } as PaginationInterface<Review>)
    })

    test('should call the repository with correct params', async () => {
      const user = new UserBuilder().build()
      const reviews = [new ReviewBuilder().build()]
      const query: ReviewsByUserQuery = {
        animeUUID: reviews[0].anime.uuid,
        title: reviews[0].title,
        rating: reviews[0].rating,
        take: 10,
        skip: 5
      }
      const findOptions = new ReviewsByUserQueryBuilder(query).build()

      reviewRepositoryMock.find.mockResolvedValue(reviews)
      reviewRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserReviews(user.uuid, query)

      expect(results).toEqual({
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      } as PaginationInterface<Review>)
      expect(reviewRepositoryMock.find).toBeCalledTimes(1)
      expect(reviewRepositoryMock.find).toBeCalledWith({
        where: {
          user: { uuid: user.uuid }
        },
        ...findOptions,
        loadRelationIds: {
          disableMixedMap: true,
          relations: ['anime']
        }
      })
      expect(reviewRepositoryMock.count).toBeCalledTimes(1)
      expect(reviewRepositoryMock.count).toBeCalledWith({
        where: {
          user: { uuid: user.uuid }
        },
        ...findOptions
      })
    })
  })

  describe('getUserVotes', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return an list of votes', async () => {
      const user = new UserBuilder().build()
      const votes = [new VoteBuilder().build()]

      voteRepositoryMock.find.mockResolvedValue(votes)
      voteRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserVotes(user.uuid, {})

      expect(results).toEqual({
        data: votes,
        pageTotal: votes.length,
        total: 10
      } as PaginationInterface<Vote>)
    })

    test('should return an list of votes when it receives query params', async () => {
      const user = new UserBuilder().build()
      const votes = [new VoteBuilder().build()]
      const query: VotesByUserQuery = {
        reviewUUID: votes[0].review.uuid,
        take: 10,
        skip: 5
      }

      voteRepositoryMock.find.mockResolvedValue(votes)
      voteRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserVotes(user.uuid, query)

      expect(results).toEqual({
        data: votes,
        pageTotal: votes.length,
        total: 10
      } as PaginationInterface<Vote>)
    })

    test('should call the repository with correct params', async () => {
      const user = new UserBuilder().build()
      const votes = [new VoteBuilder().build()]
      const query: VotesByUserQuery = {
        reviewUUID: votes[0].review.uuid,
        take: 10,
        skip: 5
      }
      const findOptions = new VotesByUserQueryBuilder(query).build()

      voteRepositoryMock.find.mockResolvedValue(votes)
      voteRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getUserVotes(user.uuid, query)

      expect(results).toEqual({
        data: votes,
        pageTotal: votes.length,
        total: 10
      } as PaginationInterface<Vote>)
      expect(voteRepositoryMock.find).toBeCalledTimes(1)
      expect(voteRepositoryMock.find).toBeCalledWith({
        where: {
          user: { uuid: user.uuid }
        },
        ...findOptions,
        loadRelationIds: {
          disableMixedMap: true,
          relations: ['review']
        }
      })
      expect(voteRepositoryMock.count).toBeCalledTimes(1)
      expect(voteRepositoryMock.count).toBeCalledWith({
        where: {
          user: { uuid: user.uuid }
        },
        ...findOptions
      })
    })
  })
})
