import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext } from '@nestjs/common'

import { UserModifyPermissionGuard } from '../../guards/userModifyPermission.guard'

describe('UserModifyPermissionGuard', () => {
  let guard: UserModifyPermissionGuard

  beforeEach(async () => {
    guard = new UserModifyPermissionGuard()
  })

  describe('normal user', () => {
    test('should return true if user has permission', async () => {
      const ctxMock = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            params: { uuid: 'uuid' },
            user: { uuid: 'uuid', isAdmin: false }
          })
        })
      })

      expect(guard.canActivate(ctxMock)).toBe(true)
    })

    test('should return false if user does not have permission', async () => {
      const ctxMock = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            params: { uuid: 'another-uuid' },
            user: { uuid: 'uuid', isAdmin: false }
          })
        })
      })

      expect(guard.canActivate(ctxMock)).toBe(false)
    })
  })

  describe('admin user', () => {
    test('should return true if user is has admin permission', async () => {
      const ctxMock = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            params: { uuid: 'another-uuid' },
            user: { uuid: 'uuid', isAdmin: true }
          })
        })
      })

      expect(guard.canActivate(ctxMock)).toBe(true)
    })
  })
})
