import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';

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

  async find(query: AnimeQuery) {
    const findOptions = new AnimeQueryBuilder(query).build();

    return this.animeRepository
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
      .take(findOptions.take)
      .skip(findOptions.skip)
      .groupBy('anime.uuid')
      .orderBy('anime.title', 'ASC')
      .getRawMany();
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
      .take(10)
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
    await this.animeRepository.delete(uuid);
  }

  async upload(uuid: string, path: string) {
    await this.coverQueue.add({ animeUuid: uuid, path: path });
    return 'the image will be available soon';
  }
}
