import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions, v2 as cloudinary } from 'cloudinary';

import { IAnimeStorage } from './anime.storage.interface';

@Injectable()
export class AnimeCloudinaryStorage implements IAnimeStorage {
  constructor(private configService: ConfigService) {}

  uploadCover(buffer: Buffer): Promise<string> {
    cloudinary.config(this.getConfig());

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'an_review/anime/cover' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.url);
          }
        })
        .end(buffer);
    });
  }

  deleteOldCover(url: string) {
    return new Promise<void>((resolve, reject) => {
      const fileId = url.split('/').pop().split('.').shift();
      cloudinary.uploader.destroy(fileId, {}, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  private getConfig() {
    return {
      cloud_name: this.configService.get<string>('CLOUDINARY_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_SECRET'),
      secure: true,
    } as ConfigOptions;
  }
}
