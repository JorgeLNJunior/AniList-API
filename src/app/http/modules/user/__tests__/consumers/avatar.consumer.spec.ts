import { createMock } from "@golevelup/ts-jest";
import { AvatarCompressionConsumer } from "@http/modules/user/consumers/avatar.consumer";
import { User } from "@http/modules/user/entities/user.entity";
import { UserStorage } from "@http/modules/user/storage/user.storage";
import { userRepositoryMock } from "@mocks/repositories/user.repository.mock";
import { AvatarCompressJob } from "@modules/queue/types/jobs.interface";
import { Logger } from '@nestjs/common'
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import Bull from "bull";
import * as fs from 'fs/promises'

import { UserBuilder } from "../builders/user.builder";

jest.mock('sharp', () => () => ({
  jpeg: () => ({
    toBuffer: () => ({})
  })
}))

jest.mock('fs/promises', () => ({
  rm: () => ({})
}))

describe('AvatarCompressionConsumer', () => {
  let consumer: AvatarCompressionConsumer

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AvatarCompressionConsumer,
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

    consumer = module.get(AvatarCompressionConsumer)
  })

  afterEach(() => jest.clearAllMocks())

  describe('compress', () => {
    test('should compress an cover', async () => {
      const user = new UserBuilder().build()
      const job = createMock<Bull.Job<AvatarCompressJob>>({
        id: 'id',
        data: { userUuid: user.uuid, path: 'path' }
      })

      const consumerSpy = jest.spyOn(consumer, 'compress')
      const fsSpy = jest.spyOn(fs, 'rm')
      userRepositoryMock.findOne.mockResolvedValue(user)

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
