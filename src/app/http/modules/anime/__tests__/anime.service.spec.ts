import { ReviewBuilder } from '@http/modules/review/__tests__/builder/review.builder'
import { Review } from '@http/modules/review/entities/review.entity'
import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { animeRepositoryMock } from '@mocks/repositories/anime.respository.mock'
import { reviewRepositoryMock } from '@mocks/repositories/reviewRepository.mock'
import { Jobs } from '@modules/queue/types/jobs.enum'
import { getQueueToken } from '@nestjs/bull'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Queue } from 'bull'

import { AnimeService } from '../anime.service'
import { CreateAnimeDto } from '../dto/create-anime.dto'
import { UpdateAnimeDto } from '../dto/update-anime.dto'
import { Anime } from '../entities/anime.entity'
import { AnimeQuery } from '../query/anime.query.interface'
import { ReviewsByAnimeQueryBuilder } from '../query/reviews/reviewsByAnime.query.builder'
import { ReviewsByAnimeQuery } from '../query/reviews/reviewsByAnime.query.interface'
import { AnimeBuilder } from './builder/anime.builder'

describe('AnimeService', () => {
  let service: AnimeService
  let queue: Queue

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimeService,
        {
          provide: getRepositoryToken(Anime),
          useValue: animeRepositoryMock
        },
        {
          provide: getRepositoryToken(Review),
          useValue: reviewRepositoryMock
        },
        {
          provide: getQueueToken(Jobs.COVER_COMPRESSION),
          useValue: {
            add: jest.fn().mockResolvedValue(Promise.resolve())
          }
        }
      ]
    }).compile()

    service = module.get(AnimeService)
    queue = module.get(getQueueToken(Jobs.COVER_COMPRESSION))
  })

  afterEach(() => jest.clearAllMocks())

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of animes', async () => {
      const animes = [new AnimeBuilder().build()]

      animeRepositoryMock.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(undefined),
        getRawMany: jest.fn().mockResolvedValue(animes)
      }))
      animeRepositoryMock.count.mockResolvedValue(10)

      const results = await service.find({})

      expect(results).toEqual({
        data: animes,
        pageTotal: animes.length,
        total: 10
      } as PaginationInterface<Anime>)
    })

    test('should return a list of anime when receives query params', async () => {
      const animes = [new AnimeBuilder().build()]
      const query: AnimeQuery = {
        genre: animes[0].genre,
        episodes: animes[0].episodes,
        skip: 2,
        take: 10,
        title: animes[0].title,
        uuid: animes[0].uuid
      }

      animeRepositoryMock.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(undefined),
        getRawMany: jest.fn().mockResolvedValue(animes)
      }))
      animeRepositoryMock.count.mockResolvedValue(10)

      const results = await service.find(query)

      expect(results).toEqual({
        data: animes,
        pageTotal: animes.length,
        total: 10
      } as PaginationInterface<Anime>)
    })

    test('should return a list of top anime', async () => {
      const animes = [new AnimeBuilder().build()]

      animeRepositoryMock.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(undefined),
        getRawMany: jest.fn().mockResolvedValue(animes)
      }))

      const results = await service.top()

      expect(results).toEqual(animes)
    })
  })
  describe('findOne', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return an anime', async () => {
      const anime = new AnimeBuilder().build()

      animeRepositoryMock.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(undefined),
        getRawOne: jest.fn().mockResolvedValue(anime)
      }))

      const result = await service.findOne(anime.uuid)

      expect(result).toEqual(anime)
    })

    test('should throw a NotFoundException if the anime was not found', async () => {
      const anime = new AnimeBuilder().build()

      animeRepositoryMock.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(undefined),
        getRawOne: jest.fn().mockResolvedValue(undefined)
      }))

      await expect(service.findOne(anime.uuid)).rejects.toThrow(
        new NotFoundException(`Resource /animes/${anime.uuid} not found`)
      )
    })
  })

  describe('create', () => {
    afterEach(() => jest.clearAllMocks())

    test('should create a new anime', async () => {
      const anime = new AnimeBuilder().build()

      const dto: CreateAnimeDto = {
        title: anime.title,
        episodes: anime.episodes,
        releaseDate: anime.releaseDate,
        synopsis: anime.synopsis,
        trailer: anime.trailer,
        season: anime.season,
        genre: anime.genre
      }

      animeRepositoryMock.save.mockResolvedValue(anime)

      const results = await service.create(dto)

      expect(results).toEqual({
        ...anime,
        ...dto
      })
    })

    test('should call the repository with correct params', async () => {
      const anime = new AnimeBuilder().build()

      const dto: CreateAnimeDto = {
        title: anime.title,
        episodes: anime.episodes,
        releaseDate: anime.releaseDate,
        synopsis: anime.synopsis,
        trailer: anime.trailer,
        season: anime.season,
        genre: anime.genre
      }

      const spy = jest
        .spyOn(animeRepositoryMock, 'save')
        .mockResolvedValue(anime)

      const results = await service.create(dto)

      expect(spy).toBeCalledWith(dto)
      expect(results).toEqual({
        ...anime,
        ...dto
      })
    })
  })

  describe('update', () => {
    afterEach(() => jest.clearAllMocks())

    test('should update an anime', async () => {
      const anime = new AnimeBuilder().build()
      const dto: UpdateAnimeDto = {
        title: anime.title,
        synopsis: anime.synopsis,
        trailer: anime.trailer,
        episodes: anime.episodes,
        releaseDate: anime.releaseDate,
        season: anime.season
      }

      animeRepositoryMock.findOne.mockResolvedValue(anime)
      animeRepositoryMock.update.mockResolvedValue(anime)

      const result = await service.update(anime.uuid, dto)

      expect(result).toEqual(anime)
    })

    test('should call the repository with correct params', async () => {
      const anime = new AnimeBuilder().build()
      const dto: UpdateAnimeDto = {
        title: anime.title,
        synopsis: anime.synopsis,
        trailer: anime.trailer,
        episodes: anime.episodes,
        releaseDate: anime.releaseDate,
        season: anime.season
      }

      const findSpy = jest
        .spyOn(animeRepositoryMock, 'findOne')
        .mockResolvedValue(anime)
      const updateSpy = jest
        .spyOn(animeRepositoryMock, 'update')
        .mockResolvedValue(anime)

      const result = await service.update(anime.uuid, dto)

      expect(findSpy).toHaveBeenCalledTimes(2)
      expect(findSpy).toHaveBeenCalledWith({
        where: { uuid: anime.uuid }
      })
      expect(updateSpy).toHaveBeenCalledTimes(1)
      expect(updateSpy).toHaveBeenCalledWith(anime.uuid, dto)
      expect(result).toEqual(anime)
    })

    test('should throw a BadRequestException if the anime was not found', async () => {
      const anime = new AnimeBuilder().build()
      const dto: UpdateAnimeDto = {
        title: anime.title
      }

      const repoSpy = jest
        .spyOn(animeRepositoryMock, 'findOne')
        .mockResolvedValue(undefined)

      await expect(service.update(anime.uuid, dto)).rejects.toThrow(
        new BadRequestException(['anime not found'])
      )
      expect(repoSpy).toHaveBeenCalledTimes(1)
      expect(repoSpy).toBeCalledWith({
        where: { uuid: anime.uuid }
      })
      expect(animeRepositoryMock.update).toHaveBeenCalledTimes(0)
    })
  })

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks())

    test('should delete an anime', async () => {
      const anime = new AnimeBuilder().build()
      await service.delete(anime.uuid)

      expect(animeRepositoryMock.softDelete).toHaveBeenCalledTimes(1)
      expect(animeRepositoryMock.softDelete).toHaveBeenCalledWith(anime.uuid)
    })
  })

  describe('upload', () => {
    test('should add an image to the queue', async () => {
      const anime = new AnimeBuilder().build()

      const result = await service.upload(anime.uuid, 'path')

      expect(result).toBe('the image will be available soon')
      expect(queue.add).toHaveBeenCalledTimes(1)
      expect(queue.add).toHaveBeenLastCalledWith({
        animeUUID: anime.uuid,
        path: 'path'
      })
    })
  })

  describe('getAnimeReviews', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return an list of reviews', async () => {
      const anime = new AnimeBuilder().build()
      const reviews = [new ReviewBuilder().build()]

      reviewRepositoryMock.find.mockResolvedValue(reviews)
      reviewRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getAnimeReviews(anime.uuid, {})

      expect(results).toEqual({
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      } as PaginationInterface<Review>)
    })

    test('should return a list of reviews when it receives query params', async () => {
      const anime = new AnimeBuilder().build()
      const reviews = [new ReviewBuilder().build()]
      const query: ReviewsByAnimeQuery = {
        title: reviews[0].title,
        rating: reviews[0].rating,
        take: 10,
        skip: 5
      }

      reviewRepositoryMock.find.mockResolvedValue(reviews)
      reviewRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getAnimeReviews(anime.uuid, query)

      expect(results).toEqual({
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      } as PaginationInterface<Review>)
    })

    test('should call the repository with correct params', async () => {
      const anime = new AnimeBuilder().build()
      const reviews = [new ReviewBuilder().build()]
      const query: ReviewsByAnimeQuery = {
        title: reviews[0].title,
        rating: reviews[0].rating,
        take: 10,
        skip: 5
      }
      const findOptions = new ReviewsByAnimeQueryBuilder(query).build()

      reviewRepositoryMock.find.mockResolvedValue(reviews)
      reviewRepositoryMock.count.mockResolvedValue(10)

      const results = await service.getAnimeReviews(anime.uuid, query)

      expect(results).toEqual({
        data: reviews,
        pageTotal: reviews.length,
        total: 10
      } as PaginationInterface<Review>)
      expect(reviewRepositoryMock.find).toBeCalledTimes(1)
      expect(reviewRepositoryMock.find).toBeCalledWith({
        where: {
          anme: { uuid: anime.uuid }
        },
        ...findOptions,
        loadRelationIds: {
          disableMixedMap: true,
          relations: ['user']
        }
      })
      expect(reviewRepositoryMock.count).toBeCalledTimes(1)
      expect(reviewRepositoryMock.count).toBeCalledWith({
        where: {
          anime: { uuid: anime.uuid }
        },
        ...findOptions
      })
    })
  })
})
