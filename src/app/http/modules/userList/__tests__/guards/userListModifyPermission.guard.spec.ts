import { createMock } from '@golevelup/ts-jest'
import { UserBuilder } from '@http/modules/user/__tests__/builders/user.builder';
import { userListRepositoryMock } from "@mocks/repositories/userList.repository.mock";
import { ExecutionContext } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserList } from "../../entities/userList.entity";
import { UserListModifyPermissionGuard } from "../../guards/userListModifyPermission.guard";
import { UserListBuilder } from "../builders/userList.builder";

describe('UserListModifyPermissionGuard', () => {
  let guard: UserListModifyPermissionGuard

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserListModifyPermissionGuard,
        {
          provide: getRepositoryToken(UserList),
          useValue: userListRepositoryMock
        }
      ]
    }).compile()

    guard = module.get(UserListModifyPermissionGuard)
  })

  afterEach(() => jest.clearAllMocks())

  describe('canActivate', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return true if the user is the list owner', async () => {
      const user = new UserBuilder().build()
      const list = new UserListBuilder().withUser(user).build()
      const ctx = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            user: { isAdmin: user.isAdmin, uuid: user.uuid },
            params: { uuid: list.uuid }
          })
        })
      })

      userListRepositoryMock.findOne = jest.fn().mockResolvedValue(list)

      const result = await guard.canActivate(ctx)

      expect(result).toBe(true)
    });

    test('should return false if the user is not the list owner', async () => {
      const user = new UserBuilder().build()
      const list = new UserListBuilder().build()
      const ctx = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            user: { isAdmin: user.isAdmin, uuid: user.uuid },
            params: { uuid: list.uuid }
          })
        })
      })

      userListRepositoryMock.findOne = jest.fn().mockResolvedValue(list)

      const result = await guard.canActivate(ctx)

      expect(result).toBe(false)
    });

    test('should return true if the user is an admin', async () => {
      const user = new UserBuilder().withIsAdmin(true).build()
      const list = new UserListBuilder().build()
      const ctx = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            user: { isAdmin: user.isAdmin, uuid: user.uuid },
            params: { uuid: list.uuid }
          })
        })
      })

      userListRepositoryMock.findOne = jest.fn().mockResolvedValue(list)

      const result = await guard.canActivate(ctx)

      expect(result).toBe(true)
    });

  });

});
