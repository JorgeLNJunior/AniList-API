import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestResponse } from '@shared/responses/badRequest.response';
import { ForbiddenResponse } from '@shared/responses/forbidden.response';
import { TooManyRequestsResponse } from '@shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@shared/responses/unauthorized.response';

import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { AnimeQuery } from './query/anime.query.interface';
import { CreateAnimeResponse } from './responses/createAnime.response';
import { FindAnimeResponse } from './responses/findAnimes.response';

@ApiTags('Animes')
@Controller('animes')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @ApiCreatedResponse({ description: 'OK', type: CreateAnimeResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: UnauthorizedResponse,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'Too Many Requests',
    type: TooManyRequestsResponse,
  })
  @Post()
  async create(@Body() createAnimeDto: CreateAnimeDto) {
    const anime = await this.animeService.create(createAnimeDto);
    return new CreateAnimeResponse(anime).build();
  }

  @ApiOkResponse({ description: 'OK', type: FindAnimeResponse })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: UnauthorizedResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'Too Many Requests',
    type: TooManyRequestsResponse,
  })
  @ApiQuery({ type: AnimeQuery })
  @Get()
  async find(@Query() query: AnimeQuery) {
    const animes = await this.animeService.find(query);
    return new FindAnimeResponse(animes).build();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animeService.update(+id, updateAnimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeService.remove(+id);
  }
}
