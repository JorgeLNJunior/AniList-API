import { Anime } from '@http/modules/anime/entities/anime.entity';
import * as faker from 'faker';
import { getRepository } from 'typeorm';

export class AnimeBuilder {
  private anime: FakeAnime = {
    title: faker.lorem.word(),
    synopsis: faker.lorem.paragraph(),
    cover: faker.image.imageUrl(),
    trailer: `https://youtube.com/watch?v=${faker.random.alpha({
      upcase: true,
    })}`,
    episodes: faker.datatype.number({ min: 1, max: 100 }),
    releaseDate: `${faker.datatype.number({
      min: 2000,
      max: 2021,
    })}-${faker.datatype.number({ min: 10, max: 12 })}-${faker.datatype.number({
      min: 10,
      max: 31,
    })}`,
  };

  static aAnime() {
    return new AnimeBuilder();
  }

  withoutTitle() {
    delete this.anime.title;
    return this;
  }

  withoutSynopsis() {
    delete this.anime.synopsis;
    return this;
  }

  withoutTrailer() {
    delete this.anime.trailer;
    return this;
  }

  withoutEpisodes() {
    delete this.anime.episodes;
    return this;
  }

  withoutCover() {
    delete this.anime.cover;
    return this;
  }

  withTrailer(trailer: string) {
    this.anime.trailer = trailer;
    return this;
  }

  async persist() {
    const animeRespository = getRepository(Anime);

    const anime = animeRespository.create(this.anime);
    return animeRespository.save(anime);
  }

  build() {
    return this.anime;
  }
}

export interface FakeAnime {
  title: string;
  synopsis: string;
  cover?: string;
  trailer: string;
  episodes: number;
  releaseDate: string;
}
