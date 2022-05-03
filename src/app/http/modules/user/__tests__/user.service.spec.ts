import { UserAnimeList } from '@http/modules/userAnimeList/entities/userAnimeList.entity'
import { BcryptService } from '@http/shared/services/bcrypt.service'
import { avatarQueueMock } from '@mocks/avatar.queue.mock'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { userAnimeListRepositoryMock } from '@mocks/repositories/userList.repository.mock'
import { Jobs } from '@modules/queue/types/jobs.enum'
import { getQueueToken } from '@nestjs/bull'
import { BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { fakeUser } from '@src/__tests__/fakes'

import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'
import { UserQueryBuilder } from '../query/user.query.builder'
import { UserQuery } from '../query/user.query.interface'
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
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  afterEach(() => jest.clearAllMocks())

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of users', async () => {
      const users = [
        new UserBuilder().build()
      ]

      userRepositoryMock.find.mockResolvedValue(users)

      const results = await service.find({})

      expect(results).toEqual({
        results: users,
        pageTotal: users.length,
        total: 10
      })
    })

    test('should return a list of users when a query is sent', async () => {
      const users = [
        new UserBuilder().build()
      ]
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
        results: users,
        pageTotal: users.length,
        total: 10
      })
      expect(userRepositoryMock.find).toBeCalledTimes(1)
    })

    test('should call the repository with correct params', async () => {
      const users = [
        new UserBuilder().build()
      ]
      const query: UserQuery = {
        uuid: users[0].uuid,
        name: users[0].name,
        email: users[0].email,
        skip: 1,
        take: 5
      }
      const findOptions = new UserQueryBuilder(query).build()

      const findSpy = jest.spyOn(userRepositoryMock, 'find').mockResolvedValue(users)
      const countSpy = jest.spyOn(userRepositoryMock, 'count').mockResolvedValue(10)

      const results = await service.find(query)

      expect(countSpy).toBeCalledWith({
        where: findOptions.where
      })
      expect(countSpy).toBeCalledTimes(1)
      expect(findSpy).toBeCalledWith(findOptions)
      expect(findSpy).toBeCalledTimes(1)
      expect(results).toEqual({
        results: users,
        pageTotal: users.length,
        total: 10
      })
    })
  })

  describe('update', () => {
    afterEach(() => jest.clearAllMocks())

    test('should update a user', async () => {
      const user = new UserBuilder().build()
      const dto: UpdateUserDto = {
        name: user.name,
      }

      userRepositoryMock.findOne.mockResolvedValue(user)

      const result = await service.update(user.uuid, dto)

      expect(result).toEqual(user)
    })

    test('should call the repository with correct params', async () => {
      const user = new UserBuilder().build()
      const dto: UpdateUserDto = {
        name: user.name,
      }

      userRepositoryMock.findOne.mockResolvedValue(user)

      const result = await service.update(user.uuid, dto)

      expect(result).toEqual(user)
      expect(userRepositoryMock.update).toBeCalledTimes(1)
      expect(userRepositoryMock.update).toBeCalledWith(user.uuid, dto)
      expect(userRepositoryMock.findOne).toBeCalledTimes(2)
      expect(userRepositoryMock.findOne).toBeCalledWith(user.uuid)
    })

    test('should throw a BadRequestException if the user was not found', async () => {
      const user = new UserBuilder().build()
      const dto: UpdateUserDto = {
        name: user.name
      }

      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined)

      // eslint-disable-next-line jest/valid-expect
      expect(service.update(user.uuid, dto)).rejects.toThrow(
        new BadRequestException(['user not found'])
      )
      expect(userRepositoryMock.update).toBeCalledTimes(0)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith(user.uuid)
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
        userUuid: user.uuid,
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
      expect(userRepositoryMock.findOne).toBeCalledWith({ name: 'admin' })
      expect(userRepositoryMock.save).toBeCalledTimes(1)
    })

    test('should not create an admin user if it already exists', async () => {
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(fakeUser)
      await service.onApplicationBootstrap()

      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({ name: 'admin' })
      expect(userRepositoryMock.save).toBeCalledTimes(0)
    })
  })
})
