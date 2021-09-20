import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'

import { EmailConfirmationGuard } from '../../guard/emailConfirmation.guard'

describe('EmailConfirmationGuard', () => {
  let guard: EmailConfirmationGuard

  beforeEach(() => {
    guard = new EmailConfirmationGuard()
  })

  test('should return true if the email is already confirmed', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isEmailConfirmed: true }
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
          user: { isEmailConfirmed: false }
        })
      })
    })

    expect(() => {
      guard.canActivate(ctx)
    }).toThrow(UnauthorizedException)
  })
})
