import { UserBuilder } from '@http/modules/user/__tests__/builders/user.builder'
import { BcryptService } from '@http/shared/services/bcrypt.service'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { Jobs } from '@modules/queue/types/jobs.enum'
import { getQueueToken } from '@nestjs/bull'
import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { User } from '../../user/entities/user.entity'
import { AuthService } from '../auth.service'
import { RegisterDto } from '../dto/register.dto'

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
          useValue: {
            add: jest.fn().mockResolvedValue(Promise.resolve())
          }
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
    afterEach(() => jest.clearAllMocks())

    test('should register an user', async () => {
      const user = new UserBuilder().build()
      const dto: RegisterDto = {
        email: user.email,
        name: user.name,
        password: user.password
      }

      userRepositoryMock.save.mockResolvedValue(user)

      const result = await service.register(dto)

      expect(result).toEqual(user)
    })

    test('should call the repository with correct params', async () => {
      const user = new UserBuilder().build()
      const dto: RegisterDto = {
        email: user.email,
        name: user.name,
        password: user.password
      }

      userRepositoryMock.save.mockResolvedValue(user)

      const result = await service.register(dto)

      expect(userRepositoryMock.create).toBeCalledWith(dto)
      expect(result).toEqual(user)
    })
  })

  describe('login', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a jwt token', async () => {
      const user = new UserBuilder().build()

      const token = await service.login(user)

      expect(typeof token).toBe('string')
    })
  })

  describe('activateEmail', () => {
    afterEach(() => jest.clearAllMocks())

    test('should activate an user account', async () => {
      const user = new UserBuilder().withIsActive(false).build()
      const token = new JwtService({ secret: 'secret' }).sign({
        email: user.email
      })

      userRepositoryMock.findOne.mockResolvedValue(user)

      await service.activateEmail(token)

      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: user.email
      })
      expect(userRepositoryMock.update).toBeCalledWith(user.uuid, {
        isActive: true
      })
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.update).toBeCalledTimes(1)
    })

    test('should throw a BadRequestException if the user was not found', async () => {
      const user = new UserBuilder().withIsActive(false).build()
      const token = new JwtService({ secret: 'secret' }).sign({
        email: user.email
      })

      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined)

      // eslint-disable-next-line jest/valid-expect
      expect(service.activateEmail(token)).rejects.toThrow(
        new BadRequestException('user not found')
      )
      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: user.email
      })
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
    })

    test('should throw a BadRequestException if the email is already active', async () => {
      const user = new UserBuilder().withIsActive(true).build()
      const token = new JwtService({ secret: 'secret' }).sign({
        email: user.email
      })

      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(user)

      // eslint-disable-next-line jest/valid-expect
      expect(service.activateEmail(token)).rejects.toThrow(
        new BadRequestException('this email is already active')
      )
      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: user.email
      })
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
    })

    test('should throw a BadRequestException if it receives an expired token', async () => {
      const user = new UserBuilder().withIsActive(false).build()
      const token = new JwtService({
        secret: 'secret',
        signOptions: { expiresIn: '-1h' }
      }).sign({
        email: user.email
      })

      // eslint-disable-next-line jest/valid-expect
      expect(service.activateEmail(token)).rejects.toThrow(
        new BadRequestException('token expired')
      )
    })

    test('should throw a BadRequestException if it receives an invalid token', async () => {
      const token = 'invalid-token'

      // eslint-disable-next-line jest/valid-expect
      expect(service.activateEmail(token)).rejects.toThrow(
        new BadRequestException('invalid token')
      )
    })
  })

  describe('validateUser', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return an user', async () => {
      const user = new UserBuilder().withIsActive(true).build()

      const bcryptMock = jest
        .spyOn(BcryptService.prototype, 'compare')
        .mockResolvedValue(true)
      userRepositoryMock.findOne.mockResolvedValue(user)

      const result = await service.validateUser(
        user.email,
        user.password
      )

      expect(result).toEqual(user)
      expect(bcryptMock).toBeCalledTimes(1)
    })

    test('should throw a UnauthorizedException if the password does not match', async () => {
      const user = new UserBuilder().build()
      jest.spyOn(BcryptService.prototype, 'compare').mockResolvedValue(false)

      // eslint-disable-next-line jest/valid-expect
      expect(
        service.validateUser(user.email, user.password)
      ).rejects.toThrow(UnauthorizedException)
    })

    test('should throw a UnauthorizedException if the user was not found', async () => {
      const user = new UserBuilder().build()
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined)

      // eslint-disable-next-line jest/valid-expect
      expect(
        service.validateUser(user.email, user.password)
      ).rejects.toThrow(UnauthorizedException)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith({ email: user.email })
    })
  })
})
