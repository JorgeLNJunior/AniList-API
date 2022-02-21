import { Anime } from "@http/modules/anime/entities/anime.entity";
import { HttpService } from "@http/shared/services/http.service";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";

@Injectable()
export class AnimeSeeder {
  private readonly logger = new Logger(AnimeSeeder.name);

  constructor(
    @InjectConnection() private connection: Connection,
    private httpService: HttpService
  ) { }

  async run() {
    try {
      const animes = (await this.findAnimes()).data.data

      for (let index = 0; index < animes.length; index++) {
        await this.insert({
          title: animes[index].attributes.titles.en_jp,
          synopsis: animes[index].attributes.synopsis.slice(0, 999),
          releaseDate: animes[index].attributes.startDate,
          episodes: animes[index].attributes.episodeCount || 999,
          trailer: `https://youtube.com/watch?v=${animes[index].attributes.youtubeVideoId}`,
          cover: animes[index].attributes.coverImage.original,
          season: "winter 2015",
          genre: "unknow",
          createdAt: new Date(),
        });
      }

      this.logger.log("Anime seed finished", AnimeSeeder.name);
    } catch (error) {
      this.logger.error("Anime seed error", error.message, AnimeSeeder.name);
    }
  }

  findAnimes() {
    return this.httpService.get("https://kitsu.io/api/edge/trending/anime");
  }

  async insert(dto: any) {
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(Anime)
      .values(dto)
      .execute();
  }
}
