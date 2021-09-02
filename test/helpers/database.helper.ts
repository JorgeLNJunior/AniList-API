import { ConfigService } from '@nestjs/config';
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
    }).connect();
    await connection.dropDatabase();
    await connection.close();
  }
}
