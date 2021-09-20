import { createMock } from '@golevelup/ts-jest'
import { fakeUser } from '@mocks/fakes'
import { userServiceMock } from '@mocks/user.service.mock'
import { Test, TestingModule } from '@nestjs/testing'

import { UpdateUserDto } from '../dto/update-user.dto'
import { UserQuery } from '../query/user.query.interface'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserController,
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  afterEach(() => jest.clearAllMocks())

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of users', async () => {
      const response = await controller.find({})

      expect(response).toEqual({
        statusCode: 200,
        results: [fakeUser],
        pageTotal: 1,
        total: 10
      })
      expect(userServiceMock.find).toBeCalledTimes(1)
      expect(userServiceMock.find).toBeCalledWith({})
    })

    test('should return a list of users when a query is sent', async () => {
      const query: UserQuery = {
        uuid: 'uuid',
        name: 'name',
        email: 'email',
        skip: 1,
        take: 5
      }
      const response = await controller.find(query)

      expect(response).toEqual({
        statusCode: 200,
        results: [fakeUser],
        pageTotal: 1,
        total: 10
      })
      expect(userServiceMock.find).toBeCalledTimes(1)
      expect(userServiceMock.find).toBeCalledWith(query)
    })
  })

  describe('update', () => {
    test('should update a user', async () => {
      const dto: UpdateUserDto = {
        name: 'name'
      }

      const response = await controller.update(dto, 'uuid')

      expect(response).toEqual({
        statusCode: 200,
        user: fakeUser
      })
      expect(userServiceMock.update).toBeCalledTimes(1)
      expect(userServiceMock.update).toBeCalledWith('uuid', dto)
    })
  })

  describe('delete', () => {
    test('should delete a user', async () => {
      const response = await controller.delete('uuid')

      expect(response).toEqual({
        statusCode: 200,
        message: 'the user has been deleted'
      })
      expect(userServiceMock.delete).toBeCalledTimes(1)
      expect(userServiceMock.delete).toBeCalledWith('uuid')
    })
  })

  describe('upload', () => {
    test('should return a upload message', async () => {
      const file = createMock<Express.Multer.File>()
      const response = await controller.upload(file, {
        user: { uuid: 'uuid' }
      })

      expect(response).toEqual({
        statusCode: 200,
        message: 'the image will be available soon'
      })
      expect(userServiceMock.upload).toHaveBeenCalledWith('uuid', file)
      expect(userServiceMock.upload).toHaveBeenCalledTimes(1)
    })
  })
})
