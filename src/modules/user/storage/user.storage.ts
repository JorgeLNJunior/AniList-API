import { Injectable } from '@nestjs/common';

import { IUserStorage } from './user.storage.interface';
import { UserCloudinaryStorage } from './userCloudinary.storage';
import { UserLocalStorage } from './userLocal.storage';

@Injectable()
export class UserStorage {
  static getInstance(): IUserStorage {
    const env = process.env.STORAGE;
    if (env === 'cloudinary') {
      return new UserCloudinaryStorage();
    } else {
      return new UserLocalStorage();
    }
  }
}
