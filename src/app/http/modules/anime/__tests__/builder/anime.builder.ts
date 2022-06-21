import { faker } from '@faker-js/faker';

import { Anime } from '../../entities/anime.entity';

export class AnimeBuilder {
  private anime: Anime;

  constructor() {
    this.anime = new Anime();
    this.anime.uuid = faker.datatype.uuid();
    this.anime.title = faker.lorem.words();
    this.anime.synopsis = faker.lorem.paragraph();
    this.anime.cover = faker.image.imageUrl();
    this.anime.episodes = faker.datatype.number({ min: 1, max: 25 });
    this.anime.genre = faker.lorem.word();
    this.anime.season = faker.lorem.word();
    this.anime.releaseDate = faker.date.recent().toString();
    this.anime.trailer = `http://youtube.com/watch?v=${faker.random.alphaNumeric()}`;
    this.anime.createdAt = new Date();
    this.anime.updatedAt = null;
    this.anime.deletedAt = null;
  }

  build() {
    return this.anime;
  }

  withUUID(uuid: string): AnimeBuilder {
    this.anime.uuid = uuid;
    return this;
  }

  withTitle(title: string): AnimeBuilder {
    this.anime.title = title;
    return this;
  }
}
