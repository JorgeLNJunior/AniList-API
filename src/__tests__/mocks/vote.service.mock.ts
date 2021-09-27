import { fakeVote } from "./fakes";

export const voteServiceMock = {
  create: jest.fn().mockResolvedValue(fakeVote)
}
