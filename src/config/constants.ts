import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createUserTable1624386610633 } from '@src/database/migrations/1624386610633-create_user_table';
import { createAnimeTable1624810395846 } from '@src/database/migrations/1624810395846-create_anime_table';
import { createReviewTable1625254721286 } from '@src/database/migrations/1625254721286-create_review_table';
import { ConfigOptions } from 'cloudinary';

@Injectable()
export class Constants {
  static databaseConfig(): TypeOrmModuleOptions {
    const configService = new ConfigService();
    const config: TypeOrmModuleOptions = {
      type: configService.get<any>('DB_TYPE'),
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
      autoLoadEntities: true,
      migrations: [
        createUserTable1624386610633,
        createAnimeTable1624810395846,
        createReviewTable1625254721286,
      ],
      migrationsRun: configService.get<boolean>('DB_MIGRATE'),
    };

    return config;
  }

  static jwtOptions(): JwtModuleOptions {
    const configService = new ConfigService();
    return {
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRES'),
      },
    };
  }

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
