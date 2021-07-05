import { Anime } from '@modules/anime/entities/anime.entity';
import { Review } from '@modules/review/entities/review.entity';
import { User } from '@modules/user/entities/user.entity';
import * as faker from 'faker';
import { getRepository } from 'typeorm';

export class ReviewBuilder {
  private review: FakeReview = {
    title: faker.lorem.word(),
    description: faker.lorem.words(10),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    anime: faker.datatype.uuid(),
  };

  private user: User;

  static aReview() {
    return new ReviewBuilder();
  }

  withAnime(anime: Anime) {
    this.review.anime = anime.uuid;
    return this;
  }

  withUser(user: User) {
    this.user = user;
    return this;
  }

  withRating(rating: number) {
    this.review.rating = rating;
    return this;
  }

  withoutTitle() {
    delete this.review.title;
    return this;
  }

  withoutDescription() {
    delete this.review.description;
    return this;
  }

  withoutRating() {
    delete this.review.rating;
    return this;
  }

  withoutAnime() {
    delete this.review.anime;
    return this;
  }

  async persist() {
    const reviewRespository = getRepository(Review);
    const animeRespository = getRepository(Anime);

    const anime = await animeRespository.findOne(this.review.anime);

    const review = reviewRespository.create({
      title: this.review.title,
      description: this.review.description,
      rating: this.review.rating,
      anime: anime,
      user: this.user,
    });
    return reviewRespository.save(review);
  }

  build() {
    return this.review;
  }
}

export interface FakeReview {
  title: string;
  description: string;
  rating: number;
  anime: string;
}
