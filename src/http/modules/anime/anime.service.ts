import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';

import { PaginationInterface } from '../../shared/pagination/pagination.interface';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Anime } from './entities/anime.entity';
import { AnimeQueryBuilder } from './query/anime.query.builder';
import { AnimeQuery } from './query/anime.query.interface';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>,
    @InjectQueue('cover-compression') private coverQueue: Queue,
  ) {}
  create(createAnimeDto: CreateAnimeDto) {
    const anime = this.animeRepository.create(createAnimeDto);
    return this.animeRepository.save(anime);
  }

  async find(query: AnimeQuery): Promise<PaginationInterface<Anime>> {
    const findOptions = new AnimeQueryBuilder(query).build();

    const total = await this.animeRepository.count({
      where: findOptions.where,
    });
    const animes = await this.animeRepository
      .createQueryBuilder('anime')
      .select(
        'anime.uuid, anime.title, anime.synopsis, anime.trailer, anime.cover, anime.episodes, anime.releaseDate, anime.createdAt, anime.updatedAt',
      )
      .addSelect(
        'IFNULL(ROUND(AVG(Cast(review.rating as Float)) ,2), 0)',
        'rating',
      )
      .addSelect('IFNULL(Cast(COUNT(review.uuid) as Float), 0)', 'reviews')
      .leftJoin('review', 'review', 'anime.uuid = review.animeUuid')
      .where(findOptions.where)
      .andWhere('anime.deletedAt IS NULL')
      .limit(findOptions.take)
      .offset(findOptions.skip)
      .groupBy('anime.uuid')
      .orderBy('anime.createdAt', 'DESC')
      .getRawMany();

    return { results: animes, total: total, pageTotal: animes.length };
  }

  async top() {
    return this.animeRepository
      .createQueryBuilder('anime')
      .select(
        'anime.uuid, anime.title, anime.synopsis, anime.trailer, anime.cover, anime.episodes, anime.releaseDate',
      )
      .addSelect(
        'IFNULL(ROUND(AVG(Cast(review.rating as Float)), 2), 0)',
        'rating',
      )
      .addSelect('IFNULL(Cast(COUNT(review.uuid) as Float), 0)', 'reviews')
      .leftJoin('review', 'review', 'anime.uuid = review.animeUuid')
      .where('anime.deletedAt IS NULL')
      .limit(10)
      .groupBy('anime.uuid')
      .orderBy('rating', 'DESC')
      .getRawMany();
  }

  async update(uuid: string, updateAnimeDto: UpdateAnimeDto) {
    const anime = await this.animeRepository.findOne(uuid);
    if (!anime) throw new BadRequestException(['anime not found']);

    await this.animeRepository.update(uuid, updateAnimeDto);
    return this.animeRepository.findOne(uuid);
  }

  async delete(uuid: string) {
    await this.animeRepository.softDelete(uuid);
  }

  async upload(uuid: string, path: string) {
    await this.coverQueue.add({ animeUuid: uuid, path: path });
    return 'the image will be available soon';
  }
}
