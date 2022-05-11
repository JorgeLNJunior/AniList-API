import { VoteBuilder } from '@http/modules/vote/__tests__/builder/vote.builder'
import { Vote } from '@http/modules/vote/entities/vote.entity'
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { reviewRepositoryMock } from '@mocks/repositories/reviewRepository.mock'
import { reviewServiceMock } from '@mocks/services/review.service.mock'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { CreateReviewDto } from '../dto/create-review.dto'
import { UpdateReviewDto } from '../dto/update-review.dto'
import { Review } from '../entities/review.entity'
import { ReviewQuery } from '../query/review.query.interface'
import { ReviewController } from '../review.controller'
import { ReviewService } from '../review.service'
import { ReviewBuilder } from './builder/review.builder'

describe('ReviewController', () => {
  let controller: ReviewController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewController,
        { provide: ReviewService, useValue: reviewServiceMock },
        { provide: getRepositoryToken(Review), useValue: reviewRepositoryMock }
      ]
    }).compile()

    controller = module.get<ReviewController>(ReviewController)
  })
  afterEach(() => jest.clearAllMocks())

  describe('create', () => {
    afterEach(() => jest.clearAllMocks())

    test('should create a review', async () => {
      const review = new ReviewBuilder().build()
      const dto: CreateReviewDto = {
        animeUUID: review.anime.uuid,
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      reviewServiceMock.create.mockResolvedValue(review)

      const result = await controller.create(dto, { user: { uuid: review.user.uuid } })

      expect(result).toEqual({
        statusCode: 201,
        data: review
      })
    })

    test('should call the service with correct params', async () => {
      const review = new ReviewBuilder().build()
      const dto: CreateReviewDto = {
        animeUUID: review.anime.uuid,
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      reviewServiceMock.create.mockResolvedValue(review)

      const result = await controller.create(dto, { user: { uuid: review.user.uuid } })

      expect(reviewServiceMock.create).toBeCalledWith(review.user.uuid, dto)
      expect(reviewServiceMock.create).toBeCalledTimes(1)
      expect(result).toEqual({
        statusCode: 201,
        data: review
      })
    })
  })

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of review', async () => {
      const reviews = [
        new ReviewBuilder().build()
      ]

      reviewServiceMock.find.mockResolvedValue({
        data: reviews,
        total: 10,
        pageTotal: reviews.length
      } as PaginationInterface<Review>)

      const results = await controller.find({})

      expect(results).toEqual({
        statusCode: 200,
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      })
      expect(reviewServiceMock.find).toBeCalledTimes(1)
      expect(reviewServiceMock.find).toBeCalledWith({})
    })

    test('should return a list of review when it receives query params', async () => {
      const reviews = [
        new ReviewBuilder().build()
      ]
      const query: ReviewQuery = {
        uuid: reviews[0].uuid,
        animeUUID: reviews[0].anime.uuid,
        userUUID: reviews[0].user.uuid,
        take: 5,
        skip: 2
      }

      reviewServiceMock.find.mockResolvedValue({
        data: reviews,
        total: 10,
        pageTotal: reviews.length
      } as PaginationInterface<Review>)

      const results = await controller.find(query)

      expect(results).toEqual({
        statusCode: 200,
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      })
    })

    test('should call the service with correct params', async () => {
      const reviews = [
        new ReviewBuilder().build()
      ]
      const query: ReviewQuery = {
        uuid: reviews[0].uuid,
        animeUUID: reviews[0].anime.uuid,
        userUUID: reviews[0].user.uuid,
        take: 5,
        skip: 2
      }

      reviewServiceMock.find.mockResolvedValue({
        data: reviews,
        total: 10,
        pageTotal: reviews.length
      } as PaginationInterface<Review>)

      const results = await controller.find(query)

      expect(reviewServiceMock.find).toBeCalledWith(query)
      expect(reviewServiceMock.find).toBeCalledTimes(1)
      expect(results).toEqual({
        statusCode: 200,
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      })
    })
  })

  describe('update', () => {
    afterEach(() => jest.clearAllMocks())

    test('should update a review', async () => {
      const review = new ReviewBuilder().build()
      const dto: UpdateReviewDto = {
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      reviewServiceMock.update.mockResolvedValue(review)

      const response = await controller.update(review.uuid, dto)

      expect(response).toEqual({
        statusCode: 200,
        data: review
      })
      expect(reviewServiceMock.update).toBeCalledTimes(1)
      expect(reviewServiceMock.update).toBeCalledWith(review.uuid, dto)
    })

    test('should call the service with correct params', async () => {
      const review = new ReviewBuilder().build()
      const dto: UpdateReviewDto = {
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      reviewServiceMock.update.mockResolvedValue(review)

      const response = await controller.update(review.uuid, dto)

      expect(reviewServiceMock.update).toBeCalledWith(review.uuid, dto)
      expect(reviewServiceMock.update).toBeCalledTimes(1)
      expect(response).toEqual({
        statusCode: 200,
        data: review
      })
    })
  })

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks())

    test('should delete a review', async () => {
      const review = new ReviewBuilder().build()

      const response = await controller.delete(review.uuid)

      expect(response).toEqual({
        statusCode: 200,
        message: 'the review has been deleted'
      })
      expect(reviewServiceMock.delete).toBeCalledTimes(1)
      expect(reviewServiceMock.delete).toBeCalledWith(review.uuid)
    })
  })

  describe('getReviewVotes', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of votes', async () => {
      const review = new ReviewBuilder().build()
      const votes = [
        new VoteBuilder().build()
      ]

      reviewServiceMock.getReviewVotes.mockResolvedValue({
        data: votes,
        total: 10,
        pageTotal: votes.length
      } as PaginationInterface<Vote>)

      const response = await controller.getReviewVotes(review.uuid, {})

      expect(response).toEqual({
        statusCode: 200,
        data: votes,
        total: 10,
        pageTotal: votes.length
      })
    })

    test('should call the service with correct params', async () => {
      const review = new ReviewBuilder().build()
      const votes = [
        new VoteBuilder().build()
      ]

      reviewServiceMock.getReviewVotes.mockResolvedValue({
        data: votes,
        total: 10,
        pageTotal: votes.length
      } as PaginationInterface<Vote>)

      const response = await controller.getReviewVotes(review.uuid, {})

      expect(response).toEqual({
        statusCode: 200,
        data: votes,
        total: 10,
        pageTotal: votes.length
      })
      expect(reviewServiceMock.getReviewVotes).toBeCalledTimes(1)
      expect(reviewServiceMock.getReviewVotes).toBeCalledWith(review.uuid, {})
    })
  })
})
