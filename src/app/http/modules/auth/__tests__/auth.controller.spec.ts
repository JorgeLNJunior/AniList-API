import { UserBuilder } from '@http/modules/user/__tests__/builders/user.builder'
import { authServiceMock } from '@mocks/services/auth.service.mock'
import { Test, TestingModule } from '@nestjs/testing'

import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'
import { LoginDto } from '../dto/login.dto'
import { RegisterDto } from '../dto/register.dto'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        AuthController
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })
  afterEach(() => jest.clearAllMocks())

  describe('register', () => {
    afterEach(() => jest.clearAllMocks())

    test('should register an user', async () => {
      const user = new UserBuilder().build()
      const dto: RegisterDto = {
        name: user.name,
        email: user.email,
        password: user.password
      }

      authServiceMock.register.mockResolvedValue(user)

      const response = await controller.create(dto)

      expect(response).toEqual({
        statusCode: 201,
        data: user,
        message: 'please confirm your email address'
      })
    })
  })

  describe('login', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a jwt token', async () => {
      const user = new UserBuilder().build()
      const dto: LoginDto = {
        email: user.email,
        password: user.password
      }

      authServiceMock.login.mockResolvedValue('token')

      const response = await controller.login(dto, {})

      expect(response).toEqual({
        statusCode: 200,
        token: 'token'
      })
    })
  })

  describe('confirmEmail', () => {
    afterEach(() => jest.clearAllMocks())

    test('should confirm an email', async () => {
      const token = 'token'

      const response = await controller.activate(token)

      expect(response).toEqual({
        statusCode: 200,
        message: 'email activated'
      })
    })
  })
})
