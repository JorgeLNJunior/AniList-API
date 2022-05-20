import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

import { IsAdminGuard } from '../isAdmin.guard';

describe('IsAdminGuard', () => {
  let guard: IsAdminGuard;

  beforeEach(() => {
    guard = new IsAdminGuard();
  });

  test('should return true if the user is an admin', async () => {
    const ctxMock = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: true },
        }),
      }),
    });
    const result = guard.canActivate(ctxMock);
    expect(result).toBe(true);
  });

  test('should return false if the user is not an admin', async () => {
    const ctxMock = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false },
        }),
      }),
    });
    const result = guard.canActivate(ctxMock);
    expect(result).toBe(false);
  });
});
