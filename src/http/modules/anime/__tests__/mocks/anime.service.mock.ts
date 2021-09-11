import { CreateAnimeDto } from '../../dto/create-anime.dto';
import { Anime } from '../../entities/anime.entity';

export const fakeAnimes: Anime[] = [
  {
    uuid: 'uuid',
    title: 'title',
    synopsis: 'synopsis',
    cover: 'cover',
    trailer: 'trailer',
    episodes: 10,
    releaseDate: '2020-10-21',
  },
  {
    uuid: 'uuid',
    title: 'title2',
    synopsis: 'synopsis2',
    cover: 'cover2',
    trailer: 'trailer2',
    episodes: 16,
    releaseDate: '2019-08-10',
  },
];

export const animeServiceMock = {
  find: jest.fn().mockResolvedValue(fakeAnimes),
  top: jest.fn().mockResolvedValue(fakeAnimes),
  create: jest
    .fn()
    .mockImplementation((dto: CreateAnimeDto) =>
      Promise.resolve({ uuid: 'uuid', cover: 'cover', ...dto }),
    ),
  update: jest.fn().mockImplementation((uuid: string, dto: CreateAnimeDto) =>
    Promise.resolve({
      uuid: uuid,
      cover: 'cover',
      synopsis: 'synopsis',
      episodes: 10,
      releaseDate: '2020-05-13',
      ...dto,
    }),
  ),
  delete: jest.fn().mockResolvedValue(true),
  upload: jest.fn().mockResolvedValue('the image will be available soon'),
};
