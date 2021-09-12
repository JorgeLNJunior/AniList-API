import { reviewServiceMock } from '@mocks/review.service.mock';
import { fakeReview, reviewRepositoryMock } from '@mocks/reviewRepository.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';
import { ReviewQuery } from '../query/review.query.interface';
import { ReviewController } from '../review.controller';
import { ReviewService } from '../review.service';

describe('ReviewController', () => {
  let controller: ReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewController,
        { provide: ReviewService, useValue: reviewServiceMock },
        { provide: getRepositoryToken(Review), useValue: reviewRepositoryMock },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    test('should create a review', async () => {
      const dto: CreateReviewDto = {
        anime: fakeReview.anime.uuid,
        title: fakeReview.title,
        description: fakeReview.description,
        rating: fakeReview.rating,
      };

      const review = await controller.create(dto, { user: { uuid: 'uuid' } });

      expect(review).toEqual({
        statusCode: 201,
        review: fakeReview,
      });
      expect(reviewServiceMock.create).toBeCalledTimes(1);
      expect(reviewServiceMock.create).toBeCalledWith('uuid', dto);
    });
  });

  describe('find', () => {
    test('should return a list of review', async () => {
      const reviews = await controller.find({});
      expect(reviews).toEqual({
        statusCode: 200,
        reviews: [fakeReview],
      });
      expect(reviewServiceMock.find).toBeCalledTimes(1);
      expect(reviewServiceMock.find).toBeCalledWith({});
    });

    test('should return a list of review with query', async () => {
      const query: ReviewQuery = {
        uuid: 'uuid',
        animeUuid: 'uuid',
        userUuid: 'uuid',
        take: 5,
        skip: 2,
      };

      const reviews = await controller.find(query);

      expect(reviews).toEqual({
        statusCode: 200,
        reviews: [fakeReview],
      });
      expect(reviewServiceMock.find).toBeCalledTimes(1);
      expect(reviewServiceMock.find).toBeCalledWith(query);
    });
  });

  describe('update', () => {
    test('should update a review', async () => {
      const dto: UpdateReviewDto = {
        title: fakeReview.title,
        description: fakeReview.description,
        rating: fakeReview.rating,
      };

      const response = await controller.update('uuid', dto);

      expect(response).toEqual({
        statusCode: 200,
        review: fakeReview,
      });
      expect(reviewServiceMock.update).toBeCalledTimes(1);
      expect(reviewServiceMock.update).toBeCalledWith('uuid', dto);
    });
  });

  describe('delete', () => {
    test('should delete a review', async () => {
      const response = await controller.delete('uuid');
      expect(response).toEqual({
        statusCode: 200,
        message: 'the review has been deleted',
      });
      expect(reviewServiceMock.delete).toBeCalledTimes(1);
      expect(reviewServiceMock.delete).toBeCalledWith('uuid');
    });
  });
});
