import { fakeUser } from './fakes';

export const userRepositoryMock = {
  create: jest.fn().mockReturnValue(fakeUser),
  find: jest.fn().mockResolvedValue([fakeUser, fakeUser, fakeUser]),
  findOne: jest.fn().mockResolvedValue(fakeUser),
  update: jest.fn().mockResolvedValue(true),
  save: jest.fn().mockResolvedValue(fakeUser),
  delete: jest.fn().mockResolvedValue(true),
};
