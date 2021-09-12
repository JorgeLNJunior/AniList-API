import { animeServiceMock } from '@mocks/anime.service.mock';
import { fakeReview, reviewRepositoryMock } from '@mocks/reviewRepository.mock';
import { userServiceMock } from '@mocks/user.service.mock';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AnimeService } from '../../anime/anime.service';
import { UserService } from '../../user/user.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';
import { ReviewQuery } from '../query/review.query.interface';
import { ReviewService } from '../review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: UserService, useValue: userServiceMock },
        { provide: AnimeService, useValue: animeServiceMock },
        { provide: getRepositoryToken(Review), useValue: reviewRepositoryMock },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    afterEach(() => jest.clearAllMocks());

    test('should create a review', async () => {
      const dto: CreateReviewDto = {
        anime: 'a uuid',
        title: fakeReview.title,
        description: fakeReview.description,
        rating: fakeReview.rating,
      };
      const review = await service.create('uuid', dto);

      expect(review).toEqual(fakeReview);
      expect(userServiceMock.find).toBeCalledTimes(1);
      expect(animeServiceMock.find).toBeCalledTimes(1);
      expect(reviewRepositoryMock.create).toBeCalledTimes(1);
      expect(reviewRepositoryMock.save).toBeCalledTimes(1);
    });

    test('should throw a BadRequestException if already reviewed', async () => {
      const dto: CreateReviewDto = {
        anime: fakeReview.anime.uuid,
        title: fakeReview.title,
        description: fakeReview.description,
        rating: fakeReview.rating,
      };

      // eslint-disable-next-line jest/valid-expect
      expect(service.create('uuid', dto)).rejects.toThrow(BadRequestException);
      expect(userServiceMock.find).toBeCalledTimes(0);
      expect(animeServiceMock.find).toBeCalledTimes(0);
    });

    test('should throw a BadRequestException if the anime was not found', async () => {
      const dto: CreateReviewDto = {
        anime: 'a uuid',
        title: fakeReview.title,
        description: fakeReview.description,
        rating: fakeReview.rating,
      };

      jest.spyOn(animeServiceMock, 'find').mockResolvedValue([]);

      // eslint-disable-next-line jest/valid-expect
      expect(service.create('uuid', dto)).rejects.toThrow(BadRequestException);
      // expect(userServiceMock.find).toBeCalledTimes(1);
      // expect(animeServiceMock.find).toBeCalledTimes(1);
    });
  });

  describe('find', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return a list of review', async () => {
      const reviews = await service.find({});
      expect(reviews).toEqual([fakeReview]);
    });

    test('should return a list of review with query', async () => {
      const query: ReviewQuery = {
        animeUuid: 'uuid',
        userUuid: 'uuid',
        uuid: 'uuid',
        take: 5,
        skip: 2,
      };
      const reviews = await service.find(query);
      expect(reviews).toEqual([fakeReview]);
    });
  });

  describe('update', () => {
    afterEach(() => jest.clearAllMocks());

    test('should update a review', async () => {
      const dto: UpdateReviewDto = {
        title: 'title',
        description: 'description',
        rating: 5,
      };
      const review = await service.update('uuid', dto);

      expect(review).toEqual(fakeReview);
      expect(reviewRepositoryMock.findOne).toBeCalledTimes(2);
      expect(reviewRepositoryMock.update).toBeCalledTimes(1);
      expect(reviewRepositoryMock.update).toBeCalledWith('uuid', dto);
    });

    test('should throw a BadRequestException if the review was not found', async () => {
      const dto: UpdateReviewDto = {
        title: 'title',
        description: 'description',
        rating: 5,
      };

      jest.spyOn(reviewRepositoryMock, 'findOne').mockResolvedValue(undefined);

      // eslint-disable-next-line jest/valid-expect
      expect(service.update('uuid', dto)).rejects.toThrow(BadRequestException);
      expect(reviewRepositoryMock.findOne).toBeCalledTimes(1);
      expect(reviewRepositoryMock.update).toBeCalledTimes(0);
    });
  });

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks());

    test('should delete a review', async () => {
      jest.spyOn(reviewRepositoryMock, 'findOne').mockResolvedValue(fakeReview);

      await service.delete('uuid');

      expect(reviewRepositoryMock.findOne).toBeCalledTimes(1);
      expect(reviewRepositoryMock.delete).toBeCalledTimes(1);
    });

    test('should throw a BadRequestException if the review was not found', async () => {
      jest.spyOn(reviewRepositoryMock, 'findOne').mockResolvedValue(undefined);

      // eslint-disable-next-line jest/valid-expect
      expect(service.delete('uuid')).rejects.toThrow(BadRequestException);
      expect(reviewRepositoryMock.findOne).toBeCalledTimes(1);
      expect(reviewRepositoryMock.delete).toBeCalledTimes(0);
    });
  });
});
