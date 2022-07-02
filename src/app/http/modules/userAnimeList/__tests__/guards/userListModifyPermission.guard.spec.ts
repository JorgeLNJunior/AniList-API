import { createMock } from '@golevelup/ts-jest'
import { UserBuilder } from '@http/modules/user/__tests__/builders/user.builder'
import { userAnimeListRepositoryMock } from '@mocks/repositories/userList.repository.mock'
import { ExecutionContext } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { UserAnimeList } from '../../entities/userAnimeList.entity'
import { UserAnimeListModifyPermissionGuard } from '../../guards/userAnimeListModifyPermission.guard'
import { UserAnimeListBuilder } from '../builders/userAnimeList.builder'

describe('UserListModifyPermissionGuard', () => {
  let guard: UserAnimeListModifyPermissionGuard

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserAnimeListModifyPermissionGuard,
        {
          provide: getRepositoryToken(UserAnimeList),
          useValue: userAnimeListRepositoryMock
        }
      ]
    }).compile()

    guard = module.get(UserAnimeListModifyPermissionGuard)
  })

  afterEach(() => jest.clearAllMocks())

  describe('canActivate', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return true if the user is the list owner', async () => {
      const user = new UserBuilder().build()
      const list = new UserAnimeListBuilder().withUser(user).build()
      const ctx = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            user: { isAdmin: user.isAdmin, uuid: user.uuid },
            params: { uuid: list.uuid }
          })
        })
      })

      userAnimeListRepositoryMock.findOne = jest.fn().mockResolvedValue(list)

      const result = await guard.canActivate(ctx)

      expect(result).toBe(true)
    })

    test('should return false if the user is not the list owner', async () => {
      const user = new UserBuilder().build()
      const list = new UserAnimeListBuilder().build()
      const ctx = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            user: { isAdmin: user.isAdmin, uuid: user.uuid },
            params: { uuid: list.uuid }
          })
        })
      })

      userAnimeListRepositoryMock.findOne = jest.fn().mockResolvedValue(list)

      const result = await guard.canActivate(ctx)

      expect(result).toBe(false)
    })

    test('should return true if the user is an admin', async () => {
      const user = new UserBuilder().withIsAdmin(true).build()
      const list = new UserAnimeListBuilder().build()
      const ctx = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            user: { isAdmin: user.isAdmin, uuid: user.uuid },
            params: { uuid: list.uuid }
          })
        })
      })

      userAnimeListRepositoryMock.findOne = jest.fn().mockResolvedValue(list)

      const result = await guard.canActivate(ctx)

      expect(result).toBe(true)
    })
  })
})
