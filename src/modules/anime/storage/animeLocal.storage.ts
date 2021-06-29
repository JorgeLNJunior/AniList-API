import * as fs from 'fs';
import * as path from 'path';

import { IAnimeStorage } from './anime.storage.interface';

export class AnimeLocalStorage implements IAnimeStorage {
  uploadCover(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const extension = file.originalname.split('.').pop();
      const name = `${Date.now()}.${extension}`;
      const dir = `${path.resolve('public', 'anime', 'cover')}/${name}`;

      fs.writeFile(dir, file.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(`${process.env.APP_HOST}/anime/cover/${name}`);
        }
      });
    });
  }
}
