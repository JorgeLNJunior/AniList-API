import { User } from '@http/modules/user/entities/user.entity'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { fakeUser } from '@src/__tests__/fakes'

import { FakeMailService } from '../../mail/fakeMail.service'
import { MailService } from '../../mail/mail.service'
import { SendgridMailService } from '../../mail/sendgridMail.service'

describe('MailService', () => {
  let service: MailService
  let config: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        MailService,
        SendgridMailService,
        FakeMailService,
        ConfigService,
        { provide: getRepositoryToken(User), useValue: userRepositoryMock }
      ]
    }).compile()

    service = module.get(MailService)
    config = module.get(ConfigService)
  })

  describe('getMailService', () => {
    test('should return a FakeMailService instance', async () => {
      jest.spyOn(config, 'get').mockReturnValue('fake')

      const result = service.getMailService()
      expect(result).toBeInstanceOf(FakeMailService)
    })

    test('should return a SendgridMailService instance', async () => {
      jest.spyOn(config, 'get').mockReturnValue('sendgrid')

      const result = service.getMailService()
      expect(result).toBeInstanceOf(SendgridMailService)
    })

    test('should throw an error if it receives a invalid mail service', async () => {
      jest.spyOn(config, 'get').mockReturnValue('invalid service')

      // eslint-disable-next-line jest/valid-expect
      expect(() => {
        service.getMailService()
      }).toThrow()
    })
  })

  describe('sendConfirmationEmail', () => {
    test('should send a email', async () => {
      jest.spyOn(config, 'get').mockReturnValue('fake')

      await service.sendConfirmationEmail(fakeUser)

      expect(userRepositoryMock.update).toBeCalledTimes(1)
    })
  })
})
