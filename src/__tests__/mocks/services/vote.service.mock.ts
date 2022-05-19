export const voteServiceMock = {
  create: jest.fn().mockResolvedValue(Promise.resolve()),
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  delete: jest.fn().mockResolvedValue(Promise.resolve()),
}
