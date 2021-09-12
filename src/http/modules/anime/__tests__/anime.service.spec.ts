import { animeRepositoryMock, animes } from '@mocks/anime.respository.mock';
import { getQueueToken } from '@nestjs/bull';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';

import { AnimeService } from '../anime.service';
import { CreateAnimeDto } from '../dto/create-anime.dto';
import { UpdateAnimeDto } from '../dto/update-anime.dto';
import { Anime } from '../entities/anime.entity';

describe('AnimeService', () => {
  let service: AnimeService;
  let repo: Repository<Anime>;
  let queue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimeService,
        {
          provide: getRepositoryToken(Anime),
          useValue: animeRepositoryMock,
        },
        {
          provide: getQueueToken('cover-compression'),
          useValue: {
            add: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<AnimeService>(AnimeService);
    repo = module.get<Repository<Anime>>(getRepositoryToken(Anime));
    queue = module.get<Queue>(getQueueToken('cover-compression'));
  });

  afterEach(() => jest.clearAllMocks());

  describe('find', () => {
    test('should return a list of anime', async () => {
      expect(await service.find({})).toEqual(animes);
    });

    test('should return a list of anime with query', async () => {
      const query = {
        episodes: '10',
        skip: 2,
        take: 10,
        title: 'title',
        uuid: 'uuid',
      };
      const anime = await service.find(query);
      expect(anime).toEqual(animes);
    });

    test('should return a list of top anime', async () => {
      expect(await service.top()).toEqual(animes);
    });
  });

  describe('create', () => {
    test('should create a new anime', async () => {
      const dto: CreateAnimeDto = {
        title: 'title',
        episodes: 20,
        releaseDate: '2020-03-10',
        synopsis: 'synopsis',
        trailer: 'trailer',
      };
      expect(await service.create(dto)).toEqual({
        uuid: 'uuid',
        cover: 'cover',
        ...dto,
      });
    });
  });

  describe('update', () => {
    test('should update an anime', async () => {
      const dto: UpdateAnimeDto = {
        title: 'title',
        synopsis: 'synopsis',
        trailer: 'trailer',
        episodes: 10,
        releaseDate: '2020-10-21',
      };

      const anime = await service.update('uuid', dto);

      expect(anime).toEqual(animes[0]);
      expect(repo.update).toHaveBeenCalledTimes(1);
      expect(repo.update).toHaveBeenCalledWith('uuid', dto);
    });

    test('should throw an error if the anime was not found', async () => {
      const dto: UpdateAnimeDto = {
        title: 'title',
      };

      const repoSpy = jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      // eslint-disable-next-line jest/valid-expect
      expect(service.update('uuid', dto)).rejects.toThrow(BadRequestException);
      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoSpy).toBeCalledWith('uuid');
      expect(repo.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('delete', () => {
    test('should delete an anime', async () => {
      await service.delete('uuid');

      expect(repo.delete).toHaveBeenCalledTimes(1);
      expect(repo.delete).toHaveBeenCalledWith('uuid');
    });
  });

  describe('upload', () => {
    test('should add the image to the queue', async () => {
      const result = await service.upload('uuid', 'path');

      expect(result).toBe('the image will be available soon');
      expect(queue.add).toHaveBeenCalledTimes(1);
      expect(queue.add).toHaveBeenLastCalledWith({
        animeUuid: 'uuid',
        path: 'path',
      });
    });
  });
});
