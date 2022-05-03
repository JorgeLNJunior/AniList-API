import { createMock } from '@golevelup/ts-jest'
import { animeServiceMock } from '@mocks/services/anime.service.mock'
import { Test, TestingModule } from '@nestjs/testing'

import { AnimeController } from '../anime.controller'
import { AnimeService } from '../anime.service'
import { CreateAnimeDto } from '../dto/create-anime.dto'
import { UpdateAnimeDto } from '../dto/update-anime.dto'
import { AnimeBuilder } from './builder/anime.builder'

describe('AnimeController', () => {
  let controller: AnimeController
  let service: AnimeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeController],
      providers: [
        {
          provide: AnimeService,
          useValue: animeServiceMock
        }
      ]
    }).compile()

    controller = module.get<AnimeController>(AnimeController)
    service = module.get<AnimeService>(AnimeService)
  })
  afterEach(() => jest.clearAllMocks())

  describe('find', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of anime', async () => {
      const animes = [
        new AnimeBuilder().build()
      ]
      const query = {}

      animeServiceMock.find.mockResolvedValue({
        results: animes,
        total: 10,
        pageTotal: animes.length
      })

      const response = await controller.find(query)

      expect(response).toEqual({
        statusCode: 200,
        animes: animes,
        total: 10,
        pageTotal: 1
      })
    })

    test('should call the service with correct params', async () => {
      const animes = [
        new AnimeBuilder().build()
      ]
      const query = {}

      const spy = jest.spyOn(animeServiceMock, 'find').mockResolvedValue({
        results: animes,
        total: 10,
        pageTotal: animes.length
      })

      const response = await controller.find(query)

      expect(spy).toBeCalledWith(query)
      expect(response).toEqual({
        statusCode: 200,
        animes: animes,
        total: 10,
        pageTotal: 1
      })
    })
  })

  describe('top', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a list of top animes', async () => {
      const animes = [
        new AnimeBuilder().build()
      ]

      animeServiceMock.top.mockResolvedValue(animes)

      const response = await controller.top()

      expect(response).toEqual({
        statusCode: 200,
        animes: animes
      })
    })
  });


  describe('create', () => {
    afterEach(() => jest.clearAllMocks())

    test('should create a new anime', async () => {
      const anime = new AnimeBuilder().build()
      const dto: CreateAnimeDto = {
        title: anime.title,
        synopsis: anime.synopsis,
        episodes: anime.episodes,
        releaseDate: anime.releaseDate,
        trailer: anime.trailer,
        season: anime.season,
        genre: anime.genre
      }

      animeServiceMock.create.mockResolvedValue(anime)

      const response = await controller.create(dto)

      expect(response).toEqual({
        statusCode: 201,
        anime: {
          ...dto,
          ...anime
        }
      })
    })

    test('should call the service with correct params', async () => {
      const anime = new AnimeBuilder().build()
      const dto: CreateAnimeDto = {
        title: anime.title,
        synopsis: anime.synopsis,
        episodes: anime.episodes,
        releaseDate: anime.releaseDate,
        trailer: anime.trailer,
        season: anime.season,
        genre: anime.genre
      }

      animeServiceMock.create.mockResolvedValue(anime)

      const response = await controller.create(dto)

      expect(service.create).toHaveBeenCalledWith(dto)
      expect(service.create).toHaveBeenCalledTimes(1)
      expect(response).toEqual({
        statusCode: 201,
        anime: {
          ...dto,
          ...anime
        }
      })
    })
  })

  describe('update', () => {
    afterEach(() => jest.clearAllMocks())

    test('should update an anime', async () => {
      const anime = new AnimeBuilder().build()
      const dto: UpdateAnimeDto = {
        title: anime.title,
        trailer: anime.trailer,
        episodes: anime.episodes,
        genre: anime.genre,
        season: anime.season,
        releaseDate: anime.releaseDate,
        synopsis: anime.synopsis
      }

      animeServiceMock.update.mockResolvedValue(anime)

      const response = await controller.update(anime.uuid, dto)

      expect(response).toEqual({
        statusCode: 200,
        anime: {
          ...dto,
          ...anime
        }
      })
      expect(service.update).toHaveBeenCalledWith(anime.uuid, dto)
      expect(service.update).toHaveBeenCalledTimes(1)
    })

    test('should call the service with correct params', async () => {
      const anime = new AnimeBuilder().build()
      const dto: UpdateAnimeDto = {
        title: anime.title,
        trailer: anime.trailer,
        episodes: anime.episodes,
        genre: anime.genre,
        season: anime.season,
        releaseDate: anime.releaseDate,
        synopsis: anime.synopsis
      }

      animeServiceMock.update.mockResolvedValue(anime)

      const response = await controller.update(anime.uuid, dto)

      expect(service.update).toHaveBeenCalledWith(anime.uuid, dto)
      expect(service.update).toHaveBeenCalledTimes(1)
      expect(response).toEqual({
        statusCode: 200,
        anime: {
          ...dto,
          ...anime
        }
      })
    })
  })

  describe('delete', () => {
    afterEach(() => jest.clearAllMocks())

    test('should delete an anime', async () => {
      const anime = new AnimeBuilder().build()

      const response = await controller.delete(anime.uuid)

      expect(response).toEqual({
        statusCode: 200,
        message: 'the anime has been deleted'
      })
    })

    test('should call the repository with correct params', async () => {
      const anime = new AnimeBuilder().build()

      const response = await controller.delete(anime.uuid)

      expect(service.delete).toHaveBeenCalledWith(anime.uuid)
      expect(service.delete).toHaveBeenCalledTimes(1)
      expect(response).toEqual({
        statusCode: 200,
        message: 'the anime has been deleted'
      })
    })
  })

  describe('upload', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a upload message', async () => {
      const file = createMock<Express.Multer.File>()
      const response = await controller.upload('uuid', file)

      expect(response).toEqual({
        statusCode: 200,
        message: 'the image will be available soon'
      })
      expect(service.upload).toHaveBeenCalledWith('uuid', file)
      expect(service.upload).toHaveBeenCalledTimes(1)
    })
  })
})
