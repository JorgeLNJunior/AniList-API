import { User } from '@modules/user/entities/user.entity';
import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { MailService } from '@shared/services/mail/mail.service';
import { Job } from 'bull';

@Processor('email')
export class EmailConsumer {
  constructor(private mailService: MailService) {}

  private readonly logger = new Logger(EmailConsumer.name);

  @Process('email-confirmation')
  async sendConfirmationEmail(job: Job<EmailConfirmationJob>) {
    await this.mailService.sendConfirmationEmail(job.data.user);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error('Error when process a queue', error.message);
  }
}

interface EmailConfirmationJob {
  user: User;
}
