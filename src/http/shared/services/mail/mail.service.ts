import { User } from '@http/modules/user/entities/user.entity'
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { FakeMailService } from './fakeMail.service'
import { SendgridMailService } from './sendgridMail.service'
import { IMailService } from './types/mail.service.interface'
import { MailServiceEnum } from './types/mail.types'

@Injectable()
export class MailService implements IMailService {
  private readonly logger = new Logger(MailService.name)

  constructor(
    private configService: ConfigService,
    private sendgridMailService: SendgridMailService,
    private fakeMailService: FakeMailService
  ) { }

  async sendConfirmationEmail(user: User): Promise<void> {
    await this.getMailService().sendConfirmationEmail(user)
  }

  // public method for testing purposes
  getMailService(): IMailService {
    const envMailValue = this.configService.get<string>('MAIL_SERVICE').toLowerCase()

    switch (envMailValue) {
      case MailServiceEnum.SENDGRID:
        return this.sendgridMailService
      case MailServiceEnum.FAKE:
        return this.fakeMailService
      default:
        this.logger.error(`"${envMailValue}" is a invalid mail service`)
        throw new InternalServerErrorException()
    }
  }
}
