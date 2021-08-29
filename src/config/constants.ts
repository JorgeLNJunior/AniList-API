import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'cloudinary';

@Injectable()
export class Constants {
  static cloudinaryConfig(): ConfigOptions {
    const configService = new ConfigService();
    return {
      cloud_name: configService.get<string>('CLOUDINARY_NAME'),
      api_key: configService.get<string>('CLOUDINARY_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_SECRET'),
      secure: true,
    };
  }

  static redisConfig() {
    const configService = new ConfigService();
    return {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    };
  }
}
