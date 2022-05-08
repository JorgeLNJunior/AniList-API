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
