import { IsValidAnimeUUIDConstraint } from '@http/modules/anime/decorators/isValidAnimeUUID.decorator';
import { animeRepositoryMock } from '@mocks/repositories/anime.respository.mock';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Anime } from '../../entities/anime.entity';
import { AnimeBuilder } from '../builder/anime.builder';

describe('IsValidAnimeUUIDConstraint', () => {
  let decorator: IsValidAnimeUUIDConstraint;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        IsValidAnimeUUIDConstraint,
        {
          provide: getRepositoryToken(Anime),
          useValue: animeRepositoryMock,
        },
      ],
    }).compile();

    decorator = module.get(IsValidAnimeUUIDConstraint);
  });
  afterEach(() => jest.clearAllMocks());

  describe('validate', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return true if it receives a valid anime uuid', async () => {
      const anime = new AnimeBuilder().build();

      animeRepositoryMock.findOne.mockResolvedValue(anime);

      const result = await decorator.validate(anime.uuid);

      expect(result).toBe(true);
    });

    test('should return false if it receives an invalid anime uuid', async () => {
      const uuid = 'uuid';

      animeRepositoryMock.findOne.mockResolvedValue(undefined);

      const result = await decorator.validate(uuid);

      expect(result).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return the default message', async () => {
      const message = decorator.defaultMessage();

      expect(message).toBe('this anime does not exist');
    });
  });
});
