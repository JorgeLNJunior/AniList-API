import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IUserStorage } from './interface/user.storage.interface';
import { UserCloudinaryStorage } from './userCloudinary.storage';
import { UserLocalStorage } from './userLocal.storage';

@Injectable()
export class UserStorage implements IUserStorage {
  constructor(private configService: ConfigService) {
    this.setStorage();
  }

  private storage: IUserStorage;

  uploadAvatar(buffer: Buffer): Promise<string> {
    return this.storage.uploadAvatar(buffer);
  }

  deleteOldAvatar(url: string): Promise<void> {
    return this.deleteOldAvatar(url);
  }

  private setStorage() {
    const env = this.configService.get<string>('STORAGE');

    switch (env) {
      case 'cloudinary':
        this.storage = new UserCloudinaryStorage(new ConfigService());
        break;
      case 'local':
        this.storage = new UserLocalStorage();
        break;
      default:
        throw new Error(`"${env}" is not a valid storage`);
    }
  }
}
