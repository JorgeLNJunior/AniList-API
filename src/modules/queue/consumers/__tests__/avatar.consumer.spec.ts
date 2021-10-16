import { createMock } from "@golevelup/ts-jest";
import { User } from "@http/modules/user/entities/user.entity";
import { UserStorage } from "@http/modules/user/storage/user.storage";
import { userRepositoryMock } from "@mocks/user.repository.mock";
import { Logger } from '@nestjs/common'
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import Bull from "bull";
import * as fs from 'fs/promises'

import { AvatarCompressConsumer } from "../avatar.consumer";
import { AvatarCompressJob } from "../interfaces/jobs.interface";

jest.mock('sharp', () => () => ({
  jpeg: () => ({
    toBuffer: () => ({})
  })
}))

jest.mock('fs/promises', () => ({
  rm: () => ({})
}))

describe('AvatarCompressConsumer', () => {
  let consumer: AvatarCompressConsumer

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AvatarCompressConsumer,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock
        },
        {
          provide: UserStorage,
          useValue: {
            uploadAvatar: jest.fn().mockResolvedValue(Promise.resolve()),
            deleteOldAvatar: jest.fn().mockResolvedValue(Promise.resolve()),
          }
        }
      ]
    }).compile()

    consumer = module.get(AvatarCompressConsumer)
  })

  afterEach(() => jest.clearAllMocks())

  describe('compress', () => {
    test('should compress an avatar', async () => {
      const consumerSpy = jest.spyOn(consumer, 'compress')
      const fsSpy = jest.spyOn(fs, 'rm')

      const job = createMock<Bull.Job<AvatarCompressJob>>({
        id: 'id',
        data: { userUuid: 'uuid', path: 'path' }
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
