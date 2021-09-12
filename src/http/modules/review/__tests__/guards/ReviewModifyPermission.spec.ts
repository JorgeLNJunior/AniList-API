import { createMock } from '@golevelup/ts-jest';
import { reviewRepositoryMock } from '@mocks/reviewRepository.mock';
import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Review } from '../../entities/review.entity';
import { ReviewModifyPermissionGuard } from '../../guards/reviewModifyPermission.guard';

describe('ReviewModifyPermissionGuard', () => {
  let guard: ReviewModifyPermissionGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewModifyPermissionGuard,
        { provide: getRepositoryToken(Review), useValue: reviewRepositoryMock },
      ],
    }).compile();

    guard = module.get(ReviewModifyPermissionGuard);
  });

  afterEach(() => jest.clearAllMocks());

  test('should return true if the user is an admin', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: true, uuid: 'uuid' },
          params: { uuid: 'uuid' },
        }),
      }),
    });

    const result = await guard.canActivate(ctx);

    expect(result).toBe(true);
  });

  test('should return true if the user is the review author', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false, uuid: 'uuid' },
          params: { uuid: 'uuid' },
        }),
      }),
    });

    const result = await guard.canActivate(ctx);

    expect(result).toBe(true);
  });

  test('should return false if the user does not have permission', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false, uuid: 'a uuid' },
          params: { uuid: 'uuid' },
        }),
      }),
    });

    const result = await guard.canActivate(ctx);

    expect(result).toBe(false);
  });

  test('should throw a BadRequestException if the review was not found', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false, uuid: 'uuid' },
          params: { uuid: 'uuid' },
        }),
      }),
    });

    jest.spyOn(reviewRepositoryMock, 'findOne').mockResolvedValue(undefined);

    // eslint-disable-next-line jest/valid-expect
    expect(guard.canActivate(ctx)).rejects.toThrow(BadRequestException);
  });
});
