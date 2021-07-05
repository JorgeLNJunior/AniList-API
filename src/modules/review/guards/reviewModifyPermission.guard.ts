import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { getRepository } from 'typeorm';

import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewModifyPermissionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user.isAdmin) return true;

    const reviewRepository = getRepository(Review);
    const reviewUuid = request.params.uuid;
    const userUuid = request.user.uuid;

    const review = await reviewRepository.findOne(reviewUuid, {
      relations: ['user'],
    });
    if (!review) throw new BadRequestException(['review not found']);

    if (review.user.uuid !== userUuid) return false;
    return true;
  }
}
