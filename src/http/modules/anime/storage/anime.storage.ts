import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AnimeCloudinaryStorage } from './animeCloudinary.storage'
import { AnimeLocalStorage } from './animeLocal.storage'
import { IAnimeStorage } from './interface/anime.storage.interface'

@Injectable()
export class AnimeStorage implements IAnimeStorage {
  constructor (private configService: ConfigService) {}

  private storage: IAnimeStorage;

  uploadCover (buffer: Buffer): Promise<string> {
    return this.getStorage().uploadCover(buffer)
  }

  deleteOldCover (url: string): Promise<void> {
    return this.getStorage().deleteOldCover(url)
  }

  getStorage () {
    const env = this.configService.get<string>('STORAGE')

    switch (env) {
      case 'cloudinary':
        return new AnimeCloudinaryStorage(new ConfigService())
      case 'local':
        return new AnimeLocalStorage()
      default:
        throw new Error(`"${env}" is a invalid storage`)
    }
  }
}
