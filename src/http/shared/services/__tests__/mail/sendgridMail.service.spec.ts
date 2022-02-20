import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { fakeUser } from "@src/__tests__/fakes";

import { SendgridMailService } from "../../mail/sendgridMail.service";

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn()
}))

import * as sgMail from '@sendgrid/mail'

describe('SendgridMailService', () => {
  let service: SendgridMailService
  let config: ConfigService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        SendgridMailService,
        ConfigService
      ]
    }).compile()

    service = module.get(SendgridMailService)
    config = module.get(ConfigService)
  })

  afterEach(() => jest.clearAllMocks())

  test('should send a email', async () => {
    jest.spyOn(config, 'get').mockReturnValue('1d')

    await service.sendConfirmationEmail(fakeUser)

    expect(config.get).toBeCalled()
    expect(sgMail.setApiKey).toBeCalledTimes(1)
    expect(sgMail.send).toBeCalledTimes(1)
  });
});
