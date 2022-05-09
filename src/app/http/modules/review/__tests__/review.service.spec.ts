import { Anime } from '@http/modules/anime/entities/anime.entity'
import { User } from '@http/modules/user/entities/user.entity'
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { animeRepositoryMock } from '@mocks/repositories/anime.respository.mock'
import { reviewRepositoryMock } from '@mocks/repositories/reviewRepository.mock'
import { userRepositoryMock } from '@mocks/repositories/user.repository.mock'
import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { CreateReviewDto } from '../dto/create-review.dto'
import { UpdateReviewDto } from '../dto/update-review.dto'
import { Review } from '../entities/review.entity'
import { ReviewQuery } from '../query/review.query.interface'
import { ReviewService } from '../review.service'
import { ReviewBuilder } from './builder/review.builder'

describe('ReviewService', () => {
  let service: ReviewService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: getRepositoryToken(Review), useValue: reviewRepositoryMock },
        { provide: getRepositoryToken(Anime), useValue: animeRepositoryMock },
        { provide: getRepositoryToken(User), useValue: userRepositoryMock }
      ]
    }).compile()

    service = module.get<ReviewService>(ReviewService)
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

      reviewRepositoryMock.save.mockResolvedValue(review)
      reviewRepositoryMock.find.mockResolvedValue([])
      animeRepositoryMock.findOne.mockResolvedValue(review.anime)
      userRepositoryMock.findOne.mockResolvedValue(review.user)

      const result = await service.create(review.user.uuid, dto)

      expect(result).toEqual(review)
    })

    test('should call all repositories with correct params', async () => {
      const review = new ReviewBuilder().build()
      const dto: CreateReviewDto = {
        animeUUID: review.anime.uuid,
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      reviewRepositoryMock.save.mockResolvedValue(review)
      reviewRepositoryMock.find.mockResolvedValue([])
      animeRepositoryMock.findOne.mockResolvedValue(review.anime)
      userRepositoryMock.findOne.mockResolvedValue(review.user)

      const result = await service.create(review.user.uuid, dto)

      expect(result).toEqual(review)
      expect(userRepositoryMock.findOne).toBeCalledTimes(1)
      expect(userRepositoryMock.findOne).toBeCalledWith(review.user.uuid)
      expect(animeRepositoryMock.findOne).toBeCalledTimes(1)
      expect(animeRepositoryMock.findOne).toBeCalledWith(review.anime.uuid)
      expect(reviewRepositoryMock.create).toBeCalledTimes(1)
      expect(reviewRepositoryMock.save).toBeCalledTimes(1)
    })

    test('should throw a BadRequestException if already reviewed', async () => {
      const review = new ReviewBuilder().build()
      const dto: CreateReviewDto = {
        animeUUID: review.anime.uuid,
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      reviewRepositoryMock.find.mockResolvedValue([review])

      // eslint-disable-next-line jest/valid-expect
      expect(service.create(review.user.uuid, dto)).rejects.toThrow(
        new BadRequestException(['you already reviewed this anime'])
      )
      expect(userRepositoryMock.findOne).toBeCalledTimes(0)
      expect(animeRepositoryMock.findOne).toBeCalledTimes(0)
      expect(reviewRepositoryMock.create).toBeCalledTimes(0)
      expect(reviewRepositoryMock.save).toBeCalledTimes(0)
    })

    test('should throw a BadRequestException if the anime was not found', async () => {
      const review = new ReviewBuilder().build()
      const dto: CreateReviewDto = {
        animeUUID: review.anime.uuid,
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      animeRepositoryMock.findOne.mockResolvedValue(undefined)

      // eslint-disable-next-line jest/valid-expect
      expect(service.create(review.user.uuid, dto)).rejects.toThrow(
        new BadRequestException(['anime not found'])
      )
    })
  })

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of review', async () => {
      const reviews = [
        new ReviewBuilder().build()
      ]

      reviewRepositoryMock.find.mockResolvedValue(reviews)
      reviewRepositoryMock.count.mockResolvedValue(10)

      const results = await service.find({})

      expect(results).toEqual({
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      } as PaginationInterface<Review>)
    })

    test('should return a list of review when it receives query params', async () => {
      const reviews = [
        new ReviewBuilder().build()
      ]
      const query: ReviewQuery = {
        animeUUID: 'uuid',
        userUUID: 'uuid',
        uuid: 'uuid',
        take: 5,
        skip: 2
      }

      reviewRepositoryMock.find.mockResolvedValue(reviews)
      reviewRepositoryMock.count.mockResolvedValue(10)

      const results = await service.find(query)
      expect(results).toEqual({
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      } as PaginationInterface<Review>)
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

      reviewRepositoryMock.findOne.mockResolvedValue(review)

      const result = await service.update(review.uuid, dto)

      expect(result).toEqual(review)
    })

    test('should call the repository with correct params', async () => {
      const review = new ReviewBuilder().build()
      const dto: UpdateReviewDto = {
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      reviewRepositoryMock.findOne.mockResolvedValue(review)

      const result = await service.update(review.uuid, dto)

      expect(result).toEqual(review)
      expect(reviewRepositoryMock.findOne).toBeCalledTimes(2)
      expect(reviewRepositoryMock.update).toBeCalledTimes(1)
      expect(reviewRepositoryMock.update).toBeCalledWith(review.uuid, dto)
    })

    test('should throw a BadRequestException if the review was not found', async () => {
      const review = new ReviewBuilder().build()
      const dto: UpdateReviewDto = {
        title: review.title,
        description: review.description,
        rating: review.rating
      }

      reviewRepositoryMock.findOne.mockResolvedValue(undefined)

      // eslint-disable-next-line jest/valid-expect
      expect(service.update(review.uuid, dto)).rejects.toThrow(
        new BadRequestException(['review not found'])
      )
    })
  })

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks())

    test('should delete a review', async () => {
      const review = new ReviewBuilder().build()

      reviewRepositoryMock.findOne.mockResolvedValue(review)

      await service.delete(review.uuid)

      expect(reviewRepositoryMock.findOne).toBeCalledTimes(1)
      expect(reviewRepositoryMock.softDelete).toBeCalledTimes(1)
    })

    test('should throw a BadRequestException if the review was not found', async () => {
      const review = new ReviewBuilder().build()

      reviewRepositoryMock.findOne.mockResolvedValue(undefined)

      // eslint-disable-next-line jest/valid-expect
      expect(service.delete(review.uuid)).rejects.toThrow(
        new BadRequestException(['review not found'])
      )
      expect(reviewRepositoryMock.findOne).toBeCalledTimes(1)
      expect(reviewRepositoryMock.softDelete).toBeCalledTimes(0)
    })
  })
})
