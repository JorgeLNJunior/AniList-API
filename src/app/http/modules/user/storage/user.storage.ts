import { StorageService } from '@http/shared/types/storage.types'
import {
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IUserStorage } from './types/user.storage.interface'
import { UserCloudinaryStorage } from './userCloudinary.storage'
import { UserLocalStorage } from './userLocal.storage'

@Injectable()
export class UserStorage implements IUserStorage {
  private readonly logger = new Logger(UserStorage.name)

  constructor(private configService: ConfigService) {}

  uploadAvatar(buffer: Buffer): Promise<string> {
    return this.getStorage().uploadAvatar(buffer)
  }

  deleteOldAvatar(url: string): Promise<void> {
    return this.getStorage().deleteOldAvatar(url)
  }

  // public method for testing purposes
  getStorage(): IUserStorage {
    const envStorageValue = this.configService.get<string>('STORAGE')

    switch (envStorageValue) {
      case StorageService.CLOUDINARY:
        return new UserCloudinaryStorage(new ConfigService())
      case StorageService.LOCAL:
        return new UserLocalStorage()
      default:
        this.logger.error(`"${envStorageValue}" is not a valid storage`)
        throw new InternalServerErrorException()
    }
  }
}
