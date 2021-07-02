import { AnimeService } from '@modules/anime/anime.service';
import { Anime } from '@modules/anime/entities/anime.entity';
import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

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

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
