import { fakeUser } from './fakes'

export const userRepositoryMock = {
  count: jest.fn().mockResolvedValue(10),
  create: jest.fn().mockReturnValue(fakeUser),
  find: jest.fn().mockResolvedValue([fakeUser]),
  findOne: jest.fn().mockResolvedValue(fakeUser),
  update: jest.fn().mockResolvedValue(true),
  save: jest.fn().mockResolvedValue(fakeUser),
  softDelete: jest.fn().mockResolvedValue(true)
}
