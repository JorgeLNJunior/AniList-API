import { createMock } from '@golevelup/ts-jest'
import { userAnimeListRepositoryMock } from "@mocks/repositories/userList.repository.mock";
import { BadRequestException, ExecutionContext } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserAnimeList } from "../../entities/userAnimeList.entity";
import { IsAlreadyInUserAnimeListGuard } from "../../guards/isAlreadyInUserAnimeList.guard";
import { UserAnimeListBuilder } from "../builders/userAnimeList.builder";

describe('IsAlreadyInUserAnimeListGuard', () => {
  let guard: IsAlreadyInUserAnimeListGuard

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        IsAlreadyInUserAnimeListGuard,
        {
          provide: getRepositoryToken(UserAnimeList),
          useValue: userAnimeListRepositoryMock
        }
      ]
    }).compile()

    guard = module.get(IsAlreadyInUserAnimeListGuard)
  })

  afterEach(() => jest.clearAllMocks())

  describe('canActivate', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return true if the anime is not in user list', async () => {
      const list = new UserAnimeListBuilder().build()
      const ctx = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            user: { isAdmin: false, uuid: 'uuid' },
            body: { animeUuid: list.uuid }
          })
        })
      })

      userAnimeListRepositoryMock.findOne = jest.fn().mockResolvedValue(undefined)

      const result = await guard.canActivate(ctx)

      expect(result).toBe(true)
    });

    test('should throw a BadRequestException if the anime is already in user list', async () => {
      const list = new UserAnimeListBuilder().build()
      const ctx = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            user: { isAdmin: false, uuid: 'uuid' },
            body: { animeUuid: list.uuid }
          })
        })
      })

      userAnimeListRepositoryMock.findOne = jest.fn().mockResolvedValue(list)

      // eslint-disable-next-line jest/valid-expect
      expect(guard.canActivate(ctx)).rejects.toThrow(
        new BadRequestException(['this anime is already in your list'])
      )
    });
  });

});
