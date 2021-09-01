import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AnimeCloudinaryStorage } from './animeCloudinary.storage';
import { AnimeLocalStorage } from './animeLocal.storage';
import { IAnimeStorage } from './interface/anime.storage.interface';

@Injectable()
export class AnimeStorage implements IAnimeStorage {
  constructor(private configService: ConfigService) {
    this.setStorage();
  }

  private storage: IAnimeStorage;

  uploadCover(buffer: Buffer): Promise<string> {
    return this.storage.uploadCover(buffer);
  }

  deleteOldCover(url: string): Promise<void> {
    return this.storage.deleteOldCover(url);
  }

  private setStorage() {
    const env = this.configService.get<string>('STORAGE');

    switch (env) {
      case 'cloudinary':
        this.storage = new AnimeCloudinaryStorage(new ConfigService());
        break;
      case 'local':
        this.storage = new AnimeLocalStorage();
        break;
      default:
        throw new Error(`"${env}" is a invalid storage`);
    }
  }
}
