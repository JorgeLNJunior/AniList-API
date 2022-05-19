import { Vote } from "@http/modules/vote/entities/vote.entity";
import { DeepPartial } from "typeorm";

import { Review } from "../../entities/review.entity";

export const createReviewResponseExample: DeepPartial<Review> = {
  uuid: 'b852dcea-f442-4141-97f5-0567d9f25b1d',
  title: 'naruto',
  description: 'Proin at pulvinar enim, eget vulputate sem...',
  rating: 4,
  anime: {
    uuid: '5fe7e1fb-1341-4625-bbaf-72688a697624'
  },
  user: {
    uuid: 'd83c3162-923a-4cb2-8ec5-d3bc5f3c38a6',
  },
  createdAt: '2021-09-16 14:38:09',
  updatedAt: null,
  deletedAt: null,
}

export const updateReviewResponseExample: DeepPartial<Review> = {
  uuid: 'b852dcea-f442-4141-97f5-0567d9f25b1d',
  title: 'naruto',
  description: 'Proin at pulvinar enim, eget vulputate sem...',
  rating: 4,
  createdAt: '2021-09-16 14:38:09',
  updatedAt: null,
  anime: {
    uuid: '5fe7e1fb-1341-4625-bbaf-72688a697624',
  },
  user: {
    uuid: 'd83c3162-923a-4cb2-8ec5-d3bc5f3c38a6',
  }
}

export const findReviewResponseExample: DeepPartial<Review[]> = [
  {
    uuid: 'b852dcea-f442-4141-97f5-0567d9f25b1d',
    title: 'naruto',
    description: 'Proin at pulvinar enim, eget vulputate sem...',
    rating: 4,
    anime: {
      uuid: '5fe7e1fb-1341-4625-bbaf-72688a697624',
    },
    user: {
      uuid: 'd83c3162-923a-4cb2-8ec5-d3bc5f3c38a6',
    },
    createdAt: '2021-09-16 14:38:09',
    updatedAt: null,
    deletedAt: null
  }
]

export const findOneReviewResponseExample: DeepPartial<Review> = {
  uuid: 'b852dcea-f442-4141-97f5-0567d9f25b1d',
  title: 'naruto',
  description: 'Proin at pulvinar enim, eget vulputate sem...',
  rating: 4,
  anime: {
    uuid: '5fe7e1fb-1341-4625-bbaf-72688a697624',
  },
  user: {
    uuid: 'd83c3162-923a-4cb2-8ec5-d3bc5f3c38a6',
  },
  createdAt: '2021-09-16 14:38:09',
  updatedAt: null,
  deletedAt: null
}

export const findReviewVotesResponseExample: DeepPartial<Vote[]> = [
  {
    uuid: '4b493deb-3923-4fe8-bf76-8e62a5d3aa18',
    createdAt: '2021-09-25T23:21:39.000Z',
    updatedAt: null,
    deletedAt: null,
    user: {
      uuid: '2183467f-42ba-44cd-913d-e4f53de5ca61',
    },
  }
]
