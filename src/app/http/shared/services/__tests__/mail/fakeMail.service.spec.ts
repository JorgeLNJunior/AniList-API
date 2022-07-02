import { User } from '@http/modules/user/entities/user.entity'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { fakeUser } from '@src/__tests__/fakes'

import { FakeMailService } from '../../mail/fakeMail.service'

describe('FakeMailService', () => {
  let service: FakeMailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FakeMailService,
        { provide: getRepositoryToken(User), useValue: userRepositoryMock }
      ]
    }).compile()

    service = module.get(FakeMailService)
  })

  test('should send a email', async () => {
    await service.sendUserActivationEmail(fakeUser)

    expect(userRepositoryMock.update).toBeCalledTimes(1)
  })
})
