export const userAnimeListRepositoryMock = {
  create: jest.fn().mockImplementation((dto: any) => dto),
  count: jest.fn().mockReturnValue(10),
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  save: jest.fn().mockResolvedValue(Promise.resolve()),
  update: jest.fn().mockResolvedValue(Promise.resolve()),
  softDelete: jest.fn().mockResolvedValue(Promise.resolve())
}
