import { Jobs } from '@modules/queue/types/jobs.enum'
import { InjectQueue } from '@nestjs/bull'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { Repository } from 'typeorm'

import { PaginationInterface } from '../../shared/pagination/pagination.interface'
import { Review } from '../review/entities/review.entity'
import { CreateAnimeDto } from './dto/create-anime.dto'
import { UpdateAnimeDto } from './dto/update-anime.dto'
import { Anime } from './entities/anime.entity'
import { AnimeQueryBuilder } from './query/anime.query.builder'
import { AnimeQuery } from './query/anime.query.interface'
import { ReviewsByAnimeQueryBuilder } from './query/reviews/reviewsByAnime.query.builder'
import { ReviewsByAnimeQuery } from './query/reviews/reviewsByAnime.query.interface'

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectQueue(Jobs.COVER_COMPRESSION) private coverQueue: Queue
  ) { }

  create(createAnimeDto: CreateAnimeDto) {
    const anime = this.animeRepository.create(createAnimeDto)
    return this.animeRepository.save(anime)
  }

  async find(query: AnimeQuery): Promise<PaginationInterface<Anime>> {
    const findOptions = new AnimeQueryBuilder(query).build()

    const total = await this.animeRepository.count({
      where: findOptions.where
    })
    const animes = await this.animeRepository
      .createQueryBuilder('anime')
      .select(
        'anime.uuid, anime.title, anime.synopsis, anime.trailer, anime.cover,' +
        'anime.episodes, anime.releaseDate, anime.season, anime.genre,' +
        'anime.createdAt, anime.updatedAt'
      )
      .addSelect(
        'IFNULL(ROUND(AVG(Cast(review.rating as Float)) ,2), 0)',
        'rating'
      )
      .addSelect('IFNULL(Cast(COUNT(review.uuid) as Float), 0)', 'reviews')
      .leftJoin('review', 'review', 'anime.uuid = review.animeUUID')
      .where(findOptions.where)
      .andWhere('anime.deletedAt IS NULL')
      .limit(findOptions.take)
      .offset(findOptions.skip)
      .groupBy('anime.uuid')
      .orderBy('anime.createdAt', 'DESC')
      .getRawMany()

    return { data: animes, total: total, pageTotal: animes.length }
  }

  async top() {
    return this.animeRepository
      .createQueryBuilder('anime')
      .select(
        'anime.uuid, anime.title, anime.synopsis, anime.trailer, anime.cover,' +
        'anime.episodes, anime.releaseDate, anime.season, anime.genre'
      )
      .addSelect(
        'IFNULL(ROUND(AVG(Cast(review.rating as Float)), 2), 0)',
        'rating'
      )
      .addSelect('IFNULL(Cast(COUNT(review.uuid) as Float), 0)', 'reviews')
      .leftJoin('review', 'review', 'anime.uuid = review.animeUUID')
      .where('anime.deletedAt IS NULL')
      .limit(10)
      .groupBy('anime.uuid')
      .orderBy('rating', 'DESC')
      .getRawMany()
  }

  async update(uuid: string, updateAnimeDto: UpdateAnimeDto) {
    const anime = await this.animeRepository.findOne(uuid)
    if (!anime) throw new BadRequestException(['anime not found'])

    await this.animeRepository.update(uuid, updateAnimeDto)
    return this.animeRepository.findOne(uuid)
  }

  async delete(uuid: string) {
    await this.animeRepository.softDelete(uuid)
  }

  async upload(uuid: string, path: string) {
    await this.coverQueue.add({ animeUUID: uuid, path: path })
    return 'the image will be available soon'
  }

  async getAnimeReviews(animeUUID: string, query: ReviewsByAnimeQuery): Promise<PaginationInterface<Review>> {
    const findOptions = new ReviewsByAnimeQueryBuilder(query).build()

    const total = await this.reviewRepository.count({
      where: { anime: { uuid: animeUUID } },
      ...findOptions
    })
    const reviews = await this.reviewRepository.find({
      where: { anime: { uuid: animeUUID } },
      ...findOptions,
      loadRelationIds: {
        relations: ['user'],
        disableMixedMap: true
      }
    })

    return {
      data: reviews,
      pageTotal: reviews.length,
      total: total
    }
  }
}
