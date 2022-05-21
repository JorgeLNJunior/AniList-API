import { createMock } from '@golevelup/ts-jest';
import { UserBuilder } from '@http/modules/user/__tests__/builders/user.builder';
import { MailService } from '@http/shared/services/mail/mail.service';
import { EmailActivationJob } from '@modules/queue/types/jobs.interface';
import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import Bull from 'bull';

import { EmailActivationConsumer } from '../../consumers/email.consumer';

describe('EmailConsumer', () => {
  let consumer: EmailActivationConsumer;
  let mailService: MailService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmailActivationConsumer,
        {
          provide: MailService,
          useValue: {
            sendUserActivationEmail: jest
              .fn()
              .mockResolvedValue(Promise.resolve()),
          },
        },
      ],
    }).compile();

    consumer = module.get(EmailActivationConsumer);
    mailService = module.get(MailService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('sendConfirmationEmail', () => {
    test('should send an email', async () => {
      const user = new UserBuilder().build();
      const job = createMock<Bull.Job<EmailActivationJob>>({
        data: { user: user },
      });
      await consumer.sendConfirmationEmail(job);

      expect(mailService.sendUserActivationEmail).toBeCalledTimes(1);
      expect(mailService.sendUserActivationEmail).toBeCalledWith(user);
    });
  });

  describe('onError', () => {
    test('should log an error', async () => {
      const error = new Error('error message');

      const loggerSpy = jest.spyOn(Logger.prototype, 'error');

      consumer.onError(error);

      expect(loggerSpy).toBeCalledTimes(1);
      expect(loggerSpy).toBeCalledWith('Error when process a queue', error);
    });
  });
});
