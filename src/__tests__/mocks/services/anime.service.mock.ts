import { CreateAnimeDto } from '@http/modules/anime/dto/create-anime.dto';

export const animeServiceMock = {
  find: jest.fn().mockResolvedValue(Promise.resolve()),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  top: jest.fn().mockResolvedValue(Promise.resolve()),
  getAnimeReviews: jest.fn().mockResolvedValue(Promise.resolve()),
  create: jest.fn().mockImplementation((dto: CreateAnimeDto) => dto),
  update: jest.fn().mockResolvedValue(Promise.resolve()),
  delete: jest.fn().mockResolvedValue(Promise.resolve()),
  upload: jest.fn().mockResolvedValue('the image will be available soon'),
};
