import { BcryptService } from '@http/shared/services/bcrypt.service'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { Jobs } from '@modules/queue/consumers/types/jobs.enum'
import { getQueueToken } from '@nestjs/bull'
import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { fakeUser } from '@src/__tests__/fakes'

import { CreateUserDto } from '../../user/dto/create-user.dto'
import { User } from '../../user/entities/user.entity'
import { AuthService } from '../auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [
        AuthService,
        BcryptService,
        ConfigService,
        {
          provide: getQueueToken(Jobs.EMAIL_ACTIVATION),
          useValue: { add: jest.fn().mockResolvedValue(true) }
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  afterEach(() => jest.clearAllMocks())

  describe('register', () => {
    test('should register a user', async () => {
      const dto: CreateUserDto = {
        email: fakeUser.email,
        name: fakeUser.name,
        password: fakeUser.password
      }
      const user = await service.register(dto)

      expect(user).toEqual(fakeUser)
      expect(userRepositoryMock.create).toBeCalledTimes(1)
      expect(userRepositoryMock.create).toBeCalledWith(dto)
    })
  })

  describe('login', () => {
    test('should return a jwt token', async () => {
      const token = await service.login(fakeUser)
      expect(typeof token).toBe('string')
    })
  })

  describe('activateEmail', () => {
    afterEach(() => jest.clearAllMocks())

    test('should activate user account', async () => {
      const token = new JwtService({ secret: 'secret' }).sign({
        email: fakeUser.email
      })

      fakeUser.isActive = false

      await service.activateEmail(token)

      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: fakeUser.email
      })
      expect(userRepositoryMock.update).toBeCalledTimes(1)
      expect(userRepositoryMock.update).toBeCalledWith(fakeUser.uuid, {
        isActive: true
      })
    })

    test('should throw a BadRequestException if the user was not found', async () => {
      const token = new JwtService({ secret: 'secret' }).sign({
        email: fakeUser.email
      })

      fakeUser.isActive = false

      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined)

      // eslint-disable-next-line jest/valid-expect
      expect(service.activateEmail(token)).rejects.toThrow(BadRequestException)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: fakeUser.email
      })
    })

    test('should throw a BadRequestException if the email is already confirmed', async () => {
      const token = new JwtService({ secret: 'secret' }).sign({
        email: fakeUser.email
      })

      fakeUser.isActive = true
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(fakeUser)

      // eslint-disable-next-line jest/valid-expect
      expect(service.activateEmail(token)).rejects.toThrow(BadRequestException)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: fakeUser.email
      })
    })

    test('should throw a BadRequestException if it receives a expired', async () => {
      const token = new JwtService({
        secret: 'secret',
        signOptions: { expiresIn: '-1h' }
      }).sign({
        email: fakeUser.email
      })

      fakeUser.isActive = false

      // eslint-disable-next-line jest/valid-expect
      expect(service.activateEmail(token)).rejects.toThrow(BadRequestException)
    })

    test('should throw a BadRequestException if it receives a invalid token', async () => {
      const token = 'invalid-token'

      fakeUser.isActive = false

      // eslint-disable-next-line jest/valid-expect
      expect(service.activateEmail(token)).rejects.toThrow(BadRequestException)
    })
  })

  describe('validateUser', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a user', async () => {
      const bcryptMock = jest
        .spyOn(BcryptService.prototype, 'compare')
        .mockResolvedValue(true)

      const user = await service.validateUser(
        fakeUser.email,
        fakeUser.password
      )

      fakeUser.isActive = true

      expect(user).toEqual(fakeUser)
      expect(bcryptMock).toBeCalledTimes(1)
    })

    test('should throw a UnauthorizedException if the password does not match', async () => {
      jest.spyOn(BcryptService.prototype, 'compare').mockResolvedValue(false)

      // eslint-disable-next-line jest/valid-expect
      expect(
        service.validateUser(fakeUser.email, fakeUser.password)
      ).rejects.toThrow(UnauthorizedException)
    })

    test('should throw a UnauthorizedException if the user was not found', async () => {
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue([])

      // eslint-disable-next-line jest/valid-expect
      expect(
        service.validateUser(fakeUser.email, fakeUser.password)
      ).rejects.toThrow(UnauthorizedException)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({ email: fakeUser.email })
    })
  })
})
