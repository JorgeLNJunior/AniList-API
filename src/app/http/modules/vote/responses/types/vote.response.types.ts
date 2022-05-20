import { DeepPartial } from 'typeorm';

import { Vote } from '../../entities/vote.entity';

export const createVoteResponseExample: DeepPartial<Vote> = {
  uuid: '7397f870-20d8-424c-b9f2-c49d3129c650',
  createdAt: '2021-09-27T22:27:51.000Z',
  user: {
    uuid: '2183467f-42ba-44cd-913d-e4f53de5ca61',
  },
  review: {
    uuid: '150e0f98-14be-45f2-ad14-3f214ba34781',
  },
  updatedAt: null,
  deletedAt: null,
};

export const findVoteResponseExample: DeepPartial<Vote[]> = [
  {
    uuid: '4b493deb-3923-4fe8-bf76-8e62a5d3aa18',
    createdAt: '2021-09-25T23:21:39.000Z',
    updatedAt: null,
    deletedAt: null,
    user: {
      uuid: '2183467f-42ba-44cd-913d-e4f53de5ca61',
    },
    review: {
      uuid: '0f620699-3acc-4f83-a5fb-2f446151d0e0',
    },
  },
];

export const findOneVoteResponseExample: DeepPartial<Vote> = {
  uuid: '4b493deb-3923-4fe8-bf76-8e62a5d3aa18',
  createdAt: '2021-09-25T23:21:39.000Z',
  updatedAt: null,
  deletedAt: null,
  user: {
    uuid: '2183467f-42ba-44cd-913d-e4f53de5ca61',
  },
  review: {
    uuid: '0f620699-3acc-4f83-a5fb-2f446151d0e0',
  },
};
