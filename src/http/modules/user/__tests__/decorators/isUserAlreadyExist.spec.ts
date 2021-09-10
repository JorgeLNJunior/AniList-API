import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { IsUserAlreadyExistConstraint } from '../../decorators/isUserAlreadyExist.decorator';
import { User } from '../../entities/user.entity';
import { userRepositoryMock } from '../mocks/user.repository.mock';

describe('IsUserAlreadyExistDecorator', () => {
  let decorator: IsUserAlreadyExistConstraint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsUserAlreadyExistConstraint,
        { provide: getRepositoryToken(User), useValue: userRepositoryMock },
      ],
    }).compile();

    decorator = module.get(IsUserAlreadyExistConstraint);
  });

  describe('validate', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return false if the user already exists', async () => {
      const result = await decorator.validate('email');
      expect(result).toBe(false);
    });

    test('should return true if the user does not exist', async () => {
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined);

      const result = await decorator.validate('email');
      expect(result).toBe(true);
    });
  });

  describe('defaultMessage', () => {
    test('should return a default message', () => {
      const message = decorator.defaultMessage();
      expect(message).toBe('this email is already registered');
    });
  });
});
