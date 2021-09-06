import * as fs from 'fs';

import { UserLocalStorage } from '../../storage/userLocal.storage';

describe('UserLocalStorage', () => {
  let userStorage: UserLocalStorage;

  beforeEach(() => {
    userStorage = new UserLocalStorage();
  });

  describe('uploadAvatar', () => {
    test('should return a url', async () => {
      const fsSpy = jest
        .spyOn(fs.promises, 'writeFile')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation((path: string, buffer: Buffer) =>
          Promise.resolve(),
        );

      process.env.APP_HOST = 'host';

      const buffer = Buffer.from('');
      const url = await userStorage.uploadAvatar(buffer);

      expect(typeof url).toBe('string');
      expect(fsSpy).toBeCalledTimes(1);
    });
  });

  describe('deleteOldAvatar', () => {
    test('should delete a file', async () => {
      const fsSpy = jest
        .spyOn(fs.promises, 'unlink')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation((path: string) => Promise.resolve());

      await userStorage.deleteOldAvatar('url/uuid.jpg');

      expect(fsSpy).toBeCalledTimes(1);
    });
  });
});
