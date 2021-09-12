import { Review } from '@http/modules/review/entities/review.entity';
import { fakeAnimes } from '@mocks/anime.service.mock';
import { fakeUser } from '@mocks/user.repository.mock';

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
