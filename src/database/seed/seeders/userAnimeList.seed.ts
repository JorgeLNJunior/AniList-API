import { Anime } from '@http/modules/anime/entities/anime.entity'
import { User } from '@http/modules/user/entities/user.entity'
import { UserAnimeList } from '@http/modules/userAnimeList/entities/userAnimeList.entity'
import { AnimeStatus } from '@http/modules/userAnimeList/types/animeStatus.enum'
import { Injectable, Logger } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

interface insertDTO {
  animeUUID: string
  userUUID: string
}

@Injectable()
export class UserAnimeListSeeder {
  private readonly logger = new Logger(UserAnimeListSeeder.name)

  constructor(@InjectConnection() private connection: Connection) {}

  async run() {
    const users = await this.getUsers()
    const animes = await this.getAnimes()

    for (const user of users) {
      for (const anime of animes) {
        await this.insert({
          animeUUID: anime.uuid,
          userUUID: user.uuid
        })
      }
    }

    this.logger.log('User anime list seed finished')
  }

  private async getUsers() {
    return this.connection
      .createQueryBuilder()
      .select()
      .from(User, 'user')
      .orderBy('RAND()')
      .limit(5)
      .getRawMany()
  }

  private async getAnimes() {
    return this.connection
      .createQueryBuilder()
      .select()
      .from(Anime, 'anime')
      .orderBy('RAND()')
      .limit(10)
      .getRawMany()
  }

  private async insert(dto: insertDTO) {
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(UserAnimeList)
      .values({
        anime: { uuid: dto.animeUUID },
        user: { uuid: dto.userUUID },
        status: this.randEnumValue(AnimeStatus)
      })
      .execute()
  }

  private randEnumValue<T>(enumObj: T): T[keyof T] {
    const enumValues = Object.values(enumObj)
    const index = Math.floor(Math.random() * enumValues.length)

    return enumValues[index]
  }
}
