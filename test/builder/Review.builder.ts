import { Anime } from '@modules/anime/entities/anime.entity';
import * as faker from 'faker';

export class ReviewBuilder {
  private review: FakeReview = {
    title: faker.lorem.word(),
    description: faker.lorem.words(10),
    rating: faker.datatype.number(5),
    anime: faker.datatype.uuid(),
  };

  static aReview() {
    return new ReviewBuilder();
  }

  withAnime(anime: Anime) {
    this.review.anime = anime.uuid;
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
