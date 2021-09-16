import { Anime } from '@http/modules/anime/entities/anime.entity';
import { Review } from '@http/modules/review/entities/review.entity';
import { User } from '@http/modules/user/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import * as faker from 'faker';
import { Connection } from 'typeorm';

@Injectable()
export class ReviewSeeder {
  private readonly logger = new Logger(ReviewSeeder.name);

  constructor(@InjectConnection() private connection: Connection) {}

  async run() {
    try {
      const users = await this.getUsers();
      const animes = await this.getAnimes();

      for (const user of users) {
        for (const anime of animes) {
          await this.insert({
            title: faker.lorem.words(3),
            description: faker.lorem.paragraph().slice(0, 999),
            rating: faker.datatype.number({ min: 1, max: 5 }),
            anime: anime.uuid,
            user: user.uuid,
          });
        }
      }
      this.logger.log('Review seed finished');
    } catch (error) {
      this.logger.error('Review seed error', error.message);
    }
  }

  private async getUsers() {
    return this.connection
      .createQueryBuilder()
      .select()
      .from(User, 'user')
      .limit(5)
      .getRawMany();
  }

  private async getAnimes() {
    return this.connection
      .createQueryBuilder()
      .select()
      .from(Anime, 'anime')
      .limit(10)
      .getRawMany();
  }

  private async insert(dto: any) {
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(Review)
      .values({
        anime: { uuid: dto.anime },
        title: dto.title,
        description: dto.description,
        rating: dto.rating,
        user: { uuid: dto.user },
        createdAt: new Date(),
      })
      .execute();
  }
}
