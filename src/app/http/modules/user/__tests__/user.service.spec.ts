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

import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'
import { UserQuery } from '../query/user.query.interface'
import { UserService } from '../user.service'

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

  describe('create', () => {
    test('should create a user', async () => {
      const dto: CreateUserDto = {
        name: fakeUser.name,
        email: fakeUser.email,
        password: fakeUser.password
      }
      const user = await service.create(dto)

      expect(user).toEqual(fakeUser)
      expect(userRepositoryMock.create).toBeCalledTimes(1)
      expect(userRepositoryMock.create).toBeCalledWith(dto)
    })
  })

  describe('find', () => {
    test('should return a list of users', async () => {
      const users = await service.find({})
      expect(users).toEqual({ results: [fakeUser], pageTotal: 1, total: 10 })
      expect(userRepositoryMock.find).toBeCalledTimes(1)
    })

    test('should return a list of users when a query is sent', async () => {
      const query: UserQuery = {
        uuid: 'uuid',
        name: 'name',
        email: 'email',
        skip: 1,
        take: 5
      }
      const users = await service.find(query)

      expect(users).toEqual({ results: [fakeUser], pageTotal: 1, total: 10 })
      expect(userRepositoryMock.find).toBeCalledTimes(1)
    })
  })

  describe('update', () => {
    test('shloud update a user', async () => {
      const dto: UpdateUserDto = {
        name: 'name'
      }
      const user = await service.update('uuid', dto)

      expect(user).toEqual(fakeUser)
      expect(userRepositoryMock.update).toBeCalledTimes(1)
      expect(userRepositoryMock.update).toBeCalledWith('uuid', dto)
      expect(userRepositoryMock.findOne).toBeCalledTimes(2)
      expect(userRepositoryMock.findOne).toBeCalledWith('uuid')
    })

    test('should throw a BadRequestException if the user was not found', async () => {
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined)

      const dto: UpdateUserDto = {
        name: 'name'
      }

      // eslint-disable-next-line jest/valid-expect
      expect(service.update('uuid', dto)).rejects.toThrow(BadRequestException)
      expect(userRepositoryMock.update).toBeCalledTimes(0)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith('uuid')
    })
  })

  describe('delete', () => {
    test('should delete a user', async () => {
      await service.delete('uuid')

      expect(userRepositoryMock.softDelete).toBeCalledTimes(1)
      expect(userRepositoryMock.softDelete).toBeCalledWith('uuid')
    })
  })

  describe('upload', () => {
    test('should add the image to avatar queue', async () => {
      await service.upload('uuid', 'path')

      expect(avatarQueueMock.add).toBeCalledTimes(1)
      expect(avatarQueueMock.add).toBeCalledWith({
        userUuid: 'uuid',
        path: 'path'
      })
    })

    test('should return a message', async () => {
      const message = await service.upload('uuid', 'path')
      expect(message).toBe('the image will be available soon')
    })
  })

  describe('onApplicationBootstrap', () => {
    test('sholud create an admin user', async () => {
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
