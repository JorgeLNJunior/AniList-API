export const authServiceMock = {
  register: jest.fn().mockResolvedValue(Promise.resolve()),
  login: jest.fn().mockResolvedValue(Promise.resolve()),
  activateEmail: jest.fn().mockResolvedValue(Promise.resolve())
}
