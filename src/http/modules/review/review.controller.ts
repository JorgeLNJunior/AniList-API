import { BadRequestResponse } from '@http/shared/responses/badRequest.response';
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewModifyPermissionGuard } from './guards/reviewModifyPermission.guard';
import { ReviewQuery } from './query/review.query.interface';
import { CreateReviewResponse } from './responses/createReview.response';
import { DeleteReviewResponse } from './responses/deleteReview.response';
import { FindReviewResponse } from './responses/findReview.response';
import { UpdateReviewResponse } from './responses/updateReview.response';
import { ReviewService } from './review.service';

@ApiTags('Reviews')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: UnauthorizedResponse,
})
@ApiTooManyRequestsResponse({
  description: 'Too Many Requests',
  type: TooManyRequestsResponse,
})
@UseGuards(AuthGuard('jwt'))
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiCreatedResponse({ description: 'OK', type: CreateReviewResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse,
  })
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    const review = await this.reviewService.create(
      req.user.uuid,
      createReviewDto,
    );
    return new CreateReviewResponse(review);
  }

  @ApiOkResponse({ description: 'ok', type: FindReviewResponse })
  @ApiQuery({ type: ReviewQuery })
  @Get()
  async find(@Query() query: ReviewQuery) {
    const reviews = await this.reviewService.find(query);
    return new FindReviewResponse(reviews).build();
  }

  @ApiOkResponse({ description: 'ok', type: FindReviewResponse })
  @ApiBadRequestResponse({
    description: 'Validation Error',
    type: BadRequestResponse,
  })
  @UseGuards(new ReviewModifyPermissionGuard())
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const review = await this.reviewService.update(uuid, updateReviewDto);
    // console.log(review);
    return new UpdateReviewResponse(review).build();
  }

  @ApiOkResponse({ description: 'ok', type: DeleteReviewResponse })
  @ApiBadRequestResponse({
    description: 'Validation Error',
    type: BadRequestResponse,
  })
  @UseGuards(new ReviewModifyPermissionGuard())
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.reviewService.delete(uuid);
    return new DeleteReviewResponse().build();
  }
}
