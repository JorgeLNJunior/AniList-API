import { createMock } from '@golevelup/ts-jest'
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { userServiceMock } from '@mocks/services/user.service.mock'
import { Test, TestingModule } from '@nestjs/testing'

import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'
import { UserQuery } from '../query/user.query.interface'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'
import { UserBuilder } from './builders/user.builder'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        UserController
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compile()

    controller = module.get(UserController)
  })
  afterEach(() => jest.clearAllMocks())

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of users', async () => {
      const users = [
        new UserBuilder().build()
      ]

      userServiceMock.find.mockResolvedValue({
        results: users,
        total: 10,
        pageTotal: users.length
      } as PaginationInterface<User>)

      const response = await controller.find({})

      expect(response).toEqual({
        statusCode: 200,
        users: users,
        pageTotal: users.length,
        total: 10
      })
    })

    test('should return a list of users when it receives query params', async () => {
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

      userServiceMock.find.mockResolvedValue({
        results: users,
        total: 10,
        pageTotal: users.length
      } as PaginationInterface<User>)

      const response = await controller.find(query)

      expect(response).toEqual({
        statusCode: 200,
        users: users,
        pageTotal: users.length,
        total: 10
      })
    })

    test('should call the service with correct params', async () => {
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

      userServiceMock.find.mockResolvedValue({
        results: users,
        total: 10,
        pageTotal: users.length
      } as PaginationInterface<User>)

      const response = await controller.find(query)

      expect(userServiceMock.find).toBeCalledWith(query)
      expect(response).toEqual({
        statusCode: 200,
        users: users,
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
        name: user.name
      }

      userServiceMock.update.mockResolvedValue(user)

      const response = await controller.update(dto, user.uuid)

      expect(response).toEqual({
        statusCode: 200,
        user: user
      })
      expect(userServiceMock.update).toBeCalledTimes(1)
      expect(userServiceMock.update).toBeCalledWith(user.uuid, dto)
    })

    test('should call the service with correct params', async () => {
      const user = new UserBuilder().build()
      const dto: UpdateUserDto = {
        name: user.name
      }

      userServiceMock.update.mockResolvedValue(user)

      const response = await controller.update(dto, user.uuid)

      expect(userServiceMock.update).toBeCalledWith(user.uuid, dto)
      expect(response).toEqual({
        statusCode: 200,
        user: user
      })
    })
  })

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks())

    test('should delete a user', async () => {
      const user = new UserBuilder().build()

      const response = await controller.delete(user.uuid)

      expect(response).toEqual({
        statusCode: 200,
        message: 'the user has been deleted'
      })
    })

    test('should call the service with correct params', async () => {
      const user = new UserBuilder().build()

      const response = await controller.delete(user.uuid)

      expect(userServiceMock.delete).toBeCalledWith(user.uuid)
      expect(response).toEqual({
        statusCode: 200,
        message: 'the user has been deleted'
      })
    })
  })

  describe('upload', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return an upload message', async () => {
      const user = new UserBuilder().build()
      const file = createMock<Express.Multer.File>()
      const response = await controller.upload(file, {
        user: { uuid: user.uuid }
      })

      expect(response).toEqual({
        statusCode: 200,
        message: 'the image will be available soon'
      })
    })

    test('should return call the service with correct params', async () => {
      const user = new UserBuilder().build()
      const file = createMock<Express.Multer.File>()
      const response = await controller.upload(file, {
        user: { uuid: user.uuid }
      })

      expect(userServiceMock.upload).toHaveBeenCalledWith(user.uuid, file)
      expect(response).toEqual({
        statusCode: 200,
        message: 'the image will be available soon'
      })
    })
  })
})
