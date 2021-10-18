import { createMock } from "@golevelup/ts-jest";
import { MailService } from "@http/shared/services/mail/mail.service";
import { Logger } from '@nestjs/common'
import { Test } from "@nestjs/testing";
import { fakeUser } from "@src/__tests__/fakes";
import Bull from "bull";

import { EmailConsumer } from "../email.consumer";
import { EmailConfirmationJob } from '../interfaces/jobs.interface'

describe('EmailConsumer', () => {
  let consumer: EmailConsumer
  let mailService: MailService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmailConsumer,
        {
          provide: MailService,
          useValue: {
            sendConfirmationEmail: jest.fn().mockResolvedValue(Promise.resolve())
          }
        }
      ]
    }).compile()

    consumer = module.get(EmailConsumer)
    mailService = module.get(MailService)
  })

  afterEach(() => jest.clearAllMocks())

  describe('sendConfirmationEmail', () => {
    test('should send a email', async () => {
      const job = createMock<Bull.Job<EmailConfirmationJob>>({
        data: { user: fakeUser }
      })
      await consumer.sendConfirmationEmail(job)

      expect(mailService.sendConfirmationEmail).toBeCalledTimes(1)
      expect(mailService.sendConfirmationEmail).toBeCalledWith(fakeUser)
    });
  })

  describe('onError', () => {
    test('should log a error', async () => {
      const loggerSpy = jest.spyOn(Logger.prototype, 'error')
      consumer.onError(new Error('error message'))

      expect(loggerSpy).toBeCalledTimes(1)
      expect(loggerSpy).toBeCalledWith('Error when process a queue', 'error message')
    });
  })
});
