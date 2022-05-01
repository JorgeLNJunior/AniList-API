import { AnimeStatus } from "../../types/animeStatus.enum"

export const findUserAnimeListResponseExample = [
  {
    uuid: 'dce7b43b-d0ce-49cf-8436-52f36cc7241c',
    status: AnimeStatus.PLAN_TO_WATCH,
    user: {
      uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05',
    },
    anime: {
      uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05',
    },
    createdAt: '2022-04-11T23:29:24.000Z',
    updatedAt: null,
    deletedAt: null,
  }
]

export const addToUserAnimeListResponseExample = [
  {
    uuid: 'dce7b43b-d0ce-49cf-8436-52f36cc7241c',
    status: AnimeStatus.WATCHING,
    user: {
      uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05',
    },
    anime: {
      uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05',
    },
    createdAt: '2022-04-11T23:29:24.000Z',
    updatedAt: null,
    deletedAt: null,
  }
]

export const updateUserAnimeListResponseExample = [
  {
    uuid: 'dce7b43b-d0ce-49cf-8436-52f36cc7241c',
    status: AnimeStatus.DROPPED,
    user: {
      uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05',
    },
    anime: {
      uuid: '59bbcff9-aa45-4075-89d5-2170f397ed05',
    },
    createdAt: '2022-04-11T23:29:24.000Z',
    updatedAt: null,
    deletedAt: null,
  }
]
