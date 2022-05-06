export const voteRepositoryMock = {
  count: jest.fn().mockResolvedValue(10),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  save: jest.fn().mockResolvedValue(Promise.resolve()),
  softDelete: jest.fn().mockResolvedValue(Promise.resolve()),
}
