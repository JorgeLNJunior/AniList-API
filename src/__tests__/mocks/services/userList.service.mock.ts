export const userAnimeListServiceMock = {
  addToList: jest.fn().mockResolvedValue(Promise.resolve()),
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  update: jest.fn().mockResolvedValue(Promise.resolve()),
  remove: jest.fn().mockResolvedValue(Promise.resolve())
}
