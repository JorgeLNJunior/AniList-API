import { createMock } from '@golevelup/ts-jest';
import { ReviewBuilder } from '@http/modules/review/__tests__/builder/review.builder';
import { Review } from '@http/modules/review/entities/review.entity';
import { UserAnimeListBuilder } from '@http/modules/userAnimeList/__tests__/builders/userAnimeList.builder';
import { UserAnimeList } from '@http/modules/userAnimeList/entities/userAnimeList.entity';
import { AnimeStatus } from '@http/modules/userAnimeList/types/animeStatus.enum';
import { VoteBuilder } from '@http/modules/vote/__tests__/builder/vote.builder';
import { Vote } from '@http/modules/vote/entities/vote.entity';
import { PaginationInterface } from '@http/shared/pagination/pagination.interface';
import { userServiceMock } from '@mocks/services/user.service.mock';
import { Test, TestingModule } from '@nestjs/testing';

import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserQuery } from '../query/user.query.interface';
import { UserAnimeListByUserQuery } from '../query/userAnimeListByUser.query.interface';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserBuilder } from './builders/user.builder';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();

    controller = module.get(UserController);
  });
  afterEach(() => jest.clearAllMocks());

  describe('find', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return a list of users', async () => {
      const users = [new UserBuilder().build()];

      userServiceMock.find.mockResolvedValue({
        data: users,
        total: 10,
        pageTotal: users.length,
      } as PaginationInterface<User>);

      const response = await controller.find({});

      expect(response).toEqual({
        statusCode: 200,
        data: users,
        pageTotal: users.length,
        total: 10,
      });
    });

    test('should return a list of users when it receives query params', async () => {
      const users = [new UserBuilder().build()];
      const query: UserQuery = {
        uuid: users[0].uuid,
        name: users[0].name,
        email: users[0].email,
        skip: 1,
        take: 5,
      };

      userServiceMock.find.mockResolvedValue({
        data: users,
        total: 10,
        pageTotal: users.length,
      } as PaginationInterface<User>);

      const response = await controller.find(query);

      expect(response).toEqual({
        statusCode: 200,
        data: users,
        pageTotal: users.length,
        total: 10,
      });
    });

    test('should call the service with correct params', async () => {
      const users = [new UserBuilder().build()];
      const query: UserQuery = {
        uuid: users[0].uuid,
        name: users[0].name,
        email: users[0].email,
        skip: 1,
        take: 5,
      };

      userServiceMock.find.mockResolvedValue({
        data: users,
        total: 10,
        pageTotal: users.length,
      } as PaginationInterface<User>);

      const response = await controller.find(query);

      expect(userServiceMock.find).toBeCalledWith(query);
      expect(response).toEqual({
        statusCode: 200,
        data: users,
        pageTotal: users.length,
        total: 10,
      });
    });
  });

  describe('findOne', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return a list of users', async () => {
      const user = new UserBuilder().build();

      userServiceMock.findOne.mockResolvedValue(user);

      const response = await controller.findOne(user.uuid);

      expect(response).toEqual({
        statusCode: 200,
        data: user,
      });
    });

    test('should call the service with correct params', async () => {
      const user = new UserBuilder().build();

      userServiceMock.findOne.mockResolvedValue(user);

      const response = await controller.findOne(user.uuid);

      expect(userServiceMock.findOne).toBeCalledWith(user.uuid);
      expect(userServiceMock.findOne).toBeCalledTimes(1);
      expect(response).toEqual({
        statusCode: 200,
        data: user,
      });
    });
  });

  describe('update', () => {
    afterEach(() => jest.clearAllMocks());

    test('should update a user', async () => {
      const user = new UserBuilder().build();
      const dto: UpdateUserDto = {
        name: user.name,
      };

      userServiceMock.update.mockResolvedValue(user);

      const response = await controller.update(dto, user.uuid);

      expect(response).toEqual({
        statusCode: 200,
        data: user,
      });
      expect(userServiceMock.update).toBeCalledTimes(1);
      expect(userServiceMock.update).toBeCalledWith(user.uuid, dto);
    });

    test('should call the service with correct params', async () => {
      const user = new UserBuilder().build();
      const dto: UpdateUserDto = {
        name: user.name,
      };

      userServiceMock.update.mockResolvedValue(user);

      const response = await controller.update(dto, user.uuid);

      expect(userServiceMock.update).toBeCalledWith(user.uuid, dto);
      expect(response).toEqual({
        statusCode: 200,
        data: user,
      });
    });
  });

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks());

    test('should delete a user', async () => {
      const user = new UserBuilder().build();

      const response = await controller.delete(user.uuid);

      expect(response).toEqual({
        statusCode: 200,
        message: 'the user has been deleted',
      });
    });

    test('should call the service with correct params', async () => {
      const user = new UserBuilder().build();

      const response = await controller.delete(user.uuid);

      expect(userServiceMock.delete).toBeCalledWith(user.uuid);
      expect(response).toEqual({
        statusCode: 200,
        message: 'the user has been deleted',
      });
    });
  });

  describe('upload', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return an upload message', async () => {
      const user = new UserBuilder().build();
      const file = createMock<Express.Multer.File>();
      const response = await controller.upload(file, {
        user: { uuid: user.uuid },
      });

      expect(response).toEqual({
        statusCode: 200,
        message: 'the image will be available soon',
      });
    });

    test('should return call the service with correct params', async () => {
      const user = new UserBuilder().build();
      const file = createMock<Express.Multer.File>();
      const response = await controller.upload(file, {
        user: { uuid: user.uuid },
      });

      expect(userServiceMock.upload).toHaveBeenCalledWith(user.uuid, file);
      expect(response).toEqual({
        statusCode: 200,
        message: 'the image will be available soon',
      });
    });
  });

  describe('getUserAnimeList', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return an user anime list', async () => {
      const user = new UserBuilder().build();
      const userAnimeList = [new UserAnimeListBuilder().build()];

      userServiceMock.getUserAnimeList.mockResolvedValue({
        data: userAnimeList,
        total: 10,
        pageTotal: userAnimeList.length,
      } as PaginationInterface<UserAnimeList>);

      const response = await controller.getUserAnimeList(user.uuid, {});

      expect(response).toEqual({
        statusCode: 200,
        data: userAnimeList,
        pageTotal: userAnimeList.length,
        total: 10,
      });
    });

    test('should return an user anime list when it receives query params', async () => {
      const user = new UserBuilder().build();
      const userAnimeList = [new UserAnimeListBuilder().build()];
      const query: UserAnimeListByUserQuery = {
        animeUUID: userAnimeList[0].anime.uuid,
        uuid: userAnimeList[0].uuid,
        status: AnimeStatus.DROPPED,
        take: 10,
        skip: 5,
      };

      userServiceMock.getUserAnimeList.mockResolvedValue({
        data: userAnimeList,
        total: 10,
        pageTotal: userAnimeList.length,
      } as PaginationInterface<UserAnimeList>);

      const response = await controller.getUserAnimeList(user.uuid, query);

      expect(response).toEqual({
        statusCode: 200,
        data: userAnimeList,
        pageTotal: userAnimeList.length,
        total: 10,
      });
    });
  });

  describe('getUserReviews', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return aa list of reviews', async () => {
      const user = new UserBuilder().build();
      const reviews = [new ReviewBuilder().build()];

      userServiceMock.getUserReviews.mockResolvedValue({
        data: reviews,
        total: 10,
        pageTotal: reviews.length,
      } as PaginationInterface<Review>);

      const response = await controller.getUserReviews(user.uuid, {});

      expect(response).toEqual({
        statusCode: 200,
        data: reviews,
        pageTotal: reviews.length,
        total: 10,
      });
    });

    test('should call the service with correct params', async () => {
      const user = new UserBuilder().build();
      const reviews = [new ReviewBuilder().build()];

      userServiceMock.getUserReviews.mockResolvedValue({
        data: reviews,
        total: 10,
        pageTotal: reviews.length,
      } as PaginationInterface<Review>);

      const response = await controller.getUserReviews(user.uuid, {});

      expect(userServiceMock.getUserReviews).toBeCalledWith(user.uuid, {});
      expect(response).toEqual({
        statusCode: 200,
        data: reviews,
        pageTotal: reviews.length,
        total: 10,
      });
    });
  });

  describe('getUserVotes', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return a list of votes', async () => {
      const user = new UserBuilder().build();
      const votes = [new VoteBuilder().build()];

      userServiceMock.getUserVotes.mockResolvedValue({
        data: votes,
        total: 10,
        pageTotal: votes.length,
      } as PaginationInterface<Vote>);

      const response = await controller.getUserVotes(user.uuid, {});

      expect(response).toEqual({
        statusCode: 200,
        data: votes,
        pageTotal: votes.length,
        total: 10,
      });
    });

    test('should call the service with correct params', async () => {
      const user = new UserBuilder().build();
      const votes = [new VoteBuilder().build()];

      userServiceMock.getUserVotes.mockResolvedValue({
        data: votes,
        total: 10,
        pageTotal: votes.length,
      } as PaginationInterface<Vote>);

      const response = await controller.getUserVotes(user.uuid, {});

      expect(userServiceMock.getUserVotes).toBeCalledWith(user.uuid, {});
      expect(response).toEqual({
        statusCode: 200,
        data: votes,
        pageTotal: votes.length,
        total: 10,
      });
    });
  });
});
