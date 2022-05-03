import faker from "@faker-js/faker";
import { Anime } from "@http/modules/anime/entities/anime.entity";
import { User } from "@http/modules/user/entities/user.entity";
import { fakeAnime, fakeUser } from "@src/__tests__/fakes";

import { UserAnimeList } from "../../entities/userAnimeList.entity";
import { AnimeStatus } from "../../types/animeStatus.enum";

export class UserAnimeListBuilder {
  private uuid: string;
  private status: AnimeStatus;
  private user: User;
  private anime: Anime;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor() {
    this.uuid = faker.datatype.uuid()
    this.status = AnimeStatus.COMPLETED
    this.anime = fakeAnime
    this.user = fakeUser
    this.createdAt = new Date()
    this.updatedAt = null
    this.deletedAt = null
  }

  build() {
    const list = new UserAnimeList()
    list.uuid = this.uuid
    list.status = this.status
    list.anime = this.anime
    list.user = this.user
    list.createdAt = this.createdAt
    list.updatedAt = this.updatedAt
    list.deletedAt = this.deletedAt
    return list
  }

  withUUID(uuid: string): UserAnimeListBuilder {
    this.uuid = uuid
    return this
  }

  withStatus(status: AnimeStatus): UserAnimeListBuilder {
    this.status = status
    return this
  }

  withAnime(anime: Anime): UserAnimeListBuilder {
    this.anime = anime
    return this
  }

  withUser(user: User): UserAnimeListBuilder {
    this.user = user
    return this
  }

}
