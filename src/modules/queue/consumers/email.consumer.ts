import { MailService } from '@http/shared/services/mail/mail.service'
import { OnQueueError, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

import { EmailActivationJob } from './interfaces/jobs.interface'

@Processor('email')
export class EmailConsumer {
  constructor(private mailService: MailService) { }

  private readonly logger = new Logger(EmailConsumer.name);

  @Process('email_confirmation')
  async sendConfirmationEmail(job: Job<EmailActivationJob>) {
    await this.mailService.sendUserActivationEmail(job.data.user)
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error('Error when process a queue', error.message)
  }
}
