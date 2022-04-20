import { createMock } from '@golevelup/ts-jest'
import { animeServiceMock } from '@mocks/services/anime.service.mock'
import { Test, TestingModule } from '@nestjs/testing'
import { fakeAnime } from '@src/__tests__/fakes'

import { AnimeController } from '../anime.controller'
import { AnimeService } from '../anime.service'
import { CreateAnimeDto } from '../dto/create-anime.dto'
import { UpdateAnimeDto } from '../dto/update-anime.dto'

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

  describe('find', () => {
    test('should return a list of anime', async () => {
      const response = await controller.find({})
      expect(response).toEqual({
        statusCode: 200,
        animes: [fakeAnime],
        pageTotal: 1,
        total: 10
      })
    })

    test('should return a list of top animes', async () => {
      const response = await controller.top()
      expect(response).toEqual({
        statusCode: 200,
        animes: [fakeAnime]
      })
      expect(service.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    test('should create a new anime', async () => {
      const dto: CreateAnimeDto = {
        title: 'title',
        synopsis: 'synopsis',
        episodes: 10,
        releaseDate: '2020-05-13',
        trailer: 'trailer',
        season: 'spring 2020',
        genre: 'action'
      }
      const response = await controller.create(dto)

      expect(response).toEqual({
        statusCode: 201,
        anime: {
          uuid: 'uuid',
          cover: 'cover',
          ...dto
        }
      })
      expect(service.create).toHaveBeenCalledWith(dto)
      expect(service.create).toHaveBeenCalledTimes(1)
    })
  })

  describe('update', () => {
    test('should update an anime', async () => {
      const dto: UpdateAnimeDto = {
        title: 'title',
        trailer: 'trailer'
      }
      const response = await controller.update('uuid', dto)

      expect(response).toEqual({
        statusCode: 200,
        anime: {
          uuid: 'uuid',
          cover: 'cover',
          synopsis: 'synopsis',
          episodes: 10,
          releaseDate: '2020-05-13',
          ...dto
        }
      })
      expect(service.update).toHaveBeenCalledWith('uuid', dto)
      expect(service.update).toHaveBeenCalledTimes(1)
    })
  })

  describe('delete', () => {
    test('should delete an anime', async () => {
      const response = await controller.delete('uuid')
      expect(response).toEqual({
        statusCode: 200,
        message: 'the anime has been deleted'
      })
      expect(service.delete).toHaveBeenCalledWith('uuid')
      expect(service.delete).toHaveBeenCalledTimes(1)
    })
  })

  describe('upload', () => {
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