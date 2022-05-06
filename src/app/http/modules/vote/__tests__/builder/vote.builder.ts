import faker from "@faker-js/faker";
import { ReviewBuilder } from "@http/modules/review/__tests__/builder/review.builder";
import { Review } from "@http/modules/review/entities/review.entity";
import { UserBuilder } from "@http/modules/user/__tests__/builders/user.builder";
import { User } from "@http/modules/user/entities/user.entity";

import { Vote } from "../../entities/vote.entity";

export class VoteBuilder {
  private vote: Vote

  constructor() {
    this.vote = new Vote()
    this.vote.uuid = faker.datatype.uuid()
    this.vote.review = new ReviewBuilder().build()
    this.vote.user = new UserBuilder().build()
    this.vote.createdAt = new Date()
    this.vote.updatedAt = null
    this.vote.deletedAt = null
  }

  build() {
    return this.vote
  }

  withUUID(uuid: string): VoteBuilder {
    this.vote.uuid = uuid
    return this
  }

  withReview(review: Review): VoteBuilder {
    this.vote.review = review
    return this
  }

  withUser(user: User): VoteBuilder {
    this.vote.user = user
    return this
  }

}
