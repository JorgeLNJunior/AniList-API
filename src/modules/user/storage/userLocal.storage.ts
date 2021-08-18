import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

import { IUserStorage } from './user.storage.interface';

export class UserLocalStorage implements IUserStorage {
  uploadAvatar(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const name = `${v4()}.jpeg`;
      const dir = `${path.resolve('public', 'user', 'avatar')}/${name}`;

      fs.writeFile(dir, buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(`${process.env.APP_HOST}/user/avatar/${name}`);
        }
      });
    });
  }
}
