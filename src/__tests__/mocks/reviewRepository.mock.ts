import { fakeReview } from './fakes';

export const reviewRepositoryMock = {
  count: jest.fn().mockResolvedValue(10),
  find: jest.fn().mockResolvedValue([fakeReview]),
  findOne: jest.fn().mockResolvedValue(fakeReview),
  create: jest.fn().mockResolvedValue(fakeReview),
  save: jest.fn().mockResolvedValue(fakeReview),
  update: jest.fn().mockResolvedValue(fakeReview),
  softDelete: jest.fn().mockResolvedValue(true),
};
