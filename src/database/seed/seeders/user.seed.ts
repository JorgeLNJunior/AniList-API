import { User } from '@http/modules/user/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import * as faker from 'faker';
import { Connection } from 'typeorm';

@Injectable()
export class UserSeeder {
  private readonly logger = new Logger(UserSeeder.name);

  constructor(@InjectConnection() private connection: Connection) {}

  async run(times = 5) {
    try {
      for (let index = 0; index < times; index++) {
        await this.insert();
      }
      this.logger.log('User seed finished');
    } catch (error) {
      this.logger.error('User seed error', error.message);
    }
  }

  private async insert() {
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: faker.name.firstName(),
        email: faker.internet.email().toLowerCase(),
        password: hashSync('123456', 10),
        avatar: faker.internet.avatar(),
        isEmailConfirmed: true,
      })
      .execute();
  }
}
