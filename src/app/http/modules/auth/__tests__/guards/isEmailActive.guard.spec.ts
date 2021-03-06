import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'

import { IsEmailActiveGuard } from '../../guard/isEmailActive.guard'

describe('IsEmailActiveGuard', () => {
  let guard: IsEmailActiveGuard

  beforeEach(() => {
    guard = new IsEmailActiveGuard()
  })

  test('should return true if the email is already confirmed', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isActive: true }
        })
      })
    })

    const result = guard.canActivate(ctx)

    expect(result).toBe(true)
  })

  test('should return throw a UnauthorizedException if the email is not confirmed', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isActive: false }
        })
      })
    })

    expect(() => {
      guard.canActivate(ctx)
    }).toThrow(UnauthorizedException)
  })
})
