import { fakeReview } from './fakes';

export const reviewServiceMock = {
  create: jest.fn().mockResolvedValue(fakeReview),
  find: jest.fn().mockResolvedValue([fakeReview]),
  update: jest.fn().mockResolvedValue(fakeReview),
  delete: jest.fn().mockResolvedValue(true),
};
