import { ConfigService } from '@nestjs/config';

import { IUserStorage } from './user.storage.interface';
import { UserCloudinaryStorage } from './userCloudinary.storage';
import { UserLocalStorage } from './userLocal.storage';

export class UserStorage {
  static getInstance(): IUserStorage {
    const env = process.env.STORAGE;
    if (env === 'cloudinary') {
      return new UserCloudinaryStorage(new ConfigService());
    } else {
      return new UserLocalStorage();
    }
  }
}
