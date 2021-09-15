import { fakeReview } from './fakes';

export const reviewRepositoryMock = {
  find: jest.fn().mockResolvedValue([fakeReview]),
  findOne: jest.fn().mockResolvedValue(fakeReview),
  create: jest.fn().mockResolvedValue(fakeReview),
  save: jest.fn().mockResolvedValue(fakeReview),
  update: jest.fn().mockResolvedValue(fakeReview),
  delete: jest.fn().mockResolvedValue(true),
};
