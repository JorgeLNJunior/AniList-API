import { User } from '@http/modules/user/entities/user.entity';
import { fakeUser, userRepositoryMock } from '@mocks/user.repository.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FakeMailService } from '../../mail/fakeMail.service';

describe('FakeMailService', () => {
  let service: FakeMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FakeMailService,
        { provide: getRepositoryToken(User), useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get(FakeMailService);
  });

  test('should send a email', async () => {
    await service.sendConfirmationEmail(fakeUser);

    expect(userRepositoryMock.update).toBeCalledTimes(1);
  });
});
