import { faker } from '@faker-js/faker'
import { User } from '@http/modules/user/entities/user.entity'
import { Injectable, Logger } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { hashSync } from 'bcrypt'
import { Connection } from 'typeorm'

@Injectable()
export class UserSeeder {
  private readonly logger = new Logger(UserSeeder.name)

  constructor(@InjectConnection() private connection: Connection) {}

  async run(times = 15) {
    for (let index = 0; index < times; index++) {
      await this.insert()
    }

    this.logger.log('User seed finished')
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
        isActive: true
      })
      .execute()
  }
}
