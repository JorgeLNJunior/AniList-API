import { faker } from '@faker-js/faker'
import { AnimeBuilder } from '@http/modules/anime/__tests__/builder/anime.builder'
import { Anime } from '@http/modules/anime/entities/anime.entity'
import { UserBuilder } from '@http/modules/user/__tests__/builders/user.builder'
import { User } from '@http/modules/user/entities/user.entity'

import { Review } from '../../entities/review.entity'

export class ReviewBuilder {
  private review: Review

  constructor() {
    this.review = new Review()
    this.review.uuid = faker.datatype.uuid()
    this.review.title = faker.lorem.words()
    this.review.description = faker.lorem.sentence()
    this.review.rating = faker.datatype.number({ min: 1, max: 5 })
    this.review.anime = new AnimeBuilder().build()
    this.review.user = new UserBuilder().build()
    this.review.createdAt = new Date()
    this.review.updatedAt = null
    this.review.deletedAt = null
  }

  build() {
    return this.review
  }

  withUUID(uuid: string): ReviewBuilder {
    this.review.uuid = uuid
    return this
  }

  withAnime(anime: Anime): ReviewBuilder {
    this.review.anime = anime
    return this
  }

  withUser(user: User): ReviewBuilder {
    this.review.user = user
    return this
  }
}
