import { Anime } from '@http/modules/anime/entities/anime.entity';
import { DeepPartial } from 'typeorm';

export const animes: Anime[] = [
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

export const animeRepositoryMock = {
  createQueryBuilder: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockResolvedValueOnce(animes),
  })),
  findOne: jest.fn().mockResolvedValue(animes[0]),
  create: jest.fn().mockImplementation((dto: DeepPartial<Anime>) => dto),
  save: jest
    .fn()
    .mockImplementation((entity: Anime) =>
      Promise.resolve({ uuid: 'uuid', cover: 'cover', ...entity }),
    ),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
};
