import { createMock } from '@golevelup/ts-jest';
import { CoverCompressionConsumer } from '@http/modules/anime/consumers/cover.consumer';
import { Anime } from '@http/modules/anime/entities/anime.entity';
import { AnimeStorage } from '@http/modules/anime/storage/anime.storage';
import { animeRepositoryMock } from '@mocks/repositories/anime.respository.mock';
import { CoverCompressJob } from '@modules/queue/types/jobs.interface';
import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Bull from 'bull';
import * as fs from 'fs/promises';

import { AnimeBuilder } from '../builder/anime.builder';

jest.mock('sharp', () => () => ({
  jpeg: () => ({
    toBuffer: () => ({}),
  }),
}));

jest.mock('fs/promises', () => ({
  rm: () => ({}),
}));

describe('CoverCompressionConsumer', () => {
  let consumer: CoverCompressionConsumer;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CoverCompressionConsumer,
        {
          provide: getRepositoryToken(Anime),
          useValue: animeRepositoryMock,
        },
        {
          provide: AnimeStorage,
          useValue: {
            uploadCover: jest.fn().mockResolvedValue(Promise.resolve()),
            deleteOldCover: jest.fn().mockResolvedValue(Promise.resolve()),
          },
        },
      ],
    }).compile();

    consumer = module.get(CoverCompressionConsumer);
  });

  afterEach(() => jest.clearAllMocks());

  describe('compress', () => {
    test('should compress an avatar', async () => {
      const anime = new AnimeBuilder().build();
      const job = createMock<Bull.Job<CoverCompressJob>>({
        id: 'id',
        data: { animeUUID: anime.uuid, path: 'path' },
      });

      const consumerSpy = jest.spyOn(consumer, 'compress');
      const fsSpy = jest.spyOn(fs, 'rm');
      animeRepositoryMock.findOne.mockResolvedValue(anime);

      await consumer.compress(job);

      expect(consumerSpy).toBeCalled();
      expect(fsSpy).toBeCalled();
    });
  });

  describe('onError', () => {
    test('should log a error', async () => {
      const error = new Error('error message');

      const loggerSpy = jest.spyOn(Logger.prototype, 'error');

      consumer.onError(error);

      expect(loggerSpy).toBeCalledTimes(1);
      expect(loggerSpy).toBeCalledWith('Error when process a queue', error);
    });
  });
});
