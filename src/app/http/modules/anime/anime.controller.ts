import { IsAdminGuard } from '@http/shared/guards/isAdmin.guard'
import { BadRequestResponse } from '@http/shared/responses/badRequest.response'
import { ForbiddenResponse } from '@http/shared/responses/forbidden.response'
import { MessageResponse } from '@http/shared/responses/message.response'
import { NotFoundResponse } from '@http/shared/responses/notFound.response'
import { TooManyRequestsResponse } from '@http/shared/responses/tooManyRequests.response'
import { UnauthorizedResponse } from '@http/shared/responses/unauthorized.response'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { AnimeService } from './anime.service'
import { CreateAnimeDto } from './dto/create-anime.dto'
import { UpdateAnimeDto } from './dto/update-anime.dto'
import { UploadAnimeDto } from './dto/upload-anime.dto'
import { AnimeQuery } from './query/anime.query.interface'
import { ReviewsByAnimeQuery } from './query/reviews/reviewsByAnime.query.interface'
import { CreateAnimeResponse } from './responses/createAnime.response'
import { DeleteAnimeResponse } from './responses/deleteAnime.response'
import { FindReviewByAnimeResponse } from './responses/findAnimeReviews.response'
import { FindAnimeResponse } from './responses/findAnimes.response'
import { FindOneAnimeResponse } from './responses/findOneAnime.response'
import { FindTopAnimesResponse } from './responses/findTopAnimes.response'
import { UpdateAnimeResponse } from './responses/updateAnime.response'

@ApiBearerAuth()
@ApiTags('Animes')
@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: UnauthorizedResponse
})
@ApiForbiddenResponse({
  description: 'Forbidden',
  type: ForbiddenResponse
})
@ApiTooManyRequestsResponse({
  description: 'Too Many Requests',
  type: TooManyRequestsResponse
})
@UseGuards(AuthGuard('jwt'))
@Controller('animes')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @ApiCreatedResponse({ description: 'OK', type: CreateAnimeResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'Add animes' })
  @UseGuards(new IsAdminGuard())
  @Post()
  async create(@Body() createAnimeDto: CreateAnimeDto) {
    const anime = await this.animeService.create(createAnimeDto)
    return new CreateAnimeResponse(anime).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindAnimeResponse })
  @ApiOperation({ summary: 'Find animes' })
  @Get()
  async find(@Query() query: AnimeQuery) {
    const animes = await this.animeService.find(query)
    return new FindAnimeResponse(animes).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindAnimeResponse })
  @ApiOperation({ summary: 'Top 10 most rated animes' })
  @Get('top')
  async top() {
    const animes = await this.animeService.top()
    return new FindTopAnimesResponse(animes).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindOneAnimeResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundResponse })
  @ApiOperation({ summary: 'Find an anime' })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const anime = await this.animeService.findOne(uuid)
    return new FindOneAnimeResponse(anime).build()
  }

  @ApiOkResponse({ description: 'OK', type: FindReviewByAnimeResponse })
  @ApiOperation({ summary: 'Find anime reviews' })
  @Get(':uuid/reviews')
  async getAnimeReviews(
    @Param('uuid') uuid: string,
    query: ReviewsByAnimeQuery
  ) {
    const reviews = await this.animeService.getAnimeReviews(uuid, query)
    return new FindReviewByAnimeResponse(reviews).build()
  }

  @ApiOkResponse({ description: 'OK', type: UpdateAnimeResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'Update animes' })
  @UseGuards(new IsAdminGuard())
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateAnimeDto: UpdateAnimeDto
  ) {
    const anime = await this.animeService.update(uuid, updateAnimeDto)
    return new UpdateAnimeResponse(anime).build()
  }

  @ApiOkResponse({ description: 'OK', type: DeleteAnimeResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse
  })
  @ApiOperation({ summary: 'Delete animes' })
  @UseGuards(new IsAdminGuard())
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.animeService.delete(uuid)
    return new DeleteAnimeResponse().build()
  }

  @ApiOkResponse({ description: 'OK', type: MessageResponse })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenResponse
  })
  @ApiOperation({ summary: 'Upload anime cover' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadAnimeDto
  })
  @UseGuards(new IsAdminGuard())
  @UseInterceptors(
    FileInterceptor('cover', { limits: { fileSize: 3000000 }, dest: '.temp' })
  )
  @Post(':uuid/upload')
  async upload(
    @Param('uuid') uuid: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const message = await this.animeService.upload(uuid, file.path)
    return { statusCode: 200, message: message }
  }
}
