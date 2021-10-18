import { fakeUser } from '../../fakes'

export const userServiceMock = {
  find: jest
    .fn()
    .mockResolvedValue({ results: [fakeUser], pageTotal: 1, total: 10 }),
  create: jest.fn().mockResolvedValue(fakeUser),
  update: jest.fn().mockResolvedValue(fakeUser),
  delete: jest.fn().mockResolvedValue(true),
  upload: jest.fn().mockResolvedValue('the image will be available soon')
}
