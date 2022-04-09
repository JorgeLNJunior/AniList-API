import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Anime } from '../anime/entities/anime.entity'
import { User } from '../user/entities/user.entity'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Review } from './entities/review.entity'
import { ReviewQueryBuilder } from './query/review.query.builer'
import { ReviewQuery } from './query/review.query.interface'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Anime) private animeRepository: Repository<Anime>
  ) { }

  async create(userUuid: string, createReviewDto: CreateReviewDto) {
    const { anime: animeUuid, title, description, rating } = createReviewDto

    const userReviews = await this.reviewRepository.find({
      where: { user: { uuid: userUuid } },
      relations: ['anime']
    })
    userReviews.forEach((review) => {
      if (review.anime.uuid === animeUuid) {
        throw new BadRequestException(['you already reviewed this anime'])
      }
    })

    const user = await this.userRepository.findOne(userUuid)

    const anime = await this.animeRepository.findOne(animeUuid)
    if (!anime) throw new BadRequestException(['anime not found'])

    const review = this.reviewRepository.create({
      title: title,
      description: description,
      rating: rating,
      anime: anime[0],
      user: user[0]
    })

    return this.reviewRepository.save(review)
  }

  async find(query: ReviewQuery): Promise<PaginationInterface<Review>> {
    const findOptions = new ReviewQueryBuilder(query).build()

    const total = await this.reviewRepository.count({
      where: findOptions.where
    })
    const reviews = await this.reviewRepository.find({
      ...findOptions,
      relations: ['user', 'anime']
    })

    return { results: reviews, pageTotal: reviews.length, total: total }
  }

  async update(uuid: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne(uuid)
    if (!review) throw new BadRequestException(['review not found'])

    await this.reviewRepository.update(uuid, updateReviewDto)
    return this.reviewRepository.findOne(uuid, {
      relations: ['user', 'anime']
    })
  }

  async delete(uuid: string) {
    const review = await this.reviewRepository.findOne(uuid)
    if (!review) throw new BadRequestException(['review not found'])

    await this.reviewRepository.softDelete(uuid)
  }
}
