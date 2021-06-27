import { Constants } from '@config/constants';
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' }); // cloudnary

import { IUserStorage } from './user.storage.interface';

export class UserCloudinaryStorage implements IUserStorage {
  uploadAvatar(file: Express.Multer.File): Promise<string> {
    const config = Constants.cloudinaryConfig();
    cloudinary.config(config);
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'an_review/user/avatar' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.url);
          }
        })
        .end(file.buffer);
    });
  }
}
