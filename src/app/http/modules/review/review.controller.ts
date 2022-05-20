import { BadRequestResponse } from '@http/shared/responses/badRequest.response';
import { NotFoundResponse } from '@http/shared/responses/notFound.response';
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewModifyPermissionGuard } from './guards/reviewModifyPermission.guard';
import { ReviewQuery } from './query/review.query.interface';
import { FindVotesByReviewQuery } from './query/votes/findVotesByReview.query.interface';
import { CreateReviewResponse } from './responses/createReview.response';
import { DeleteReviewResponse } from './responses/deleteReview.response';
import { FindOneReviewResponse } from './responses/findOneReview.response';
import { FindReviewResponse } from './responses/findReview.response';
import { FindReviewVotesResponse } from './responses/findReviewVotes.response';
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
  @ApiOperation({ summary: 'Create anime reviews' })
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    const review = await this.reviewService.create(
      req.user.uuid,
      createReviewDto,
    );
    return new CreateReviewResponse(review).build();
  }

  @ApiOkResponse({ description: 'OK', type: FindReviewResponse })
  @ApiOperation({ summary: 'Find reviews' })
  @Get()
  async find(@Query() query: ReviewQuery) {
    const reviews = await this.reviewService.find(query);
    return new FindReviewResponse(reviews).build();
  }

  @ApiOkResponse({ description: 'OK', type: FindOneReviewResponse })
  @ApiNotFoundResponse({
    description: 'Resource not found',
    type: NotFoundResponse,
  })
  @ApiOperation({ summary: 'Find a review' })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const review = await this.reviewService.findOne(uuid);
    return new FindOneReviewResponse(review).build();
  }

  @ApiOkResponse({ description: 'OK', type: FindReviewVotesResponse })
  @ApiOperation({ summary: 'Find review votes' })
  @Get(':uuid/votes')
  async getReviewVotes(
    @Param('uuid') reviewUUID: string,
    @Query() query: FindVotesByReviewQuery,
  ) {
    const votes = await this.reviewService.getReviewVotes(reviewUUID, query);
    return new FindReviewVotesResponse(votes).build();
  }

  @ApiOkResponse({ description: 'OK', type: FindReviewResponse })
  @ApiBadRequestResponse({
    description: 'Validation Error',
    type: BadRequestResponse,
  })
  @ApiOperation({ summary: 'Update reviews' })
  @UseGuards(ReviewModifyPermissionGuard)
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const review = await this.reviewService.update(uuid, updateReviewDto);
    return new UpdateReviewResponse(review).build();
  }

  @ApiOkResponse({ description: 'OK', type: DeleteReviewResponse })
  @ApiBadRequestResponse({
    description: 'Validation Error',
    type: BadRequestResponse,
  })
  @ApiOperation({ summary: 'Delete reviews' })
  @UseGuards(ReviewModifyPermissionGuard)
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.reviewService.delete(uuid);
    return new DeleteReviewResponse().build();
  }
}
