import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

import { IAnimeStorage } from './interface/anime.storage.interface';

export class AnimeLocalStorage implements IAnimeStorage {
  uploadCover(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const name = `${v4()}.jpeg`;
      const dir = `${path.resolve('public', 'anime', 'cover')}/${name}`;

      fs.writeFile(dir, buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(`${process.env.APP_HOST}/anime/cover/${name}`);
        }
      });
    });
  }

  deleteOldCover(url: string) {
    return new Promise<void>((resolve, reject) => {
      const fileName = url.split('/').pop();
      fs.unlink(
        `${path.resolve('public', 'anime', 'cover')}/${fileName}`,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }
}
