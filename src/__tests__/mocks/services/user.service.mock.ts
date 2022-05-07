export const userServiceMock = {
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  create: jest.fn().mockResolvedValue(Promise.resolve()),
  update: jest.fn().mockResolvedValue(Promise.resolve()),
  delete: jest.fn().mockResolvedValue(Promise.resolve()),
  upload: jest.fn().mockResolvedValue('the image will be available soon'),
  getUserAnimeList: jest.fn().mockResolvedValue(Promise.resolve())
}
