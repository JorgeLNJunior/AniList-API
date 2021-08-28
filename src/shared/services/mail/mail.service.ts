import { User } from '@modules/user/entities/user.entity';
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

  private mailService: IMailService;

  async sendConfirmationEmail(user: User): Promise<void> {
    this.factoryMethod();

    await this.mailService.sendConfirmationEmail(user);
  }

  private factoryMethod() {
    const env = this.configService.get<string>('MAIL_SERVICE').toLowerCase();

    switch (env) {
      case 'sendgrid':
        this.mailService = new SendgridMailService(
          new JwtService({}),
          new ConfigService(),
        );
        break;
      case 'fake':
        this.mailService = new FakeMailService(getRepository(User));
        break;
      default:
        throw new Error(`"${env}" is a invalid mail service`);
    }
  }
}
