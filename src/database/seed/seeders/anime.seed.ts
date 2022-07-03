import { Anime } from '@http/modules/anime/entities/anime.entity'
import { HttpService } from '@http/shared/services/http.service'
import { Injectable, Logger } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

@Injectable()
export class AnimeSeeder {
  private readonly logger = new Logger(AnimeSeeder.name)

  constructor(
    @InjectConnection() private connection: Connection,
    private httpService: HttpService
  ) {}

  async run() {
    const animes = (await this.findAnimes()).data.data

    for (let index = 0; index < animes.length; index++) {
      await this.insert({
        title: animes[index].title,
        synopsis: animes[index].synopsis,
        releaseDate: animes[index].aired.from,
        episodes: animes[index].episodes || 999,
        trailer: animes[index].trailer.url || 'unknown',
        cover: animes[index].images.jpg.image_url,
        season: animes[index].season || 'unknown',
        genre: animes[index].genres[0].name,
        createdAt: new Date()
      })
    }

    this.logger.log('Anime seed finished')
  }

  findAnimes() {
    return this.httpService.get('https://api.jikan.moe/v4/anime?limit=15')
  }

  async insert(dto: any) {
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(Anime)
      .values(dto)
      .execute()
  }
}
