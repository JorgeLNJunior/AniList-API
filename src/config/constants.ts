import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createUserTable1624386610633 } from '@src/database/migrations/1624386610633-create_user_table';

@Injectable()
export class Constants {
  static databaseConfig(): TypeOrmModuleOptions {
    const configService = new ConfigService();
    const config: TypeOrmModuleOptions = {
      type: configService.get<any>('DB_TYPE') || 'mysql',
      host: configService.get<string>('DB_HOST') || 'localhost',
      port: configService.get<number>('DB_PORT') || 3306,
      username: configService.get<string>('DB_USER') || 'root',
      password: configService.get<string>('DB_PASSWORD') || 'root',
      database: configService.get<string>('DB_NAME') || 'an_review',
      synchronize: configService.get<boolean>('DB_SYNCHRONIZE') || false,
      autoLoadEntities: true,
      migrations: [createUserTable1624386610633],
      migrationsRun: configService.get<boolean>('DB_MIGRATE') || false,
    };
    return config;
  }

  static jwtOptions(): JwtModuleOptions {
    const configService = new ConfigService();
    return {
      secret: configService.get<string>('APP_SECRET') || 'peDf4broGS',
      signOptions: {
        expiresIn: configService.get<string>('TOKEN_EXP') || '1d',
      },
    };
  }
}
