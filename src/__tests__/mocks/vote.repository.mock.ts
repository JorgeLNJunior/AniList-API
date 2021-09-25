import { fakeVote } from './fakes'

export const voteRepositoryMock = {
  save: jest.fn().mockResolvedValue(fakeVote),
  findOne: jest.fn().mockResolvedValue(fakeVote)
}
