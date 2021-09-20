import { User } from '@http/modules/user/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { FakeMailService } from './fakeMail.service'
import { IMailService } from './interface/mail.service.interface'
import { SendgridMailService } from './sendgridMail.service'

@Injectable()
export class MailService implements IMailService {
  constructor (
    private configService: ConfigService,
    private sendgridMailService: SendgridMailService,
    private fakeMailService: FakeMailService
  ) {}

  async sendConfirmationEmail (user: User): Promise<void> {
    await this.getMailService().sendConfirmationEmail(user)
  }

  getMailService (): IMailService {
    const env = this.configService.get<string>('MAIL_SERVICE').toLowerCase()

    switch (env) {
      case 'sendgrid':
        return this.sendgridMailService
      case 'fake':
        return this.fakeMailService
      default:
        throw new Error(`"${env}" is a invalid mail service`)
    }
  }
}
