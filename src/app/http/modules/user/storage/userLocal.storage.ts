import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

import { IUserStorage } from './types/user.storage.interface';

export class UserLocalStorage implements IUserStorage {
  async uploadAvatar(buffer: Buffer): Promise<string> {
    const name = `${v4()}.jpeg`;
    const dir = `${path.resolve('public', 'user', 'avatar')}/${name}`;
    await fs.promises.writeFile(dir, buffer);
    return `${process.env.APP_HOST}/user/avatar/${name}`;
  }

  async deleteOldAvatar(url: string) {
    const fileName = url.split('/').pop();
    await fs.promises.unlink(
      `${path.resolve('public', 'user', 'avatar')}/${fileName}`,
    );
  }
}
