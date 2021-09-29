import { fakeVote } from './fakes'

export const voteRepositoryMock = {
  count: jest.fn().mockResolvedValue(10),
  findOne: jest.fn().mockResolvedValue(fakeVote),
  find: jest.fn().mockResolvedValue([fakeVote]),
  save: jest.fn().mockResolvedValue(fakeVote),
  softDelete: jest.fn().mockResolvedValue(true),
}
