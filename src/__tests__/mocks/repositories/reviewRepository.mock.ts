export const reviewRepositoryMock = {
  count: jest.fn().mockResolvedValue(10),
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(Promise.resolve()),
  update: jest.fn().mockResolvedValue(Promise.resolve()),
  softDelete: jest.fn().mockResolvedValue(Promise.resolve())
}
