import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Anime } from '../anime/entities/anime.entity'
import { User } from '../user/entities/user.entity'
import { Vote } from '../vote/entities/vote.entity'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Review } from './entities/review.entity'
import { ReviewQueryBuilder } from './query/review.query.builer'
import { ReviewQuery } from './query/review.query.interface'
import { FindVotesByReviewQueryBuilder } from './query/votes/findVotesByReview.query.builder'
import { FindVotesByReviewQuery } from './query/votes/findVotesByReview.query.interface'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Anime) private animeRepository: Repository<Anime>,
    @InjectRepository(Vote) private voteRepository: Repository<Vote>
  ) { }

  async create(userUUID: string, createReviewDto: CreateReviewDto) {
    const { animeUUID, title, description, rating } = createReviewDto

    const userReviews = await this.reviewRepository.find({
      where: { user: { uuid: userUUID } },
      loadRelationIds: {
        relations: ['anime'],
        disableMixedMap: true
      }
    })
    userReviews.forEach((review) => {
      if (review.anime.uuid === animeUUID) {
        throw new BadRequestException(['you already reviewed this anime'])
      }
    })

    const user = await this.userRepository.findOne(userUUID)

    const anime = await this.animeRepository.findOne(animeUUID)
    if (!anime) throw new BadRequestException(['anime not found'])

    const review = this.reviewRepository.create({
      title: title,
      description: description,
      rating: rating,
      anime: anime,
      user: user
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
      loadRelationIds: {
        relations: ['user', 'anime'],
        disableMixedMap: true
      }
    })

    return {
      data: reviews,
      pageTotal: reviews.length,
      total: total
    }
  }

  async findOne(uuid: string) {
    const review = await this.reviewRepository.findOne(uuid, {
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['user', 'anime']
      }
    })
    if (!review) throw new NotFoundException(`Resource /reviews/${uuid} not found`)
    return review
  }

  async update(uuid: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne(uuid)
    if (!review) throw new BadRequestException(['review not found'])

    await this.reviewRepository.update(uuid, updateReviewDto)
    return this.reviewRepository.findOne(uuid, {
      loadRelationIds: {
        relations: ['user', 'anime'],
        disableMixedMap: true
      }
    })
  }

  async delete(uuid: string) {
    const review = await this.reviewRepository.findOne(uuid)
    if (!review) throw new BadRequestException(['review not found'])

    await this.reviewRepository.softDelete(uuid)
  }

  async getReviewVotes(
    reviewUUID: string,
    query: FindVotesByReviewQuery
  ): Promise<PaginationInterface<Vote>> {
    const findOptions = new FindVotesByReviewQueryBuilder(query).build()

    const total = await this.voteRepository.count({
      where: { review: { uuid: reviewUUID } },
      ...findOptions
    })
    const votes = await this.voteRepository.find({
      where: { review: { uuid: reviewUUID } },
      ...findOptions,
      loadRelationIds: {
        relations: ['user'],
        disableMixedMap: true
      }
    })

    return {
      data: votes,
      pageTotal: votes.length,
      total: total
    }
  }
}
