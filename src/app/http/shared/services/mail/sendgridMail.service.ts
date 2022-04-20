import { User } from '@http/modules/user/entities/user.entity'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as sgMail from '@sendgrid/mail'

import { IMailService } from './types/mail.service.interface'

@Injectable()
export class SendgridMailService implements IMailService {
  private logger = new Logger(SendgridMailService.name)

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async sendUserActivationEmail(user: User): Promise<void> {
    try {
      const apiKey = this.configService.get('SENDGRID_API_KEY')
      const sender = this.configService.get('SENDGRID_SENDER')
      const tokenSecret = this.configService.get('EMAIL_ACTIVATION_TOKEN_SECRET')
      const tokenExp = this.configService.get('EMAIL_ACTIVATION_TOKEN_EXPIRES_IN')
      const appUrl = this.configService.get('EMAIL_ACTIVATION_URL')
      const token = this.jwtService.sign(
        { email: user.email },
        { secret: tokenSecret, expiresIn: tokenExp }
      )
      const url = `${appUrl}/?token=${token}`

      sgMail.setApiKey(apiKey)
      await sgMail.send({
        to: user.email,
        from: sender,
        subject: 'Email activation',
        html: `
          <h3>Hello! ${user.name}</h3>
          Please confirm your email address
          <br />
          <a href="${url}" target="__blank">
            <button>Confirm</button>
          </a>
        `
      })
    } catch (error) {
      this.logger.error('failed to send email', error)
    }
  }
}
