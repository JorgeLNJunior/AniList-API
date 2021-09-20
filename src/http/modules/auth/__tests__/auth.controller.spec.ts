import { authServiceMock } from '@mocks/auth.service.mock'
import { fakeUser } from '@mocks/fakes'
import { userRepositoryMock } from '@mocks/user.repository.mock'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { CreateUserDto } from '../../user/dto/create-user.dto'
import { User } from '../../user/entities/user.entity'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'
import { EmailConfirmationDto } from '../dto/email-confirmation.dto'
import { LoginDto } from '../dto/login.dto'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        { provide: AuthService, useValue: authServiceMock },
        { provide: getRepositoryToken(User), useValue: userRepositoryMock }
      ]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  afterEach(() => jest.clearAllMocks())

  describe('register', () => {
    test('should register a user', async () => {
      const dto: CreateUserDto = {
        name: fakeUser.name,
        email: fakeUser.email,
        password: fakeUser.password
      }
      const response = await controller.create(dto)

      expect(response).toEqual({
        statusCode: 201,
        user: fakeUser,
        message: 'please confirm your email address'
      })
    })
  })

  describe('login', () => {
    test('should return a jwt token', async () => {
      const dto: LoginDto = {
        email: fakeUser.email,
        password: fakeUser.password
      }
      const response = await controller.login(dto, {})

      expect(response).toEqual({
        statusCode: 200,
        token: 'token'
      })
    })
  })

  describe('confirmEmail', () => {
    test('should confirm a email', async () => {
      const dto: EmailConfirmationDto = {
        token: 'token'
      }
      const response = await controller.confirm(dto)

      expect(response).toEqual({
        statusCode: 200,
        message: 'email confirmed'
      })
    })
  })
})
