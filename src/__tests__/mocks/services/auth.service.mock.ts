import { fakeUser } from '../../fakes'

export const authServiceMock = {
  register: jest.fn().mockResolvedValue(fakeUser),
  login: jest.fn().mockResolvedValue('token'),
  activateEmail: jest.fn().mockResolvedValue(true)
}
