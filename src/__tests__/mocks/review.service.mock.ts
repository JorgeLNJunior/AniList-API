import { fakeReview } from './fakes';

export const reviewServiceMock = {
  create: jest.fn().mockResolvedValue(fakeReview),
  find: jest
    .fn()
    .mockResolvedValue({ results: [fakeReview], pageTotal: 1, total: 10 }),
  update: jest.fn().mockResolvedValue(fakeReview),
  delete: jest.fn().mockResolvedValue(true),
};
