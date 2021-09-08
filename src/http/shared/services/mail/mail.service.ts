import { User } from '@http/modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepository } from 'typeorm';

import { FakeMailService } from './fakeMail.service';
import { IMailService } from './interface/mail.service.interface';
import { SendgridMailService } from './sendgridMail.service';

@Injectable()
export class MailService implements IMailService {
  constructor(private configService: ConfigService) {}

  async sendConfirmationEmail(user: User): Promise<void> {
    await this.getMailService().sendConfirmationEmail(user);
  }

  getMailService() {
    const env = this.configService.get<string>('MAIL_SERVICE').toLowerCase();

    switch (env) {
      case 'sendgrid':
        return new SendgridMailService(new JwtService({}), new ConfigService());
      case 'fake':
        return new FakeMailService(getRepository(User));
      default:
        throw new Error(`"${env}" is a invalid mail service`);
    }
  }
}
