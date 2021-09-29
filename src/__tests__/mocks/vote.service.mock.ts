import { fakeVote } from "./fakes";

export const voteServiceMock = {
  create: jest.fn().mockResolvedValue(fakeVote),
  find: jest.fn().mockResolvedValue({ results: [fakeVote], total: 10, pageTotal: 1 })
}
