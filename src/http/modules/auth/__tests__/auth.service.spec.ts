import { getQueueToken } from '@nestjs/bull';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BcryptService } from '@src/http/shared/services/bcrypt.service';

import {
  fakeUser,
  userRepositoryMock,
} from '../../user/__tests__/mocks/user.repository.mock';
import { userServiceMock } from '../../user/__tests__/mocks/user.service.mock';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { EmailConfirmationDto } from '../dto/email-confirmation.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [
        AuthService,
        BcryptService,
        ConfigService,
        {
          provide: getQueueToken('email'),
          useValue: { add: jest.fn().mockResolvedValue(true) },
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('register', () => {
    test('should register a user', async () => {
      const dto: CreateUserDto = {
        email: fakeUser.email,
        name: fakeUser.name,
        password: fakeUser.password,
      };
      const user = await service.register(dto);

      delete fakeUser.isAdmin;

      expect(user).toEqual(fakeUser);
      expect(userServiceMock.create).toBeCalledTimes(1);
      expect(userServiceMock.create).toBeCalledWith(dto);
    });
  });

  describe('login', () => {
    test('should return a jwt token', async () => {
      const token = await service.login(fakeUser);
      expect(typeof token).toBe('string');
    });
  });

  describe('confirmEmail', () => {
    afterEach(() => jest.clearAllMocks());

    test('should confirm user email', async () => {
      const dto: EmailConfirmationDto = {
        token: new JwtService({ secret: 'secret' }).sign({
          email: fakeUser.email,
        }),
      };

      fakeUser.isEmailConfirmed = false;

      await service.confirmEmail(dto);

      expect(userRepositoryMock.findOne).toBeCalledTimes(1);
      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: fakeUser.email,
      });
      expect(userRepositoryMock.update).toBeCalledTimes(1);
      expect(userRepositoryMock.update).toBeCalledWith(fakeUser.uuid, {
        isEmailConfirmed: true,
      });
    });

    test('should throw a BadRequestException if the user was not found', async () => {
      const dto: EmailConfirmationDto = {
        token: new JwtService({ secret: 'secret' }).sign({
          email: fakeUser.email,
        }),
      };

      fakeUser.isEmailConfirmed = false;

      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined);

      // eslint-disable-next-line jest/valid-expect
      expect(service.confirmEmail(dto)).rejects.toThrow(BadRequestException);
      expect(userRepositoryMock.findOne).toBeCalledTimes(1);
      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: fakeUser.email,
      });
    });

    test('should throw a BadRequestException if the email is already confirmed', async () => {
      const dto: EmailConfirmationDto = {
        token: new JwtService({ secret: 'secret' }).sign({
          email: fakeUser.email,
        }),
      };

      fakeUser.isEmailConfirmed = true;
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(fakeUser);

      // eslint-disable-next-line jest/valid-expect
      expect(service.confirmEmail(dto)).rejects.toThrow(BadRequestException);
      expect(userRepositoryMock.findOne).toBeCalledTimes(1);
      expect(userRepositoryMock.findOne).toBeCalledWith({
        email: fakeUser.email,
      });
    });

    test('should throw a BadRequestException if it receives a expired', async () => {
      const dto: EmailConfirmationDto = {
        token: new JwtService({
          secret: 'secret',
          signOptions: { expiresIn: '-1h' },
        }).sign({
          email: fakeUser.email,
        }),
      };

      fakeUser.isEmailConfirmed = false;

      // eslint-disable-next-line jest/valid-expect
      expect(service.confirmEmail(dto)).rejects.toThrow(BadRequestException);
    });

    test('should throw a BadRequestException if it receives a invalid', async () => {
      const dto: EmailConfirmationDto = {
        token: 'invalid-token',
      };

      fakeUser.isEmailConfirmed = false;

      // eslint-disable-next-line jest/valid-expect
      expect(service.confirmEmail(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateUser', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return a user', async () => {
      const bcryptMock = jest
        .spyOn(BcryptService.prototype, 'compare')
        .mockResolvedValue(true);

      const user = await service.validateUser(
        fakeUser.email,
        fakeUser.password,
      );

      fakeUser.isEmailConfirmed = true;
      delete fakeUser.isAdmin;

      console.log(user, fakeUser);

      expect(user).toEqual(fakeUser);
      expect(bcryptMock).toBeCalledTimes(1);
    });

    test('should throw a error if the password does not match', async () => {
      jest.spyOn(BcryptService.prototype, 'compare').mockResolvedValue(false);

      // eslint-disable-next-line jest/valid-expect
      expect(
        service.validateUser(fakeUser.email, fakeUser.password),
      ).rejects.toThrow(BadRequestException);
    });

    test('should throw a error if the user was not found', async () => {
      jest.spyOn(userServiceMock, 'findByEmail').mockResolvedValue(undefined);

      // eslint-disable-next-line jest/valid-expect
      expect(
        service.validateUser(fakeUser.email, fakeUser.password),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
