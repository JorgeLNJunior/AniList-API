import { fakeUser } from './fakes';

export const userServiceMock = {
  find: jest.fn().mockResolvedValue([fakeUser]),
  findByEmail: jest.fn().mockResolvedValue(fakeUser),
  create: jest.fn().mockResolvedValue(fakeUser),
  update: jest.fn().mockResolvedValue(fakeUser),
  delete: jest.fn().mockResolvedValue(true),
  upload: jest.fn().mockResolvedValue('the image will be available soon'),
};
