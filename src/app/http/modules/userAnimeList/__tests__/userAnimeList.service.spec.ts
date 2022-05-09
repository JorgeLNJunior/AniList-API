import { userAnimeListRepositoryMock } from "@mocks/repositories/userList.repository.mock";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { AddToUserAnimeListDto } from "../dto/addToUserAnimeList.dto";
import { UpdateUserAnimeListDto } from "../dto/updateUserAnimeList.dto";
import { UserAnimeList } from "../entities/userAnimeList.entity";
import { UserAnimeListQueryBuilder } from "../query/userAnimeList.query.builder";
import { UserAnimeListQuery } from "../query/userAnimeList.query.interface";
import { AnimeStatus } from "../types/animeStatus.enum";
import { UserAnimeListService } from "../userAnimeList.service";
import { UserAnimeListBuilder } from "./builders/userAnimeList.builder";

describe('UserListService', () => {
  let service: UserAnimeListService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserAnimeListService,
        {
          provide: getRepositoryToken(UserAnimeList),
          useValue: userAnimeListRepositoryMock
        }
      ]
    }).compile()

    service = module.get(UserAnimeListService)
  })

  afterEach(() => jest.clearAllMocks())

  describe('addToList', () => {
    afterEach(() => jest.clearAllMocks())

    test('should add an anime to user anime list', async () => {
      const userList = new UserAnimeListBuilder().build()

      const dto: AddToUserAnimeListDto = {
        animeUUID: userList.anime.uuid,
        status: userList.status
      }

      // mocks
      userAnimeListRepositoryMock.save = jest.fn().mockResolvedValue(userList)

      const result = await service.addToList(userList.user.uuid, dto)

      expect(result).toEqual(userList)
    });

    test('should call the repository with correct params', async () => {
      const userList = new UserAnimeListBuilder().build()

      const dto: AddToUserAnimeListDto = {
        animeUUID: userList.anime.uuid,
        status: userList.status
      }

      // mocks
      const createSpy = jest.spyOn(userAnimeListRepositoryMock, 'create')
        .mockReturnValue(userList)
      const saveSpy = jest.spyOn(userAnimeListRepositoryMock, 'save')
        .mockResolvedValue(userList)

      const result = await service.addToList(userList.user.uuid, dto)

      expect(createSpy).toBeCalledWith({
        user: { uuid: userList.user.uuid },
        anime: { uuid: dto.animeUUID },
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
        new UserAnimeListBuilder().build()
      ]

      // mocks
      userAnimeListRepositoryMock.find = jest.fn().mockResolvedValue(list)

      const result = await service.find({})

      expect(result).toEqual({
        pageTotal: list.length,
        total: 10,
        data: list
      })
    });

    test('should return a list of UserList when called with query params', async () => {
      const list = [
        new UserAnimeListBuilder().build()
      ]
      const query: UserAnimeListQuery = {
        uuid: list[0].uuid,
        skip: 0,
        take: 1
      }

      // mocks
      userAnimeListRepositoryMock.find = jest.fn().mockResolvedValue(list)

      const result = await service.find(query)

      expect(result).toEqual({
        pageTotal: list.length,
        total: 10,
        data: list
      })
    });

    test('should call the repository with correct params', async () => {
      const list = [
        new UserAnimeListBuilder().build()
      ]
      const query: UserAnimeListQuery = {
        uuid: list[0].uuid,
        skip: 0,
        take: 1
      }
      const findOptions = new UserAnimeListQueryBuilder(query).build()

      // mocks
      const countSpy = jest.spyOn(userAnimeListRepositoryMock, 'count')
        .mockResolvedValue(10)
      const findSpy = jest.spyOn(userAnimeListRepositoryMock, 'find')
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
        data: list
      })
    });
  });

  describe('update', () => {
    afterEach(() => jest.clearAllMocks())

    test('should update an user anime list', async () => {
      const list = new UserAnimeListBuilder()
        .withStatus(AnimeStatus.WATCHING)
        .build()
      const dto: UpdateUserAnimeListDto = {
        status: AnimeStatus.COMPLETED
      }

      // mocks
      userAnimeListRepositoryMock.findOne = jest.fn()
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
      const list = new UserAnimeListBuilder()
        .withStatus(AnimeStatus.WATCHING)
        .build()
      const dto: UpdateUserAnimeListDto = {
        status: AnimeStatus.COMPLETED
      }

      // mocks
      const updateSpy = jest.spyOn(userAnimeListRepositoryMock, 'update')
      const findSpy = jest.spyOn(userAnimeListRepositoryMock, 'findOne')
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
      const list = new UserAnimeListBuilder().build()

      //mocks
      const softDeleteSpy = jest.spyOn(userAnimeListRepositoryMock, 'softDelete')

      await service.remove(list.uuid)

      expect(softDeleteSpy).toBeCalledWith(list.uuid)
    });
  });


});
