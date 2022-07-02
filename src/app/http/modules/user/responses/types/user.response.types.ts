import { Review } from '@http/modules/review/entities/review.entity'
import { UserAnimeList } from '@http/modules/userAnimeList/entities/userAnimeList.entity'
import { AnimeStatus } from '@http/modules/userAnimeList/types/animeStatus.enum'
import { Vote } from '@http/modules/vote/entities/vote.entity'
import { DeepPartial } from 'typeorm'

import { User } from '../../entities/user.entity'

export const findUserAnimeListByUserResponseExample: DeepPartial<
  UserAnimeList[]
> = [
  {
    uuid: '6873e916-e3e4-4d53-857c-115b8bd3fcd3',
    status: AnimeStatus.COMPLETED,
    createdAt: '2022-04-26T23:06:49.000Z',
    updatedAt: null,
    deletedAt: null,
    anime: {
      uuid: '6a0a41c9-2eb2-43f9-a837-ffe48ee6c0e9'
    }
  }
]

export const findUserReviewsResponseExample: DeepPartial<Review[]> = [
  {
    uuid: 'b852dcea-f442-4141-97f5-0567d9f25b1d',
    title: 'naruto',
    description: 'Proin at pulvinar enim, eget vulputate sem...',
    rating: 4,
    anime: {
      uuid: '5fe7e1fb-1341-4625-bbaf-72688a697624'
    },
    createdAt: '2021-09-16 14:38:09',
    updatedAt: null,
    deletedAt: null
  }
]

export const findUserVotesResponseExample: DeepPartial<Vote[]> = [
  {
    uuid: '4b493deb-3923-4fe8-bf76-8e62a5d3aa18',
    createdAt: '2021-09-25T23:21:39.000Z',
    updatedAt: null,
    deletedAt: null,
    review: {
      uuid: '0f620699-3acc-4f83-a5fb-2f446151d0e0'
    }
  }
]

export const findUsersResponseExample: DeepPartial<User[]> = [
  {
    uuid: '1c12dd97-839e-4058-91f0-e75934b02d52',
    name: 'Easton',
    email: 'easton.hamill@gmail.com',
    avatar: 'https://cdn.fakercloud.com/avatars/waghner_128.jpg',
    isActive: true,
    isAdmin: false,
    createdAt: '2021-09-16 14:38:09',
    updatedAt: null,
    deletedAt: null
  }
]

export const findOneUserResponseExample: DeepPartial<User> = {
  uuid: '1c12dd97-839e-4058-91f0-e75934b02d52',
  name: 'Easton',
  email: 'easton.hamill@gmail.com',
  avatar: 'https://cdn.fakercloud.com/avatars/waghner_128.jpg',
  isActive: true,
  isAdmin: false,
  createdAt: '2021-09-16 14:38:09',
  updatedAt: null,
  deletedAt: null
}

export const updateUserResponseExample: DeepPartial<User> = {
  uuid: '1c12dd97-839e-4058-91f0-e75934b02d52',
  name: 'Easton',
  email: 'easton.hamill@gmail.com',
  avatar: 'https://cdn.fakercloud.com/avatars/waghner_128.jpg',
  isActive: true,
  isAdmin: false,
  createdAt: '2021-09-16 14:38:09',
  updatedAt: null,
  deletedAt: null
}
