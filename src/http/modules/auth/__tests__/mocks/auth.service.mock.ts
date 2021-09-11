import { fakeUser } from '@src/http/modules/user/__tests__/mocks/user.service.mock';

export const authServiceMock = {
  register: jest.fn().mockResolvedValue(fakeUser),
  login: jest.fn().mockResolvedValue('token'),
  confirmEmail: jest.fn().mockResolvedValue(true),
};