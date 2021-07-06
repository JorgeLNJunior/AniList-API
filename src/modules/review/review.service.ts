import { AnimeService } from '@modules/anime/anime.service';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { ReviewQueryBuilder } from './query/review.query.builer';
import { ReviewQuery } from './query/review.query.interface';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private userService: UserService,
    private animeService: AnimeService,
  ) {}

  async create(userUuid: string, createReviewDto: CreateReviewDto) {
    const { anime: animeUuid, title, description, rating } = createReviewDto;

    const user = await this.userService.find({ uuid: userUuid });

    const anime = await this.animeService.find({ uuid: animeUuid });
    if (!anime) throw new BadRequestException(['anime not found']);

    const review = this.reviewRepository.create({
      title: title,
      description: description,
      rating: rating,
      anime: anime[0],
      user: user[0],
    });

    return this.reviewRepository.save(review);
  }

  find(query: ReviewQuery) {
    const findOptions = new ReviewQueryBuilder(query).build();
    return this.reviewRepository.find({
      ...findOptions,
      relations: ['user', 'anime'],
    });
  }

  async update(uuid: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne(uuid);
    if (!review) throw new BadRequestException(['review not found']);

    await this.reviewRepository.update(uuid, updateReviewDto);
    return this.reviewRepository.findOne(uuid, {
      relations: ['user', 'anime'],
    });
  }

  async delete(uuid: string) {
    const review = await this.reviewRepository.findOne(uuid);
    if (!review) throw new BadRequestException(['review not found']);

    await this.reviewRepository.delete(uuid);
  }
}
