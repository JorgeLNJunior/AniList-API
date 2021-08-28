import { User } from '@modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as sgMail from '@sendgrid/mail';

import { IMailService } from './interface/mail.service.interface';

@Injectable()
export class SendgridMailService implements IMailService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async sendConfirmationEmail(user: User): Promise<void> {
    const apiKey = this.configService.get('SENDGRID_KEY');
    const sender = this.configService.get('SENDGRID_SENDER');
    const tokenSecret = this.configService.get('JWT_VERIFICATION_TOKEN_SECRET');
    const tokenExp = this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRES');
    const appUrl = this.configService.get('EMAIL_CONFIRMATION_URL');
    const token = this.jwtService.sign(
      { email: user.email },
      { secret: tokenSecret, expiresIn: tokenExp },
    );
    const url = `${appUrl}/?token=${token}`;

    sgMail.setApiKey(apiKey);
    await sgMail.send({
      to: user.email,
      from: sender,
      subject: 'Email confirmation',
      html: `
        <h3>Hello! ${user.name}</h3>
        Please confirm your email address
        <br />
        <a href="${url}" target="__blank">
          <button>Confirm</button>
        </a>
      `,
    });
  }
}
