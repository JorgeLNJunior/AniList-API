export const reviewServiceMock = {
  create: jest.fn().mockResolvedValue(Promise.resolve()),
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  latest: jest.fn().mockResolvedValue(Promise.resolve()),
  getReviewVotes: jest.fn().mockResolvedValue(Promise.resolve()),
  update: jest.fn().mockResolvedValue(Promise.resolve()),
  delete: jest.fn().mockResolvedValue(Promise.resolve())
}
