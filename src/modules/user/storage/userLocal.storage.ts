import * as fs from 'fs';
import * as path from 'path';

import { IUserStorage } from './user.storage.interface';

export class UserLocalStorage implements IUserStorage {
  uploadAvatar(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const extension = file.originalname.split('.').pop();
      const name = `${Date.now()}.${extension}`;
      const dir = `${path.resolve('public', 'user', 'avatar')}/${name}`;

      fs.writeFile(dir, file.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(`${process.env.APP_HOST}/user/avatar/${name}`);
        }
      });
    });
  }
}
