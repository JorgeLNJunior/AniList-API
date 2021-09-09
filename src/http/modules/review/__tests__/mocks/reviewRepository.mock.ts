import { fakeAnimes } from '@src/http/modules/anime/__tests__/mocks/anime.service.mock';
import { fakeUser } from '@src/http/modules/user/__tests__/mocks/user.repository.mock';

import { Review } from '../../entities/review.entity';

export const fakeReview: Review = {
  uuid: 'uuid',
  anime: fakeAnimes[0],
  title: 'title',
  description: 'description',
  rating: 5,
  user: fakeUser,
};

export const reviewRepositoryMock = {
  find: jest.fn().mockResolvedValue([fakeReview]),
  findOne: jest.fn().mockResolvedValue(fakeReview),
  create: jest.fn().mockResolvedValue(fakeReview),
  save: jest.fn().mockResolvedValue(fakeReview),
  update: jest.fn().mockResolvedValue(fakeReview),
  delete: jest.fn().mockResolvedValue(true),
};
