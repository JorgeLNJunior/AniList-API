import { ConfigService } from '@nestjs/config';

import { IAnimeStorage } from './anime.storage.interface';
import { AnimeCloudinaryStorage } from './animeCloudinary.storage';
import { AnimeLocalStorage } from './animeLocal.storage';

export class AnimeStorage {
  static getInstance(): IAnimeStorage {
    const env = process.env.STORAGE;
    if (env === 'cloudinary') {
      return new AnimeCloudinaryStorage(new ConfigService());
    } else {
      return new AnimeLocalStorage();
    }
  }
}
