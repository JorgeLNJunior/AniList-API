import { StorageService } from '@http/shared/types/storage.types';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AnimeCloudinaryStorage } from './animeCloudinary.storage';
import { AnimeLocalStorage } from './animeLocal.storage';
import { IAnimeStorage } from './types/anime.storage.interface';

@Injectable()
export class AnimeStorage implements IAnimeStorage {
  private readonly logger = new Logger(AnimeStorage.name);

  constructor(private configService: ConfigService) {}

  uploadCover(buffer: Buffer): Promise<string> {
    return this.getStorage().uploadCover(buffer);
  }

  deleteOldCover(url: string): Promise<void> {
    return this.getStorage().deleteOldCover(url);
  }

  // public method for testing purposes
  getStorage(): IAnimeStorage {
    const envStorageValue = this.configService.get<string>('STORAGE');

    switch (envStorageValue) {
      case StorageService.CLOUDINARY:
        return new AnimeCloudinaryStorage(new ConfigService());
      case StorageService.LOCAL:
        return new AnimeLocalStorage();
      default:
        this.logger.error(`"${envStorageValue}" is an invalid storage`);
        throw new InternalServerErrorException();
    }
  }
}
