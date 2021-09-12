import { User } from '@http/modules/user/entities/user.entity';

export const fakeUser: User = {
  uuid: 'uuid',
  name: 'name',
  email: 'email',
  password: 'password',
  avatar: 'avatar',
  isAdmin: false,
  isEmailConfirmed: true,
};

export const userRepositoryMock = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: jest.fn().mockReturnValue(fakeUser),
  find: jest.fn().mockResolvedValue([fakeUser, fakeUser, fakeUser]),
  findOne: jest.fn().mockResolvedValue(fakeUser),
  update: jest.fn().mockResolvedValue(true),
  save: jest.fn().mockResolvedValue(fakeUser),
  delete: jest.fn().mockResolvedValue(true),
};
