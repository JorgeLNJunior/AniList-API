import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IUserStorage } from './interface/user.storage.interface'
import { UserCloudinaryStorage } from './userCloudinary.storage'
import { UserLocalStorage } from './userLocal.storage'

@Injectable()
export class UserStorage implements IUserStorage {
  constructor (private configService: ConfigService) {}

  uploadAvatar (buffer: Buffer): Promise<string> {
    return this.getStorage().uploadAvatar(buffer)
  }

  deleteOldAvatar (url: string): Promise<void> {
    return this.getStorage().deleteOldAvatar(url)
  }

  getStorage (): IUserStorage {
    const env = this.configService.get<string>('STORAGE')

    switch (env) {
      case 'cloudinary':
        return new UserCloudinaryStorage(new ConfigService())
      case 'local':
        return new UserLocalStorage()
      default:
        throw new Error(`"${env}" is not a valid storage`)
    }
  }
}
