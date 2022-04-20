import { createMock } from "@golevelup/ts-jest";
import { Anime } from "@http/modules/anime/entities/anime.entity";
import { AnimeStorage } from "@http/modules/anime/storage/anime.storage";
import { animeRepositoryMock } from "@mocks/repositories/anime.respository.mock";
import { Logger } from '@nestjs/common'
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import Bull from "bull";
import * as fs from 'fs/promises'

import { CoverCompressionConsumer } from "../cover.consumer";
import { CoverCompressJob } from "../types/jobs.interface";

jest.mock('sharp', () => () => ({
  jpeg: () => ({
    toBuffer: () => ({})
  })
}))

jest.mock('fs/promises', () => ({
  rm: () => ({})
}))

describe('CoverCompressionConsumer', () => {
  let consumer: CoverCompressionConsumer

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CoverCompressionConsumer,
        {
          provide: getRepositoryToken(Anime),
          useValue: animeRepositoryMock
        },
        {
          provide: AnimeStorage,
          useValue: {
            uploadCover: jest.fn().mockResolvedValue(Promise.resolve()),
            deleteOldCover: jest.fn().mockResolvedValue(Promise.resolve()),
          }
        }
      ]
    }).compile()

    consumer = module.get(CoverCompressionConsumer)
  })

  afterEach(() => jest.clearAllMocks())

  describe('compress', () => {
    test('should compress an avatar', async () => {
      const consumerSpy = jest.spyOn(consumer, 'compress')
      const fsSpy = jest.spyOn(fs, 'rm')

      const job = createMock<Bull.Job<CoverCompressJob>>({
        id: 'id',
        data: { animeUuid: 'uuid', path: 'path' }
      })
      await consumer.compress(job)

      expect(consumerSpy).toBeCalled()
      expect(fsSpy).toBeCalled()
    });
  });


  describe('onError', () => {
    test('should log a error', async () => {
      const loggerSpy = jest.spyOn(Logger.prototype, 'error')
      consumer.onError(new Error('error message'))

      expect(loggerSpy).toBeCalledTimes(1)
      expect(loggerSpy).toBeCalledWith('Error when process a queue', 'error message')
    });
  })
});
