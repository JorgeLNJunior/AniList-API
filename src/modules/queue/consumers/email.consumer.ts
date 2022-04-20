import { MailService } from '@http/shared/services/mail/mail.service'
import { OnQueueError, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

import { Jobs } from './types/jobs.enum'
import { EmailActivationJob } from './types/jobs.interface'

@Processor(Jobs.EMAIL_ACTIVATION)
export class EmailActivationConsumer {
  constructor(private mailService: MailService) { }

  private readonly logger = new Logger(EmailActivationConsumer.name);

  @Process(Jobs.EMAIL_ACTIVATION)
  async sendConfirmationEmail(job: Job<EmailActivationJob>) {
    await this.mailService.sendUserActivationEmail(job.data.user)
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error('Error when process a queue', error.message)
  }
}
