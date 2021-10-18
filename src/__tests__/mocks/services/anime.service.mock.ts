import { CreateAnimeDto } from '@http/modules/anime/dto/create-anime.dto'

import { fakeAnime } from '../../fakes'

export const animeServiceMock = {
  find: jest
    .fn()
    .mockResolvedValue({ results: [fakeAnime], pageTotal: 1, total: 10 }),
  top: jest.fn().mockResolvedValue([fakeAnime]),
  create: jest
    .fn()
    .mockImplementation((dto: CreateAnimeDto) =>
      Promise.resolve({ uuid: 'uuid', cover: 'cover', ...dto })
    ),
  update: jest.fn().mockImplementation((uuid: string, dto: CreateAnimeDto) =>
    Promise.resolve({
      uuid: uuid,
      cover: 'cover',
      synopsis: 'synopsis',
      episodes: 10,
      releaseDate: '2020-05-13',
      ...dto
    })
  ),
  delete: jest.fn().mockResolvedValue(true),
  upload: jest.fn().mockResolvedValue('the image will be available soon')
}
