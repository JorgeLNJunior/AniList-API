import { PaginationInterface } from "@http/shared/pagination/pagination.interface";
import { userAnimeListRepositoryMock } from "@mocks/repositories/userList.repository.mock";
import { userAnimeListServiceMock } from "@mocks/services/userList.service.mock";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { AddToUserAnimeListDto } from "../dto/addToUserAnimeList.dto";
import { UpdateUserAnimeListDto } from "../dto/updateUserAnimeList.dto";
import { UserAnimeList } from "../entities/userAnimeList.entity";
import { UserAnimeListQuery } from "../query/userAnimeList.query.interface";
import { AnimeStatus } from "../types/animeStatus.enum";
import { UserAnimeListController } from "../userAnimeList.controller";
import { UserAnimeListService } from "../userAnimeList.service";
import { UserAnimeListBuilder } from "./builders/userAnimeList.builder";

describe('UserListController', () => {
  let controller: UserAnimeListController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserAnimeListController],
      providers: [
        {
          provide: UserAnimeListService,
          useValue: userAnimeListServiceMock
        },
        {
          provide: getRepositoryToken(UserAnimeList),
          useValue: userAnimeListRepositoryMock
        }
      ]
    }).compile()

    controller = module.get(UserAnimeListController)
  })
  afterEach(() => jest.clearAllMocks())

  describe('addToUserList', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a valid response', async () => {
      const list = new UserAnimeListBuilder().build()
      const dto: AddToUserAnimeListDto = {
        animeUuid: list.uuid,
        status: list.status
      }
      const req = { user: 'uuid' }

      userAnimeListServiceMock.addToList.mockResolvedValue(list)

      const response = await controller.addToUserList(req, dto)

      expect(response).toEqual({
        statusCode: 201,
        list: list
      })
    });

    test('should call the service with correct params', async () => {
      const list = new UserAnimeListBuilder().build()
      const dto: AddToUserAnimeListDto = {
        animeUuid: list.uuid,
        status: list.status
      }
      const req = { user: { uuid: 'uuid' } }

      const spy = jest.spyOn(userAnimeListServiceMock, 'addToList')
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
        new UserAnimeListBuilder().build()
      ]
      const query: UserAnimeListQuery = {}
      const serviceResponse: PaginationInterface<UserAnimeList> = {
        results: list,
        total: 10,
        pageTotal: list.length
      }

      userAnimeListServiceMock.find.mockResolvedValue(serviceResponse)

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
        new UserAnimeListBuilder().build()
      ]
      const query: UserAnimeListQuery = {
        uuid: list[0].uuid,
        take: 1,
        skip: 1
      }
      const serviceResponse: PaginationInterface<UserAnimeList> = {
        results: list,
        total: 10,
        pageTotal: list.length
      }

      userAnimeListServiceMock.find.mockResolvedValue(serviceResponse)

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
        new UserAnimeListBuilder().build()
      ]
      const query: UserAnimeListQuery = {
        uuid: list[0].uuid,
        take: 1,
        skip: 0
      }
      const serviceResponse: PaginationInterface<UserAnimeList> = {
        results: list,
        total: 10,
        pageTotal: list.length
      }

      const spy = jest.spyOn(userAnimeListServiceMock, 'find')
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
      const list = new UserAnimeListBuilder().build()
      const dto: UpdateUserAnimeListDto = {
        status: AnimeStatus.DROPPED
      }

      userAnimeListServiceMock.update.mockResolvedValue({
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
      const list = new UserAnimeListBuilder().build()
      const dto: UpdateUserAnimeListDto = {
        status: AnimeStatus.DROPPED
      }

      const spy = jest.spyOn(userAnimeListServiceMock, 'update').mockResolvedValue({
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
      const list = new UserAnimeListBuilder().build()

      const response = await controller.remove(list.uuid)

      expect(response).toEqual({
        statusCode: 200,
        message: 'the anime has been removed from your list'
      })
    });

    test('should call the service with correct params', async () => {
      const list = new UserAnimeListBuilder().build()

      const spy = jest.spyOn(userAnimeListServiceMock, 'remove')

      await controller.remove(list.uuid)

      expect(spy).toBeCalledWith(list.uuid)
    });
  });


});
