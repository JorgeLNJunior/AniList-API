import { createMock } from "@golevelup/ts-jest";
import { MailService } from "@http/shared/services/mail/mail.service";
import { EmailActivationJob } from '@modules/queue/types/jobs.interface'
import { Logger } from '@nestjs/common'
import { Test } from "@nestjs/testing";
import { fakeUser } from "@src/__tests__/fakes";
import Bull from "bull";

import { EmailActivationConsumer } from "../../consumers/email.consumer";

describe('EmailConsumer', () => {
  let consumer: EmailActivationConsumer
  let mailService: MailService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmailActivationConsumer,
        {
          provide: MailService,
          useValue: {
            sendUserActivationEmail: jest.fn().mockResolvedValue(Promise.resolve())
          }
        }
      ]
    }).compile()

    consumer = module.get(EmailActivationConsumer)
    mailService = module.get(MailService)
  })

  afterEach(() => jest.clearAllMocks())

  describe('sendConfirmationEmail', () => {
    test('should send an email', async () => {
      const job = createMock<Bull.Job<EmailActivationJob>>({
        data: { user: fakeUser }
      })
      await consumer.sendConfirmationEmail(job)

      expect(mailService.sendUserActivationEmail).toBeCalledTimes(1)
      expect(mailService.sendUserActivationEmail).toBeCalledWith(fakeUser)
    });
  })

  describe('onError', () => {
    test('should log an error', async () => {
      const loggerSpy = jest.spyOn(Logger.prototype, 'error')
      consumer.onError(new Error('error message'))

      expect(loggerSpy).toBeCalledTimes(1)
      expect(loggerSpy).toBeCalledWith('Error when process a queue', 'error message')
    });
  })
});
