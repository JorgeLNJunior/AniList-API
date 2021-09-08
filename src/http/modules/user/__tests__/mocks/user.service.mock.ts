export const fakeUser = {
  uuid: 'uuid',
  name: 'name',
  email: 'email',
  password: 'password',
  avatar: 'avatar',
  isEmailConfirmed: true,
};

export const userServiceMock = {
  find: jest.fn().mockResolvedValue([fakeUser]),
  findByEmail: jest.fn().mockResolvedValue(fakeUser),
  create: jest.fn().mockResolvedValue(fakeUser),
  update: jest.fn().mockResolvedValue(fakeUser),
  delete: jest.fn().mockResolvedValue(true),
  upload: jest.fn().mockResolvedValue('the image will be avaliable soon'),
};
