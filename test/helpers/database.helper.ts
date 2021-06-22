import { ConfigService } from '@nestjs/config';
import { createUserTable1624386610633 } from '@src/database/migrations/1624386610633-create_user_table';
import { Connection } from 'typeorm';

export class DatabaseHelper {
  static async dropDatabase() {
    const configService = new ConfigService();

    const connection = await new Connection({
      name: 'test',
      type: configService.get<any>('DB_TYPE') || 'mysql',
      host: configService.get<string>('DB_HOST') || 'localhost',
      port: configService.get<number>('DB_PORT') || 3306,
      username: configService.get<string>('DB_USER') || 'root',
      password: configService.get<string>('DB_PASSWORD') || 'root',
      database: configService.get<string>('DB_NAME') || 'an_review_test',
      synchronize: configService.get<boolean>('DB_SYNCHRONIZE') || false,
      migrations: [createUserTable1624386610633],
      migrationsRun: configService.get<boolean>('DB_MIGRATE') || false,
    }).connect();
    await connection.dropDatabase();
    await connection.close();
  }
}
