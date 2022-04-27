import { userListRepositoryMock } from "@mocks/repositories/userList.repository.mock";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { AddToUserListDto } from "../dto/addToUserList.dto";
import { UpdateUserListDto } from "../dto/updateUserList.dto";
import { UserList } from "../entities/userList.entity";
import { UserListQueryBuilder } from "../query/userList.query.builder";
import { UserListQuery } from "../query/userList.query.interface";
import { AnimeStatus } from "../types/animeStatus.enum";
import { UserListService } from "../userList.service";
import { UserListBuilder } from "./builders/userList.builder";

describe('UserListService', () => {
  let service: UserListService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserListService,
        {
          provide: getRepositoryToken(UserList),
          useValue: userListRepositoryMock
        }
      ]
    }).compile()

    service = module.get(UserListService)
  })

  afterEach(() => jest.clearAllMocks())

  describe('addToList', () => {
    afterEach(() => jest.clearAllMocks())

    test('should add an anime to user anime list', async () => {
      const userList = new UserListBuilder().build()

      const dto: AddToUserListDto = {
        animeUuid: userList.anime.uuid,
        status: userList.status
      }

      // mocks
      userListRepositoryMock.save = jest.fn().mockResolvedValue(userList)

      const result = await service.addToList(userList.user.uuid, dto)

      expect(result).toEqual(userList)
    });

    test('should call the repository with correct params', async () => {
      const userList = new UserListBuilder().build()

      const dto: AddToUserListDto = {
        animeUuid: userList.anime.uuid,
        status: userList.status
      }

      // mocks
      const createSpy = jest.spyOn(userListRepositoryMock, 'create')
        .mockReturnValue(userList)
      const saveSpy = jest.spyOn(userListRepositoryMock, 'save')
        .mockResolvedValue(userList)

      const result = await service.addToList(userList.user.uuid, dto)

      expect(createSpy).toBeCalledWith({
        user: { uuid: userList.user.uuid },
        anime: { uuid: dto.animeUuid },
        status: dto.status
      })
      expect(saveSpy).toBeCalledWith(userList)
      expect(result).toEqual(userList)
    });
  });

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of UserList', async () => {
      const list = [
        new UserListBuilder().build()
      ]

      // mocks
      userListRepositoryMock.find = jest.fn().mockResolvedValue(list)

      const result = await service.find({})

      expect(result).toEqual({
        pageTotal: list.length,
        total: 10,
        results: list
      })
    });

    test('should return a list of UserList when called with query params', async () => {
      const list = [
        new UserListBuilder().build()
      ]
      const query: UserListQuery = {
        uuid: list[0].uuid,
        skip: 0,
        take: 1
      }

      // mocks
      userListRepositoryMock.find = jest.fn().mockResolvedValue(list)

      const result = await service.find(query)

      expect(result).toEqual({
        pageTotal: list.length,
        total: 10,
        results: list
      })
    });

    test('should call the repository with correct params', async () => {
      const list = [
        new UserListBuilder().build()
      ]
      const query: UserListQuery = {
        uuid: list[0].uuid,
        skip: 0,
        take: 1
      }
      const findOptions = new UserListQueryBuilder(query).build()

      // mocks
      const countSpy = jest.spyOn(userListRepositoryMock, 'count')
        .mockResolvedValue(10)
      const findSpy = jest.spyOn(userListRepositoryMock, 'find')
        .mockResolvedValue(list)

      const result = await service.find(query)

      expect(countSpy).toBeCalledWith({
        where: findOptions.where
      })
      expect(findSpy).toBeCalledWith({
        loadRelationIds: {
          disableMixedMap: true,
          relations: ['anime', 'user']
        },
        ...findOptions
      })
      expect(result).toEqual({
        pageTotal: list.length,
        total: 10,
        results: list
      })
    });
  });

  describe('update', () => {
    afterEach(() => jest.clearAllMocks())

    test('should update an user anime list', async () => {
      const list = new UserListBuilder()
        .withStatus(AnimeStatus.WATCHING)
        .build()
      const dto: UpdateUserListDto = {
        status: AnimeStatus.COMPLETED
      }

      // mocks
      userListRepositoryMock.findOne = jest.fn()
        .mockResolvedValue({
          status: dto.status,
          ...list
        })

      const result = await service.update(list.uuid, dto)

      expect(result).toEqual({
        status: dto.status,
        ...list
      })
    });

    test('should call the repository with correct params', async () => {
      const list = new UserListBuilder()
        .withStatus(AnimeStatus.WATCHING)
        .build()
      const dto: UpdateUserListDto = {
        status: AnimeStatus.COMPLETED
      }

      // mocks
      const updateSpy = jest.spyOn(userListRepositoryMock, 'update')
      const findSpy = jest.spyOn(userListRepositoryMock, 'findOne')
        .mockResolvedValue({
          status: dto.status,
          ...list
        })

      const result = await service.update(list.uuid, dto)

      expect(updateSpy).toBeCalledWith(list.uuid, dto)
      expect(findSpy).toBeCalledWith(list.uuid, {
        loadRelationIds: {
          disableMixedMap: true,
          relations: ['anime', 'user']
        },
      })
      expect(result).toEqual({
        status: dto.status,
        ...list
      })
    });
  });

  describe('remove', () => {
    test('should remove an anime from user anime list', async () => {
      const list = new UserListBuilder().build()

      //mocks
      const softDeleteSpy = jest.spyOn(userListRepositoryMock, 'softDelete')

      await service.remove(list.uuid)

      expect(softDeleteSpy).toBeCalledWith(list.uuid)
    });
  });


});
