import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createUserTable1624386610633 } from '@src/database/migrations/1624386610633-create_user_table';

export class Constants {
  private configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  databaseConfig(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: this.configService.get<any>('DB_TYPE') || 'mysql',
      host: this.configService.get<string>('DB_HOST') || 'localhost',
      port: this.configService.get<number>('DB_PORT') || 3306,
      username: this.configService.get<string>('DB_USER') || 'root',
      password: this.configService.get<string>('DB_PASSWORD') || 'root',
      database: this.configService.get<string>('DB_NAME') || 'an_review',
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE') || false,
      autoLoadEntities: true,
      migrations: [createUserTable1624386610633],
      migrationsRun: this.configService.get<boolean>('DB_MIGRATE') || false,
    };
    return config;
  }
}
