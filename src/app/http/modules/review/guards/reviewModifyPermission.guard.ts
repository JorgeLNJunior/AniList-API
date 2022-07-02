import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Review } from '../entities/review.entity'

@Injectable()
export class ReviewModifyPermissionGuard implements CanActivate {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    if (request.user.isAdmin) return true

    const reviewUUID = request.params.uuid
    const userUUID = request.user.uuid

    const review = await this.reviewRepository.findOne({
      where: { uuid: reviewUUID },
      relations: ['user']
    })
    if (!review) throw new BadRequestException(['review not found'])

    const isReviewAuthor = review.user.uuid === userUUID
    if (!isReviewAuthor) return false

    return true
  }
}
