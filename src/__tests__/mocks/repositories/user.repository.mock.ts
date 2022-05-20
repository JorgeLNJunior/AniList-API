import { User } from '@http/modules/user/entities/user.entity';

export const userRepositoryMock = {
  count: jest.fn().mockResolvedValue(10),
  create: jest.fn().mockImplementation((entity: Partial<User>) => entity),
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  update: jest.fn().mockResolvedValue(Promise.resolve()),
  save: jest.fn().mockResolvedValue(Promise.resolve()),
  softDelete: jest.fn().mockResolvedValue(Promise.resolve()),
};
