import { Anime } from '@http/modules/anime/entities/anime.entity'
import { Review } from '@http/modules/review/entities/review.entity'
import { User } from '@http/modules/user/entities/user.entity'
import { Vote } from '@http/modules/vote/entities/vote.entity'

export const fakeUser: User = {
  uuid: 'uuid',
  name: 'name',
  email: 'email',
  password: 'password',
  avatar: 'avatar',
  isAdmin: false,
  isActive: true,
  createdAt: new Date('2020-01-01'),
  updatedAt: null,
  deletedAt: null
}

export const fakeAnime: Anime = {
  uuid: 'uuid',
  title: 'title',
  synopsis: 'synopsis',
  cover: 'cover',
  trailer: 'trailer',
  episodes: 10,
  releaseDate: '2020-10-21',
  season: 'Fall 2021',
  genre: 'genre',
  createdAt: new Date('2020-01-01'),
  updatedAt: null,
  deletedAt: null
}

export const fakeReview: Review = {
  uuid: 'uuid',
  anime: fakeAnime,
  title: 'title',
  description: 'description',
  rating: 5,
  user: fakeUser,
  createdAt: new Date('2020-01-01'),
  updatedAt: null,
  deletedAt: null
}

export const fakeVote: Vote = {
  uuid: 'uuid',
  user: fakeUser,
  review: fakeReview,
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null
}
