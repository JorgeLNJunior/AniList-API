import { Constants } from '@config/constants';
import { v2 as cloudinary } from 'cloudinary';

import { IAnimeStorage } from './anime.storage.interface';

export class AnimeCloudinaryStorage implements IAnimeStorage {
  uploadCover(buffer: Buffer): Promise<string> {
    const config = Constants.cloudinaryConfig();
    cloudinary.config(config);
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
}
