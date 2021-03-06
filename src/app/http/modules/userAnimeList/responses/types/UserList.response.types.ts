import { DeepPartial } from 'typeorm'

import { UserAnimeList } from '../../entities/userAnimeList.entity'
import { AnimeStatus } from '../../types/animeStatus.enum'

export const findUserAnimeListResponseExample: DeepPartial<UserAnimeList[]> = [
  {
    uuid: 'dce7b43b-d0ce-49cf-8436-52f36cc7241c',
    status: AnimeStatus.PLAN_TO_WATCH,
    user: {
      uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05'
    },
    anime: {
      uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05'
    },
    createdAt: '2022-04-11T23:29:24.000Z',
    updatedAt: null,
    deletedAt: null
  }
]

export const findOneUserAnimeListResponseExample: DeepPartial<UserAnimeList> = {
  uuid: 'dce7b43b-d0ce-49cf-8436-52f36cc7241c',
  status: AnimeStatus.PLAN_TO_WATCH,
  user: {
    uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05'
  },
  anime: {
    uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05'
  },
  createdAt: '2022-04-11T23:29:24.000Z',
  updatedAt: null,
  deletedAt: null
}

export const addToUserAnimeListResponseExample: DeepPartial<UserAnimeList> = {
  uuid: 'dce7b43b-d0ce-49cf-8436-52f36cc7241c',
  status: AnimeStatus.WATCHING,
  user: {
    uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05'
  },
  anime: {
    uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05'
  },
  createdAt: '2022-04-11T23:29:24.000Z',
  updatedAt: null,
  deletedAt: null
}

export const updateUserAnimeListResponseExample: DeepPartial<UserAnimeList> = {
  uuid: 'dce7b43b-d0ce-49cf-8436-52f36cc7241c',
  status: AnimeStatus.DROPPED,
  user: {
    uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05'
  },
  anime: {
    uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05'
  },
  createdAt: '2022-04-11T23:29:24.000Z',
  updatedAt: null,
  deletedAt: null
}
