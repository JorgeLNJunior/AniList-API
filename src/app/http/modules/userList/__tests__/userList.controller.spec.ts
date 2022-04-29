import { PaginationInterface } from "@http/shared/pagination/pagination.interface";
import { userListRepositoryMock } from "@mocks/repositories/userList.repository.mock";
import { userListServiceMock } from "@mocks/services/userList.service.mock";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { AddToUserListDto } from "../dto/addToUserList.dto";
import { UpdateUserListDto } from "../dto/updateUserList.dto";
import { UserList } from "../entities/userList.entity";
import { UserListQuery } from "../query/userList.query.interface";
import { AnimeStatus } from "../types/animeStatus.enum";
import { UserListController } from "../userList.controller";
import { UserListService } from "../userList.service";
import { UserListBuilder } from "./builders/userList.builder";

describe('UserListController', () => {
  let controller: UserListController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserListController],
      providers: [
        {
          provide: UserListService,
          useValue: userListServiceMock
        },
        {
          provide: getRepositoryToken(UserList),
          useValue: userListRepositoryMock
        }
      ]
    }).compile()

    controller = module.get(UserListController)
  })
  afterEach(() => jest.clearAllMocks())

  describe('addToUserList', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a valid response', async () => {
      const list = new UserListBuilder().build()
      const dto: AddToUserListDto = {
        animeUuid: list.uuid,
        status: list.status
      }
      const req = { user: 'uuid' }

      userListServiceMock.addToList.mockResolvedValue(list)

      const response = await controller.addToUserList(req, dto)

      expect(response).toEqual({
        statusCode: 201,
        list: list
      })
    });

    test('should call the service with correct params', async () => {
      const list = new UserListBuilder().build()
      const dto: AddToUserListDto = {
        animeUuid: list.uuid,
        status: list.status
      }
      const req = { user: { uuid: 'uuid' } }

      const spy = jest.spyOn(userListServiceMock, 'addToList')
        .mockResolvedValue(list)

      const response = await controller.addToUserList(req, dto)

      expect(spy).toBeCalledWith(req.user.uuid, dto)
      expect(response).toEqual({
        statusCode: 201,
        list: list
      })
    });
  });

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a valid response', async () => {
      const list = [
        new UserListBuilder().build()
      ]
      const query: UserListQuery = {}
      const serviceResponse: PaginationInterface<UserList> = {
        results: list,
        total: 10,
        pageTotal: list.length
      }

      userListServiceMock.find.mockResolvedValue(serviceResponse)

      const response = await controller.find(query)

      expect(response).toEqual({
        statusCode: 200,
        list: serviceResponse.results,
        pageTotal: serviceResponse.pageTotal,
        total: serviceResponse.total
      })
    });

    test('should return a valid response when called with query params', async () => {
      const list = [
        new UserListBuilder().build()
      ]
      const query: UserListQuery = {
        uuid: list[0].uuid,
        take: 1,
        skip: 1
      }
      const serviceResponse: PaginationInterface<UserList> = {
        results: list,
        total: 10,
        pageTotal: list.length
      }

      userListServiceMock.find.mockResolvedValue(serviceResponse)

      const response = await controller.find(query)

      expect(response).toEqual({
        statusCode: 200,
        list: serviceResponse.results,
        pageTotal: serviceResponse.pageTotal,
        total: serviceResponse.total
      })
    });

    test('should call the service with correct params', async () => {
      const list = [
        new UserListBuilder().build()
      ]
      const query: UserListQuery = {
        uuid: list[0].uuid,
        take: 1,
        skip: 0
      }
      const serviceResponse: PaginationInterface<UserList> = {
        results: list,
        total: 10,
        pageTotal: list.length
      }

      const spy = jest.spyOn(userListServiceMock, 'find')
        .mockResolvedValue(serviceResponse)

      const response = await controller.find(query)

      expect(spy).toBeCalledWith(query)
      expect(response).toEqual({
        statusCode: 200,
        list: serviceResponse.results,
        pageTotal: serviceResponse.pageTotal,
        total: serviceResponse.total
      })
    });
  });

  describe('update', () => {
    afterEach(() => jest.clearAllMocks())

    test('should update an user list', async () => {
      const list = new UserListBuilder().build()
      const dto: UpdateUserListDto = {
        status: AnimeStatus.DROPPED
      }

      userListServiceMock.update.mockResolvedValue({
        ...dto,
        ...list
      })

      const response = await controller.update(list.uuid, dto)

      expect(response).toEqual({
        statusCode: 200,
        list: {
          ...dto,
          ...list
        }
      })
    });

    test('should call the service with correct params', async () => {
      const list = new UserListBuilder().build()
      const dto: UpdateUserListDto = {
        status: AnimeStatus.DROPPED
      }

      const spy = jest.spyOn(userListServiceMock, 'update').mockResolvedValue({
        ...dto,
        ...list
      })

      const response = await controller.update(list.uuid, dto)

      expect(spy).toBeCalledWith(list.uuid, dto)
      expect(response).toEqual({
        statusCode: 200,
        list: {
          ...dto,
          ...list
        }
      })
    });
  });

  describe('remove', () => {
    afterEach(() => jest.clearAllMocks())

    test('should remove an anime from user list', async () => {
      const list = new UserListBuilder().build()

      const response = await controller.remove(list.uuid)

      expect(response).toEqual({
        statusCode: 200,
        message: 'the anime has been removed from your list'
      })
    });

    test('should call the service with correct params', async () => {
      const list = new UserListBuilder().build()

      const spy = jest.spyOn(userListServiceMock, 'remove')

      await controller.remove(list.uuid)

      expect(spy).toBeCalledWith(list.uuid)
    });
  });


});
